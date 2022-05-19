import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { ProduitService } from '../produit.service';

@Component({
  selector: 'app-delete-produit',
  templateUrl: './delete-produit.component.html',
  styleUrls: ['./delete-produit.component.css']
})
export class DeleteProduitComponent implements OnInit {

  
  reference : string
  constructor(private produitService:ProduitService,
    @Inject(MAT_DIALOG_DATA) public editdata :any ,
   private dialogRef : MatDialogRef<DeleteProduitComponent>,
    private  notifierService: NotifierService
  ){
    
  }

  ngOnInit(): void {
   if(this.editdata){
     this.reference= this.editdata.reference ;
   }
  }

  deleteProduitByRef(){
    this.produitService.deleteProduitByRef(this.reference).subscribe(data => {
      this.dialogRef.close();
    this.notifierService.notify( 'success', `Produit ${this.reference} est Ajoute en list ` );

    })
  }


}
