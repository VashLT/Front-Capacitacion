import { Store } from '@ngrx/store';
import { LayoutState } from '@UIS-common/layout/store/layout-store.model';
import { lastValueFrom } from 'rxjs';
import { OnChanges, OnDestroy, InjectionToken, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injector, OnInit, SimpleChanges } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { BackendError } from '@models/general/backend-error.dto';
import { TranslateService } from '@ngx-translate/core';
import { DownloadAdjuntoService } from '@services/recursos-humanos/download-adjunto/download-adjunto.service';
import { FileToBase64Pipe } from '@UIS-common/layout/shared/pipes/file-to-base-64.pipe';
import { urlToFileSync } from '@UIS-common/layout/shared/utils/url-to-file';
import { validateAspectRadioImage } from '@UIS-common/layout/shared/validators/aspect-radio-image';
import { filter, Subscription, take } from 'rxjs';
import { ImagenUsuarioBase } from '@services/general/imagen-usuario-base/imagen-usuario-base';
import { CompressImageService } from '@services/general/imagen-usuario-base/compress-image.service';
import { AdjustImgComponent } from '@uis/uis-lib/components/adjust-img';
import { ValidatorsUIS } from '@uis/uis-lib/forms';
import { CrudService } from '@uis/uis-lib/services/crud';
import { SnackbarService } from '@uis/uis-lib/services/snackbar';

/**
 * Token para injectar el servicio imgUsr.
 */
export const TOKEN_IMG_USER = new InjectionToken<ImagenUsuarioBase>(
  'tokenImgUser'
);

/**
 * Componente base para construir los componentes de cambio de imagen de usuario.
 */
@Component({
  template: '',
})
export abstract class ImageEditBaseComponent
  implements OnInit, OnDestroy, OnChanges
{
  /**
   * Si estoy en modo inserción.
   */
  @Input() insertMode: boolean;

  /**
   * Si estoy en modo visualización.
   */
  @Input() viewMode: boolean;

  /**
   * Si estoy en modo edición.
   */
  @Input() editMode: boolean;

  /**
   * Id de la persona.
   */
  @Input() idPersonaParentValue: number;

  /**
   * Detector del evento de cambio de id persona.
   */
  @Input() idPersonaEventChangeDetector: EventEmitter<number>;

  /**
   * Url de la imagen de perfil.
   */
  @Input() urlImage;

  /**
   * Booleano que indica si se debe marcar o no el error de obligatorio
   */
  @Input() requiredError = false;

  /**
   * Si se desea mostrar el botón de eliminar.
   */
  @Input() showDelete = false;

  /**
   * Cuando la imagen cambia se emite el evento.
   */
  @Output() imagenChange = new EventEmitter<File>();

  /**
   * Tipos de imagen permitidos.
   */
  public accept = 'image/png, image/gif, image/jpeg, image/jpg';

  /**
   * Control del input de imagen.
   */
  imageControl: UntypedFormControl;

  /**
   * Subscripción a los cambios del estado del control.
   */
  subscriptionStatusChanges: Subscription;

  /**
   * Subscripción a los cambios del estado luego de ajustar la imagen.
   */
  subcriptionStatuschangesAfterSetImage: Subscription;

  /**
   * Se usa para guardar el b64 de la imagen cargada y ponerla cuando la petición finalice.
   */
  nextValueImage = '';

  /**
   * Relación de aspecto de la imagen a validar.
   */
  aspectRadioAllowed = '1:1';

  /**
   * Tamaño máximo de la imagen.
   */
  maxSizeInKB = 10000000;

  /**
   * Si se está comprimiendo la imagen.
   */
  compressingImage = false;

  /**
   * Servicio de snackbar.
   */
  public snackbar: SnackbarService;

  /**
   * Servicio de la ruta actual.
   */
  public activatedRoute: ActivatedRoute;

  /**
   * Servicio de crud.
   */
  public crudService: CrudService;

  /**
   * Pipe para convertir un archivo a base64.
   */
  public fileToBase64Pipe: FileToBase64Pipe;

  /**
   * Cuando no se puede cargar la imagen se emite el evento.
   */
  @Output() imagenError = new EventEmitter<boolean>();

  /**
   * Constructor del componente.
   *
   * @param downloadAdjunto - Servicio para descargar adjuntos.
   * @param imgUsr - Servicio de imagen de usuario.
   * @param sanitization - Servicio de sanitización.
   * @param translate - Servicio de traducción.
   * @param injector - Injector.
   */
  constructor(
    public downloadAdjunto: DownloadAdjuntoService,
    @Inject(TOKEN_IMG_USER) public imgUsr: ImagenUsuarioBase,
    public sanitization: DomSanitizer,
    public translate: TranslateService,
    public injector: Injector,
    public imageCompress: CompressImageService,
    public store: Store<LayoutState>
  ) {
    this.snackbar = this.injector.get<SnackbarService>(SnackbarService);
    this.activatedRoute = this.injector.get<ActivatedRoute>(ActivatedRoute);
    this.crudService = this.injector.get<CrudService>(CrudService);
    this.fileToBase64Pipe =
      this.injector.get<FileToBase64Pipe>(FileToBase64Pipe);
  }

  /**
   * Al destruir el componente se elimina la suscripción.
   */
  ngOnDestroy(): void {
    this.subscriptionStatusChanges?.unsubscribe();
    this.subcriptionStatuschangesAfterSetImage?.unsubscribe();
  }

  /**
   * Función para detectar cambios en el id persona y cargar la imagen.
   *
   * @param changes - Cambios en el componente.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.idPersonaParentValue?.currentValue) {
      this.idPersonaParentValue = changes.idPersonaParentValue.currentValue;
      this.onPersonaParentChange();
    }
  }

  /**
   * Función escucha cambios en el archivo de firma seleccionado y
   * en caso de este tener error de relación de aspecto, muestra el modal.
   */
  listenChangesErrorsInputSignature() {
    this.subscriptionStatusChanges?.unsubscribe();
    this.subscriptionStatusChanges = this.imageControl.statusChanges.subscribe(
      async (status) => {
        this.compressingImage = false;
        let refAdjustOpened = false;
        this.crudService.referencias.forEach((ref) => {
          refAdjustOpened =
            ref.componentInstance?.componentRef?.componentType instanceof
            AdjustImgComponent;
        });

        if (
          status === 'INVALID' &&
          this.imageControl.hasError('aspectRadio') &&
          this.imageControl.touched &&
          !refAdjustOpened //Si solo tengo abierto el modal de editar perfil.
        ) {
          this.adjustImgProfile();
        }
        if (status === 'INVALID' && this.imageControl.hasError('incorrect')) {
          this.compressingImage = true;
          this.imageCompress.setDefaults(
            (this.maxSizeInKB / 1000000) * 1024 * 1024
          );
          const fileCompress = await lastValueFrom(
            this.imageCompress.compress(this.imageControl.value).pipe(take(1))
          );
          this.imageControl.setValue(fileCompress);
        }
      }
    );
  }

  /**
   * Función para mostrar el modal de ajuste de aspect ratio de la firma.
   */
  async adjustImgProfile() {
    this.subcriptionStatuschangesAfterSetImage?.unsubscribe();
    this.crudService
      .show({
        title: this.translate.stream('COMMON_LABELS.ADJUST_IMG'),
        component: AdjustImgComponent,
        dataComponent: {
          viewMode: true,
          image: await this.fileToBase64Pipe.transform(this.imageControl.value),
          aspectRadioToAdjust: this.aspectRadioAllowed,
          description: this.translate.stream(
            'COMMON_LABELS.DESCRIPTION_PROFILE_IMAGE_ADJUST'
          ),
        },
        maxWidth: '500px',
        actions: {
          otherButtons: [
            {
              nombre: this.translate.stream('BUTTONS_NAMES.ADJUST'),
              action: (data: MatDialogRef<any>) => {
                this.actionOnAdjustImage(data);
              },
              type: 'primary',
            },
          ],
        },
      })
      .subscribe();
  }

  /**
   * Función al hacer click en el botón de ajustar imagen.
   *
   * @param data - Referencia al modal de ajuste de aspect ratio.
   */
  actionOnAdjustImage(data: MatDialogRef<any>) {
    const newImage = data.componentInstance.form.controls.newImage.value;
    const file = urlToFileSync(newImage, this.imageControl.value.name);
    this.imageControl.setValue(file);
    this.crudService.close(data);
    this.subcriptionStatuschangesAfterSetImage = this.imageControl.statusChanges
      .pipe(
        filter((value) => value === 'VALID'),
        take(1)
      )
      .subscribe(() => {
        this.nextValueImage = newImage;
        this.cargarImagenServidor();
      });
  }

  /**
   * Al inicializar el componente.
   */
  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((paramsMap: Params) => {
      if (paramsMap && paramsMap.params) {
        if (paramsMap.params.idPersona) {
          this.idPersonaParentValue = paramsMap.params.idPersona;
          this.onPersonaParentChange();
          if (paramsMap.params.edit) {
            this.editMode = true;
            this.viewMode = false;
          } else {
            // View
            this.editMode = false;
            this.viewMode = true;
          }
          this.insertMode = false;
        }
      }
    });
    this.imgUsr.getb64Img().subscribe((img) => {
      this.urlImage = this.sanitization.bypassSecurityTrustUrl(img);
    });
    this.listenIdPersonaChangesInternalForms();
    this.store
      .select('parametros')
      .pipe(take(1))
      .subscribe((parametros) => {
        const aspectRadio = parametros
          ? parametros['RELACION_ASPECTO_IMAGEN_PERFIL']
          : this.aspectRadioAllowed;
        this.aspectRadioAllowed = aspectRadio;
        this.imageControl = new UntypedFormControl(null, {
          validators: [ValidatorsUIS.maxFileSize(this.maxSizeInKB)],
          asyncValidators: [validateAspectRadioImage(aspectRadio, 0.1, true)],
        });
        this.listenChangesErrorsInputSignature();
      });
  }

  /**
   * Al escuchar cambios en el detector cambio el id persona y recargo la imagen.
   */
  listenIdPersonaChangesInternalForms() {
    this.idPersonaEventChangeDetector?.subscribe((idPersona) => {
      if (idPersona) {
        this.idPersonaParentValue = idPersona;
        this.onPersonaParentChange();
      }
    });
  }

  /**
   * Función para obtener la foto del usuario dado su id.
   *
   * @param idFotoUsuario
   */
  getFotoUsr(idFotoUsuario: number) {
    if (idFotoUsuario === null || idFotoUsuario === undefined) {
      this.imgUsr.next('assets/hojadevida/images/avatar.png');
      this.imagenError.emit(true);
      return;
    }
    this.downloadAdjunto.downloadFile(idFotoUsuario).subscribe({
      next: async (res: Blob) => {
        const b64 = await this.blobToBase64(res);
        this.imagenError.emit(false);
        this.imgUsr.next(b64);
      },
      error: (err) => {
        this.imgUsr.next('assets/hojadevida/images/avatar.png');
        console.error(err);
        this.imagenError.emit(true);
      },
    });
  }

  /**
   * Función para obtener la foto del usuario dado su id.
   *
   * @param idFotoUsuario
   */
  getFotoUsrMinterior(idFotoUsuario: number) {
    if (idFotoUsuario === null || idFotoUsuario === undefined) {
      this.imgUsr.next('assets/hojadevida/images/avatar.png');
      this.imagenError.emit(true);
      return;
    }
    this.downloadAdjunto.downloadFileMinterior(idFotoUsuario).subscribe({
      next: async (res: Blob) => {
        const b64 = await this.blobToBase64(res);
        this.imagenError.emit(false);
        this.imgUsr.next(b64);
      },
      error: (err) => {
        this.imgUsr.next('assets/hojadevida/images/avatar.png');
        console.error(err);
        this.imagenError.emit(true);
      },
    });
  }

  /**
   * Función para convertir un blob a base64.
   *
   * @param blob - Blob de la imagen.
   * @returns - Base64 de la imagen.
   */
  blobToBase64(blob: Blob) {
    return new Promise<string>((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  }

  /**
   * Función para cargar la imagen del usuario.
   *
   * @param ev - Evento de cambio de imagen en el input.
   */
  getImage(ev) {
    if (
      ev.target.files &&
      this.accept.includes(ev.target.files[0].type) &&
      (this.insertMode || this.editMode)
    ) {
      this.imageControl.setValue(ev.target.files[0]);
      const reader = new FileReader();
      reader.onload = (e) => {
        this.nextValueImage = e.target.result as string;
        setTimeout(() => {
          this.cargarImagenServidor();
        }, 0);
      };
      reader.readAsDataURL(ev.target.files[0]);
    } else {
      this.imgUsr.next('assets/hojadevida/images/avatar.png');
      this.imageControl.setValue(null);
      this.snackbar.show({
        tipo: 'error',
        mensaje: `${this.translate.instant(
          'MODULES.HOJA_DE_VIDA.GESTIONAR_HV.DATOS_PERSONALES.ON_ERROR_SELECT_IMG'
        )} (${
          this.accept
            ?.split(',')
            ?.map((el) => el.split('/')[1])
            ?.join(', ') ?? ''
        })`,
      });
    }
    this.imagenChange.emit(this.imageControl.value);
    this.imageControl.markAsTouched();
  }

  /**
   * @Override
   *
   * Función para cargar la imagen del usuario en el servidor.
   */
  cargarImagenServidor() {}

  /**
   * @Override
   *
   * Función para saber si estoy en modo autoservicio.
   */
  async inAutoservicioMode(): Promise<any> {}

  /**
   * @Override
   *
   * Funcion que se ejecuta cuando el id de la persona cambia.
   */
  onPersonaParentChange() {}

  /**
   * Función para mostrar errores provenientes de back.
   *
   * @param result
   */
  throwBackError(result: HttpErrorResponse): void {
    const error = result.error as BackendError;
    this.snackbar.show({
      mensaje: error?.message
        ? error.message
        : this.translate.instant('CRUD_MESSAGES.ON_ERROR_UNKNOWN'),
      tipo: 'error',
    });
  }
}
