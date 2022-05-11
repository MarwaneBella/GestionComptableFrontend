import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { BonAchat } from 'src/app/entities/bon-achat';
import { BonAchatService } from '../bon-achat.service';
import { DeleteBonAchatComponent } from '../delete-bon-achat/delete-bon-achat.component';

@Component({
  selector: 'app-list-bon-achat',
  templateUrl: './list-bon-achat.component.html',
  styleUrls: ['./list-bon-achat.component.css']
})
export class ListBonAchatComponent  implements AfterViewInit {

  displayedColumns: string[] = ['idBa', 'nomF', 'dateBa', 'totalGeneral', 'actions'];
  dataSource: MatTableDataSource<BonAchat>;
  listBonAchat: BonAchat[];
  bonAchat : BonAchat = new BonAchat();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  constructor(private bonAchatService:BonAchatService , public dialog: MatDialog ) {}
  
  

  ngAfterViewInit() {
    this.getAllBonAchat();
    
  }

  getAllBonAchat(){
    this.bonAchatService.getBonAchatList().subscribe(data =>{
      this.listBonAchat = data;
      this.dataSource = new MatTableDataSource(this.listBonAchat);
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

  /*
  openDialogShow(row :any){
    this.dialog.open(ShowBonAchatComponent,{
      width:'95%',
      height:'90%',
      data:row
    })
  }*/

  openDialogDelete(row :any) {
    this.dialog.open(DeleteBonAchatComponent,{
      width:'30%',
      data:row,
    }).afterClosed().subscribe(val =>{
      this.getAllBonAchat() ;
    });
  }

}



