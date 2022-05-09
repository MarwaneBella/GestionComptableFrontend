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
  prix_unitaire: number;
  quantite: number;
  montant_ht : number;
  taux_tva:number;
  montant_ttc:number;
}

@Component({
  selector: 'app-add-edit-bon-achat',
  templateUrl: './add-edit-bon-achat.component.html',
  styleUrls: ['./add-edit-bon-achat.component.css']
})
export class AddEditBonAchatComponent implements OnInit {

  formInfosBon: FormGroup;
  formLigneBon: FormGroup;
  displayedColumns: string[] = ['reference','designation', 'prix_unitaire','quantite', 'montant_ht', 'taux_tva','montant_ttc','actions'];
  dataList: Array<DataList> = [] ;
  fournisseurs : Fournisseur[] ;
  produits : Produit[];
  fournisseur: Fournisseur;
  produit: Produit; 
  calculate: Calculate = new Calculate();
  dataSource : MatTableDataSource<DataList>

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
      num_fac:null,
      date_ba: [new Date(), Validators.required]
      });

  }

  declareFormLigneBon(){
    this.formLigneBon = this._formBuilder.group({
      produit: null,
      quantite: ['1', Validators.required],
      tva: null,
      prix_unitaire : null,
      montant_ht : null,
      taux_tva:null,
      montant_ttc : null,
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
    this.formLigneBon.controls['prix_unitaire'].setValue(this.produit.prix_achat);
    this.calculateMontants();
  }

  calculateMontants(){
    this.calculate.calculateMontants(this.formLigneBon.controls['prix_unitaire'].value,this.formLigneBon.controls['quantite'].value,this.formLigneBon.controls['tva'].value);
    this.formLigneBon.patchValue({
      montant_ht : this.calculate.montant_ht,
      taux_tva: this.calculate.taux_tva,
      montant_ttc : this.calculate.montant_ttc
    });
  }

  addLigne(){
    console.log(this.formLigneBon.value);

    this.dataList.push(this.formLigneBon.value);
    
    console.log(this.dataList);
    this.dataSource = new MatTableDataSource(this.dataList);

    this.declareFormLigneBon();
    
    
  }

}
