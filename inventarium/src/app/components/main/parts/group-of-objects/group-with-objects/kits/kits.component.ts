import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ObjetoKit } from 'src/app/interfaces/objetokit';
import { KitObjectsService } from 'src/app/services/kit-objects.service';

@Component({
  selector: 'app-kits',
  templateUrl: './kits.component.html',
  styleUrls: ['./kits.component.css']
})
export class KitsComponent implements OnInit {

  idGrupoObjeto!: any;
  object_kits: ObjetoKit[] = []
  photo_selected = false
  imgURL: any

  //Campos del formulario
  fileToUpload: any
  nombre = new FormControl("")
  cantidad = new FormControl(1)
  observaciones = new FormControl("");

  constructor(private modalService: NgbModal, private route: ActivatedRoute, private kitobjectsS: KitObjectsService, private router: Router) {
    this.idGrupoObjeto = router.url.split("/")[router.url.split("/").length - 2];
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
        this.cargarKits();
      }
    )
  }

  modificarObjetoKit() {

  }

  eliminarObjetoKit(idKitObject: number) {
    this.kitobjectsS.deleteKitObject(idKitObject).subscribe(
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
}
