import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { ListClientComponent } from './list-client/list-client.component';

import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEditClientComponent } from './add-edit-client/add-edit-client.component';
import { ShowClientComponent } from './show-client/show-client.component';
import { DeleteClientComponent } from './delete-client/delete-client.component';



@NgModule({
  declarations: [
    ClientComponent,
    ListClientComponent,
    AddEditClientComponent,
    ShowClientComponent,
    DeleteClientComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ClientModule { }
