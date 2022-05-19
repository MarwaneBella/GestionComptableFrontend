import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { FournisseurService } from '../fournisseur.service';

@Component({
  selector: 'app-delete-fournisseur',
  templateUrl: './delete-fournisseur.component.html',
  styleUrls: ['./delete-fournisseur.component.css']
})
export class DeleteFournisseurComponent implements OnInit {

  namFournisseur : string;
  ID : number;

  private notifier: NotifierService;

  constructor(private fournisseurService:FournisseurService,
    @Inject(MAT_DIALOG_DATA) public editdata :any ,
   private dialogRef : MatDialogRef<DeleteFournisseurComponent>,
   notifierService : NotifierService
  ){
    this.notifier = notifierService
  }

  ngOnInit(): void {
   if(this.editdata){
     this.namFournisseur = this.editdata.nom ;
     this.ID= this.editdata.id ;
   }
  }

  deleteClientById(){
    this.fournisseurService.deleteFournisseurById(this.ID).subscribe(data => {
      this.notifier.notify( 'error', `Fournisseur ${this.namFournisseur} est Delete en list ` );
      this.dialogRef.close();
    })
  }

}
