import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categorie } from 'src/app/entities/categorie';
import { CategorieService } from '../categorie.service';

@Component({
  selector: 'app-delete-categorie',
  templateUrl: './delete-categorie.component.html',
  styleUrls: ['./delete-categorie.component.css']
})
export class DeleteCategorieComponent implements OnInit {

  categorie: Categorie = new Categorie();
  
  constructor(private categorieService: CategorieService,
    @Inject(MAT_DIALOG_DATA) public data :any ,
   private dialogRef : MatDialogRef<DeleteCategorieComponent>
  ){}

  ngOnInit(): void {
   if(this.data){
     this.categorie.id_cat = this.data.id_cat ;
     this.categorie.nom_cat = this.data.nom_cat ;
   }
  }

  deleteCategorieById(){
    this.categorieService.deleteCategorieById(this.categorie.id_cat).subscribe(data => {
      this.dialogRef.close();
    })
  }
}
