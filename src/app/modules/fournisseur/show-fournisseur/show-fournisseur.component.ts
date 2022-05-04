import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Fournisseur } from 'src/app/entities/fournisseur';
import { FournisseurService } from '../fournisseur.service';

@Component({
  selector: 'app-show-fournisseur',
  templateUrl: './show-fournisseur.component.html',
  styleUrls: ['./show-fournisseur.component.css']
})
export class ShowFournisseurComponent implements OnInit {

  fournisseurForm : FormGroup ;
  imageUrl: string ="/assets/imgs/avatar.png"
  fornisseur : Fournisseur = new Fournisseur() ;
  constructor(private _formBuilder: FormBuilder ,@Inject(MAT_DIALOG_DATA) public id :number ,private dialogRef : MatDialogRef<ShowFournisseurComponent>,private fournisseurService :FournisseurService) { }

  ngOnInit(): void {
    this.declareForm()
    this.getFournisseurById()

  }

  declareForm(){
    this.fournisseurForm = this._formBuilder.group({
      
      nom: null,
      site_web: null,
      ifi : null,
      ice: null,
      tp: null,
      cnss: null,
      rc: null,
      ville: null,
      adresse: null,
      code_postale: null,
      email: null,
      tele_portable: null,
      tele_fix: null
    });
  }

  getFournisseurById(){
    this.fournisseurService.getFournisseurById(this.id).subscribe(data =>{
      this.fornisseur = data 
      this.fillForm()

    if(this.fornisseur.image != null){
      this.fournisseurService.getImage().subscribe(data =>{
        this.imageUrl =data 
      })
    }

    })
  }

  fillForm(){

    this.fournisseurForm.patchValue({
      nom: this.fornisseur.nom,
      site_web: this.fornisseur.site_web,
      ifi : this.fornisseur.ifi,
      ice: this.fornisseur.ice,
      tp: this.fornisseur.tp,
      cnss: this.fornisseur.cnss,
      rc: this.fornisseur.rc,
      ville: this.fornisseur.ville,
      adresse: this.fornisseur.adresse,
      code_postale: this.fornisseur.code_postale,
      email: this.fornisseur.email,
      tele_portable: this.fornisseur.tele_portable,
      tele_fix: this.fornisseur.tele_fix
    });
  }

}
