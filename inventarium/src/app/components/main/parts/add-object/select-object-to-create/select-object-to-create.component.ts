import { Component, OnInit } from '@angular/core';
import { faCube, faBolt ,faArchive } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-select-object-to-create',
  templateUrl: './select-object-to-create.component.html',
  styleUrls: ['./select-object-to-create.component.css']
})
export class SelectObjectToCreateComponent implements OnInit {

  cubo = faCube;
  rayo = faBolt;
  caja = faArchive;
  constructor() { }

  ngOnInit(): void {
  }

}
