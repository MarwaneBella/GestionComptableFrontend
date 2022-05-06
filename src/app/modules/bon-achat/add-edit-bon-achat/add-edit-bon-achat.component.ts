import { Component, OnInit } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { BonAchat } from 'src/app/entities/bon-achat';
export interface Transaction {
  item: string;
  cost: number;
}

@Component({
  selector: 'app-add-edit-bon-achat',
  templateUrl: './add-edit-bon-achat.component.html',
  styleUrls: ['./add-edit-bon-achat.component.css']
})
export class AddEditBonAchatComponent implements OnInit {

  displayedColumns: string[] = ['reference','designation', 'prix_unitaire','quantite', 'montant_HT', 'taux_TVA','montant_TTC','actions'];
  transactions: Transaction[] = [
    {item: 'Beach ball', cost: 4},
    {item: 'Towel', cost: 5},
    {item: 'Frisbee', cost: 2},
    {item: 'Sunscreen', cost: 4},
    {item: 'Cooler', cost: 25},
    {item: 'Swim suit', cost: 15},
  ];
  

  constructor() { }

  ngOnInit(): void {
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }

    return '';
  };

}
