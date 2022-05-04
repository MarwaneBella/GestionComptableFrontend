import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Categorie } from 'src/app/entities/categorie';
import { CategorieService } from '../categorie.service';
import { DeleteCategorieComponent } from '../delete-categorie/delete-categorie.component';
import { EditCategorieComponent } from '../edit-categorie/edit-categorie.component';

@Component({
  selector: 'app-list-categorie',
  templateUrl: './list-categorie.component.html',
  styleUrls: ['./list-categorie.component.css']
})
export class ListCategorieComponent implements AfterViewInit,OnInit {

  displayedColumns: string[] =['nom','actions']
  categories : Categorie[];
  categorie : Categorie = new Categorie();
  dataSource: MatTableDataSource<Categorie>;
  categorieForm: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private categorieService: CategorieService ,private _formBuilder: FormBuilder,  public dialog: MatDialog ) { }

  ngOnInit(): void {
    this.declareForm();
  }

  ngAfterViewInit(): void {
    
    this.getAllCategories();
  }

  declareForm(){
    this.categorieForm = this._formBuilder.group({
      nom_cat: ['',Validators.required]
    });
  }

  

  getAllCategories(){
    this.categorieService.getAllCategories().subscribe(data => {
      this.categories = data;
      this.dataSource = new MatTableDataSource(this.categories);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  onSubmit(){
    this.categorie = this.categorieForm.value;
    
    this.categorieForm.reset();
    
    this.categorieService.addCategorie(this.categorie).subscribe( (data: any) =>{
      this.ngAfterViewInit();

    });

  }

  openDialogEdit(row: any){
    this.dialog.open(EditCategorieComponent,{
      width:'30%',
      data:row,
    }).afterClosed().subscribe(val =>{
      this.getAllCategories() ;
    });
  }

  openDialogDelete(row: any){
    this.dialog.open(DeleteCategorieComponent,{
      width:'30%',
      data:row,
    }).afterClosed().subscribe(val =>{
      this.getAllCategories() ;
    });
  }

}
