import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Facture } from 'src/app/entities/facture';
import { DeleteFactureComponent } from '../delete-facture/delete-facture.component';
import { FactureService } from '../facture.service';
import { ShowFactureComponent } from '../show-facture/show-facture.component';

@Component({
  selector: 'app-list-facture',
  templateUrl: './list-facture.component.html',
  styleUrls: ['./list-facture.component.css']
})
export class ListFactureComponent implements AfterViewInit{


  displayedColumns: string[] = ['Ref', 'Commande', 'Date', 'Client', 'TotalHt', 'TotalTva', 'TotalTtc', 'actions'];
 
  dataSource: MatTableDataSource<Facture>;
  
  listFacture: Facture[];
  facture : Facture = new Facture();
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  constructor(private factureService:FactureService , public dialog: MatDialog ) 
  {

  }
  
  

  ngAfterViewInit() {
    this.getAllFacture();
  }

  getAllFacture(){
    this.factureService.getFactureList().subscribe(data =>{
      this.listFacture = data;
      this.dataSource = new MatTableDataSource(this.listFacture);
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
    this.dialog.open(ShowFactureComponent,{
      width:'30%',
      height:'90%',
      data:row
    })
  }



  openDialogDelete(row :any) {
    
    this.dialog.open(DeleteFactureComponent,{
      width:'30%',
      data:row,
    }).afterClosed().subscribe(val =>{
      this.getAllFacture() ;
    });

  }



}
