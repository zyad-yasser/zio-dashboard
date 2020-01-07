import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/users/users.service';
import { toastrConfig } from 'src/app/statics/constants';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { ProjectsService } from 'src/app/services/projects/projects.service';
import { TypesService } from 'src/app/services/types/types.service';
import { PartnersService } from 'src/app/services/partners/partners.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { AgentsService } from 'src/app/services/agents/agents.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.sass']
})
export class ConfirmationComponent implements OnInit {
  public confirmString1 = '';
  public modalTitle = '';
  public buttonAction = '';
  isSaving: boolean;

  constructor(
    private toastrService: ToastrService,
    private usersService: UsersService,
    private projectsService: ProjectsService,
    private clientsService: ClientsService,
    public dialogRef: MatDialogRef<ConfirmationComponent>,
    private typeService: TypesService,
    private partnersService: PartnersService,
    private categoriesService: CategoriesService,
    private agentsService: AgentsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public close(): void {
    this.dialogRef.close();
  }

  public onSubmit() {}

  public deleteUser(): void {
    const userId = this.data.id;
    this.isSaving = true;
    this.usersService.delete(userId).subscribe(
      () => {
        this.dialogRef.close('deleted');
        this.toastrService.success('User deleted successfully', null, toastrConfig);
      },
      () => {
        this.dialogRef.close();
        this.toastrService.error('Problem deleting user', null, toastrConfig);
      }
    );
  }

  public deleteClient(): void {
    const clientId = this.data.id;
    this.isSaving = true;
    this.clientsService.delete(clientId).subscribe(
      () => {
        this.dialogRef.close('deleted');
        this.toastrService.success('Client deleted successfully', null, toastrConfig);
      },
      () => {
        this.dialogRef.close();
        this.toastrService.error('Problem deleting client', null, toastrConfig);
      },
      () => {
        this.isSaving = false;
      }
    );
  }

  public deleteAgent(): void {
    const agentId = this.data.id;
    this.isSaving = true;
    this.agentsService.delete(agentId).subscribe(
      () => {
        this.dialogRef.close('deleted');
        this.toastrService.success('Agent deleted successfully', null, toastrConfig);
      },
      () => {
        this.dialogRef.close();
        this.toastrService.error('Problem deleting agent', null, toastrConfig);
      },
      () => {
        this.isSaving = false;
      }
    );
  }

  public deleteCategory(): void {
    const categoryId = this.data.id;
    this.isSaving = true;
    this.categoriesService.delete(categoryId).subscribe(
      () => {
        this.dialogRef.close('deleted');
        this.toastrService.success('Category deleted successfully', null, toastrConfig);
      },
      () => {
        this.dialogRef.close();
        this.toastrService.error('Problem deleting category', null, toastrConfig);
      },
      () => {
        this.isSaving = false;
      }
    );
  }

  public deletePartner(): void {
    const partnerId = this.data.id;
    this.isSaving = true;
    this.partnersService.delete(partnerId).subscribe(
      () => {
        this.dialogRef.close('deleted');
        this.toastrService.success('Partner deleted successfully', null, toastrConfig);
      },
      () => {
        this.dialogRef.close();
        this.toastrService.error('Problem deleting partner', null, toastrConfig);
      },
      () => {
        this.isSaving = false;
      }
    );
  }

  public deleteType(): void {
    const typeId = this.data.id;
    this.isSaving = true;
    this.typeService.delete(typeId).subscribe(
      () => {
        this.dialogRef.close('deleted');
        this.toastrService.success('Client deleted successfully', null, toastrConfig);
      },
      () => {
        this.dialogRef.close();
        this.toastrService.error('Problem deleting client', null, toastrConfig);
      },
      () => {
        this.isSaving = false;
      }
    );
  }

  public deleteProject(): void {
    const projectId = this.data.id;
    this.isSaving = true;
    this.projectsService.delete(projectId).subscribe(
      () => {
        this.dialogRef.close('deleted');
        this.toastrService.success('Project deleted successfully', null, toastrConfig);
      },
      () => {
        this.dialogRef.close();
        this.toastrService.error('Problem deleting project', null, toastrConfig);
      },
      () => {
        this.isSaving = false;
      }
    );
  }

  public resetPassword(): void {
    const userId = this.data.id;
    this.isSaving = true;
    this.usersService.resetPassword(userId).subscribe(
      () => {
        this.dialogRef.close('toggled');
        this.toastrService.success('User password reseted successfully', null, toastrConfig);
      },
      () => {
        this.dialogRef.close();
        this.toastrService.error('Error resetting user password', null, toastrConfig);
      }
    );
  }

  ngOnInit(): void {
    if (this.data.type === 'deleteUserModal') {
      this.confirmString1 = 'Are you sure want to delete this user ?';
      this.buttonAction = 'Delete';
      this.modalTitle = 'Delete user';
      this.onSubmit = this.deleteUser;
    } else if (this.data.type === 'deleteClientModal') {
      this.confirmString1 = 'Are you sure want to delete this client ?';
      this.buttonAction = 'Delete';
      this.modalTitle = 'Delete client';
      this.onSubmit = this.deleteClient;
    } else if (this.data.type === 'deleteAgentModal') {
      this.confirmString1 = 'Are you sure want to delete this agent ?';
      this.buttonAction = 'Delete';
      this.modalTitle = 'Delete agent';
      this.onSubmit = this.deleteAgent;
    } else if (this.data.type === 'deleteCategoryModal') {
      this.confirmString1 = 'Are you sure want to delete this category ?';
      this.buttonAction = 'Delete';
      this.modalTitle = 'Delete category';
      this.onSubmit = this.deleteCategory;
    } else if (this.data.type === 'deletePartnerModal') {
      this.confirmString1 = 'Are you sure want to delete this partner ?';
      this.buttonAction = 'Delete';
      this.modalTitle = 'Delete partner';
      this.onSubmit = this.deletePartner;
    } else if (this.data.type === 'deleteTypeModal') {
      this.confirmString1 = 'Are you sure want to delete this type ?';
      this.buttonAction = 'Delete';
      this.modalTitle = 'Delete type';
      this.onSubmit = this.deleteType;
    } else if (this.data.type === 'deleteProjectModal') {
      this.confirmString1 = 'Are you sure want to delete this project ?';
      this.buttonAction = 'Delete';
      this.modalTitle = 'Delete project';
      this.onSubmit = this.deleteProject;
    } else if (this.data.type === 'resetPasswordModal') {
      this.modalTitle = 'MODALS.RESET_PASSWORD';
      this.confirmString1 = 'Are you sure want to reset this users password ?';
      this.buttonAction = 'Reset';
      this.modalTitle = 'Reset password';
      this.onSubmit = this.resetPassword;
    }
  }
}
