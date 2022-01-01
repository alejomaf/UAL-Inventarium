import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GrupoObjetos } from 'src/app/interfaces/grupoobjetos';
import { Objeto } from 'src/app/interfaces/objeto';
import { GroupOfObjectsService } from 'src/app/services/group-of-objects.service';
import { ObjectsService } from 'src/app/services/objects.service';

@Component({
  selector: 'app-object-unit',
  templateUrl: './object-unit.component.html',
  styleUrls: ['./object-unit.component.css']
})
export class ObjectUnitComponent implements OnInit {

  idObjeto: any;
  objeto?: Objeto;
  grupoObjeto?: GrupoObjetos;

  constructor(private route: ActivatedRoute, private objectS: ObjectsService, private groupOfObjectS: GroupOfObjectsService) {
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
    )
  }

  ngOnInit(): void {
  }

}
