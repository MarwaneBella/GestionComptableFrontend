import { Fournisseur } from "./fournisseur";
import { LignBA } from "./lign-ba";

export class BonAchat{
    
    idBa               : number;
    dateBa             : Date;
    bonANum            : string;
    facBonNum          : string;
    valide              : boolean;
    totalGeneral       : number;
    fournisseur        : Fournisseur;
    listLignBA         : LignBA[];

}