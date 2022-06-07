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
        console.log("//////////////////////////")
        console.log("add")
        console.log(bonAchat);

        bonAchat.listLignBA.forEach(currentValue => {
            currentValue.produit.quantitieDisponible += currentValue.quantite;
    
            this.produitService.updateProduit(currentValue.produit.reference,currentValue.produit).subscribe(data => {
                console.log(data)
            }, error =>{
                alert("SA")
              });
          });
          console.log("//////////////////////////")
    }

    removeFromStockByBonAchat(bonAchat: BonAchat){
        console.log("//////////////////////////")
        console.log("remove")
        console.log(bonAchat);
        
        bonAchat.listLignBA.forEach(currentValue => {
            
            currentValue.produit.quantitieDisponible -= currentValue.quantite;

            this.produitService.updateProduit(currentValue.produit.reference,currentValue.produit).subscribe(data => {
                console.log(data)
            }, error =>{
                alert("SR")
            });

          });

          console.log("//////////////////////////")
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