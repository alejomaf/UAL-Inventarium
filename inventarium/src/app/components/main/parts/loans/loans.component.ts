import { Component, OnInit } from '@angular/core';
import { FormControl, RequiredValidator, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GrupoObjetos } from 'src/app/interfaces/grupoobjetos';
import { Objeto } from 'src/app/interfaces/objeto';
import { Prestado } from 'src/app/interfaces/prestado';
import { Usuario } from 'src/app/interfaces/usuario';
import { GroupOfObjectsService } from 'src/app/services/group-of-objects.service';
import { LoansService } from 'src/app/services/loans.service';
import { ObjectsService } from 'src/app/services/objects.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {

  idObjeto: any;
  objeto?: Objeto;
  grupoObjeto?: GrupoObjetos;
  prestamos: Prestado[] = [];

  tipoSolicitud = 0;
  activas = false;
  pendientes = false;
  pasadas = false;
  rechazadas = false;
  solicitudes_activas = true;

  usuario?: Usuario

  //Formulario de creacion de préstamo
  retiradoPor = new FormControl("");
  fechaEstimadaEntrega = new FormControl("", [
    Validators.required
  ]);

  constructor(private route: ActivatedRoute, private objectS: ObjectsService, private groupOfObjectS: GroupOfObjectsService, private modalService: NgbModal, private loansS: LoansService, private userS: UserService) {
    this.userS.getUser().subscribe(
      (res: any) => {
        this.usuario = res;
      }
    )
    this.idObjeto = route.snapshot.params['id'];
    this.objectS.getObject(this.idObjeto).subscribe(
      (res: any) => {
        this.objeto = res.data[0];
        this.groupOfObjectS.getGroupOfObject(this.objeto!.GrupoObjetos_idGrupoObjetos).subscribe(
          (res: any) => {
            this.grupoObjeto = res.data[0];
          }
        )
      }
    );
    this.cargarPrestamos();
  }

  ngOnInit(): void {
  }


  cargarPrestamos() {
    this.loansS.getLoans(this.idObjeto).subscribe(
      (res: any) => {
        this.prestamos = res.data;
        this.procesarPrestamos();
      }
    )
  }

  procesarPrestamos() {
    for (let i = 0; i < this.prestamos.length; i++) {
      if (this.prestamos[i].estado == 1) {
        this.activas = true;
        continue;
      }
      if (this.prestamos[i].estado == 0) {
        this.pendientes = true;
        continue;
      }
      if (this.prestamos[i].estado == -1) {
        this.pasadas = true;
        continue;
      }
      if (this.prestamos[i].estado == -2) {
        this.rechazadas = true;
        continue;
      }
    }
    if (this.activas == false && this.pendientes == true) this.tipoSolicitud = 0;

    this.tieneSolicitudesActivas();
  }

  //Préstamo se inicializa en el estado 0
  crearPrestamo() {
    if (!this.fechaEstimadaEntrega.valid) return;
    if (this.retiradoPor.value === "") return;

    let formData = new FormData();
    formData.append("fechaEstimadaEntrega", this.fechaEstimadaEntrega.value);
    formData.append("retiradoPor", this.retiradoPor.value);
    formData.append("Objeto_idObjeto", this.idObjeto);

    this.loansS.addLoan(formData).subscribe(
      (res: any) => {
        console.log(res);
        this.cerrarModal();
        this.cargarPrestamos();
      }
    )
  }

  tieneSolicitudesActivas() {
    if (!this.pendientes) return;
    for (let i = 0; i < this.prestamos.length; i++) {
      if (this.prestamos[i].Usuario_idUsuario == this.usuario!.idUsuario && this.prestamos[i].estado == 0) {
        this.solicitudes_activas = false;
        return;
      }
    }
    this.solicitudes_activas = true;
  }

  //Modal behaviour

  abrirModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static' });
  }

  cerrarModal() {
    this.modalService.dismissAll();
  }

}
