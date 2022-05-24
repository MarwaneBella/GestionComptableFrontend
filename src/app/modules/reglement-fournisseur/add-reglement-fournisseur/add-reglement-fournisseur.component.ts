import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, startWith } from 'rxjs';
import { BonAchat } from 'src/app/entities/bon-achat';
import { BonAchatDto } from 'src/app/entities/dto/bonAchatDto';
import { FournisseurDto } from 'src/app/entities/dto/fournisseurDto';
import { Fournisseur } from 'src/app/entities/fournisseur';
import { ReglementFournisseur } from 'src/app/entities/reglement-fournisseur';
import { BonAchatService } from '../../bon-achat/bon-achat.service';
import { FournisseurService } from '../../fournisseur/fournisseur.service';
import { ReglementFournisseurService } from '../reglement-fournisseur.service';
 
@Component({
  selector: 'app-add-reglement-fournisseur',
  templateUrl: './add-reglement-fournisseur.component.html',
  styleUrls: ['./add-reglement-fournisseur.component.css']
})

export class AddReglementFournisseurComponent implements OnInit {

  formInfosFournisseur: FormGroup;
  formInfosReglement: FormGroup;


  fournisseurs : Fournisseur[] ;
  fournisseur: Fournisseur = new Fournisseur();
  filteredFournisseurs: Observable<Fournisseur[]>;

  displayedColumns: string[] = ['BonNum','Date', 'MontantTotal', 'MontantPayer','RestePayer','Avance','Reste','Status'];


 dataSource : MatTableDataSource<any>;
 dataList: Array<any> = [] ;


  bonAchats : BonAchat[]
  bonAchat : BonAchat = new BonAchat()

  reglementFournisseur : ReglementFournisseur = new ReglementFournisseur()



  statusGeneral : string
  status : Array<boolean> = [] 

  Avance : number
  avanceGeneral    : number 
  avances           : Array<number> = [] 
  rest             : number 
  restes : Array<number> = [] 

  totaleMontants     : number
  totaleMontantPayer : number
  totaleRestePayer   : number
  totaleAvances      : number = 0
  totaleRestes       : number

  constructor(private _formBuilder: FormBuilder , private fournisseurService :FournisseurService ,private bonAchatService : BonAchatService, private reglementFournisseurService : ReglementFournisseurService) { }

  ngOnInit(): void {
    this.declareFormInfosFournisseur();
    this.declareFormReglement();
    this.setControllers();
    
  }

  declareFormInfosFournisseur() {
    this.formInfosFournisseur = this._formBuilder.group({
      fournisseur:['', Validators.required],
      codeF:['', Validators.required],
      datePayment: [new Date(), Validators.required]
      });
  }
  declareFormReglement() {
    this.formInfosReglement = this._formBuilder.group({
      mode_reglement:['', Validators.required],
      avanceGeneral:['', Validators.required],
      reste:['', ],
      statusGeneral:['', ],
      });
  }
  setFornisseur(){
    this.fournisseur = this.formInfosFournisseur.controls['fournisseur'].value;
    this.formInfosFournisseur.controls['codeF'].setValue(this.fournisseur.codeF);
    this.getListBonAchatByFournisseur(this.fournisseur)
  }

  getOptionTextFournisseur(f: any) {
    if(f === ""){
      return "";
    }
    else{
      return f.nom ;
    }
  }
  
  filterFournisseur(){
    this.filteredFournisseurs = this.formInfosFournisseur.controls['fournisseur'].valueChanges.pipe(
      startWith(''),
      map(f => (f ? this._filterFournisseur(f) : this.fournisseurs.slice())),
    );
  }

  private _filterFournisseur(value: string): Fournisseur[] {
    
    if (typeof value === 'string'){

    return this.fournisseurs.filter(f => f.nom.toLowerCase().includes(value.toLowerCase())) ;

    }
    return this.fournisseurs.filter(f => f.nom.toLowerCase().includes(value)) ;
    
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }
    return '';
  };

  
  setControllers() {

    this.fournisseurService.getAllFournisseurs().subscribe( data =>{
      this.fournisseurs = data;
      
      this.filterFournisseur();
    });
  }

  getListBonAchatByFournisseur( fournisseur : Fournisseur){
    this.bonAchatService.getListBonAchatByFournisseur(fournisseur).subscribe(data =>{
      this.bonAchats = data
      
      this.dataSource = new MatTableDataSource(this.bonAchats);
      this.dataList = this.bonAchats
      this.totale()
     
     
      this.avanceGeneral = 0
      this.dataList.forEach((currentValue, index) => {
        this.status[index] = false ;
        this.avances[index] = 0
        this.restes[index]=(currentValue.montantTotal - currentValue.montantPayer )
      });
   //   this.calculeResteGeneral()
     
    })
  }

  // calcule Totale :
  totale(){
    this.totaleMontants=0
    this.totaleMontantPayer=0
    this.totaleRestePayer=0
    this.totaleAvances=0
    this.totaleRestes=0    
    this.dataList.forEach((currentValue, index) => {

      this.totaleMontants     += currentValue.montantTotal
      this.totaleMontantPayer += currentValue.montantPayer
      this.totaleRestePayer   += (currentValue.montantTotal -currentValue.montantPayer )

      //this.totaleAvances      += currentValue
     // this.totaleRestes       += currentValue    
    });
  }

  // calcule des restes :
  calculeResteGeneral(){
    
     this.statusGeneral = 'NR'
     this.avanceGeneral = this.formInfosReglement.controls['avanceGeneral'].value
     if(this.formInfosReglement.controls['avanceGeneral'].value == ''){
        this.avances[0] = 0
     }
     if(this.avanceGeneral > this.totaleRestePayer){
      this.statusGeneral = 'R'
      this.avanceGeneral  =  this.totaleRestePayer
      this.formInfosReglement.controls['avanceGeneral'].setValue(this.avanceGeneral)
     
    }else if(this.avanceGeneral <0){
      this.formInfosReglement.controls['avanceGeneral'].setValue(0)
       
     }

     this.formInfosReglement.controls['statusGeneral'].setValue(this.statusGeneral)


    let restGeneral   = this.totaleRestePayer -  this.avanceGeneral
    this.formInfosReglement.controls['reste'].setValue(restGeneral)
   // rest chak row :
   this.dataList.forEach((currentValue, index) => {
    this.avances[index] = 0
    this.restes[index]=(currentValue.montantTotal - currentValue.montantPayer )
  });
    this.avances[0]=this.avanceGeneral
    this.totaleAvances =this.avanceGeneral
    this.dataList.forEach((currentValue, index) => {

      if(this.avances[index] >= this.restes[index]){
        console.log('index : ',index)
        this.status [index] = true ;
        this.avances[index] = this.restes[index]
        this.avances[index + 1]= this.avanceGeneral - this.restes[index]
        this.avanceGeneral = this.avanceGeneral - this.restes[index]
        this.restes[index]=(currentValue.montantTotal - currentValue.montantPayer ) - this.avances[index]

      }else{
        this.status [index] = false ;

      this.restes[index]=(currentValue.montantTotal - currentValue.montantPayer ) - this.avances[index]
      }
    });
    this.totaleRestes =0
    this.dataList.forEach((currentValue, index) => {
     this.totaleRestes+=this.restes[index]
    });
    

  }

  //
  calculeReste(restPayer : number ,avance : string ,index : number){
   // this.calculeResteGeneral()
    
    if(+avance >= restPayer){
      this.avances[index] = restPayer
      this.restes[index] = 0
      this.status[index] = true
    }else{
      this.restes[index] = restPayer - +avance
      this.status[index] = false

    }
      this.totaleRestes =0
      this.dataList.forEach((currentValue, i) => {
        this.totaleRestes+=this.restes[i]
       });
    this.formInfosReglement.controls['reste'].setValue(this.totaleRestes)

  }


  updateAllBonAchats(){
    this.bonAchats.forEach((currentValue, index) =>{
       if( this.avances[index] != 0){  
          if( currentValue.status != this.status[index] ){
           currentValue.status = this.status[index]
          }
           currentValue.montantPayer += this.avances[index]
           this.bonAchatService.updateBonAchatFromReglementFournisseur(currentValue.idBa,currentValue).subscribe(data =>{
             this.bonAchat =data
             this.addReglementFournisseur(this.bonAchats[index],index)
          })
       }
    })
        
  

  //  this.getListBonAchatByFournisseur(this.fournisseur)

  }

  // add reglement fournisseur :
  addReglementFournisseur(bonAchat : BonAchat , index : number){

    this.reglementFournisseur.bonAchat = bonAchat
    this.reglementFournisseur.avance = this.avances[index]
    this.reglementFournisseur.reste = this.restes[index]
    this.reglementFournisseur.datePayment = this.formInfosFournisseur.controls['datePayment'].value
    this.reglementFournisseur.modePaymant = this.formInfosReglement.controls['mode_reglement'].value

    this.reglementFournisseurService.getNextCodeRF(this.reglementFournisseur.datePayment).subscribe( data =>{
      this.reglementFournisseur.codeRF = data 
      this.reglementFournisseurService.addReglementFournisseur(this.reglementFournisseur).subscribe(data =>{

      })
    })
    
  }
  



  

  

}
