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
        path :'reglementFournisseur',
        loadChildren:()=>import('./modules/reglement-fournisseur/reglement-fournisseur.module').then(m=>m.ReglementFournisseurModule)
      },
      {
        path:'bonHonoraire',
        loadChildren:()=>import('./modules/bon-honoraire/bon-honoraire.module').then(m =>m.BonHonoraireModule)
      },
      {
        path :'reglementClient',
        loadChildren:()=>import('./modules/reglement-client/reglement-client.module').then(m=>m.ReglementClientModule)
      },
      {
        path :'facture',
        loadChildren:()=>import('./modules/facture/facture.module').then(m => m.FactureModule)
      },
      {
        path :'formulaire',
        loadChildren:()=>import('./modules/formulaire/formulaire.module').then(m=>m.FormulaireModule)
      },
      {
        path :'dashboard',
        loadChildren:()=>import('./modules/dashboard/dashboard.module').then(m=>m.DashboardModule)
      },
      {
        path:'',
        redirectTo:'dashboard',
        pathMatch:'full'
      },
     

      
    ],
    
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
