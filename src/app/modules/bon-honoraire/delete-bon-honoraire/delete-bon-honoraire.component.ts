import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BonHonoraire } from 'src/app/entities/bon-honoraire';
import { Stock } from 'src/app/Utils/stock';
import { ProduitService } from '../../produit/produit.service';
import { BonHonoraireService } from '../bon-honoraire.service';

@Component({
  selector: 'app-delete-bon-honoraire',
  templateUrl: './delete-bon-honoraire.component.html',
  styleUrls: ['./delete-bon-honoraire.component.css']
})
export class DeleteBonHonoraireComponent implements OnInit {

  bonHonoraire: BonHonoraire = new BonHonoraire();
  stoke: Stock = new Stock(this.produitService);
  
  constructor(private bonHonoraireService: BonHonoraireService, private produitService: ProduitService,
    @Inject(MAT_DIALOG_DATA) public data :any ,
   private dialogRef : MatDialogRef<DeleteBonHonoraireComponent>
  ){}

  ngOnInit(): void {
   if(this.data){
     this.bonHonoraire = this.data;
   }
  }

  deleteBonHonoraireById(){
    if(this.bonHonoraire.valide){
      this.stoke.addToStockFromHonoraire(this.bonHonoraire.listLignBH);
    }
    this.bonHonoraireService.deleteBonHonoraireById(this.bonHonoraire.idBh).subscribe(data => {
      this.dialogRef.close();
    });

  }

}
