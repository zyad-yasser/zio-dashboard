import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuardService } from '../core/gaurds/login-guard.service';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutDashbaordComponent } from './layouts/dashboard/dashboard.component';
import { LayoutLoginComponent } from './layouts/login/login.component';
import { AccessGuardService } from '../core/gaurds/access-guard.service';
import { ErrorComponent } from './pages/error/error.component';
import { UsersComponent } from './pages/users/users.component';
import { UploadsComponent } from './pages/uploads/uploads.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { SectionsComponent } from './pages/sections/sections.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { InformationComponent } from './pages/information/information.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { CommentsComponent } from './pages/comments/comments.component';
import { PartnersComponent } from './pages/partners/partners.component';
import { AgentsComponent } from './pages/agents/agents.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { CountriesComponent } from './pages/countries/countries.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard'
  },
  {
    path: 'login',
    component: LayoutLoginComponent,
    canActivate: [LoginGuardService],
    children: [
      {
        path: '',
        component: LoginComponent,
        data: {
          path: 'login',
          title: 'Login',
          layout: 'login'
        },
      }
    ]
  },
  {
    path: 'error',
    component: LayoutLoginComponent,
    children: [
      {
        path: '',
        component: ErrorComponent,
        data: {
          path: 'error',
          title: 'Error',
          layout: 'error'
        },
      }
    ]
  },
  {
    path: '',
    component: LayoutDashbaordComponent,
    canActivate: [AccessGuardService],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          path: 'dashboard',
          title: 'Dashboard',
          layout: 'dashboard'
        },
      },
      {
        path: 'users',
        component: UsersComponent,
        data: {
          path: 'users',
          title: 'Users',
          layout: 'dashboard'
        },
      },
      {
        path: 'media',
        component: UploadsComponent,
        data: {
          path: 'media',
          title: 'Media',
          layout: 'dashboard'
        },
      },
      {
        path: 'projects',
        component: ProjectsComponent,
        data: {
          path: 'projects',
          title: 'Projects',
          layout: 'dashboard'
        },
      },
      {
        path: 'sections',
        component: SectionsComponent,
        data: {
          path: 'sections',
          title: 'Sections',
          layout: 'dashboard'
        },
      },
      {
        path: 'accounts',
        component: AccountsComponent,
        data: {
          path: 'accounts',
          title: 'Accounts',
          layout: 'dashboard'
        },
      },
      {
        path: 'information',
        component: InformationComponent,
        data: {
          path: 'information',
          title: 'Information',
          layout: 'dashboard'
        },
      },
      {
        path: 'clients',
        component: ClientsComponent,
        data: {
          path: 'clients',
          title: 'Clients',
          layout: 'dashboard'
        },
      },
      {
        path: 'articles',
        component: ArticlesComponent,
        data: {
          path: 'articles',
          title: 'Articles',
          layout: 'dashboard'
        },
      },
      {
        path: 'comments',
        component: CommentsComponent,
        data: {
          path: 'comments',
          title: 'Comments',
          layout: 'dashboard'
        },
      },
      {
        path: 'partners',
        component: PartnersComponent,
        data: {
          path: 'partners',
          title: 'Partners',
          layout: 'dashboard'
        },
      },
      {
        path: 'agents',
        component: AgentsComponent,
        data: {
          path: 'agents',
          title: 'Agents',
          layout: 'dashboard'
        },
      },
      {
        path: 'countries',
        component: CountriesComponent,
        data: {
          path: 'countries',
          title: 'Countries',
          layout: 'dashboard'
        },
      },
      {
        path: 'requests',
        component: RequestsComponent,
        data: {
          path: 'requests',
          title: 'Requests',
          layout: 'dashboard'
        },
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'error'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
