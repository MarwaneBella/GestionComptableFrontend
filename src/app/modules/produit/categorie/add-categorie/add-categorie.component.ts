import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categorie } from 'src/app/entities/categorie';
import { CategorieService } from '../categorie.service';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.css']
})
export class AddCategorieComponent implements OnInit {


  categorieForm: FormGroup;
  categorie: Categorie = new Categorie();
  
  
  constructor(private categorieService: CategorieService ,private _formBuilder: FormBuilder ,
    private dialogRef : MatDialogRef<AddCategorieComponent>){}

  ngOnInit(): void {

    this.declareForm();
    console.log(this.categorie)
  }

  declareForm(){
    this.categorieForm = this._formBuilder.group({
      nom_cat: ['',Validators.required]
    });
  }



  AddCategorie(){

   this.categorie.nom_cat = this.categorieForm.controls['nom_cat'].value;

   this.categorieService.addCategorie(this.categorie).subscribe(data =>{
    this.dialogRef.close();
   });
   
  }

}
