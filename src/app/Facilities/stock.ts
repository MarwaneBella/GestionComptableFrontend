import { BonAchat } from "../entities/bon-achat";
import { BonHonoraire } from "../entities/bon-honoraire";
import { Produit } from "../entities/produit";
import { ProduitService } from "../modules/produit/produit.service";

export class Stock{
    produit :Produit [];
    constructor(private produitService : ProduitService){

    }



    // Bon Achat  :

    addToStockFromBonAchat(bonAchat: BonAchat){
        bonAchat.listLignBA.forEach(currentValue => {
            
            currentValue.produit.quantitieDisponible += currentValue.quantite;
    
            this.produitService.updateProduit(currentValue.produit.reference,currentValue.produit).subscribe(data => {
            
            }, error =>{
                alert("SA")
              });
          });

    }

    removeFromStockByBonAchat(bonAchat: BonAchat){
        
        bonAchat.listLignBA.forEach(currentValue => {
            
            currentValue.produit.quantitieDisponible -= currentValue.quantite;

            this.produitService.updateProduit(currentValue.produit.reference,currentValue.produit).subscribe(data => {
                
            }, error =>{
                alert("SR")
            });

          });


    }

    

    // Bon Honoraire :

    
    addToStockFromHonoraire(bonhonoraire: BonHonoraire){
        bonhonoraire.listLignBH.forEach(currentValue => {
            
            currentValue.produit.quantitieDisponible += currentValue.quantite;
    
            this.produitService.updateProduit(currentValue.produit.reference,currentValue.produit).subscribe(data => {
            
            }, error =>{
                alert("SA")
              });
          });

    }

    removeFromStockByHonoraire(bonhonoraire: BonHonoraire){
        
        bonhonoraire.listLignBH.forEach(currentValue => {
            
            currentValue.produit.quantitieDisponible -= currentValue.quantite;

            this.produitService.updateProduit(currentValue.produit.reference,currentValue.produit).subscribe(data => {
                
            }, error =>{
                alert("SR")
            });

          });


    }

    

}