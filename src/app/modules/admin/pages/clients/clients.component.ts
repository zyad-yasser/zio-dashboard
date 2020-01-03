import { Component, OnInit } from '@angular/core';
import { clientsColumns } from 'src/app/statics/tables';
import { MatDialog } from '@angular/material';
import { UsersService } from 'src/app/services/users/users.service';
import { MapperService } from 'src/app/services/mappers/mapper.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { modalConfig } from 'src/app/statics/constants';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { ClientsDataComponent } from '../../modals/client-data/client-data.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.sass']
})
export class ClientsComponent implements OnInit {
  public currentLocation: string[] = ['Home', 'Clients'];
  public pageName = 'Clients';
  public displayedColumns = clientsColumns;
  public pageSizeOptions = [25, 100, 250];
  public tableType = 'clients';
  public maxPageSize = 25;
  public activeSortColumn = 'Client name';
  public sortDirection = 'asc';
  public clients: any[] = [];

  constructor(
    public dialog: MatDialog,
    private clientsService: ClientsService,
    private mapperService: MapperService,
    private modalService: ModalService,
  ) {}

  public listClients(): void {
    this.clientsService.list()
      .subscribe((res) => {
        this.clients = this.mapperService.clients(res);
      });
  }

  public createClient(): void {
    const cb = (res) => {
      if (res) {
        this.clients = [];
        this.listClients();
      }
    };
    const config = { ...modalConfig, data: { type: 'createClientModal' } };
    this.modalService.init(this, ClientsDataComponent, cb, config);
  }

  ngOnInit() {
    this.listClients();
  }
}
