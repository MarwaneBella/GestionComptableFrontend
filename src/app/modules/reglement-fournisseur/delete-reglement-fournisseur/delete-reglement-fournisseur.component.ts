import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { ReglementFournisseur } from 'src/app/entities/reglement-fournisseur';
import { BonAchatService } from '../../bon-achat/bon-achat.service';
import { ReglementFournisseurService } from '../reglement-fournisseur.service';

@Component({
  selector: 'app-delete-reglement-fournisseur',
  templateUrl: './delete-reglement-fournisseur.component.html',
  styleUrls: ['./delete-reglement-fournisseur.component.css']
})
export class DeleteReglementFournisseurComponent implements OnInit {
  private notifier: NotifierService;

  constructor(private reglemenFournisseurService : ReglementFournisseurService, private bonAchatService : BonAchatService,@Inject(MAT_DIALOG_DATA) public reglementFournisseur :ReglementFournisseur ,
  private dialogRef : MatDialogRef<DeleteReglementFournisseurComponent>,
  notifierService: NotifierService
 ){
   this.notifier = notifierService
 }
  ngOnInit(): void {
  }

  deleteReglementFournisseurById(){
    this.reglemenFournisseurService.deleteReglementFournisseurById(this.reglementFournisseur.idRegF).subscribe( data =>{
      this.updateMontantPayerOfBonAchat();
      this.dialogRef.close();
      this.notifier.notify( 'error', `Reglement ${this.reglementFournisseur.idRegF} est Delete en list ` )
    })
  }

  updateMontantPayerOfBonAchat(){

    this.reglementFournisseur.bonAchat.montantPayer -= this.reglementFournisseur.avance;
    this.bonAchatService.updateBonAchatFromReglementFournisseur(this.reglementFournisseur.bonAchat.idBa,this.reglementFournisseur.bonAchat).subscribe( data  =>{

      })
    
  }


}
