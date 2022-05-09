export class Calculate{

    montant_ht: number;
    taux_tva: number;
    montant_ttc: number;

    calculateMontants(prix_unitaire: number, quantite: number,tva: number){
        console.log(prix_unitaire+":"+quantite+":"+tva)
        this.montant_ht = prix_unitaire * quantite;
        this.taux_tva =this.montant_ht  * (tva/100);
        this.montant_ttc = this.montant_ht + this.taux_tva;
    }
}