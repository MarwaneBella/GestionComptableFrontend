import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBonAchatComponent } from './list-bon-achat/list-bon-achat.component';

const routes: Routes = [
  {
    path:'',
    component:ListBonAchatComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BonAchatRoutingModule { }
