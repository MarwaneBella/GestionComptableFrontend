import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categorie } from 'src/app/entities/categorie';
import { CategorieService } from '../categorie.service';

@Component({
  selector: 'app-edit-categorie',
  templateUrl: './edit-categorie.component.html',
  styleUrls: ['./edit-categorie.component.css']
})
export class EditCategorieComponent implements OnInit {
  
  categorieForm: FormGroup;
  categorie: Categorie = new Categorie();
  
  
  constructor(private categorieService: CategorieService ,private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data :any ,private dialogRef : MatDialogRef<EditCategorieComponent>){}

  ngOnInit(): void {

    this.declareForm();

    if(this.data){
      this.categorie.id_cat = this.data.id_cat ;
      this.categorie.nom_cat = this.data.nom_cat ;
    }

    this.setFormValues();
    console.log(this.categorie)
  }

  declareForm(){
    this.categorieForm = this._formBuilder.group({
      nom_cat: ['',Validators.required]
    });
  }

  setFormValues(){
    this.categorieForm.controls['nom_cat'].setValue(this.categorie.nom_cat);
  }

  editCategorie(){

   this.categorie.nom_cat = this.categorieForm.controls['nom_cat'].value;

   this.categorieService.updateCategorie(this.categorie.id_cat, this.categorie).subscribe(data =>{
    this.dialogRef.close();
   });
   
  }

  
}
