import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-object-select',
  templateUrl: './modal-object-select.component.html',
  styleUrls: ['./modal-object-select.component.css']
})
export class ModalObjectSelectComponent implements OnInit {

  constructor(private modalService: NgbModal) {
    this.cargarObjetos();
   }

  ngOnInit(): void {
  }

  abrirModal(content: any){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  cargarObjetos(){

  }
}
