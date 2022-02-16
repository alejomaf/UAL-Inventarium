import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { GrupoObjetos } from 'src/app/interfaces/grupoobjetos';
import { GroupOfObjectsService } from 'src/app/services/group-of-objects.service';
import { StringUtils } from 'turbocommons-ts';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-group-of-objects',
  templateUrl: './group-of-objects.component.html',
  styleUrls: ['./group-of-objects.component.css']
})
export class GroupOfObjectsComponent implements OnInit {

  public group_of_objects: GrupoObjetos[] = [];
  public group_of_objects_aux: GrupoObjetos[] = [];
  mostrarOpciones = true;
  mostrarOpcionesAvanzadas = true;
  weblink = environment.webUrl;

  //Paginación
  paginaActual = 0;
  paginasTotales = 1;
  elementosPorPagina = 12;
  flechaIzquierda = faArrowRight;
  flechaDerecha = faArrowLeft;

  //Búsqueda
  nombre = new FormControl("");
  marca = new FormControl("");
  modelo = new FormControl("");

  constructor(private group_of_objects_service: GroupOfObjectsService) {
    this.group_of_objects_service.getGroupOfObjects().subscribe(
      (res: any) => {
        if (res.data) {
          this.group_of_objects = res.data; console.log(res.data);
          this.group_of_objects_aux = this.group_of_objects;
          this.paginasTotales = Math.ceil(this.group_of_objects.length / this.elementosPorPagina);
        }
      }, err => console.log('Error', err));
  }

  ngOnInit(): void {
  }


  busqueda() {
    if (this.nombre.value == "" && this.marca.value == "" && this.modelo.value == "") {
      this.group_of_objects = this.group_of_objects_aux;
      this.paginasTotales = Math.ceil(this.group_of_objects.length / this.elementosPorPagina);
      this.paginaActual = 0;
      return;
    }
    this.group_of_objects = [];
    console.log((this.nombre.value != '') + " " + (this.marca.value != ''))
    for (var go of this.group_of_objects_aux) {
      if ((((this.nombre.value != "") && (go.nombre.toLocaleLowerCase().indexOf(this.nombre.value.toLowerCase()) != -1)) || ((this.marca.value != "") && (go.marca.toLocaleLowerCase().indexOf(this.marca.value.toLowerCase()) != -1)) || ((this.modelo.value != "") && (go.modelo.toLocaleLowerCase().indexOf(this.modelo.value.toLowerCase()) != -1)))) {
        this.group_of_objects.push(go);
      }
    }
    console.log(this.group_of_objects)
    this.paginasTotales = Math.ceil(this.group_of_objects.length / this.elementosPorPagina);
    this.paginaActual = 0;
  }



  paginacion(i: number, go: GrupoObjetos) {
    return this.paginasTotales >= 1 && (i >= (this.paginaActual * this.elementosPorPagina) && i < ((this.paginaActual + 1) * this.elementosPorPagina));
  }

}
