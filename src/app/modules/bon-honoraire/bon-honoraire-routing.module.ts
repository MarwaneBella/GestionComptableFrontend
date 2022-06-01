import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditBonHonoraireComponent } from './add-edit-bon-honoraire/add-edit-bon-honoraire.component';
import { ListBonHonoraireComponent } from './list-bon-honoraire/list-bon-honoraire.component';
import { ShowFactureComponent } from './show-facture/show-facture.component';

const routes: Routes = [
  {
    path : '',
    component:ListBonHonoraireComponent
  },
  {
    path :'addBonHonoraire' ,
    component : AddEditBonHonoraireComponent
  },
  {
    path :'editBonHonoraire/:id' ,
    component : AddEditBonHonoraireComponent
  },
  {
    path :'showFacture',
    component :ShowFactureComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BonHonoraireRoutingModule { }
