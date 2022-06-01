import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginActivateGuard } from './auth/login-activate.guard';
import { Error403Component } from './shared/error-pages/error403/error403.component';
import { Error404Component } from './shared/error-pages/error404/error404.component';
import { Error500Component } from './shared/error-pages/error500/error500.component';
import { HomeComponent } from './shared/home/home.component';

const routes: Routes = [

  {
    path:'user',
    loadChildren:() =>import('./modules/user/user.module').then(m => m.UserModule),
    canActivate:[LoginActivateGuard]
  },
  {
    
    path:'error500',
    component:Error500Component,
    
  },
  {
    
    path:'error403',
    component:Error403Component,
    
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
        path :'dashboard',
        loadChildren:()=>import('./modules/dashboard/dashboard.module').then(m=>m.DashboardModule)
      },
      {
        path :'reglementFournisseur',
        loadChildren:()=>import('./modules/reglement-fournisseur/reglement-fournisseur.module').then(m=>m.ReglementFournisseurModule)
      },
      {
        path :'admin',
        loadChildren:()=>import('./modules/admin/admin.module').then(m=>m.AdminModule)
      },
      {
        path:'',
        redirectTo:'dashboard',
        pathMatch:'full'
      },

      
    ],
    canActivate:[AuthGuard], data:{roles:['Admin']},
    
  },
  { 
    path: '**', 
    pathMatch: 'full',
    component: Error404Component
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
