import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from 'src/app/entities/categorie';
import { Produit } from 'src/app/entities/produit';
import { AddEditCategorieComponent } from '../categorie/add-edit-categorie/add-edit-categorie.component';
import { CategorieService } from '../categorie/categorie.service';
import { ProduitService } from '../produit.service';
@Component({
  selector: 'app-add-edit-produit',
  templateUrl: './add-edit-produit.component.html',
  styleUrls: ['./add-edit-produit.component.css']
})
export class AddEditProduitComponent implements OnInit {
  productForm :FormGroup ;
  imageUrl: string ="/assets/imgs/unnamed.png"
  selectedImage: any;
  produit :Produit = new Produit();
  categories :Categorie [] ;
  
  prix_achat   :number 
  prix_vente   :number
  prix_revient :number

  isAddMode: boolean;
  ref :string ;
  action: string;
  constructor(private produitService: ProduitService,private categorieService:  CategorieService , private _formBuilder: FormBuilder ,private route: ActivatedRoute ,private router: Router ,public dialog: MatDialog) { }

  

  ngOnInit(): void {
  
    
    this.declareForms()
    this.getAllCategories()
    this.ref =this.route.snapshot.params['reference'];
    this.isAddMode =!this.ref;
    if(this.isAddMode){
         this.action="Ajouter"
    }else{
      this.action="Edite"
      this.getProduitByRef()

    }

  }
  declareForms(){
    this.productForm = this._formBuilder.group({
      reference: ['', Validators.required],
      designation: ['', Validators.required],
      tva :['', Validators.required],
      //quantitie_disponible: ['', Validators.required],
      categorie :null,
      AddCategorie:null,
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
  }

  async getProduitByRef(){
    this.produitService.getProduitByRef(this.ref).subscribe(data => {
      this.produit =data;
      this.fillFormGroup();

      if(this.produit.image != null){
         this.produitService.getImageById().subscribe(data => {
           this.imageUrl = data;
         })
      }

    })
  }
  fillFormGroup(){
    this.productForm.patchValue({

      reference   : this.produit.reference,
      designation : this.produit.designation,
      tva         : this.produit.tva,
      categorie  : "ca",
      marque      : this.produit.marque  ,
      description  : this.produit.description  ,
      type         : this.produit.type  ,
      poids      : this.produit.poids      ,
      volume     : this.produit.volume      , 
      surface  : this.produit.surface  ,
      longueur  : this.produit.longueur  ,
      largeur  : this.produit.largeur  ,
      hauteur  : this.produit.hauteur  ,
      prix_achat  : this.produit.prix_achat  ,
      prix_vente  : this.produit.prix_vente  ,
      prix_revient  : this.produit.prix_revient  ,
    })
  }
onSelectFile(event: any){
    
  if (event.target.files.length > 0)
  {
    this.selectedImage = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (event: any) =>{
      this.imageUrl = event.target.result;
    }
  
  } 
}
onSubmit(){
  if(this.isAddMode){
    this.addProduit() ;
  }
  else{
    this.updateProduit()
  }
 
}

addProduit(){
  console.log(this.productForm.controls['categorie'].value);
  console.log(this.productForm.controls['categorie'].value.id_cat);
  
  console.log(this.productForm.controls['categorie'].value.nom_cat);

  this.produit = this.productForm.value ;

  
  this.produitService.addProduit(this.produit).subscribe((data : any) => {
    
    if(this.selectedImage !== undefined){
        const uploadImageData = new FormData();
      uploadImageData.append('file', this.selectedImage);
      this.produitService.putImage(uploadImageData).subscribe((data : any) => {

      });
    }
    this.router.navigateByUrl('produit')
  })
  
}

updateProduit(){
  this.produit = this.productForm.value
  this.produitService.updateProduit(this.ref ,this.produit).subscribe((data : any) => {
    if(this.selectedImage !== undefined){

      const uploadImageData = new FormData();
      uploadImageData.append('file', this.selectedImage);

      this.produitService.putImage(uploadImageData).subscribe( (data: any)=> {

        
      });
    }
    this.router.navigateByUrl('produit');

  })
}

 // calcule   prix_vente or prix_revient :
 calculPrix_revient = () =>{
   if(this.prix_vente < this.prix_achat || this.prix_vente == 0){
    this.productForm.get('prix_revient')?.disable()
    this.productForm.get('prix_revient')?.reset()
   }else{
     this.prix_revient = this.prix_vente - this.prix_achat ;
   }
   
 } 

 calculPrix_vente = () => this.prix_vente = this.prix_revient + this.prix_achat ;
 // get All Categories :

 getAllCategories(){
   this.categorieService.getAllCategories().subscribe(data =>{
    this.categories = data ;
   })
 }

 openDialogAddCategorie(){
  this.dialog.open(AddEditCategorieComponent,{
    width:'30%'
  }).afterClosed().subscribe(val =>{
    this.getAllCategories() ;
  });
 }


 

}