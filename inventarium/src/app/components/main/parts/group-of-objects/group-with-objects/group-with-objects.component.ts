import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GrupoObjetos } from 'src/app/interfaces/grupoobjetos';
import { GroupOfObjectsService } from 'src/app/services/group-of-objects.service';

@Component({
  selector: 'app-group-with-objects',
  templateUrl: './group-with-objects.component.html',
  styleUrls: ['./group-with-objects.component.css']
})
export class GroupWithObjectsComponent implements OnInit {

  public go!: GrupoObjetos;
  idGrupoObjeto!: number;
  ruta_kits = false;

  constructor(private group_of_objects_service: GroupOfObjectsService, private route: ActivatedRoute, public router: Router) {
    this.idGrupoObjeto = route.snapshot.params['id'];
    this.group_of_objects_service.getGroupOfObject(this.idGrupoObjeto).subscribe(
      (res: any) => {
        this.go = res.data[0];
      }, err => console.log('Error', err));
  }

  modificarGrupoObjeto() {

  }

  borrarGrupoObjeto() {

  }

  ngOnInit(): void {
  }

}
