import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReglementFournisseur } from 'src/app/entities/reglement-fournisseur';
import { ReglementFournisseurService } from '../reglement-fournisseur.service';

@Component({
  selector: 'app-list-reglement-fournisseur',
  templateUrl: './list-reglement-fournisseur.component.html',
  styleUrls: ['./list-reglement-fournisseur.component.css']
})
export class ListReglementFournisseurComponent implements OnInit {

  displayedColumns: string[] = ['nomF', 'bonANum', 'codeRF', 'datePayment', 'modePayment', 'avance', 'reste', 'status','actions'];
  listReglementFournisseur: ReglementFournisseur[];
  reglementFournisseur : ReglementFournisseur = new ReglementFournisseur();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<ReglementFournisseur>;

  constructor(private reglementFournisseurService : ReglementFournisseurService) { }

  ngOnInit(): void {
    this.getAllReglementFournisseur()
  }
  getAllReglementFournisseur(){
    this.reglementFournisseurService.getAllReglementFournisseur().subscribe(data =>{
      this.listReglementFournisseur= data;
      this.dataSource = new MatTableDataSource(this.listReglementFournisseur);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
    error => {
      alert("Error");
    });
    
  }

  // serch 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
