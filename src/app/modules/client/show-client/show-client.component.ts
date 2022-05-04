import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'src/app/entities/client';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-show-client',
  templateUrl: './show-client.component.html',
  styleUrls: ['./show-client.component.css']
})
export class ShowClientComponent implements OnInit {

  clientForm :FormGroup ;
  imageUrl: string ="/assets/imgs/avatar.png"
  client :Client = new Client();

  constructor(private _formBuilder: FormBuilder ,@Inject(MAT_DIALOG_DATA) public id :number ,private dialogRef : MatDialogRef<ShowClientComponent>,private clientService :ClientService) { }

  ngOnInit(): void {

    this.declareForm();
    this.getClientById();


  }

  declareForm(){
    this.clientForm = this._formBuilder.group({
      
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
      tele_fix: null,
      bilan: null,
      pv_bilan: null,
      regime: null,
      r_tva: null,
      r_cnss: null
    });
  }

  getClientById(){
    this.clientService.getClientById(this.id).subscribe(data => {
      console.log(data);
      this.client = data;
      this.fillForm();
  
      if(this.client.image != null){
         this.clientService.getImage().subscribe(data => {
           this.imageUrl = data;
         })
      }
    })
  }

  fillForm(){

    this.clientForm.patchValue({
      nom: this.client.nom,
      site_web: this.client.site_web,
      ifi : this.client.ifi,
      ice: this.client.ice,
      tp: this.client.tp,
      cnss: this.client.cnss,
      rc: this.client.rc,
      ville: this.client.ville,
      adresse: this.client.adresse,
      code_postale: this.client.code_postale,
      email: this.client.email,
      tele_portable: this.client.tele_portable,
      tele_fix: this.client.tele_fix,
      bilan: this.client.bilan,
      pv_bilan: this.client.pv_bilan,
      regime: this.client.regime,
      r_tva: this.client.r_tva,
      r_cnss: this.client.r_cnss
    });
  }

}
