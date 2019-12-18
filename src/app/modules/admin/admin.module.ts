import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutDashbaordComponent } from './layouts/dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { PageHeadComponent } from './components/page-head/page-head.component';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoaderComponent } from './components/loader/loader.component';
import { BreadCrumpComponent } from './components/bread-crump/bread-crump.component';
import { TitleComponent } from './components/title/title.component';
import { CardComponent } from './components/card/card.component';
import { TachometerComponent } from './components/tachometer/tachometer.component';

@NgModule({
  declarations: [
    DashboardComponent,
    LayoutDashbaordComponent,
    LoginComponent,
    SidenavComponent,
    PageHeadComponent,
    NavbarComponent,
    FooterComponent,
    LoaderComponent,
    BreadCrumpComponent,
    TitleComponent,
    CardComponent,
    TachometerComponent
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    SharedModule
  ],
})
export class AdminModule { }
