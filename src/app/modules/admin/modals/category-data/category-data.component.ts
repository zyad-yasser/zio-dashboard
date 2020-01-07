import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { toastrConfig } from 'src/app/statics/constants';
import { emailPattern } from 'src/app/statics/patterns';
import { Observable } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { MediaChooseComponent } from '../media-choose/media-choose.component';

@Component({
  selector: 'app-category-data',
  templateUrl: './category-data.component.html',
  styleUrls: ['./category-data.component.sass']
})
export class CategoryDataComponent implements OnInit {
  public category: any = {};
  public categoryForm: FormGroup = this.formConstructor();
  public emailPattern = emailPattern;
  public isSaving: boolean;
  public emailExistError = false;
  public modalTitle = '';
  public modalAction = '';
  public observable: Observable<any>;
  public categoryId: string;

  constructor(
    public dialogRef: MatDialogRef<CategoryDataComponent>,
    public dialogRefMedia: MatDialogRef<MediaChooseComponent>,
    private toastrService: ToastrService,
    private categoriesService: CategoriesService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public close(): void {
    this.dialogRef.close();
  }

  public formConstructor(): FormGroup {
    const form: any = {
      name: new FormControl(this.category.name, [Validators.required])
    };
    return new FormGroup(form);
  }

  public onSubmit() {
    this.category.name = this.categoryForm.get('name').value;
    this.observable =
      this.data.type === 'createCategoryModal'
        ? this.categoriesService.create(this.category)
        : this.categoriesService.update(this.category, this.categoryId);
    this.observable.subscribe(
      (res) => {
        this.dialogRef.close(this.category);
        this.toastrService.success(
          'Operation done successfully',
          null,
          toastrConfig
        );
      },
      (err) => {
        this.toastrService.success(
          'Error in the operation',
          null,
          toastrConfig
        );
      }
    );
  }

  private modalInit(): void {
    if (this.data.type === 'createCategoryModal') {
      this.modalAction = 'Create';
      this.modalTitle = 'Create category';
    } else if (this.data.type === 'editCategoryModal') {
      this.modalAction = 'Update';
      this.modalTitle = 'Update category';
      this.categoryId = this.data.id;
      this.category = this.data.category;
      this.categoryForm = this.formConstructor();
    }
  }

  public ngOnInit(): void {
    this.modalInit();
  }
}
