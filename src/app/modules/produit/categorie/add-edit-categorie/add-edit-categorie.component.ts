import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categorie } from 'src/app/entities/categorie';
import { CategorieService } from '../categorie.service';

@Component({
  selector: 'app-add-edit-categorie',
  templateUrl: './add-edit-categorie.component.html',
  styleUrls: ['./add-edit-categorie.component.css']
})
export class AddEditCategorieComponent implements OnInit {

  categorieForm: FormGroup;
  categorie: Categorie = new Categorie();
  isAddMode: boolean;
  content: string;
  
  constructor(private categorieService: CategorieService ,private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data :any ,private dialogRef : MatDialogRef<AddEditCategorieComponent>){}

  ngOnInit(): void {

    this.declareForm();

    this.isAddMode =!this.data;

    if(this.isAddMode){
      this.content = "Ajoute";
    }
    else{
      this.content = "Edite";
      this.categorie.id_cat = this.data.id_cat ;
      this.categorie.nom_cat = this.data.nom_cat ;
      this.setFormValues();
    }

    
  }

  declareForm(){
    this.categorieForm = this._formBuilder.group({
      nom_cat: ['',Validators.required]
    });
  }

  setFormValues(){
    this.categorieForm.controls['nom_cat'].setValue(this.categorie.nom_cat);
  }

  onSubmit(){
    if(this.isAddMode){
      this.AddCategorie();
    }
    else{
      this.editCategorie();
    }
  }

  AddCategorie(){

    this.categorie.nom_cat = this.categorieForm.controls['nom_cat'].value;
 
    this.categorieService.addCategorie(this.categorie).subscribe(data =>{
     this.dialogRef.close();
    });
    
  }

  editCategorie(){

   this.categorie.nom_cat = this.categorieForm.controls['nom_cat'].value;
   this.categorieService.updateCategorie(this.categorie.id_cat, this.categorie).subscribe(data =>{
    this.dialogRef.close();
   });
   
  }



}
