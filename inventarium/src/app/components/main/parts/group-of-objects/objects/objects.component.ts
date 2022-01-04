import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GrupoObjetos } from 'src/app/interfaces/grupoobjetos';
import { Objeto } from 'src/app/interfaces/objeto';
import { GroupOfObjectsService } from 'src/app/services/group-of-objects.service';
import { ObjectsService } from 'src/app/services/objects.service';

@Component({
  selector: 'app-objects',
  templateUrl: './objects.component.html',
  styleUrls: ['./objects.component.css']
})
export class ObjectsComponent implements OnInit {
  public go!: GrupoObjetos;
  private routeSub!: Subscription;
  public objects: Objeto[] = [];
  idGrupoObjeto!: number;

  constructor(private group_of_objects_service: GroupOfObjectsService, private route: ActivatedRoute, private objects_service: ObjectsService) {
    this.routeSub = this.route.params.subscribe(params => {
      this.idGrupoObjeto = params['id'];
    });
    this.group_of_objects_service.getGroupOfObject(this.idGrupoObjeto).subscribe(
      (res: any) => {
        this.go = res.data[0];
      }, err => console.log('Error', err));
    this.objects_service.getObjects(this.idGrupoObjeto).subscribe(
      (res: any) => {
        this.objects = res.data;
      }, err => console.log('Error', err));
  }

  modificarGrupoObjeto() {

  }

  borrarGrupoObjeto() {

  }

  ngOnInit(): void {
  }

}
