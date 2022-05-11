export class Calculate{

    montantHt: number;
    tauxTva: number;
    montantTtc: number;

    calculateMontants(prixUnitaire: number, quantite: number,tva: number){
        this.montantHt = prixUnitaire * quantite;
        this.tauxTva =this.montantHt  * (tva/100);
        this.montantTtc = this.montantHt + this.tauxTva;
    }
}