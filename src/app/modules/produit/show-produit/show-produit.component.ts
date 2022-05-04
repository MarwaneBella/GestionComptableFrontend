import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Produit } from 'src/app/entities/produit';
import { ProduitService } from '../produit.service';

@Component({
  selector: 'app-show-produit',
  templateUrl: './show-produit.component.html',
  styleUrls: ['./show-produit.component.css']
})
export class ShowProduitComponent implements OnInit {
  productForm :FormGroup ;
  imageUrl: string ="/assets/imgs/unnamed.png"
  produit :Produit = new Produit();
 
  constructor(private _formBuilder: FormBuilder ,@Inject(MAT_DIALOG_DATA) public reference :string ,private dialogRef : MatDialogRef<ShowProduitComponent>,private produitService :ProduitService) { }

  ngOnInit(): void {
    this.productForm = this._formBuilder.group({
      reference: null,
      designation: null,
      tva :null,
      // TODOquantitie_disponible: null,
      //categorier :null,
      marque :null,
      description:null,
      type:null,
      poids:null,
      volume:null,
      surface:null,
      longueur:null,
      largeur :null,
      hauteur :null,
      prix_achat :null,
      prix_vente :null,
      prix_revient:null
  });
  //this.productForm.get('reference')?.disable()
  Object.keys(this.productForm.controls).forEach(ctrl => {
    this.productForm.controls[ctrl].disable();
  });
  if(this.reference){
    this.getProduitByRef();
   
  }
}

 getProduitByRef(){
  this.produitService.getProduitByRef(this.reference).subscribe(data => {
    this.produit =data;
    this.productForm.controls['reference'].setValue(this.produit.reference) ;
    this.productForm.controls['designation'].setValue(this.produit.designation) ;
    this.productForm.controls['tva'].setValue(this.produit.tva) ;
    this.productForm.controls['marque'].setValue(this.produit.marque) ;
    this.productForm.controls['description'].setValue(this.produit.description) ;
    this.productForm.controls['type'].setValue(this.produit.type) ;
    this.productForm.controls['poids'].setValue(this.produit.poids) ;
    this.productForm.controls['volume'].setValue(this.produit.volume) ;
    this.productForm.controls['surface'].setValue(this.produit.surface) ;
    this.productForm.controls['longueur'].setValue(this.produit.longueur) ;
    this.productForm.controls['largeur'].setValue(this.produit.largeur) ;
    this.productForm.controls['hauteur'].setValue(this.produit.hauteur) ;
    this.productForm.controls['prix_achat'].setValue(this.produit.prix_achat)
    this.productForm.controls['prix_vente'].setValue(this.produit.prix_vente) ;
    this.productForm.controls['prix_revient'].setValue(this.produit.prix_revient) ;

    if(this.produit.image != null){
       this.produitService.getImageById().subscribe(data => {
         this.imageUrl = data;
       })
    }

  })
}
}