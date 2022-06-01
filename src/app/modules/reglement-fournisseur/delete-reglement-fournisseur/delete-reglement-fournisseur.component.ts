import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { ReglementFournisseur } from 'src/app/entities/reglement-fournisseur';
import { ReglementFournisseurService } from '../reglement-fournisseur.service';

@Component({
  selector: 'app-delete-reglement-fournisseur',
  templateUrl: './delete-reglement-fournisseur.component.html',
  styleUrls: ['./delete-reglement-fournisseur.component.css']
})
export class DeleteReglementFournisseurComponent implements OnInit {
  private notifier: NotifierService;

  constructor(private reglemenFournisseurService : ReglementFournisseurService,@Inject(MAT_DIALOG_DATA) public data :ReglementFournisseur ,
  private dialogRef : MatDialogRef<DeleteReglementFournisseurComponent>,
  notifierService: NotifierService
 ){
   this.notifier = notifierService
 }
  ngOnInit(): void {
    
  }

  deleteReglementFournisseurById(){
    this.reglemenFournisseurService.deleteReglementFournisseurById(this.data.idRegF).subscribe( data =>{
      this.dialogRef.close();
      this.notifier.notify( 'error', `Reglement ${this.data.idRegF} est Delete en list ` );
    })

  }

}
