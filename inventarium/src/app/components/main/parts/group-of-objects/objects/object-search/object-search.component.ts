import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Objeto } from 'src/app/interfaces/objeto';
import { ObjectsService } from 'src/app/services/objects.service';

@Component({
  selector: 'app-object-search',
  templateUrl: './object-search.component.html',
  styleUrls: ['./object-search.component.css']
})
export class ObjectSearchComponent implements OnInit {

  codigo = new FormControl("");
  mejoras = new FormControl("");
  etiqueta = new FormControl("");
  organizativa = new FormControl("");
  observaciones = new FormControl("");

  idUbicacion = '';

  objects: Objeto[] = []

  constructor(private objectsS: ObjectsService) { }


  buscar() {
    this.objectsS.getAllObjects(this.idUbicacion, this.mejoras.value, this.codigo.value, this.observaciones.value, this.etiqueta.value).subscribe(
      (res: any) => {
        if (res.data) {
          this.objects = res.data;
        }
      }
    )
  }

  ngOnInit(): void {
  }

}
