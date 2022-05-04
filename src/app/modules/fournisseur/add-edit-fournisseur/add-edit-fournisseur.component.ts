import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Fournisseur } from 'src/app/entities/fournisseur';
import { FournisseurService } from '../fournisseur.service';

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


  constructor(private _formBuilder: FormBuilder, private fournisseurService: FournisseurService,private router: Router,private route: ActivatedRoute) {}

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
      site_web: null,
      ifi : null,
      ice: null,
      tp: null,
      cnss: null,
      rc: null

    });

    this.adresseFormGroup = this._formBuilder.group({
      ville: null,
      adresse: null,
      code_postale: null,

    });
    this.contactsFormGroup = this._formBuilder.group({
      email: null,
      tele_portable: null,
      tele_fix: null

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
      site_web: this.fournisseur.site_web,
      ifi : this.fournisseur.ifi,
      ice: this.fournisseur.ice,
      tp: this.fournisseur.tp,
      cnss: this.fournisseur.cnss,
      rc: this.fournisseur.rc
    });

    this.adresseFormGroup.patchValue({
      ville: this.fournisseur.ville,
      adresse: this.fournisseur.adresse,
      code_postale: this.fournisseur.code_postale,

    });
    this.contactsFormGroup.patchValue({
      email: this.fournisseur.email,
      tele_portable: this.fournisseur.tele_portable,
      tele_fix: this.fournisseur.tele_fix

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

      this.router.navigateByUrl('fournisseur');

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
