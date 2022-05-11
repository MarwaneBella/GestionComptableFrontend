import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { Fournisseur } from 'src/app/entities/fournisseur';
import { Produit } from 'src/app/entities/produit';
import { Calculate } from 'src/app/Facilities/calculate';
import { FournisseurService } from '../../fournisseur/fournisseur.service';
import { ProduitService } from '../../produit/produit.service';
import { BonAchatService } from '../bon-achat.service';

export interface DataList {
  produit: Produit;
  prixUnitaire: number;
  quantite: number;
  montantHt : number;
  tauxTva:number;
  montantTtc:number;
}

@Component({
  selector: 'app-add-edit-bon-achat',
  templateUrl: './add-edit-bon-achat.component.html',
  styleUrls: ['./add-edit-bon-achat.component.css']
})
export class AddEditBonAchatComponent implements OnInit {

  formInfosBon: FormGroup;
  formLigneBon: FormGroup;
  displayedColumns: string[] = ['reference','designation', 'prixUnitaire','quantite', 'montantHt', 'tauxTva','montantTtc','actions'];
  dataList: Array<DataList> = [] ;
  fournisseurs : Fournisseur[] ;
  produits : Produit[];
  fournisseur: Fournisseur;
  produit: Produit; 
  calculate: Calculate = new Calculate();
  dataSource : MatTableDataSource<DataList>

  totaleQuantite: number;
  totaleMontantHt: number;
  totaleTauxTva: number;
  totaleMontantTtc: number;

  constructor(private _formBuilder: FormBuilder, private bonAchatService : BonAchatService, private fournisseurService :FournisseurService, private produitService : ProduitService) { }

  ngOnInit(): void {
    this.declareFormInfosBon();
    this.declareFormLigneBon();
    this.setControllers();
  }
  
  

  declareFormInfosBon() {
    this.formInfosBon = this._formBuilder.group({
      fournisseur:['', Validators.required],
      id:['', Validators.required],
      // bon_num : ['', Validators.required],
      facBonNum:null,
      dateBa: [new Date(), Validators.required]
      });

  }

  declareFormLigneBon(){
    this.formLigneBon = this._formBuilder.group({
      produit: ['', Validators.required],
      quantite: [1, Validators.required],
      tva: ['', Validators.required],
      prixUnitaire : ['', Validators.required],
      montantHt : null,
      tauxTva:null,
      montantTtc : null,
    });
  }

  
  setControllers() {
    this.fournisseurService.getAllFournisseurs().subscribe( data =>{
      this.fournisseurs = data;
    });
    this.produitService.getProduits().subscribe( data =>{
      this.produits = data;
    });
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

  setFornisseur(){
    this.fournisseur = this.formInfosBon.controls['fournisseur'].value;
    this.formInfosBon.controls['id'].setValue(this.fournisseur.id);
  }
  
  setProduit(){
    this.produit = this.formLigneBon.controls['produit'].value;
    this.formLigneBon.controls['tva'].setValue(this.produit.tva);
    this.formLigneBon.controls['prixUnitaire'].setValue(this.produit.prixAchat);
    this.calculateMontants();
  }

  calculateMontants(){
    this.calculate.calculateMontants(this.formLigneBon.controls['prixUnitaire'].value,this.formLigneBon.controls['quantite'].value,this.formLigneBon.controls['tva'].value);
    this.formLigneBon.patchValue({
      montantHt : this.calculate.montantHt,
      tauxTva: this.calculate.tauxTva,
      montantTtc : this.calculate.montantTtc
    });
  }

  addLigne(){

    this.dataList.push(this.formLigneBon.value);
    this.dataSource = new MatTableDataSource(this.dataList);
    this.totale();
    this.declareFormLigneBon();
    
  }

  deleteLigne(index: number){
    
    this.dataList.splice(index,1);
    this.dataSource = new MatTableDataSource(this.dataList);
    this.totale();
  }

  totale(){
     
    this.totaleQuantite = 0;
    this.totaleMontantHt = 0;
    this.totaleTauxTva = 0;
    this.totaleMontantTtc = 0;

    this.dataList.forEach((currentValue, index) => {

      this.totaleQuantite +=  currentValue.quantite;
      this.totaleMontantHt += currentValue.montantHt;
      this.totaleTauxTva += currentValue.tauxTva;
      this.totaleMontantTtc += currentValue.montantTtc;

    });

  }



}
