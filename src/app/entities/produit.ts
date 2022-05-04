import { Byte } from "@angular/compiler/src/util";

export class Produit{
     reference            : string ;
     image                : Byte   ;
     designation          : string ;
     description          : string ;
     type                 : string ;
     marque               : string ;
     longueur             : number ;
     largeur              : number ;
     hauteur              : number ;
     poids                : number ;
     surface              : number ;
     volume               : number ;
     prix_achat           : number ;
     prix_vente           : number ;
     prix_revient         : number ;
     tva                  : number ;
     categorie            : Object ;
}