import { Component, OnInit } from '@angular/core';
import { Prestado } from 'src/app/interfaces/prestado';
import { LoansService } from 'src/app/services/loans.service';

@Component({
  selector: 'app-active-loans',
  templateUrl: './active-loans.component.html',
  styleUrls: ['./active-loans.component.css']
})
export class ActiveLoansComponent implements OnInit {

  prestamos: Prestado[] = []

  constructor(private loansS: LoansService) {
    loansS.getActiveLoans().subscribe(
      (res: any) => {
        this.prestamos = res.data
        console.log(res)
      }
    )
  }

  ngOnInit(): void {
  }

}
