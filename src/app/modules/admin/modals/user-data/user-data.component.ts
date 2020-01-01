import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import {
  FormControl,
  Validators,
  FormGroup
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { toastrConfig } from 'src/app/statics/constants';
import { emailPattern } from 'src/app/statics/patterns';
import { UsersService } from 'src/app/services/users/users.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.sass']
})
export class UserDataComponent implements OnInit {
  public user: any = {};
  public userForm: FormGroup = this.formConstructor();
  public emailPattern = emailPattern;
  public isSaving: boolean;
  public emailExistError = false;
  public modalTitle = '';
  public modalAction = '';
  public observable: Observable<any>;
  public userId: string;

  constructor(
    public dialogRef: MatDialogRef<UserDataComponent>,
    private usersService: UsersService,
    private toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public close(): void {
    this.dialogRef.close();
  }

  public formConstructor(): FormGroup {
    const form: any = {
      firstName: new FormControl(this.user.firstName, [Validators.required]),
      lastName: new FormControl(this.user.lastName, [Validators.required]),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.pattern(emailPattern)
      ])
    };
    return new FormGroup(form);
  }

  public onSubmit() {
    this.user = {
      firstName: this.userForm.get('firstName').value,
      lastName: this.userForm.get('lastName').value,
      email: this.userForm.get('email').value
    };
    this.observable = this.data.type === 'createUserModal'
      ? this.usersService.create(this.user)
      : this.usersService.update(this.user, this.userId);
    this.observable
      .subscribe(
        (res) => {
          this.dialogRef.close(this.user);
          this.toastrService.success('Operation done successfully', null, toastrConfig);
        },
        (err) => {
          this.emailExistError = true;
        }
      );
  }

  private modalInit(): void {
    if (this.data.type === 'createUserModal') {
      this.modalAction = 'Create';
      this.modalTitle = 'Create user';
    } else if (this.data.type === 'editUserModal') {
      this.modalAction = 'Update';
      this.modalTitle = 'Update user';
      this.userId = this.data.id;
      this.user = this.data.user;
      this.userForm = this.formConstructor();
    }
  }

  public ngOnInit(): void {
    this.modalInit();
  }
}
