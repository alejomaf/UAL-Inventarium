import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faArchive, faBolt, faCube } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-data-to-group-of-object',
  templateUrl: './add-data-to-group-of-object.component.html',
  styleUrls: ['./add-data-to-group-of-object.component.css']
})
export class AddDataToGroupOfObjectComponent implements OnInit {

  selected_id = 0

  constructor(private route: ActivatedRoute) {
    this.selected_id = route.snapshot.params['id'];
  }

  cubo = faCube;
  rayo = faBolt;
  caja = faArchive;

  ngOnInit(): void {
  }

}
