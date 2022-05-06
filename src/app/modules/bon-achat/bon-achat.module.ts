import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BonAchatRoutingModule } from './bon-achat-routing.module';
import { BonAchatComponent } from './bon-achat.component';
import { ListBonAchatComponent } from './list-bon-achat/list-bon-achat.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/material.module';
import { DeleteBonAchatComponent } from './delete-bon-achat/delete-bon-achat.component';


@NgModule({
  declarations: [
    BonAchatComponent,
    ListBonAchatComponent,
    DeleteBonAchatComponent
  ],
  imports: [
    CommonModule,
    BonAchatRoutingModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BonAchatModule { }
