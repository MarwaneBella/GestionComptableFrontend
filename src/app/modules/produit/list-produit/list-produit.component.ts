import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Produit } from 'src/app/entities/produit';
import { DeleteProduitComponent } from '../delete-produit/delete-produit.component';

import { ProduitService } from '../produit.service';
import { ShowProduitComponent } from '../show-produit/show-produit.component';

@Component({
  selector: 'app-list-produit',
  templateUrl: './list-produit.component.html',
  styleUrls: ['./list-produit.component.css']
})
export class ListProduitComponent implements AfterViewInit {

  displayedColumns: string[] =['reference','nom','prixVente','quantitieDisponible','actions']
  produits : Produit[];
  produit : Produit = new Produit();

  dataSource: MatTableDataSource<Produit>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private produitService: ProduitService ,  public dialog: MatDialog ) { }

  ngAfterViewInit(): void {
    this.getAllProduits();
  }

  getAllProduits(){
    this.produitService.getProduits().subscribe(data => {
      this.produits = data;
      this.dataSource = new MatTableDataSource(this.produits);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })


  }
  
  getProduitByRef(reference : string){
    this.produitService.getProduitByRef(reference).subscribe(data=>{

    })
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialogShow(row :any){
    this.dialog.open(ShowProduitComponent,{
      width:'95%',
      height:'90%',
      data:row
    })
  }
  
  openDialogDelete(row :any){
    this.dialog.open(DeleteProduitComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      this.getAllProduits()
    })
  }

}

