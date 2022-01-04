import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Configuracion } from 'src/app/interfaces/configuracion';
import { GrupoObjetos } from 'src/app/interfaces/grupoobjetos';
import { Objeto } from 'src/app/interfaces/objeto';
import { ConfigurationsService } from 'src/app/services/configurations.service';
import { GroupOfObjectsService } from 'src/app/services/group-of-objects.service';
import { ObjectsService } from 'src/app/services/objects.service';

@Component({
  selector: 'app-object-unit',
  templateUrl: './object-unit.component.html',
  styleUrls: ['./object-unit.component.css']
})
export class ObjectUnitComponent implements OnInit {

  idObjeto: any;
  objeto?: Objeto;
  grupoObjeto?: GrupoObjetos;
  configuracion?: Configuracion;

  //Elements for configuration modal
  ip = new FormControl("");
  mac = new FormControl("");
  boca = new FormControl("");
  armario = new FormControl("");
  usuario = new FormControl("");
  contrasena = new FormControl("");

  constructor(private route: ActivatedRoute, private objectS: ObjectsService, private groupOfObjectS: GroupOfObjectsService, private configsS: ConfigurationsService, private modalService: NgbModal) {
    this.idObjeto = route.snapshot.params['id'];
    this.objectS.getObject(this.idObjeto).subscribe(
      (res: any) => {
        this.objeto = res.data[0];
        this.groupOfObjectS.getGroupOfObject(this.objeto!.GrupoObjetos_idGrupoObjetos).subscribe(
          (res: any) => {
            this.grupoObjeto = res.data[0];
          }
        );
        this.cargarConfiguracion();
      }
    )
  }

  cargarConfiguracion() {
    this.configsS.getConfiguration(this.idObjeto).subscribe(
      (res: any) => {
        this.configuracion = res.data[0];
        this.ip.setValue(this.configuracion!.ip);
        this.mac.setValue(this.configuracion!.mac);
        this.boca.setValue(this.configuracion!.boca);
        this.armario.setValue(this.configuracion!.armario);
        this.usuario.setValue(this.configuracion!.usuario);
        this.contrasena.setValue(this.configuracion!.contrasena);
      }
    );
    this.cerrarModal();
  }

  crearConfiguracion() {
    if (this.ip.value == "" && this.mac.value == "" && this.boca.value == "" && this.armario.value == "" && this.usuario.value == "" && this.contrasena.value == "") return;
    let formData = new FormData();
    formData.append("ip", this.ip.value);
    formData.append("mac", this.mac.value);
    formData.append("boca", this.boca.value);
    formData.append("armario", this.armario.value);
    formData.append("usuario", this.usuario.value);
    formData.append("contrasena", this.contrasena.value);
    formData.append("Objeto_idObjeto", this.idObjeto);

    this.configsS.addConfiguration(formData).subscribe(
      (res: any) => {
        this.cargarConfiguracion();
      }
    );
  }

  modificarConfiguracion() {
    if (this.ip.value == this.configuracion!.ip && this.mac.value == this.configuracion!.mac && this.boca.value == this.configuracion!.boca && this.armario.value == this.configuracion!.armario && this.usuario.value == this.configuracion!.usuario && this.contrasena.value == this.configuracion!.contrasena) return;
    let formData = new FormData();
    formData.append("ip", this.ip.value);
    formData.append("mac", this.mac.value);
    formData.append("boca", this.boca.value);
    formData.append("armario", this.armario.value);
    formData.append("usuario", this.usuario.value);
    formData.append("contrasena", this.contrasena.value);
    formData.append("Objeto_idObjeto", this.idObjeto);

    this.configsS.updateConfiguration(formData, this.configuracion!.idConfiguracion!).subscribe(
      (res: any) => {
        this.cargarConfiguracion();
      }
    );
  }

  borrarConfiguracion() {
    this.configsS.deleteConfiguration(this.configuracion!.idConfiguracion!).subscribe(
      (res: any) => {
        this.cargarConfiguracion();
      }
    );
    this.ip = new FormControl("");
    this.mac = new FormControl("");
    this.boca = new FormControl("");
    this.armario = new FormControl("");
    this.usuario = new FormControl("");
    this.contrasena = new FormControl("");
  }

  modificarObjeto() {

  }

  borrarObjeto() {

  }

  ngOnInit(): void {
  }

  //Modal behaviour

  abrirModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static' });
  }

  cerrarModal() {
    this.modalService.dismissAll();
  }
}


