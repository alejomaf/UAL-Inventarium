import { Component, OnInit } from '@angular/core';
import { Objeto } from 'src/app/interfaces/objeto';
import { ObjectsService } from 'src/app/services/objects.service';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.css']
})
export class ConfigurationsComponent implements OnInit {

  objetos: Objeto[] = []

  constructor(private objectsS: ObjectsService) {
    objectsS.getObjectsWithConfiguration().subscribe(
      (res: any) => {
        this.objetos = res.data;
        console.log(res)
      }
    )
  }

  ngOnInit(): void {
  }

}
