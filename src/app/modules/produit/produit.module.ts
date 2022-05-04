import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProduitRoutingModule } from './produit-routing.module';
import { ProduitComponent } from './produit.component';
import { ListProduitComponent } from './list-produit/list-produit.component';
import { ShowProduitComponent } from './show-produit/show-produit.component';
import { AddEditProduitComponent } from './add-edit-produit/add-edit-produit.component';


import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    ProduitComponent,
    ListProduitComponent,
    ShowProduitComponent,
    AddEditProduitComponent
  ],
  imports: [
    CommonModule,
    ProduitRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProduitModule { }
