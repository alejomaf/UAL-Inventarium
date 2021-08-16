import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { GrupoObjetos } from 'src/app/interfaces/grupoobjetos';
import { GroupOfObjectsService } from 'src/app/services/group-of-objects.service';
import { StringUtils } from 'turbocommons-ts';

@Component({
  selector: 'app-modal-object-select',
  templateUrl: './modal-object-select.component.html',
  styleUrls: ['./modal-object-select.component.css']
})
export class ModalObjectSelectComponent implements OnInit {
  private routeSub!: Subscription;
  group_of_objects: GrupoObjetos[] = [];
  group_of_objects_search: GrupoObjetos[] = [];
  tipo_objeto!: number;
  busqueda = new FormControl("");

  constructor(private route: ActivatedRoute, private modalService: NgbModal, private group_of_objects_service: GroupOfObjectsService) {
    this.routeSub = this.route.params.subscribe(params => {
      this.tipo_objeto = params['id'];
    });
    this.group_of_objects_service.getGroupOfObjectsByType(this.tipo_objeto).subscribe(
      (res: any) => {
        this.group_of_objects = res.data; console.log(res.data);
      }, err => console.log('Error', err));

    this.procesarBusqueda();
  }

  ngOnInit(): void {
  }

  onKey(event: any) {
    this.procesarBusqueda();
  }

  procesarBusqueda() {
    console.log(this.busqueda.value);
    this.group_of_objects_search = [];
    if (this.busqueda.value != "") {
      for (var go of this.group_of_objects) {
        if (StringUtils.compareSimilarityPercent(this.busqueda.value, go.nombre + "") > 0.50) {
          this.group_of_objects_search.push(go);
        }
      }
    }
    else this.group_of_objects_search = this.group_of_objects;
  }

  abrirModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  cerrarModal(){
    this.modalService.dismissAll();
  }

}
