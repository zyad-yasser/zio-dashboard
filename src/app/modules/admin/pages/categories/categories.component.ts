import { Component, OnInit } from '@angular/core';
import { CategoryDataComponent } from '../../modals/category-data/category-data.component';
import { MatDialog } from '@angular/material';
import { MapperService } from 'src/app/services/mappers/mapper.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { modalConfig } from 'src/app/statics/constants';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { categoriesColumns } from 'src/app/statics/tables';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass']
})
export class CategoriesComponent implements OnInit {
  public currentLocation: string[] = ['Home', 'Categories'];
  public pageName = 'Categories';
  public displayedColumns = categoriesColumns;
  public pageSizeOptions = [25, 100, 250];
  public tableType = 'categories';
  public maxPageSize = 25;
  public activeSortColumn = 'Category name';
  public sortDirection = 'asc';
  public categories: any[] = [];

  constructor(
    public dialog: MatDialog,
    private categoriesService: CategoriesService,
    private mapperService: MapperService,
    private modalService: ModalService,
  ) {}

  public listCategories(): void {
    this.categoriesService.list()
      .subscribe((res) => {
        this.categories = this.mapperService.categories(res);
      });
  }

  public createCategory(): void {
    const cb = (res) => {
      if (res) {
        this.categories = [];
        this.listCategories();
      }
    };
    const config = { ...modalConfig, data: { type: 'createCategoryModal' } };
    this.modalService.init(this, CategoryDataComponent, cb, config);
  }

  ngOnInit() {
    this.listCategories();
  }
}
