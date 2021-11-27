import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Ubicacion } from 'src/app/interfaces/ubicacion';
import { LocationsService } from 'src/app/services/locations.service';
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

  @Output() send_location: EventEmitter<number> = new EventEmitter();

  locations: Ubicacion[] = [];
  locations_search: { location: Ubicacion, tipo: Number }[] = [];
  @Input() location_selected?: { location: Ubicacion, tipo: Number };
  titulo_ubicacion = "Busca el edificio o crea uno nuevo";
  titulo_boton = "Crea un edificio";
  create_location: Ubicacion;
  tipo_objeto!: number;
  busqueda = new FormControl("");
  estado = 0;

  objects_by_location: Objeto[] = [];
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
    this.create_location = { edificio: new Text(), planta: new Text(), idUbicacion: 0, ubicacion: new Text() }
  }

  ngOnInit(): void {
  }

  crearUbicacion() {
    this.locations_search = [];

    switch (this.estado) {
      case 0:
        this.create_location.edificio = this.busqueda.value;
        break;
      case 1:
        this.create_location.planta = this.busqueda.value;
        break;
      case 2:
        this.create_location.ubicacion = this.busqueda.value;
        this.estado = -1;
        this.locations_service.addLocation(this.create_location).subscribe(
          (res: any) => {
            this.locations_service.getLocations().subscribe(
              (res: any) => {
                this.locations = res.data; console.log(res.data);
                this.procesarEdificios();
                this.create_location = { edificio: new Text(), planta: new Text(), idUbicacion: 0, ubicacion: new Text() }
              }, err => console.log('Error', err));
          }, err => console.log('Error', err));
        break;
    }
    this.estado += 1;
    this.seleccionarFase();
  }

  eliminarUbicacion() {
    console.log(this.location_to_delete!.idUbicacion)
    if (this.it_can_be_deleted) {
      this.locations_service.deleteLocation(this.location_to_delete!.idUbicacion).subscribe(
        (res: any) => {
          this.locations_service.getLocations().subscribe(
            (res: any) => {
              this.locations = res.data; console.log(res.data);
              this.procesarEdificios();
              this.create_location = { edificio: new Text(), planta: new Text(), idUbicacion: 0, ubicacion: new Text() }
            }, err => console.log('Error', err));
          this.location_to_delete = { edificio: new Text(), planta: new Text(), idUbicacion: 0, ubicacion: new Text() }
        }, err => console.log('Error', err));
    }
  }

  seleccionarFase() {
    this.busqueda.setValue("");
    switch (this.estado) {
      case 0:
        this.titulo_ubicacion = "Busca el edificio o crea uno nuevo";
        this.titulo_boton = "Crea un edificio";
        break;
      case 1:
        this.titulo_ubicacion = "Busca la planta o o crea uno nueva";
        this.titulo_boton = "Crea una planta";
        break;
      case 2:
        this.titulo_ubicacion = "Busca la ubicación o crea uno nueva";
        this.titulo_boton = "Crea una ubicación";
        break;
    }
  }

  procesarEdificios() {
    this.locations_search = [];

    for (let loc of this.locations) {
      var repeated_object = false;
      for (let auxLoc of this.locations_search) {
        if (loc.edificio === auxLoc.location.edificio) {
          repeated_object = true;
          break;
        }
      }
      if (!repeated_object)
        this.locations_search.push({ "location": loc, "tipo": 0 });
    }

    this.estado = 0;
    this.seleccionarFase();
  }

  procesarPlantas(ubicacion: { location: Ubicacion, tipo: Number }) {
    this.create_location.edificio = ubicacion.location.edificio;
    this.locations_search = [];

    for (let loc of this.locations) {
      var repeated_object = false;
      for (let auxLoc of this.locations_search) {
        if (loc.planta == auxLoc.location.planta) {
          repeated_object = true;
          break;
        }
      }
      if (!repeated_object)
        if (loc.edificio == ubicacion.location.edificio) {
          this.locations_search.push({ "location": loc, "tipo": 1 });
        }
    }

    this.estado = 1;
    this.seleccionarFase();
  }

  procesarUbicaciones(ubicacion: { location: Ubicacion, tipo: Number }) {
    this.create_location.planta = ubicacion.location.planta;
    this.locations_search = [];

    for (let loc of this.locations) {
      if (loc.planta == ubicacion.location.planta) {
        if (loc.edificio == ubicacion.location.edificio)
          this.locations_search.push({ "location": loc, "tipo": 2 });
      }
    }

    this.estado = 2;
    this.seleccionarFase();
  }

  objetosPorUbicacion() {
    this.objects_by_location = [];
    this.objects_service.getObjectsByLocation(this.location_to_delete!.idUbicacion).subscribe(
      (res: any) => {
        this.objects_by_location = res.data; console.log(res.data);
        if (this.objects_by_location.length == 0) {
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
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static' });
  }

  cerrarModal() {
    this.modalService.dismissAll();
  }




}
