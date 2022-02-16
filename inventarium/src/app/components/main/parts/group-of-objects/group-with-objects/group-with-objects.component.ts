import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { GrupoObjetos } from 'src/app/interfaces/grupoobjetos';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { GroupOfObjectsService } from 'src/app/services/group-of-objects.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-group-with-objects',
  templateUrl: './group-with-objects.component.html',
  styleUrls: ['./group-with-objects.component.css']
})
export class GroupWithObjectsComponent implements OnInit {
  usuario?: Usuario
  private routeSub!: Subscription;
  public go!: GrupoObjetos;
  idGrupoObjeto!: number;
  ruta_kits = false;
  weblink = environment.webUrl;

  //Modify group of object
  photo_selected = false
  marca = new FormControl("")
  modelo = new FormControl("")
  name = new FormControl("");
  type = new FormControl(0);
  imgURL: any;
  fileToUpload: any;
  errorModification = '';
  successModification = '';

  constructor(private group_of_objects_service: GroupOfObjectsService, private route: ActivatedRoute, public router: Router, private modalService: NgbModal, private authS: AuthGuardService) {
    this.routeSub = this.route.params.subscribe(params => {
      this.idGrupoObjeto = params['id'];
    });
    this.usuario = authS.getCurrentUser();
    this.getGroupOfObject();
  }

  getGroupOfObject() {
    this.group_of_objects_service.getGroupOfObject(this.idGrupoObjeto).subscribe(
      (res: any) => {
        if (res.data) {
          this.go = res.data[0];
          this.marca.setValue(this.go.marca);
          this.modelo.setValue(this.go.modelo);
          this.name.setValue(this.go.nombre);
          this.type.setValue(this.go.tipo);
        }
        this.successModification = '';
        this.errorModification = '';
        this.imgURL = false;
        this.fileToUpload = '';
      }, err => console.log('Error', err));
  }

  modificarGrupoObjeto() {
    if (this.name.value == '') {
      this.errorModification = "Seleccione un nombre para el grupo de objetos";
      return;
    }
    let formData = new FormData();

    formData.append('nombre', this.name.value);
    formData.append('marca', this.marca.value);
    formData.append('modelo', this.modelo.value);
    formData.append('tipo', this.type.value);

    if (this.photo_selected) {
      formData.append('image', this.fileToUpload);
    }

    this.group_of_objects_service.updateGroupOfObject(this.go.idGrupoObjetos, formData).subscribe(
      (res: any) => {
        if (res.message) {
          this.errorModification = '';
          this.successModification = 'Grupo de objeto modificado correctamente';
          this.getGroupOfObject();
          setTimeout(() => { this.cerrarModal() }, 1500);
          return;
        }
        this.errorModification = 'No se ha podido modificar su grupo de objetos inténtelo otra vez ' + res.error;
        return;
      }
    )
  }

  borrarGrupoObjeto() {
    this.group_of_objects_service.deleteGroupOfObject(this.idGrupoObjeto).subscribe(
      (res: any) => {
        this.cerrarModal();
        this.router.navigateByUrl("group-of-objects");
      }
    );
  }

  ngOnInit(): void {
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

  //Modal behaviour

  abrirModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static' });
  }

  cerrarModal() {
    this.modalService.dismissAll();
  }

}
