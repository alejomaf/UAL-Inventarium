import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ObjetoKit } from 'src/app/interfaces/objetokit';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { KitObjectsService } from 'src/app/services/kit-objects.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-kits',
  templateUrl: './kits.component.html',
  styleUrls: ['./kits.component.css']
})
export class KitsComponent implements OnInit {

  usuario?: Usuario
  idGrupoObjeto!: any;
  object_kits: ObjetoKit[] = []
  photo_selected = false
  imgURL: any
  isCreacion = false;
  selected_kit?: ObjetoKit
  successKit = ""
  errorKit = ""
  weblink = environment.webUrl;

  //Campos del formulario
  fileToUpload: any
  nombre = new FormControl("")
  cantidad = new FormControl(1)
  observaciones = new FormControl("");

  constructor(private modalService: NgbModal, private route: ActivatedRoute, private kitobjectsS: KitObjectsService, private router: Router, private authS: AuthGuardService) {
    this.idGrupoObjeto = router.url.split("/")[router.url.split("/").length - 2];
    this.usuario = authS.getCurrentUser();
    this.cargarKits();
  }

  ngOnInit(): void {
  }

  cargarKits() {
    this.kitobjectsS.getKitObject(Number(this.idGrupoObjeto)).subscribe(
      (res: any) => {
        this.object_kits = res.data
      }
    )
  }

  //We enable the creation button
  handleFileInput(event: any) {
    try {
      this.fileToUpload = event.target.files[0]
      var mimeType = this.fileToUpload.type;

      if (mimeType.match(/image\/*/) == null) {
        this.photo_selected = false
        this.imgURL = null
        return;
      }

      var reader = new FileReader();
      reader.readAsDataURL(this.fileToUpload);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }

      this.photo_selected = true

    } catch {
      this.photo_selected = false
      this.imgURL = null
    }
  }

  crearObjetoKit() {
    if (this.nombre.value == "" || this.cantidad.value < 1) return;

    let formData = new FormData();
    formData.append("image", this.fileToUpload);
    formData.append("nombre", this.nombre.value);
    formData.append("cantidad", this.cantidad.value);
    formData.append("observaciones", this.observaciones.value);
    formData.append("GrupoObjetos_idGrupoObjetos", String(this.idGrupoObjeto));

    this.kitobjectsS.addKitObject(formData).subscribe(
      (res: any) => {
        if (res.message) {
          this.successKit = res.message;
          this.cargarKits();
          setTimeout(() => { this.cerrarModal() }, 2000);
          return;
        }
        this.errorKit = "Error al crear el Kit";
      }
    )
  }

  modificarObjetoKit() {
    if (this.nombre.value == "" || this.cantidad.value < 1) return;

    let formData = new FormData();
    formData.append("nombre", this.nombre.value);
    formData.append("cantidad", this.cantidad.value);
    formData.append("observaciones", this.observaciones.value);
    if (this.fileToUpload != "") formData.append("image", this.fileToUpload);

    this.kitobjectsS.updateKitObject(formData, this.selected_kit!.idObjetoKit).subscribe(
      (res: any) => {
        if (res.message) {
          this.successKit = res.message;
          this.cargarKits();
          setTimeout(() => { this.cerrarModal() }, 2000);
          return;
        }
        this.errorKit = "Error al modificar el kit";
      }
    )
  }

  eliminarObjetoKit() {
    this.kitobjectsS.deleteKitObject(this.selected_kit!.idObjetoKit).subscribe(
      (res: any) => {
        this.cargarKits();
      }
    )
  }

  //Modal behaviour

  abrirModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static' });
  }

  cerrarModal() {
    this.modalService.dismissAll();
  }

  modalCrearKit(modal: any) {
    this.selected_kit = undefined;
    this.fileToUpload = ""
    this.imgURL = "";
    this.successKit = ""
    this.errorKit = ""
    this.isCreacion = true;
    this.nombre.setValue("");
    this.cantidad.setValue(1);
    this.observaciones.setValue("");
    this.abrirModal(modal);
  }

  modalModificarKit(modal: any, kit: ObjetoKit) {
    this.selected_kit = kit;
    this.fileToUpload = ""
    this.successKit = ""
    this.errorKit = ""
    this.isCreacion = false;
    this.nombre.setValue(kit.nombre);
    this.cantidad.setValue(kit.cantidad);
    this.observaciones.setValue(kit.observaciones);
    this.imgURL = this.weblink + "/images/" + kit.imagen + ".jpg"
    this.abrirModal(modal);
  }

  modalBorrarKit(modal: any, kit: ObjetoKit) {
    this.selected_kit = kit;
    this.abrirModal(modal);
  }
}
