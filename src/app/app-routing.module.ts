import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';

const routes: Routes = [

  {
    path:'user',
    loadChildren:() =>import('./modules/user/user.module').then(m => m.UserModule)
  },

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
      },
      {
        path :'bonAchat',
        loadChildren:() =>import('./modules/bon-achat/bon-achat.module').then(m => m.BonAchatModule)
      },
      {
        path :'formulaire',
        loadChildren:()=>import('./modules/formulaire/formulaire.module').then(m=>m.FormulaireModule)
      },
      {
        path :'reglementFournisseur',
        loadChildren:()=>import('./modules/reglement-fournisseur/reglement-fournisseur.module').then(m=>m.ReglementFournisseurModule)
      }

      
    ],
    
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
