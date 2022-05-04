import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Client } from 'src/app/entities/client';
import { ClientService } from '../client.service';
import {MatDialog,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ShowClientComponent } from '../show-client/show-client.component';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})



export class ListClientComponent implements AfterViewInit{

  displayedColumns: string[] = ['id', 'nom', 'email', 'tele_portable', 'actions'];
  clients: Client[];
  client : Client = new Client();
  
  dataSource: MatTableDataSource<Client>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  constructor(private clientService:ClientService , public dialog: MatDialog ) {}
  
  

  ngAfterViewInit() {
    this.getClients();
    
  }

  getClients(){
    this.clientService.getClientList().subscribe(data =>{
      this.clients = data;
      this.dataSource = new MatTableDataSource(this.clients);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
    error => {
      alert("Error");
    });
    
  }
  /*

  getClientById(id :number){
    this.clientService.getClientById(id).subscribe(data => {
      this.client = data
      console.log(this.client);
    });
  }*/


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialogShow(row :any){
    this.dialog.open(ShowClientComponent,{
      width:'95%',
      height:'90%',
      data:row
    })
  }

  openDialog(row :any) {
    this.dialog.open(DeleteDialog,{
      width:'30%',
      data:row,
    }).afterClosed().subscribe(val =>{
      this.getClients() ;
    });
  }

}

@Component({
  selector: 'dialog-delete',
  templateUrl: 'dialog-delete.html'

})
export class DeleteDialog implements OnInit {
  namClient : string;
  ID : number;
  constructor(private clientService:ClientService,
    @Inject(MAT_DIALOG_DATA) public editdata :any ,
   private dialogRef : MatDialogRef<DeleteDialog>
  ){
    
  }

  ngOnInit(): void {
   if(this.editdata){
     this.namClient = this.editdata.nom ;
     this.ID= this.editdata.id ;
   }
  }

  deleteClientById(){
    this.clientService.deleteClientById(this.ID).subscribe(data => {
      this.dialogRef.close();
    })
  }
 
    
}

