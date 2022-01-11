import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Configuracion } from 'src/app/interfaces/configuracion';
import { GrupoObjetos } from 'src/app/interfaces/grupoobjetos';
import { Objeto } from 'src/app/interfaces/objeto';
import { Ubicacion } from 'src/app/interfaces/ubicacion';
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

  //Elements for object modal
  codigo = new FormControl("");
  fechaAdquisicion = new FormControl("");
  etiqueta = new FormControl("");
  departamento = new FormControl(0);
  mejoras = new FormControl("");
  observaciones = new FormControl("");
  location_id?: { location: Ubicacion; tipo: Number; };
  errorModificationObject = "";
  successModificationObject = "";

  constructor(private route: ActivatedRoute, private objectS: ObjectsService, private groupOfObjectS: GroupOfObjectsService, private configsS: ConfigurationsService, private modalService: NgbModal) {
    this.idObjeto = route.snapshot.params['id'];

    this.cargarObjeto();
  }

  cargarObjeto() {
    this.objectS.getObject(this.idObjeto).subscribe(
      (res: any) => {
        if (res.data) {
          this.objeto = res.data[0];
          this.groupOfObjectS.getGroupOfObject(this.objeto!.GrupoObjetos_idGrupoObjetos).subscribe(
            (res: any) => {
              if (res.data) {
                this.grupoObjeto = res.data[0];
              }
            }
          );
          this.codigo.setValue(this.objeto!.codigo);
          this.fechaAdquisicion.setValue(this.objeto!.fechaAdquisicion);
          this.etiqueta.setValue(this.objeto!.etiqueta);
          this.departamento.setValue(this.objeto!.organizativa);
          this.mejoras.setValue(this.objeto!.mejorasEquipo);
          this.observaciones.setValue(this.objeto!.observaciones);
          this.location_id = { location: { edificio: this.objeto!.edificio, idUbicacion: this.objeto!.Ubicacion_idUbicacion, planta: this.objeto!.planta, ubicacion: this.objeto!.ubicacion }, tipo: 0 };
          this.errorModificationObject = "";
          this.successModificationObject = "";

          this.cargarConfiguracion();
        }
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
    if (this.fechaAdquisicion.value == '') {
      this.errorModificationObject = "Debe añadir una fecha válida al objeto"
    }
    let formData = new FormData();
    formData.append("codigo", this.codigo.value);
    formData.append("fechaAdquisicion", this.fechaAdquisicion.value);
    formData.append("etiqueta", this.etiqueta.value);
    formData.append("organizativa", this.departamento.value);
    formData.append("mejorasEquipo", this.mejoras.value);
    formData.append("observaciones", this.observaciones.value);
    formData.append("Ubicacion_idUbicacion", String(this.location_id!.location.idUbicacion));

    this.objectS.updateObject(this.idObjeto, formData).subscribe(
      (res: any) => {
        if (res.message) {
          this.errorModificationObject = "";
          this.successModificationObject = res.message;
          this.cargarObjeto();
          setTimeout(() => { this.cerrarModal() }, 2000)
        }
      }
    )
  }

  getSentLocation(location_selected: number) {
    this.location_id!.location.idUbicacion = location_selected;
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


