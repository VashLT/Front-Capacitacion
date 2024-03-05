import { urlToFileSync } from "./../../../shared/utils/url-to-file";
import { DominioCorreoInstitucionalService } from "../../../shared/services/dominio-correo-institucional/dominio-correo-institucional.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { TranslateService } from "@ngx-translate/core";
import { Component, Inject, OnInit, OnDestroy, ViewChild } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { LayoutState } from "../../../store/layout-store.model";
import { UserService } from "./services/user.service";
import {
  BehaviorSubject,
  combineLatest,
  filter,
  Subscription,
  take,
  tap,
} from "rxjs";
import { FileToBase64Pipe } from "../../../shared/pipes/file-to-base-64.pipe";
import { validatorMaxFileSizeB64 } from "../../../shared/validators/validators-size-b64";
import { validatorFileTypeB64 } from "../../../shared/validators/validator-file-type-b64";
import { validateAspectRadioImage } from "../../../shared/validators/aspect-radio-image";
import { FileChooserComponent } from "@uis/uis-lib/components/file-chooser";
import { CrudService } from "@uis/uis-lib/services/crud";
import { AdjustImgComponent } from "@uis/uis-lib/components/adjust-img";
import { ImageService } from "../edit-image/services/image.service";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.scss"],
  providers: [
    FileToBase64Pipe,
    UserService,
    DominioCorreoInstitucionalService,
    ImageService,
  ],
})
export class EditProfileComponent implements OnInit, OnDestroy {
  /**
   * Referencia al input de file.
   */
  @ViewChild("fileInput", { static: false }) fileInput: FileChooserComponent;
  edit: boolean = false;
  editImage = true;
  userName: string;
  userImage: string;
  idUser: number;
  userPerson$: BehaviorSubject<any>;
  idPerson: number;

  personDataSub: Subscription;
  userDataSub: Subscription;

  form: UntypedFormGroup;
  maxCharTextField = 25;
  maxCharEmailField = 50;
  maxCharDocumentNumber = 20;
  emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  /**
   * Observable que indica si la persona puede o no subir su firma.
   */
  canUploadSignature = this.userService.havePermissionsToUploadSignature();

  /**
   * Tipos de archivos permitidos para la firma.
   */
  acceptInSignature = "image/jpg,image/jpeg,image/png";

  /**
   * Relación de aspecto de imágenes permitidas en la firma.
   */
  aspectRadioAllowed = "7:3";

  /**
   * Valor que tiene la firma al abrir el modal.
   */
  firstValueOfSignature;

  /**
   * Si el usuario logueado tiene email institucional.
   */
  haveEmailCorp = false;

  /**
   * Lista de dominios de correo institucional.
   */
  dominiosCorreoInstitucional =
    this.dominioCorreoInstitucionalService.getDominiosCorreoInstitucionalVigentes();

  /**
   * Subscripción a los cambios de la store.
   */
  subscriptionStore: Subscription;

  /**
   * Variable que indica si el usuario logueado es aspirante.
   */
  isNotAspirante = false;

  /**
   * Subcripción a los cambios del estado del control.
   */
  subscriptionStatusChanges: Subscription;

  /**
   * Constructor del componente.
   *
   * @param data - Data del modal.
   * @param formBuilder - Constructor de formularios.
   * @param crudService - Servicio de crud.
   * @param userService - Servicio de usuario.
   * @param store - Store del layout.
   * @param fileToBase64Pipe - Pipe para convertir archivos a base64.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: UntypedFormBuilder,
    private crudService: CrudService,
    private userService: UserService,
    private store: Store<LayoutState>,
    private fileToBase64Pipe: FileToBase64Pipe,
    private dominioCorreoInstitucionalService: DominioCorreoInstitucionalService,
    private translate: TranslateService,
    private jwtHelper: JwtHelperService
  ) {}

  /**
   * Contruye el formulario.
   */
  buildForm(callback?: () => void) {
    this.form = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.pattern("^[A-Ź]+")]],
      secondName: ["", [Validators.pattern("^[A-Ź]+(s+[A-Ź]+)*$")]],
      firstSurname: ["", [Validators.required, Validators.pattern("[A-Ź]+")]],
      secondSurname: ["", [Validators.pattern("^[A-Ź]+(s+[A-Ź]+)*$")]],
      email: ["", [Validators.email]],
      emailInstitucional: ["", [Validators.email]],
      dominioCorreoInstitucional: [""],
      loginEmailInstitucional: [""],
      userImage: [null],
      firmaB64: [
        null,
        [validatorFileTypeB64(this.acceptInSignature.split(","))],
        [validatorMaxFileSizeB64(10000000)],
      ],
    });
    if (callback) {
      callback();
    }
    this.store
      .select("parametros")
      .pipe(take(1))
      .subscribe((parametros) => {
        const parametro = parametros
          ? parametros["RELACION_ASPECTO_FIRMA_JEFE"]
          : "7:3";
        this.aspectRadioAllowed = parametro;
        this.form.controls.firmaB64.addAsyncValidators([
          validateAspectRadioImage(this.aspectRadioAllowed, 0.1),
        ]);
        this.form.controls.firmaB64.updateValueAndValidity();
      });
  }

  /**
   * Función para mostrar el modal de ajuste de aspect ratio de la firma.
   */
  adjustImgFirma() {
    this.crudService
      .show({
        title: this.translate.stream(
          "GENERAL_PAGES_FROM_LAYOUT.TOP_NAV_BAR_MESSAGES.EDIT_PROFILE.ADJUST_SIGNATURE.TITLE"
        ),
        component: AdjustImgComponent,
        dataComponent: {
          viewMode: true,
          image: this.form.controls.firmaB64.value,
          aspectRadioToAdjust: this.aspectRadioAllowed,
          description: this.translate.stream(
            "GENERAL_PAGES_FROM_LAYOUT.TOP_NAV_BAR_MESSAGES.EDIT_PROFILE.ADJUST_SIGNATURE.DESCRIPTION"
          ),
        },
        hideCloseButtonInTopBar: true,
        maxWidth: "500px",
        actions: {
          otherButtons: [
            {
              nombre: this.translate.stream("BUTTONS_NAMES.ADJUST"),
              action: (data: MatDialogRef<any>) => {
                const newImage =
                  data.componentInstance.form.controls.newImage.value;
                const file = urlToFileSync(
                  newImage,
                  this.fileInput.archivos[0].name
                );
                this.fileInput.archivos = [file];
                if (this.fileInput.ref) {
                  this.fileInput.ref.nativeElement.value = "";
                }
                this.fileInput.files.emit(file);
                this.crudService.close(data);
              },
              type: "primary",
            },
          ],
        },
      })
      .subscribe();
  }

  /**
   * Función escucha cambios en el archivo de firma seleccionado y
   * en caso de este tener error de relación de aspecto, muestra el modal.
   */
  listenChangesErrorsInputSignature() {
    this.subscriptionStatusChanges =
      this.form.controls.firmaB64.statusChanges.subscribe((status) => {
        let refAdjustOpened = false;
        this.crudService.referencias.forEach((ref) => {
          refAdjustOpened =
            ref.componentInstance?.componentRef?.componentType instanceof
            AdjustImgComponent;
        });

        if (
          status === "INVALID" &&
          this.form.controls.firmaB64.hasError("aspectRadio") &&
          this.form.controls.firmaB64.touched &&
          !refAdjustOpened //Si solo tengo abierto el modal de editar perfil.
        ) {
          this.adjustImgFirma();
        }
      });
  }

  /**
   * Inicializa el componente.
   */
  ngOnInit(): void {
    this.buildForm(() => {
      try {
        this.isNotAspirante = this.jwtHelper.decodeToken(
          localStorage.getItem("authToken")
        )?.FLAG;
      } catch (error) {
        this.isNotAspirante = true;
      }

      /**
       * toma los cambios al store de 'user' y 'person' en simultaneo
       */
      this.subscriptionStore = combineLatest([
        this.store.select("user"),
        this.store.select("person"),
      ])
        .pipe(
          /**
           * Asigna el nombre de usuario y el id
           */
          tap(([userData, _]) => {
            if (userData) {
              this.userName = userData.NOMBRE_USUARIO;
              this.idUser = userData.ID;
            }
          }),
          /**
           * No permite continuar hasta que el store de 'person' tenga un valor
           */
          filter(([_, personData]) => Boolean(personData))
        )
        .subscribe(() => {
          this.userService
            .getPersonByUserId(this.data?.idUser)
            .subscribe((persona) => {
              this.idPerson = persona.id;
              this.form.controls.firstName.setValue(persona.primerNombre);
              this.form.controls.secondName.setValue(
                persona?.segundoNombre?.trim()
              );
              this.form.controls.firstSurname.setValue(persona.primerApellido);
              this.form.controls.secondSurname.setValue(
                persona?.segundoApellido?.trim()
              );
              this.form.controls.email.setValue(persona.correoPersonal);
              this.form.controls.emailInstitucional.setValue(
                persona.correoInstitucional
              );

              if (this.form.controls.emailInstitucional.value) {
                const [login, domain] =
                  this.form.controls.emailInstitucional.value.split("@");
                this.form.controls.loginEmailInstitucional.setValue(login);
                this.form.controls.dominioCorreoInstitucional.setValue(domain);
              }
              this.form.controls.firmaB64.setValue(persona.firmaB64);
              this.ignoreSpaces();
              this.firstValueOfSignature = this.form.controls.firmaB64.value;
            });
        });

      this.setValueEmailCorp();
      this.listenChangesErrorsInputSignature();
    });
  }

  /**
   * Función para cambiar el valor del control de email institucional.
   */
  setValueEmailCorp() {
    const listeners = [
      this.form.controls.dominioCorreoInstitucional.valueChanges,
      this.form.controls.loginEmailInstitucional.valueChanges,
    ];
    combineLatest(listeners).subscribe(([dominio, login]) => {
      if (dominio && login) {
        this.form.controls.emailInstitucional.setValue(login + "@" + dominio);
      } else {
        this.form.controls.emailInstitucional.setValue("");
      }
      let currentErrorsDomain =
        this.form.controls.loginEmailInstitucional.errors || {};
      if (!dominio || this.form.controls.emailInstitucional.invalid) {
        currentErrorsDomain.requiredDomain = true;
        this.form.controls.loginEmailInstitucional.setErrors(
          currentErrorsDomain
        );
      } else {
        delete currentErrorsDomain.requiredDomain;
        currentErrorsDomain = Object.keys(currentErrorsDomain).length
          ? currentErrorsDomain
          : null;
        this.form.controls.loginEmailInstitucional.setErrors(
          currentErrorsDomain
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptionStore?.unsubscribe();
    this.personDataSub?.unsubscribe();
    this.subscriptionStatusChanges?.unsubscribe();
  }

  checkNameField(controlName: string) {
    if (!(controlName in this.form.controls)) {
      return;
    }
    //convierte cada input a mayuscula
    this.form
      .get(controlName)
      .setValue(this.form.get(controlName).value.toUpperCase());
    //validar espacio final e inicial en adicionales

    //validar que sean letras
    if (
      !/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1])+$/.test(
        this.form.controls[controlName].value
      ) &&
      !(this.form.controls[controlName].value == "")
    ) {
      this.form.controls[controlName].setErrors({ spaces: true });
      this.form.updateValueAndValidity();
      this.form.controls[controlName].markAsTouched();
    }
    /*comprobar si el primer nombre contiene espacios */
    if (/\s/.test(this.form.controls.firstName.value)) {
      this.form.controls.firstName.setErrors({ spaces: true });
      this.form.updateValueAndValidity();
      this.form.controls.firstName.markAsTouched();
    }

    /*comprobar si el primer apellido contiene espacios */
    if (/\s/.test(this.form.controls.firstSurname.value)) {
      this.form.controls.firstSurname.setErrors({ spaces: true });
      this.form.updateValueAndValidity();
      this.form.controls.firstSurname.markAsTouched();
    }

    if (this.form.controls[controlName].value.length > this.maxCharTextField) {
      if (!this.form.controls[controlName].hasError("maxLength")) {
        this.form.controls[controlName].setErrors({ maxLength: true });
        this.form.updateValueAndValidity();
        this.form.controls[controlName].markAsTouched();
      }
    } else if (this.form.controls[controlName].hasError("maxLength")) {
      delete this.form.controls[controlName].errors["maxLength"];
      this.form.updateValueAndValidity();
      this.form.controls[controlName].markAsTouched();
    }
  }

  checkEmailField() {
    let shouldUpdate = false;
    const input = this.form.value.email;

    /**
     * valida el regex para el correo electronico
     */
    if (!this.emailRegex.test(input)) {
      if (!this.form.controls.email.hasError("pattern")) {
        this.form.controls.email.setErrors({
          ...this.form.controls.email.errors,
          pattern: true,
        });
        shouldUpdate = true;
      }
    } else if (this.form.controls.email.hasError("pattern")) {
      delete this.form.controls.email.errors["pattern"];
      shouldUpdate = true;
    }

    /**
     * valida la cantidad de caracteres
     */
    if (input.length > this.maxCharEmailField) {
      if (!this.form.controls.email.hasError("maxLength")) {
        this.form.controls.email.setErrors({
          ...this.form.controls.email.errors,
          maxLength: true,
        });
        shouldUpdate = true;
      }
    } else if (this.form.controls.email.hasError("maxLength")) {
      delete this.form.controls.email.errors["maxLength"];
      shouldUpdate = true;
    }

    /**
     * actualiza el formulario si es necesario
     */
    if (shouldUpdate) {
      this.form.updateValueAndValidity();
      this.form.controls.email.markAsTouched();
    }
  }

  ignoreSpaces() {
    this.form.controls.firstName.valueChanges.subscribe((value) => {
      let caracter = value as string | any;
      if (caracter.includes(" ")) {
        caracter = caracter.split(" ");
        caracter = caracter.join("");
        this.form.controls.firstName.setValue(caracter);
      }
      if (this.form.controls.firstName.invalid) {
        this.form.markAllAsTouched();
      }
    });

    this.form.controls.secondName.valueChanges.subscribe(() => {
      if (this.form.controls.secondName.invalid) {
        this.form.markAllAsTouched();
      }
    });

    this.form.controls.firstSurname.valueChanges.subscribe((value) => {
      let caracter = value as string | any;
      if (caracter.includes(" ")) {
        caracter = caracter.split(" ");
        caracter = caracter.join("");
        this.form.controls.firstName.setValue(caracter);
      }
      if (this.form.controls.firstSurname.invalid) {
        this.form.markAllAsTouched();
      }
    });

    this.form.controls.secondSurname.valueChanges.subscribe(() => {
      if (this.form.controls.secondSurname.invalid) {
        this.form.markAllAsTouched();
      }
    });
  }

  updateImage(imageData: { blob: string; file: File }) {
    this.form.controls.userImage.setValue(imageData);
  }

  limpiarFormulario(): void {
    this.crudService.referencias.forEach((referencia) => {
      this.crudService.close(referencia);
    });
  }

  /**
   * Función para cambiar el valor de firma cuando cambia el valor del file.
   *
   * @param $event - Evento de cambio de archivo.
   */
  setValueSign($event: File) {
    this.fileToBase64Pipe.transform($event).then((base64) => {
      this.form.controls.firmaB64.setValue(base64);
      this.form.controls.firmaB64.markAsTouched();
    });
  }

  test() {
    console.log({
      form: this.form,
    });
  }
}
