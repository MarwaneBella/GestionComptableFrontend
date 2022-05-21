import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, startWith } from 'rxjs';
import { BonAchat } from 'src/app/entities/bon-achat';
import { BonAchatDto } from 'src/app/entities/dto/bonAchatDto';
import { FournisseurDto } from 'src/app/entities/dto/fournisseurDto';
import { Fournisseur } from 'src/app/entities/fournisseur';
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
  fournisseur: Fournisseur;
  filteredFournisseurs: Observable<Fournisseur[]>;

  displayedColumns: string[] = ['BonNum','Date','Fournisseur','Facture', 'MontantTotal', 'MontantPayer','RestePayer','Avance','Reste','Status'];


fournisseursDto : FournisseurDto[]
fournisseurDto : FournisseurDto = new FournisseurDto() ;

dataSource : MatTableDataSource<any>;


bonAchats : BonAchatDto[]

  constructor(private _formBuilder: FormBuilder , private fournisseurService :FournisseurService , private reglementFournisseurService : ReglementFournisseurService) { }

  ngOnInit(): void {

    
    this.getFournisseurByCodF(2)
      
   


    this.declareFormInfosFournisseur();
    this.declareFormReglement();
    this.setControllers();
  }

  declareFormInfosFournisseur() {
    this.formInfosFournisseur = this._formBuilder.group({
      fournisseur:['', Validators.required],
      codeF:['', Validators.required],
      dateBa: [new Date(), Validators.required]
      });
  }
  declareFormReglement() {
    this.formInfosReglement = this._formBuilder.group({
      mode_reglement:['', Validators.required],
      avance:['', Validators.required],
      reste:['', Validators.required],
      status:['', Validators.required],
      });
  }
  setFornisseur(){
    this.fournisseur = this.formInfosFournisseur.controls['fournisseur'].value;
    this.formInfosFournisseur.controls['codeF'].setValue(this.fournisseur.codeF);
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

  getFournisseurByCodF( id : number){
    this.reglementFournisseurService.getFournisseurByCodF(id).subscribe(data =>{
      this.fournisseurDto = data
      console.log("step 1")
      console.log("fournisseursDto :")
      console.log(this.fournisseursDto)
      this.dataSource = new MatTableDataSource(this.fournisseurDto.listBonAchat);
      console.log("dataSource :")

      console.log(this.dataSource.filteredData)
       
       console.log("=====================")
     // console.log(this.dataSource.filteredData)

    })
  }

}
