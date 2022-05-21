import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddReglementFournisseurComponent } from './add-reglement-fournisseur/add-reglement-fournisseur.component';

const routes: Routes = [
  {
    path:'',
    component:AddReglementFournisseurComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReglementFournisseurRoutingModule { }
