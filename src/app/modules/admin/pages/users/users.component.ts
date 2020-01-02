import { Component, OnInit } from '@angular/core';
import { usersColumns } from 'src/app/statics/tables';
import { UsersService } from 'src/app/services/users/users.service';
import { MapperService } from 'src/app/services/mappers/mapper.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { UserDataComponent } from '../../modals/user-data/user-data.component';
import { modalConfig } from 'src/app/statics/constants';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {
  public currentLocation: string[] = ['Home', 'Users'];
  public pageName = 'Users';
  public displayedColumns = usersColumns;
  public pageSizeOptions = [25, 100, 250];
  public tableType = 'users';
  public maxPageSize = 25;
  public activeSortColumn = 'Last Name';
  public sortDirection = 'asc';
  public users: any[] = [];

  constructor(
    public dialog: MatDialog,
    private usersService: UsersService,
    private maperService: MapperService,
    private modalService: ModalService,
  ) {}

  public listUsers(): void {
    this.usersService.list()
      .subscribe((res) => {
        this.users = this.maperService.users(res);
      });
  }

  public createUser(): void {
    const cb = (res) => {
      if (res) {
        this.users = [];
        this.listUsers();
      }
    };
    const config = { ...modalConfig, data: { type: 'createUserModal' } };
    this.modalService.init(this, UserDataComponent, cb, config);
  }

  ngOnInit() {
    this.listUsers();
  }
}
