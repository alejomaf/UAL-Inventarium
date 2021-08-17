import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faThemeisle } from '@fortawesome/free-brands-svg-icons';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { GrupoObjetos } from 'src/app/interfaces/grupoobjetos';
import { Ubicacion } from 'src/app/interfaces/ubicacion';
import { GroupOfObjectsService } from 'src/app/services/group-of-objects.service';
import { LocationsService } from 'src/app/services/locations.service';
import { StringUtils } from 'turbocommons-ts';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Objeto } from 'src/app/interfaces/objeto';
import { ObjectsService } from 'src/app/services/objects.service';

@Component({
  selector: 'app-modal-location-select',
  templateUrl: './modal-location-select.component.html',
  styleUrls: ['./modal-location-select.component.css']
})

export class ModalLocationSelectComponent implements OnInit {

  basura = faTrash;
  private routeSub!: Subscription;


  locations: Ubicacion[] = [];
  locations_search: { location: Ubicacion, tipo: Number }[] = [];
  location_selected?: {location: Ubicacion, tipo: Number};titulo_ubicacion = "Busca el edificio o crea uno nuevo";
  tipo_objeto!: number;
  busqueda = new FormControl("");
  estado = 0;
  
  objects_by_location: Objeto[]= [];
  location_to_delete?: Ubicacion;
  it_can_be_deleted = false;

  constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal, private locations_service: LocationsService, private objects_service: ObjectsService) {
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

  objetosPorUbicacion(){
    this.objects_by_location = [];
    this.objects_service.getObjectsByLocation(this.location_to_delete!.idUbicacion).subscribe(
      (res: any) => {
        this.objects_by_location = res.data; console.log(res.data);
        if(this.objects_by_location.length==0){
          this.it_can_be_deleted = true;
        }
      }, err => console.log('Error', err));
  }

  abrirObjetoVentana(idObjeto: number) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/object/${idObjeto}`])
    );
  
    window.open(url, '_blank');
  }

  //Modal behaviour

  abrirModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  cerrarModal() {
    this.modalService.dismissAll();
  }



}
