import { BonAchat } from "./bon-achat";
import { Produit } from "./produit";

export class LignBA{
    id_lign_a : number;
    quantite : number;
    montant_ttc : number;
    prix_unitaire : number;

    bonAchat: BonAchat;
    produit: Produit;
     
}