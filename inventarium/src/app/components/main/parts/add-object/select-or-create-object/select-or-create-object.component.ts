import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-select-or-create-object',
  templateUrl: './select-or-create-object.component.html',
  styleUrls: ['./select-or-create-object.component.css']
})
export class SelectOrCreateObjectComponent implements OnInit {

  lupa = faSearch;

  constructor() { }

  ngOnInit(): void {
  }

}
