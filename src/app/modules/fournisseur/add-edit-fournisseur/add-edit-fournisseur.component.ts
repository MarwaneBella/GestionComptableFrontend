import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Fournisseur } from 'src/app/entities/fournisseur';
import { FournisseurService } from '../fournisseur.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-add-edit-Fournisseur',
  templateUrl: './add-edit-Fournisseur.component.html',
  styleUrls: ['./add-edit-Fournisseur.component.css']
})
export class AddEditFournisseurComponent implements OnInit {

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
  fournisseur: Fournisseur = new Fournisseur();
  imageUrl: String ="/assets/imgs/avatar.png"
  selectedImage: File  ;
  isAddMode: boolean;
  id : number;
  nameBtn:string;
  isSelected : boolean;


  constructor(private _formBuilder: FormBuilder, private fournisseurService: FournisseurService,private router: Router,private route: ActivatedRoute ,private  notifierService: NotifierService) {}

  ngOnInit() {
    this.isSelected = false;
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.declareForms();

    if(this.isAddMode){
      this.nameBtn = "Ajoute"
    }else{
      this.nameBtn ="Edite"
      this.getFournisseur();
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

  }



  getFournisseur(){

    this.fournisseurService.getFournisseurById(this.id).subscribe( data =>{

      this.fournisseur = data;
      this.fillFormGroup();

      if(this.fournisseur.image != null){
      this.fournisseurService.getImage().subscribe( data  =>{
        
        this.imageUrl =data;
        console.log(this.imageUrl);
      });
    }

      
    }); 

    console.log(this.imageUrl); 
  }

  fillFormGroup(){
    
    this.infosGeneralFormGroup.patchValue({
      nom: this.fournisseur.nom,
      siteWeb: this.fournisseur.siteWeb,
      ifi : this.fournisseur.ifi,
      ice: this.fournisseur.ice,
      tp: this.fournisseur.tp,
      cnss: this.fournisseur.cnss,
      rc: this.fournisseur.rc
    });

    this.adresseFormGroup.patchValue({
      ville: this.fournisseur.ville,
      adresse: this.fournisseur.adresse,
      codePostale: this.fournisseur.codePostale,

    });
    this.contactsFormGroup.patchValue({
      email: this.fournisseur.email,
      telePortable: this.fournisseur.telePortable,
      teleFix: this.fournisseur.teleFix

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
      this.createFournisseur();
      this.notifierService.notify( 'success', `Client ${this.fournisseur.nom} est Ajoute en list ` );
      setTimeout(() => {
        this.router.navigateByUrl('fournisseur');
      }, 1000);
    }
    else{
      this.editFournisseur();
    }

  }
  
   createFournisseur(){

    this.fournisseur = {...this.infosGeneralFormGroup.value , ...this.adresseFormGroup.value, ...this.contactsFormGroup.value};
    
    this.fournisseurService.addFournisseur(this.fournisseur).subscribe( (data: any) => {

      if(this.selectedImage !== undefined){

        const uploadImageData = new FormData();
        uploadImageData.append('file', this.selectedImage);
        this.fournisseurService.putImage(uploadImageData).subscribe( (data: any)=> {
 
        });
        
      }

    //  this.router.navigateByUrl('fournisseur');

    });
  }

  


    editFournisseur(){
    
    this.fournisseur = {...this.infosGeneralFormGroup.value , ...this.adresseFormGroup.value, ...this.contactsFormGroup.value};
    

    this.fournisseurService.updateFournisseur(this.id,this.fournisseur).subscribe( (data: any)=> {
      
      if(this.selectedImage !== undefined){

        const uploadImageData = new FormData();
        uploadImageData.append('file', this.selectedImage);

        this.fournisseurService.putImage(uploadImageData).subscribe( (data: any)=> {

          
        });
      }

      this.router.navigateByUrl('fournisseur');

    });


  }

  
  

}

