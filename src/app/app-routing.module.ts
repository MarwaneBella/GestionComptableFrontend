import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    children:[
      {
        path:'client',
        loadChildren: () =>import('./modules/client/client.module').then(m => m.ClientModule)
      },
      {
        path :'produit',
        loadChildren:() =>import('./modules/produit/produit.module').then(m => m.ProduitModule)
      },
      {
        path :'fournisseur',
        loadChildren:() =>import('./modules/fournisseur/fournisseur.module').then(m => m.FournisseurModule)
      }
      
    ],
    
  },

  {
    path:'user',
    loadChildren:() =>import('./modules/user/user.module').then(m => m.UserModule)
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }