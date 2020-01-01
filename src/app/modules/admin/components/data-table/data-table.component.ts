import {
  Component,
  OnInit,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatDialog,
  MatDialogRef
} from '@angular/material';
import { SafeStyle } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalService } from 'src/app/services/modal/modal.service';
import { HelperService } from 'src/app/services/helpers/helper.service';
import { DataTableService } from 'src/app/services/data-table/data-table.service';
import { ConfirmationComponent } from '../../modals/confirmation/confirmation.component';
import { modalConfig, toastrConfig } from 'src/app/statics/constants';
import { UsersService } from 'src/app/services/users/users.service';
import { ToastrService } from 'ngx-toastr';
import { UserDataComponent } from '../../modals/user-data/user-data.component';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.sass']
})
export class DataTableComponent implements OnInit, OnChanges {
  @Input() displayedColumns: any[];
  @Input() pageSizeOptions: string;
  @Input() tableType: string;
  @Input() hasPageSize: boolean;
  @Input() noSort: boolean;
  @Input() hasPagination: boolean;
  @Input() maxPageSize: number;
  @Input() data: any[];
  @Input() activeSortColumn: string;
  @Input() sortDirection: string;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  public dataSource: any;
  public errorMsg = '';
  public fileData;
  public dialogRef: MatDialogRef<any>;
  public modalContainer: string;
  public safePadding: SafeStyle = this.dataTable.safePadding();

  constructor(
    public dialog: MatDialog,
    private modalService: ModalService,
    private dataTable: DataTableService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private toastrService: ToastrService,
    private helper: HelperService
  ) {}

  public dataInit(data = this.data): void {
    this.dataSource = new MatTableDataSource([...data]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (item, property) => {
      return this.dataTable.sortOverride(item, property);
    };
    this.dataSource.sort = this.sort;
    if (this.maxPageSize) {
      this.paginator.pageSize = this.maxPageSize;
    }
  }

  public paginate(event, type): any {
    const pageNumber = Number(event.target.value);
    const isValidPage = this.dataTable.pageValidator(pageNumber - 1, this.paginator.getNumberOfPages() - 1);
    if (type === 'revert' && !isValidPage) {
      return event.target.value = this.paginator.pageIndex + 1;
    }
    if (isValidPage) {
      this.paginator.pageIndex = pageNumber - 1;
      this.dataSource.paginator = this.paginator;
    }
  }

  public editUser(id: number, index: number): void {
    const user = this.data[index].defaultData;
    const config = { ...modalConfig, data: { user, id, type: 'editUserModal' } };
    const cb = (res: any) => {
      if (res) {
        this.data[index]['First name'] = res.firstName;
        this.data[index]['Last name'] = res.lastName;
        this.data[index]['Email'] = res.email;
        this.data[index].defaultData = res;
        this.dataInit();
      }
    };
    this.modalService.init(this, UserDataComponent, cb, config);
  }

  public deleteUser(id: string): void {
    const type = 'deleteUserModal';
    const cb = (res: any) => {
      if (res === 'deleted') {
        this.data = this.dataSource.data.filter(item => item.id !== id);
        this.dataInit();
      }
    };
    const config = { ...modalConfig, data: { id, type } };
    this.modalService.init(this, ConfirmationComponent, cb, config);
  }

  public resetPassword(id: string): void {
    const type = 'resetPasswordModal';
    const config = { ...modalConfig, data: { id, type } };
    this.modalService.init(this, ConfirmationComponent, null, config);
  }

  public toggleActivity(id: string, index: number): void {
    this.usersService.toggleActivity(id)
      .subscribe(
        (res) => {
          this.data[index]['Status'] = this.data[index]['Status'] === 'Active' ? 'Inactive' : 'Active';
          this.dataInit();
          this.toastrService.success('User status toggled successfully', null, toastrConfig);
        },
        (err) => {
          this.toastrService.error('Error toggling user status', null, toastrConfig);
        }
      );
  }

  public alChangeWord(): void {
    const pageSize = this.paginator.pageSize;
    this.dataTable.alChangeWord(pageSize);
  }

  public solveUpload(row: any) {
    this.router.navigate([`/${row.location}/board/${row.boardId}`]);
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.dataInit();
    }
  }
}
