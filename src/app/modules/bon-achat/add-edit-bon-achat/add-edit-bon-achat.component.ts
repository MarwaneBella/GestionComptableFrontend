import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

import { BonAchat } from 'src/app/entities/bon-achat';
import { Fournisseur } from 'src/app/entities/fournisseur';
import { LignBA } from 'src/app/entities/lign-ba';
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
  montantTva:number;
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
  displayedColumns: string[] = ['reference','designation', 'prixUnitaire','quantite', 'montantHt', 'montantTva','montantTtc','actions'];
  dataList: Array<any> = [] ;
  fournisseurs : Fournisseur[] ;
  produits : Produit[];
  fournisseur: Fournisseur;
  produit: Produit;
  bonAchat : BonAchat = new  BonAchat();
  calculate: Calculate = new Calculate();
  dataSource : MatTableDataSource<DataList>;
  lignBA : LignBA [];
  

  totaleQuantite: number;
  totaleMontantHt: number;
  totaleTauxTva: number;
  totaleMontantTtc: number;
  
  filteredProduits: Observable<Produit[]>;
  nameBtn: string;
  isAddMode: boolean;
  id : number;
  isSelected : boolean;
  isAddLigneMode: boolean = true;
  currentIndex : number ;

  constructor(private _formBuilder: FormBuilder, private bonAchatService : BonAchatService, private fournisseurService :FournisseurService, private produitService : ProduitService, private router: Router,private route: ActivatedRoute) {
    
  }
  

  ngOnInit(): void {

    this.isSelected = false;
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.declareFormInfosBon();
    this.declareFormLigneBon();
    if(this.isAddMode){
      this.setNextBonAchat();
      this.setControllers();
    }else{
      this.getBonAchat();
    }
    
    
  }

  private _filterProduits(value: string): Produit[] {
    
    if (typeof value === 'string'){

    return this.produits.filter(p => (p.reference+p.designation).toLowerCase().includes(value.toLowerCase())) ;

    }
    return this.produits.filter(p => (p.reference+p.designation).toLowerCase().includes(value)) ;
    
  }
  
  getOptionText(p: any) {
      if(p === ""){
        return "";
      }
      else{
        return p.reference+" -- "+p.designation ;
      }
  }
  
  

  declareFormInfosBon() {
    this.formInfosBon = this._formBuilder.group({
      fournisseur:['', Validators.required],
      codeF:['', Validators.required],
      bonANum : ['', Validators.required],
      facBonNum:null,
      dateBa: [new Date(), Validators.required]
      });

  }

  declareFormLigneBon(){
    this.formLigneBon = this._formBuilder.group({
      produit: ['', Validators.required],
      quantite: ['', Validators.required],
      tva: ['', Validators.required],
      prixUnitaire : ['', Validators.required],
      montantHt : null,
      montantTva:null,
      montantTtc : null,
    });
  }

  

  getBonAchat(){

    this.bonAchatService.getBonAchatById(this.id).subscribe(data =>{
    });
  }

  filterProduit(){
    this.filteredProduits = this.formLigneBon.controls['produit'].valueChanges.pipe(
      startWith(''),
      map(p => (p ? this._filterProduits(p) : this.produits.slice())),
    );
  }

  resetFormLigneBA(){
    this.declareFormLigneBon();
    this.filterProduit();
  }

  setControllers() {

    this.fournisseurService.getAllFournisseurs().subscribe( data =>{
      this.fournisseurs = data;
    });

    this.produitService.getProduits().subscribe( data =>{
      this.produits = data;

      this.filterProduit();
      
    });
  }

  setNextBonAchat(){
    this.bonAchatService.getNextBonANum(this.formInfosBon.controls['dateBa'].value).subscribe(data =>{
      this.formInfosBon.controls['bonANum'].setValue(data);
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
    this.formInfosBon.controls['codeF'].setValue(this.fournisseur.codeF);
  }
  
  setProduit(){
    this.produit = this.formLigneBon.controls['produit'].value;
    this.formLigneBon.controls['tva'].setValue(this.produit.tva);
    this.formLigneBon.controls['prixUnitaire'].setValue(this.produit.prixAchat);
    this.formLigneBon.controls['quantite'].setValue(1);
    this.calculateMontants();
  }

  calculateMontants(){
    this.calculate.calculateMontants(this.formLigneBon.controls['prixUnitaire'].value,this.formLigneBon.controls['quantite'].value,this.formLigneBon.controls['tva'].value);
    this.formLigneBon.patchValue({
      montantHt : this.calculate.montantHt.toFixed(2),
      montantTva: this.calculate.montantTva.toFixed(2),
      montantTtc : this.calculate.montantTtc.toFixed(2)
    });
  }

  addEditLigne(){
    if(this.isAddLigneMode){
      this.dataList.push(this.formLigneBon.value);
      this.dataSource = new MatTableDataSource(this.dataList);
      this.totale();
    }
    else{
      
      this.dataList[this.currentIndex] = this.formLigneBon.value;
      this.dataSource = new MatTableDataSource(this.dataList);
      this.totale();
      this.isAddLigneMode = true;
    }

    this.declareFormLigneBon();
    this.filterProduit();
      
    
  }

  deleteLigne(index: number){
    
    this.dataList.splice(index,1);
    this.dataSource = new MatTableDataSource(this.dataList);
    this.totale();
  }

  editLigne(index:number){
    this.isAddLigneMode = false;
    this.currentIndex = index;
    this.formLigneBon.patchValue({
      produit: this.dataList[index].produit,
      quantite: this.dataList[index].quantite,
      tva: this.dataList[index].produit.tva,
      prixUnitaire : this.dataList[index].prixUnitaire,
      montantHt : this.dataList[index].montantHt,
      montantTva:this.dataList[index].montantTva,
      montantTtc : this.dataList[index].montantTtc,
    });
    
  }

  totale(){
     
    this.totaleQuantite = 0;
    this.totaleMontantHt = 0;
    this.totaleTauxTva = 0;
    this.totaleMontantTtc = 0;

    this.dataList.forEach((currentValue, index) => {

      this.totaleQuantite +=  currentValue.quantite;
      this.totaleMontantHt += currentValue.montantHt;
      this.totaleTauxTva += currentValue.montantTva;
      this.totaleMontantTtc += currentValue.montantTtc;

    });

  }

  onEnregistre(){


    this.bonAchat = this.formInfosBon.value;
    this.bonAchat.listLignBA  = this.dataList;

    /*this.dataList.forEach((currentValue, index) => {
      listLignBA.push({quantite: currentValue.quantite, montantTtc: currentValue.montantTtc, prixUnitaire: currentValue.prixUnitaire, produit: currentValue.produit, bonAchat: this.bonAchat });
    });*/
    this.bonAchatService.addBonAchat(this.bonAchat).subscribe(data =>{
      this.router.navigateByUrl('bonAchat');
    });
    

  }

  onValide(){

    this.onEnregistre();

    this.bonAchat.listLignBA.forEach(currentValue => {
      currentValue.produit.quantitieDisponible += currentValue.quantite;

      this.produitService.updateProduit(currentValue.produit.reference,currentValue.produit).subscribe(data => {

      })
    });

    this.router.navigateByUrl('bonAchat');


  }


}
