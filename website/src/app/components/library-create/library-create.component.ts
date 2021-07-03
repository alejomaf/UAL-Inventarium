import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { BookshelfsService } from '../../services/bookshelfs.service';
import { FormControl } from "@angular/forms"; 
import { Library } from "../../interfaces/library";

@Component({
  selector: 'app-library-create',
  templateUrl: './library-create.component.html',
  styleUrls: ['./library-create.component.css']
})
export class LibraryCreateComponent implements OnInit {

  libraryName = new FormControl('');
  rowNumber = new FormControl('');
  columnNumber = new FormControl('');
  alertMessage = "";
  
  @Output() refresh: EventEmitter<string> = new EventEmitter();

  constructor(private modalService: NgbModal, private bookshelfs: BookshelfsService) {
    
  }

  ngOnInit(): void {
  }

  createLibrary(){
    if(this.libraryName.value==""){
      this.alertMessage = "Write the library name";
      return;
    }
    if(this.rowNumber.value==""){
      this.alertMessage = "Write the row number";
      return;
    }
    if(this.columnNumber.value==""){
      this.alertMessage = "Write the column number";
      return;
    }
    let auxBookshelf: Library = {columnB:this.columnNumber.value, name: this.libraryName.value, rowB: this.rowNumber.value, User_idUser:null, idBookshelf:null};
    this.bookshelfs.addLibrary(auxBookshelf).subscribe((resp:any)=>{this.alertMessage=resp.message; this.reiniciarAtributos();});
    this.refresh.emit();
  }

  reiniciarAtributos(){
    this.libraryName=new FormControl("");
    this.rowNumber=new FormControl("");
    this.columnNumber=new FormControl("");
  }
  openWindowCustomClass(content) {
    this.modalService.open(content, { windowClass: "dark-modal" });
  }
  faPlus = faPlus;
}
