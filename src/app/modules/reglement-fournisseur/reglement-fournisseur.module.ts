import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReglementFournisseurRoutingModule } from './reglement-fournisseur-routing.module';
import { ReglementFournisseurComponent } from './reglement-fournisseur.component';
import { AddReglementFournisseurComponent } from './add-reglement-fournisseur/add-reglement-fournisseur.component';
import { DeleteReglementFournisseurComponent } from './delete-reglement-fournisseur/delete-reglement-fournisseur.component';
import { ListReglementFournisseurComponent } from './list-reglement-fournisseur/list-reglement-fournisseur.component';
import { ShowReglementFournisseurComponent } from './show-reglement-fournisseur/show-reglement-fournisseur.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/material.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';


@NgModule({
  declarations: [
    ReglementFournisseurComponent,
    AddReglementFournisseurComponent,
    DeleteReglementFournisseurComponent,
    ListReglementFournisseurComponent,
    ShowReglementFournisseurComponent
  ],
  imports: [
    CommonModule,
    ReglementFournisseurRoutingModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule
  ]
})
export class ReglementFournisseurModule { }
