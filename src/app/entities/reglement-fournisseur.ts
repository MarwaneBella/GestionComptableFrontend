import { BonAchat } from "./bon-achat";

export class ReglementFournisseur{
     idRegF : number;
     codeRF : string ;
     modePaymant : string ;
     avance : number;
     reste  : number;
     datePayment : Date
     bonAchat :BonAchat

 
}