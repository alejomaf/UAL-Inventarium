import { Component, OnInit } from '@angular/core';
import { Prestado } from 'src/app/interfaces/prestado';
import { LoansService } from 'src/app/services/loans.service';

@Component({
  selector: 'app-expired-loans',
  templateUrl: './expired-loans.component.html',
  styleUrls: ['./expired-loans.component.css']
})
export class ExpiredLoansComponent implements OnInit {

  prestamos: Prestado[] = []

  constructor(private loansS: LoansService) {
    loansS.getExpiredLoans().subscribe(
      (res: any) => {
        this.prestamos = res.data
      }
    )
  }

  ngOnInit(): void {
  }

}
