import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FournisseurRoutingModule } from './fournisseur-routing.module';
import { FournisseurComponent } from './fournisseur.component';
import { AddEditFournisseurComponent } from './add-edit-fournisseur/add-edit-fournisseur.component';
import { ListFournisseurComponent } from './list-fournisseur/list-fournisseur.component';
import { ShowFournisseurComponent } from './show-fournisseur/show-fournisseur.component';
import { DeleteFournisseurComponent } from './delete-fournisseur/delete-fournisseur.component';


@NgModule({
  declarations: [
    FournisseurComponent,
    AddEditFournisseurComponent,
    ListFournisseurComponent,
    ShowFournisseurComponent,
    DeleteFournisseurComponent
  ],
  imports: [
    CommonModule,
    FournisseurRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FournisseurModule { }
