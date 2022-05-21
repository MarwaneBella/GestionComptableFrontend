import { BonAchat } from "../entities/bon-achat";
import { Produit } from "../entities/produit";
import { ProduitService } from "../modules/produit/produit.service";

export class Stock{
    produit :Produit [];
    constructor(private produitService : ProduitService){

    }


    addToStock(bonAchat: BonAchat){
        bonAchat.listLignBA.forEach(currentValue => {
            
            currentValue.produit.quantitieDisponible += currentValue.quantite;
    
            this.produitService.updateProduit(currentValue.produit.reference,currentValue.produit).subscribe(data => {
            
            }, error =>{
                alert("SA")
              });
          });

    }

    removeFromStock(bonAchat: BonAchat){
        
        bonAchat.listLignBA.forEach(currentValue => {
            
            currentValue.produit.quantitieDisponible -= currentValue.quantite;

            this.produitService.updateProduit(currentValue.produit.reference,currentValue.produit).subscribe(data => {
                
            }, error =>{
                alert("SR")
            });

          });


    }

    

}