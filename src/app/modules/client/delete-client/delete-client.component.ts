import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-delete-client',
  templateUrl: './delete-client.component.html',
  styleUrls: ['./delete-client.component.css']
})
export class DeleteClientComponent implements OnInit {

  namClient : string;
  ID : number;
  constructor(private clientService:ClientService,
    @Inject(MAT_DIALOG_DATA) public editdata :any ,
   private dialogRef : MatDialogRef<DeleteClientComponent>
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
