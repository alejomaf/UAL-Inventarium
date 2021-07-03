import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/interfaces/book';
import { BooksService } from 'src/app/services/books.service';
import { RemindersService } from 'src/app/services/reminders.service';
import { ReminderCreateComponent } from '../reminder-create/reminder-create.component';
import { Reminder } from "../../interfaces/reminder"
import { ValueConverter } from '@angular/compiler/src/render3/view/template';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  @Input() rcc: ReminderCreateComponent;

  private routeSub: Subscription;
  public books: Book[] = []
  private idLibrary;
  alertMessage="";
  private book:Book;
  dateReminder= new FormControl("");

  constructor(private route: ActivatedRoute, private booksS: BooksService,private modalService: NgbModal, private remindersS: RemindersService) { 
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params['id']); //log the value of id
      this.idLibrary = params['id'];
    });
    this.booksS.getBooks(this.idLibrary).subscribe((resp: any) => {
      this.books = resp.data;
      console.log(resp.data);
    });
  }

  ngOnInit(): void {
    
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  faStar = faStar;



  //Reminder part

  createReminder(){
    if(this.dateReminder.value==""){
      this.alertMessage = "Select a date"
      return;
    }
    let fecha= new Date(this.dateReminder.value).getTime();
    if(fecha < new Date().getTime()){
      this.alertMessage = "Select a valid date";
    }
    console.log(Date.parse(this.dateReminder.value));
    let reminder: Reminder = {date:Date.parse(this.dateReminder.value), Book_idBook:this.book.idBook, completed:0}
    this.remindersS.addReminder(reminder).subscribe((resp:any)=>{this.alertMessage=resp.message;});
  }

  openReminderCustomClass(content, book) {
    this.modalService.open(content, { windowClass: "dark-modal" });
    this.book = book;
  }

  openStarCustomClass(content, book:Book) {
    this.modalService.open(content, { windowClass: "dark-modal" });
    this.book = book;
  }

  updateBooks(){
    this.booksS.getBooks(this.idLibrary).subscribe((resp: any) => {
      this.books = resp.data;
      console.log(resp.data);
    });
  }

  deleteBook(name, idBook){
      if(confirm("Are you sure to delete the book: "+name+"?")) {
        this.booksS.deleteBook(idBook).subscribe((resp: any) => {
          console.log(resp);
        });
        this.books.forEach((book,index)=>{
          if(book.idBook==idBook) this.books.splice(index,1);
        });
      }
  }

  markAsRead(name, idBook, book: Book){
    book.toRead=1;
    if(confirm("Are you sure to read the book: "+name+"?")) {
      this.booksS.updateBook(idBook,book).subscribe((resp: any) => {
        console.log(resp);
      });
    }
  }

  markAsNotRead(name, idBook, book: Book){
    book.toRead=0;
    if(confirm("Are you sure to unread the book: "+name+"?")) {
      this.booksS.updateBook(idBook,book).subscribe((resp: any) => {
        console.log(resp);
      });
    }
  }

  putStars(numberStars){
    this.book.stars = numberStars;
    console.log("click");
    this.booksS.updateBook(this.book.idBook,this.book).subscribe((resp: any) => {
      console.log(resp);
    });
  }

  
}
