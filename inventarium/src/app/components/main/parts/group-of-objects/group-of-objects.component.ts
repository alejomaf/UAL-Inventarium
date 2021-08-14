import { Component, OnInit } from '@angular/core';
import { GrupoObjetos } from 'src/app/interfaces/grupoobjetos';
import { GroupOfObjectsService } from 'src/app/services/group-of-objects.service';

@Component({
  selector: 'app-group-of-objects',
  templateUrl: './group-of-objects.component.html',
  styleUrls: ['./group-of-objects.component.css']
})
export class GroupOfObjectsComponent implements OnInit {

  public group_of_objects: GrupoObjetos[] = [];

  constructor(private group_of_objects_service: GroupOfObjectsService) {
    this.group_of_objects_service.getGroupOfObjects().subscribe(
      (res: any) => { 
        this.group_of_objects = res.data; console.log(res.data); 
      },err => console.log('Error', err));
  }

  ngOnInit(): void {
  }


}
