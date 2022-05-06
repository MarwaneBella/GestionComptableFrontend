import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-attestation-stage',
  templateUrl: './attestation-stage.component.html',
  styleUrls: ['./attestation-stage.component.css']
})
export class AttestationStageComponent implements OnInit {
  nomStager : string
  FormStagiaire :FormGroup
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
   this.FormStagiaire =this._formBuilder.group({
    nom: ['', Validators.required]
   })


  }
  print(){
    this.nomStager =this.FormStagiaire.controls['nom'].value
  }

}
