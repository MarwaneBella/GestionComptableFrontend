import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Fournisseur } from 'src/app/entities/fournisseur';
import { FournisseurService } from '../fournisseur.service';
import { ShowFournisseurComponent } from '../show-fournisseur/show-fournisseur.component';

@Component({
  selector: 'app-list-fournisseur',
  templateUrl: './list-fournisseur.component.html',
  styleUrls: ['./list-fournisseur.component.css']
})
export class ListFournisseurComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'nom', 'email', 'tele_portable', 'actions'];
  fournisseurs : Fournisseur[] ;
  fournisseur : Fournisseur = new Fournisseur();

  dataSource: MatTableDataSource<Fournisseur>

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private fournisseurService :FournisseurService , public dialog: MatDialog) { }
  
  ngAfterViewInit(){
    this.getFournisseurs()
  }

  getFournisseurs(){
    this.fournisseurService.getAllFournisseurs().subscribe(data =>{
      this.fournisseurs = data;
      this.dataSource = new MatTableDataSource(this.fournisseurs);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
    error => {
      alert("Error");
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialogShow(row :any){
    this.dialog.open(ShowFournisseurComponent,{
      width:'95%',
      height:'90%',
      data:row
    })
  }

  openDialog(row :any) {
    
  }



}
