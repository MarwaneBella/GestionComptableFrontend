import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FournisseurService } from '../fournisseur.service';

@Component({
  selector: 'app-delete-fournisseur',
  templateUrl: './delete-fournisseur.component.html',
  styleUrls: ['./delete-fournisseur.component.css']
})
export class DeleteFournisseurComponent implements OnInit {

  namFournisseur : string;
  ID : number;
  constructor(private fournisseurService:FournisseurService,
    @Inject(MAT_DIALOG_DATA) public editdata :any ,
   private dialogRef : MatDialogRef<DeleteFournisseurComponent>
  ){
    
  }

  ngOnInit(): void {
   if(this.editdata){
     this.namFournisseur = this.editdata.nom ;
     this.ID= this.editdata.id ;
   }
  }

  deleteClientById(){
    this.fournisseurService.deleteFournisseurById(this.ID).subscribe(data => {
      this.dialogRef.close();
    })
  }

}
