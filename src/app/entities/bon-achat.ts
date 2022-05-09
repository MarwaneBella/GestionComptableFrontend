import { Fournisseur } from "./fournisseur";

export class BonAchat{
    
    id_ba               : number;
    date_ba             : Date;
    num_fac             : string ;
    total_general       : number;
    fournisseur         : Fournisseur;

}