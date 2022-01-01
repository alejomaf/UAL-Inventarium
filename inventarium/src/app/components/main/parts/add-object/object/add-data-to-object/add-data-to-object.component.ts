import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupOfObjectsService } from 'src/app/services/group-of-objects.service';
import { ObjectsService } from 'src/app/services/objects.service';

@Component({
  selector: 'app-add-data-to-object',
  templateUrl: './add-data-to-object.component.html',
  styleUrls: ['./add-data-to-object.component.css']
})
export class AddDataToObjectComponent implements OnInit {

  codigo = new FormControl("");
  date = new Date()
  fechaAdquisicion = new FormControl(this.date.getUTCFullYear() + "-" + this.date.getUTCMonth() + "-" + this.date.getUTCDate());
  etiqueta = new FormControl("");
  departamento = new FormControl(0);
  mejoras = new FormControl("");
  observaciones = new FormControl("");

  idGrupoObjetos: any;
  idLocalizacion: any;
  cantidad: number;
  tipo: any;

  constructor(private router: Router, private route: ActivatedRoute, private objectS: ObjectsService) {
    this.idGrupoObjetos = route.snapshot.params['group_of_object_id'];
    this.idLocalizacion = route.snapshot.params['location_id'];
    this.cantidad = route.snapshot.params['quantity'];
  }

  ngOnInit(): void {
  }

  generar() {
    if (this.cantidad == 1) {
      //Is the last item that we are going to generate
      this.crearObjeto();
      this.router.navigateByUrl('group-of-object/' + this.idGrupoObjetos);
    }
    else {
      this.crearObjeto();
      //We reduce the quantity in one unit for the next iteration
      this.cantidad -= 1;
      this.router.navigateByUrl('add-object/create/' + this.idGrupoObjetos + '/' + this.idLocalizacion + '/' + this.cantidad);
    }
  }

  saltarCreaciones() {
    const formData = new FormData();

    formData.append("Ubicacion_idUbicacion", this.idLocalizacion);

    for (let i = 0; i < this.cantidad; i++) {
      this.objectS.addObject(formData, this.idGrupoObjetos).subscribe(
        (res: any) => {
          return;
        });
    }

    this.router.navigateByUrl('group-of-object/' + this.idGrupoObjetos);
  }

  crearObjeto() {
    const formData = new FormData();

    formData.append("Ubicacion_idUbicacion", this.idLocalizacion);
    formData.append("mejorasEquipo", this.mejoras.value);
    formData.append("codigo", this.codigo.value);
    formData.append("fechaAdquisicion", this.fechaAdquisicion.value);
    formData.append("observaciones", this.observaciones.value)
    formData.append("etiqueta", this.etiqueta.value);

    this.objectS.addObject(formData, this.idGrupoObjetos).subscribe(
      (res: any) => {
        return;
      });
  }
}
