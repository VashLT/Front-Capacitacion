import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { UserService } from "../edit-profile/services/user.service";
import { ImageService } from "./services/image.service";
import { TranslateService } from "@ngx-translate/core";
import { Persona } from "./models/persona";
import { SnackbarService } from "@uis/uis-lib/services/snackbar";
@Component({
  selector: "app-edit-image",
  templateUrl: "./edit-image.component.html",
  styleUrls: ["./edit-image.component.scss"],
  providers: [UserService],
})
export class EditImageComponent implements OnInit {
  @Input() edit: boolean;
  @Input() idUser: number;
  @Input() idPerson: number;
  /**
   * La foto puede pesar como máximo 10MB
   */
  MAX_SIZE = 10000000;
  insertMode: boolean = true;
  viewMode: boolean = true;
  editMode: boolean = true;
  persona: Persona;
  showingImage: string;
  idPersonaParentValue: number;
  image: File;
  @Output() updateImage = new EventEmitter<{ blob: string; file: File }>();

  //formato de aceptacion
  public accept = "image/png, image/gif, image/jpeg, image/jpg";
  constructor(
    private snackbar: SnackbarService,
    private userService: UserService,
    public imageService: ImageService,
    private translate: TranslateService
  ) {}
  ngOnInit(): void {
    this.showingImage = this.imageService.b64UserImage$.getValue();

    //estableciendo foto a partir de id de usuario
    this.setFoto(this.idUser);
  }

  setFoto(id: number) {
    this.userService.getPersonByUserId(id).subscribe((res) => {
      this.persona = res;
      this.getFotoUsr(res.idFotoUsuario);
    });
  }

  getFotoUsr(idFoto: number) {
    setTimeout(() => {}, 1000);
    if (idFoto === null) {
      return;
    }
    this.imageService.downloadFile(idFoto).subscribe(async (foto: Blob) => {
      this.showingImage = await this.blobToBase64(foto);
      if (this.image) {
        this.updateImage.emit({
          blob: this.showingImage,
          file: this.image,
        });
      }
    });
  }

  blobToBase64(blob: Blob) {
    return new Promise<string>((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      if (blob === null) {
        return;
      } else {
        reader.readAsDataURL(blob);
      }
    });
  }

  getImage(ev) {
    if (
      ev.target.files &&
      this.accept.includes(ev.target.files[0].type) &&
      (this.insertMode || this.editMode)
    ) {
      this.image = ev.target.files[0];

      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.total > this.MAX_SIZE) {
          this.snackbar.show({
            mensaje: this.translate.instant(
              "El tamaño del archivo supera el máximo permitido 10 MB."
            ),
            tipo: "warning",
          });
          return;
        }
        this.showingImage = e.target.result as string;
        if (this.image) {
          this.updateImage.emit({
            blob: this.showingImage,
            file: this.image,
          });
        }
      };
      reader.readAsDataURL(ev.target.files[0]);
    } else {
      this.image = null;
      this.snackbar.show({
        tipo: "error",
        mensaje: `${this.translate.instant("ha ocurrido un error")} (${
          this.accept
            ?.split(",")
            ?.map((el) => el.split("/")[1])
            ?.join(", ") ?? ""
        })`,
      });
    }
  }
}
