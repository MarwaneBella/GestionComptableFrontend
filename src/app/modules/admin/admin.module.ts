import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ListUserComponent } from './list-user/list-user.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AdminComponent,
    ListUserComponent,
    AddEditUserComponent,
    DeleteUserComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
