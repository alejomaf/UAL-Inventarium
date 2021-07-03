import { Component, OnInit } from '@angular/core';
import { Reminder } from 'src/app/interfaces/reminder';
import { ReminderPerUser } from 'src/app/interfaces/reminder-per-user';
import { BooksService } from 'src/app/services/books.service';
import { RemindersService } from 'src/app/services/reminders.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {

  reminders: ReminderPerUser[]=[];

  constructor(private remindersS: RemindersService, private booksS: BooksService) { 
    this.remindersS.getReminders().subscribe((resp: any) => {
      this.reminders = resp.data;
      console.log(resp.data);
    });
  }

  deleteReminder(reminder: Reminder){
    this.remindersS.deleteReminder(reminder).subscribe((resp:any)=> {console.log(resp)});
  }

  markAsRead(reminder: ReminderPerUser){
    let reminderAux: Reminder = {completed:1, idReminder:reminder.idReminder, Book_idBook: reminder.Book_idBook}
    if(confirm("Are you sure to read the book: "+reminder.title+"?")) {
      this.remindersS.updateReminder(reminderAux).subscribe((resp: any) => {
        console.log(resp);
        this.reminders.forEach((reminderAux,index)=>{
          if(reminderAux.idReminder==reminder.idReminder) this.reminders.splice(index,1);
        });
      });
    }
  }

  ngOnInit(): void {
  }

}
