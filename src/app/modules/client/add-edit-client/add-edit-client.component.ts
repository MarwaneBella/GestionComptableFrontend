import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/entities/client';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-add-edit-client',
  templateUrl: './add-edit-client.component.html',
  styleUrls: ['./add-edit-client.component.css']
})
export class AddEditClientComponent implements OnInit {

  villes: string[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];
  
  
  infosGeneralFormGroup: FormGroup;
  adresseFormGroup: FormGroup;
  contactsFormGroup: FormGroup;
  honorairesFormGroup: FormGroup;
  client: Client = new Client();
  imageUrl: String ="/assets/imgs/avatar.png"
  selectedImage: File  ;
  isAddMode: boolean;
  id : number;
  nameBtn:string;
  isSelected : boolean;


  constructor(private _formBuilder: FormBuilder, private clientService: ClientService,private router: Router,private route: ActivatedRoute) {}

  ngOnInit() {
    this.isSelected = false;
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.declareForms();

    if(this.isAddMode){
      this.nameBtn = "Ajoute"
    }else{
      this.nameBtn ="Edite"
      this.getClient();
    }

  }

  declareForms(){
    this.infosGeneralFormGroup = this._formBuilder.group({
      nom: ['', Validators.required],
      siteWeb: null,
      ifi : null,
      ice: null,
      tp: null,
      cnss: null,
      rc: null

    });

    this.adresseFormGroup = this._formBuilder.group({
      ville: null,
      adresse: null,
      codePostale: null,

    });
    this.contactsFormGroup = this._formBuilder.group({
      email: null,
      telePortable: null,
      teleFix: null

    });

    this.honorairesFormGroup = this._formBuilder.group({
      bilan: null,
      pvBilan: null,
      regime: null,
      rTva: {value:null,disabled:true},
      rCnss: {value:null,disabled:true}
    });
  }

  enableInputs(){
    this.honorairesFormGroup.controls['rTva'].enable();
    this.honorairesFormGroup.controls['rCnss'].enable();
  }

  getClient(){

    this.clientService.getClientById(this.id).subscribe( data =>{

      this.client = data;
      this.fillFormGroup();

      if(this.client.image != null){
      this.clientService.getImage().subscribe( data  =>{
        
        this.imageUrl =data;
        console.log(this.imageUrl);
      });
    }

      
    }); 

    console.log(this.imageUrl); 

    
      


  }

  fillFormGroup(){
    
    this.infosGeneralFormGroup.patchValue({
      nom: this.client.nom,
      siteWeb: this.client.siteWeb,
      ifi : this.client.ifi,
      ice: this.client.ice,
      tp: this.client.tp,
      cnss: this.client.cnss,
      rc: this.client.rc

    });

    this.adresseFormGroup.patchValue({
      ville: this.client.ville,
      adresse: this.client.adresse,
      codePostale: this.client.codePostale,

    });
    this.contactsFormGroup.patchValue({
      email: this.client.email,
      telePortable: this.client.telePortable,
      teleFix: this.client.teleFix

    });

    this.honorairesFormGroup.patchValue({
      bilan: this.client.bilan,
      pvBilan: this.client.pvBilan,
      regime: this.client.regime,
      rTva: this.client.rTva,
      rCnss: this.client.rCnss
      
    });
    
    
    
  }

  /*async defaultUploadImage(path :string ){
    console.log("1")
    const response = await fetch(path)
    const myBlob  =  await response.blob();
    let blob : any;
    
    blob = myBlob;
    blob.name = 'avatar.png';
    blob.lastModified = new Date();
    const myFile = new File([blob], 'avatar.png', {type: blob.type});
    console.log("2") ; 

    return myFile;

  }*/

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
      this.createClient();
    }
    else{
      this.editClient();
    }

  }
  
   createClient(){

    this.client = {...this.infosGeneralFormGroup.value , ...this.adresseFormGroup.value, ...this.contactsFormGroup.value, ...this.honorairesFormGroup.value};
    
    this.clientService.addClient(this.client).subscribe( (data: any) => {

      if(this.selectedImage !== undefined){

        const uploadImageData = new FormData();
        uploadImageData.append('file', this.selectedImage);
        this.clientService.putImage(uploadImageData).subscribe( (data: any)=> {

          
        });
        
      }

      this.router.navigateByUrl('client');

    });
  }

  


    editClient(){
    let codeC = this.client.codeC;

    this.client = {...this.infosGeneralFormGroup.value , ...this.adresseFormGroup.value, ...this.contactsFormGroup.value, ...this.honorairesFormGroup.value};
    this.client.codeC = codeC;

    this.clientService.updateClient(this.id,this.client).subscribe( (data: any)=> {
      
      if(this.selectedImage !== undefined){

        const uploadImageData = new FormData();
        uploadImageData.append('file', this.selectedImage);

        this.clientService.putImage(uploadImageData).subscribe( (data: any)=> {

          
        });
      }

      this.router.navigateByUrl('client');

    });


  }

  
  

}

