import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
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
  


  isAddMode: boolean;
  ref :string ;
  action: string;

  constructor(private produitService: ProduitService,private categorieService:  CategorieService , private _formBuilder: FormBuilder ,private route: ActivatedRoute ,private router: Router ,public dialog: MatDialog , private  notifierService: NotifierService) { }

  

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
      prixAchat :null,
      prixVente :null,
      prixRevient:null
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
      tva         : this.produit.tva.toString(),
      categorie  : this.produit.categorie,
      marque      : this.produit.marque  ,
      description  : this.produit.description  ,
      type         : this.produit.type  ,
      poids      : this.produit.poids      ,
      volume     : this.produit.volume      , 
      surface  : this.produit.surface  ,
      longueur  : this.produit.longueur  ,
      largeur  : this.produit.largeur  ,
      hauteur  : this.produit.hauteur  ,
      prixAchat  : this.produit.prixAchat  ,
      prixVente  : this.produit.prixVente  ,
      prixRevient  : this.produit.prixRevient  
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
    this.notifierService.notify( 'success', `Produit ${this.produit.reference} est Ajoute en list ` );
    setTimeout(() => {
        this.router.navigateByUrl('produit');
    }, 1000);
  }
  else{
    this.updateProduit()
    this.notifierService.notify( 'success', `Edit Produit ${this.produit.reference} ` );
    setTimeout(() => {
        this.router.navigateByUrl('produit');
    }, 1000);
  }
 
}

addProduit(){
  console.log(this.productForm.controls['categorie'].value);
  console.log(this.productForm.controls['categorie'].value.id_cat);
  
  console.log(this.productForm.controls['categorie'].value.nomCat);

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

  })
}

 // calcule   prixVente or prixRevient :
 calculprixRevient = () =>{
   if(this.produit.prixVente < this.produit.prixAchat || this.produit.prixVente == 0){
    //this.productForm.get('prixRevient')?.disable()
    //this.productForm.get('prixRevient')?.reset()
   }else{
     this.produit.prixRevient = this.produit.prixVente - this.produit.prixAchat ;
     this.productForm.controls['prixRevient'].setValue(this.produit.prixRevient)
    }
   
 } 

 calculprixVente = () => this.produit.prixVente = this.produit.prixRevient + this.produit.prixAchat ;
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
 compareCategoryObjects(object1: any, object2: any) {
  return object1 && object2 && object1.idCat == object2.idCat;
}


 

}