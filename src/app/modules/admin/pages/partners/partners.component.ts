import { Component, OnInit } from '@angular/core';
import { partnersColumns } from 'src/app/statics/tables';
import { MatDialog } from '@angular/material';
import { PartnersService } from 'src/app/services/partners/partners.service';
import { MapperService } from 'src/app/services/mappers/mapper.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { modalConfig } from 'src/app/statics/constants';
import { PartnerDataComponent } from '../../modals/partner-data/partner-data.component';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.sass']
})
export class PartnersComponent implements OnInit {
  public currentLocation: string[] = ['Home', 'Partners'];
  public pageName = 'Partners';
  public displayedColumns = partnersColumns;
  public pageSizeOptions = [25, 100, 250];
  public tableType = 'partners';
  public maxPageSize = 25;
  public activeSortColumn = 'Partner name';
  public sortDirection = 'asc';
  public partners: any[] = [];

  constructor(
    public dialog: MatDialog,
    private partnersService: PartnersService,
    private mapperService: MapperService,
    private modalService: ModalService,
  ) {}

  public listPartners(): void {
    this.partnersService.list()
      .subscribe((res) => {
        this.partners = this.mapperService.partners(res);
      });
  }

  public createPartner(): void {
    const cb = (res) => {
      if (res) {
        this.partners = [];
        this.listPartners();
      }
    };
    const config = { ...modalConfig, data: { type: 'createPartnerModal' } };
    this.modalService.init(this, PartnerDataComponent, cb, config);
  }

  ngOnInit() {
    this.listPartners();
  }
}
