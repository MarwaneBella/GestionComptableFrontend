import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormulaireRoutingModule } from './formulaire-routing.module';
import { FormulaireComponent } from './formulaire.component';
import { MaterialModule } from 'src/app/material.module';

import { AttestationStageComponent } from './attestation-stage/attestation-stage.component';
import { AttestationTravailComponent } from './attestation-travail/attestation-travail.component';
import { LettreMissionComponent } from './lettre-mission/lettre-mission.component';

import {NgxPrintModule} from 'ngx-print';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FormulaireComponent,
    AttestationStageComponent,
    AttestationTravailComponent,
    LettreMissionComponent
  ],
  imports: [
    CommonModule,
    FormulaireRoutingModule,
    NgxPrintModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FormulaireModule { }
