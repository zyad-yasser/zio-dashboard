import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutDashbaordComponent } from './layouts/dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { PageHeadComponent } from './components/page-head/page-head.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    LayoutDashbaordComponent,
    LoginComponent,
    SidenavComponent,
    PageHeadComponent,
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class AdminModule { }
