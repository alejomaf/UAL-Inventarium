import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Objeto } from 'src/app/interfaces/objeto';
import { ObjectsService } from 'src/app/services/objects.service';

@Component({
  selector: 'app-object-search',
  templateUrl: './object-search.component.html',
  styleUrls: ['./object-search.component.css']
})
export class ObjectSearchComponent implements OnInit {

  //Paginación
  paginaActual = 0;
  paginasTotales = 1;
  elementosPorPagina = 12;
  flechaIzquierda = faArrowRight;
  flechaDerecha = faArrowLeft;

  codigo = new FormControl("");
  mejoras = new FormControl("");
  etiqueta = new FormControl("");
  organizativa = new FormControl("");
  observaciones = new FormControl("");

  error = ""

  idUbicacion = '';

  objects: Objeto[] = []

  constructor(private objectsS: ObjectsService) { }


  buscar() {
    if (this.idUbicacion == "" && this.mejoras.value == "" && this.codigo.value == "" && this.observaciones.value == "" && this.etiqueta.value == "" && this.organizativa.value == "") {
      this.error = "Selecciona algún valor para la búsqueda";
      return;
    }
    this.objectsS.getAllObjects(this.idUbicacion, this.mejoras.value, this.codigo.value, this.observaciones.value, this.etiqueta.value, this.organizativa.value).subscribe(
      (res: any) => {
        if (res.data) {
          this.objects = res.data;
          this.error = "";
          this.paginasTotales = Math.ceil(this.objects.length / this.elementosPorPagina);
        }
      }
    )
  }

  getSentLocation(location_selected: number) {
    this.idUbicacion = String(location_selected);
  }

  paginacion(i: number) {
    return this.paginasTotales >= 1 && (i >= (this.paginaActual * this.elementosPorPagina) && i < ((this.paginaActual + 1) * this.elementosPorPagina));
  }

  ngOnInit(): void {
  }

}
