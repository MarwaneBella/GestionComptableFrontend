import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategorieRoutingModule } from './categorie-routing.module';
import { CategorieComponent } from './categorie.component';
import { ListCategorieComponent } from './list-categorie/list-categorie.component';

import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteCategorieComponent } from './delete-categorie/delete-categorie.component';
import { EditCategorieComponent } from './edit-categorie/edit-categorie.component';


@NgModule({
  declarations: [
    CategorieComponent,
    ListCategorieComponent,
    DeleteCategorieComponent,
    EditCategorieComponent
  ],
  imports: [
    CommonModule,
    CategorieRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CategorieModule { }
