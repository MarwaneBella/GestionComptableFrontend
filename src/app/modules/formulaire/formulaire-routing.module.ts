import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttestationStageComponent } from './attestation-stage/attestation-stage.component';
import { AttestationTravailComponent } from './attestation-travail/attestation-travail.component';
import { LettreMissionComponent } from './lettre-mission/lettre-mission.component';

const routes: Routes = [
  {
    path :'attestationStage',
    component:AttestationStageComponent
  },
  {
    path :'attestationTravail',
    component :AttestationTravailComponent
  },
  {
    path :'lettreMission',
    component:LettreMissionComponent
  },
  {
    path:'', redirectTo:'attestationStage', pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormulaireRoutingModule { }
