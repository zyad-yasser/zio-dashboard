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
import { MultiStageComponent } from './components/multi-stage/multi-stage.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { StackComponent } from './components/stack/stack.component';
import { UsersComponent } from './pages/users/users.component';
import { UploadsComponent } from './pages/uploads/uploads.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { SectionsComponent } from './pages/sections/sections.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { InformationComponent } from './pages/information/information.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { PartnersComponent } from './pages/partners/partners.component';
import { AgentsComponent } from './pages/agents/agents.component';
import { CountriesComponent } from './pages/countries/countries.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { ErrorComponent } from './pages/error/error.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { ImageListComponent } from './components/image-list/image-list.component';
import { UploaderComponent } from './components/uploader/uploader.component';
import { BodyComposerComponent } from './components/body-composer/body-composer.component';
import { CoreModule } from '../core/core.module';
import { LayoutLoginComponent } from './layouts/login/login.component';
import { LoginFormComponent } from './components/login/login.component';
import { ConfirmationComponent } from './modals/confirmation/confirmation.component';
import { ChangePasswordComponent } from './modals/change-password/change-password.component';
import { ValidatorComponent } from './components/validator/validator.component';
import { CommentsComponent } from './pages/comments/comments.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { UserDataComponent } from './modals/user-data/user-data.component';
import { ImportComponent } from './components/import/import.component';
import { ImageCardComponent } from './components/image-card/image-card.component';
import { ClientsDataComponent } from './modals/client-data/client-data.component';
import { MediaChooseComponent } from './modals/media-choose/media-choose.component';
import { MediaComponent } from './components/media/media.component';
import { ProjectComponent } from './pages/project/project.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { ProjectTypesComponent } from './pages/project-types/project-types.component';
import { ProjectTypeComponent } from './pages/project-type/project-type.component';
import { SectionComponent } from './pages/section/section.component';
import { ArticleComponent } from './pages/article/article.component';
import { CategoryDataComponent } from './modals/category-data/category-data.component';
import { AgentDataComponent } from './modals/agent-data/agent-data.component';
import { PartnerDataComponent } from './modals/partner-data/partner-data.component';
import { CategoriesComponent } from './pages/categories/categories.component';

@NgModule({
  declarations: [
    CategoryDataComponent,
    AgentDataComponent,
    PartnerDataComponent,
    UserDataComponent,
    ClientsDataComponent,
    ValidatorComponent,
    ConfirmationComponent,
    ChangePasswordComponent,
    DashboardComponent,
    LayoutLoginComponent,
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
    TachometerComponent,
    MultiStageComponent,
    StackComponent,
    UsersComponent,
    UploadsComponent,
    ProjectsComponent,
    SectionsComponent,
    AccountsComponent,
    InformationComponent,
    ClientsComponent,
    ArticlesComponent,
    PartnersComponent,
    AgentsComponent,
    CountriesComponent,
    SearchResultsComponent,
    ErrorComponent,
    DataTableComponent,
    ImageListComponent,
    UploaderComponent,
    BodyComposerComponent,
    LoginFormComponent,
    CommentsComponent,
    RequestsComponent,
    ImportComponent,
    ImageCardComponent,
    MediaChooseComponent,
    MediaComponent,
    ProjectComponent,
    ProjectTypesComponent,
    ProjectTypeComponent,
    SectionComponent,
    ArticleComponent,
    CategoriesComponent
  ],
  imports: [
    CoreModule,
    AdminRoutingModule,
    CommonModule,
    SharedModule,
    NgApexchartsModule,
    CKEditorModule
  ],
  entryComponents: [
    UserDataComponent,
    ClientsDataComponent,
    ConfirmationComponent,
    ChangePasswordComponent,
    MediaChooseComponent,
    CategoryDataComponent,
    AgentDataComponent,
    PartnerDataComponent
  ]
})
export class AdminModule { }
