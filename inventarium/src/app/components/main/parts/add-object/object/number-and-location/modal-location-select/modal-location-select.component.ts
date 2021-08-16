import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faThemeisle } from '@fortawesome/free-brands-svg-icons';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { GrupoObjetos } from 'src/app/interfaces/grupoobjetos';
import { Ubicacion } from 'src/app/interfaces/ubicacion';
import { GroupOfObjectsService } from 'src/app/services/group-of-objects.service';
import { LocationsService } from 'src/app/services/locations.service';
import { StringUtils } from 'turbocommons-ts';

@Component({
  selector: 'app-modal-location-select',
  templateUrl: './modal-location-select.component.html',
  styleUrls: ['./modal-location-select.component.css']
})

export class ModalLocationSelectComponent implements OnInit {

  private routeSub!: Subscription;
  locations: Ubicacion[] = [];
  locations_search: { location: Ubicacion, tipo: Number }[] = [];
  location_selected?: {location: Ubicacion, tipo: Number};
  estado = 0;
  titulo_ubicacion = "Busca el edificio o crea uno nuevo";
  tipo_objeto!: number;
  busqueda = new FormControl("");

  constructor(private route: ActivatedRoute, private modalService: NgbModal, private locations_service: LocationsService) {
    this.routeSub = this.route.params.subscribe(params => {
      this.tipo_objeto = params['id'];
    });
    this.locations_service.getLocations().subscribe(
      (res: any) => {
        this.locations = res.data; console.log(res.data);
        this.procesarEdificios();
      }, err => console.log('Error', err));

  }

  ngOnInit(): void {
  }

  onKey(event: any) {
    this.procesarBusqueda();
  }

  seleccionarTexto(ubicacion: { location: Ubicacion, tipo: Number }) {
    switch (ubicacion.tipo) {
      case 0:
        this.procesarPlantas(ubicacion);
        break;
      case 1:
        this.location_selected = ubicacion;
        this.cerrarModal();
        break;
    }
  }

  procesarEdificios() {
    this.locations_search = [];

    for (let loc of this.locations) {
      this.locations_search.push({ "location": loc, "tipo": 0 });
    }
  }

  procesarPlantas(ubicacion :{ location: Ubicacion, tipo: Number }){
    this.locations_search = [];
    
    for (let loc of this.locations) {
      if(loc.edificio == ubicacion.location.edificio){
        this.locations_search.push({ "location":loc, "tipo": 1 });
      }
    }
  }

  procesarUbicaciones(ubicacion :{ location: Ubicacion, tipo: Number }){
    this.locations_search = [];
    
    for (let loc of this.locations) {
      if(loc.planta == ubicacion.location.planta){
        this.locations_search.push({ "location":loc, "tipo": 2 });
      }
    }
  }

  procesarBusqueda() {
    console.log(this.busqueda.value);

  }

  //Modal behaviour

  abrirModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  cerrarModal() {
    this.modalService.dismissAll();
  }



}
