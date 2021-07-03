import { Component, OnInit } from '@angular/core';
import { BookshelfsService } from '../../services/bookshelfs.service';
import { Library } from "../../interfaces/library"
import { Router } from '@angular/router';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  public libraries: Library[] = []

  constructor(private bookshelfs: BookshelfsService, private router:Router) {
    this.bookshelfs.getLibraries().subscribe((resp: any) => {
      console.log(resp);
      this.libraries = resp.data
    });
   }

  ngOnInit(): void {
  }

  updateLibraries(){
    this.bookshelfs.getLibraries().subscribe((resp: any) => {
      console.log(resp);
      this.libraries = resp.data
    });
  }

  openLibrary(idLibrary){
    this.router.navigate(["/library/"+idLibrary]);
  }

  deleteLibrary(idLibrary, name){
    if(confirm("Are you sure to delete the library: "+name+"?")) {
      this.bookshelfs.deleteLibrary(idLibrary).subscribe((resp: any) => {
        console.log(resp);
      });
      this.libraries.forEach((libraryAux,index)=>{
        if(libraryAux.idBookshelf==idLibrary) this.libraries.splice(index,1);
      });
    }
  }
}
