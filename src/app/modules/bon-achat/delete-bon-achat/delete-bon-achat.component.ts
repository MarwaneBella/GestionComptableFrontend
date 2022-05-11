import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BonAchat } from 'src/app/entities/bon-achat';
import { Formats } from 'src/app/entities/formats';
import { BonAchatService } from '../bon-achat.service';

@Component({
  selector: 'app-delete-bon-achat',
  templateUrl: './delete-bon-achat.component.html',
  styleUrls: ['./delete-bon-achat.component.css']
})
export class DeleteBonAchatComponent implements OnInit {

  bonAchat: BonAchat = new BonAchat();
  formats: Formats = new Formats();
  
  constructor(private bonAchatService: BonAchatService,
    @Inject(MAT_DIALOG_DATA) public data :any ,
   private dialogRef : MatDialogRef<DeleteBonAchatComponent>
  ){}

  ngOnInit(): void {
   if(this.data){
     this.bonAchat.idBa = this.data.idBa;
   }
  }

  deleteBonAchatById(){
    this.bonAchatService.deleteBonAchatById(this.bonAchat.idBa).subscribe(data => {
      this.dialogRef.close();
    })
  }

}
