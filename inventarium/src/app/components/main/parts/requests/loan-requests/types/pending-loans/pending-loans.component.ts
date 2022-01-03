import { Component, OnInit } from '@angular/core';
import { Prestado } from 'src/app/interfaces/prestado';
import { LoansService } from 'src/app/services/loans.service';

@Component({
  selector: 'app-pending-loans',
  templateUrl: './pending-loans.component.html',
  styleUrls: ['./pending-loans.component.css']
})
export class PendingLoansComponent implements OnInit {

  prestamos: Prestado[] = []

  constructor(private loansS: LoansService) {
    loansS.getPendingLoans().subscribe(
      (res: any) => {
        this.prestamos = res.data
      }
    )
  }

  ngOnInit(): void {
  }

}
