import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BonAchat } from 'src/app/entities/bon-achat';
import { BonAchatService } from '../bon-achat.service';

@Component({
  selector: 'app-delete-bon-achat',
  templateUrl: './delete-bon-achat.component.html',
  styleUrls: ['./delete-bon-achat.component.css']
})
export class DeleteBonAchatComponent implements OnInit {

  bonAchat: BonAchat = new BonAchat();
  
  constructor(private bonAchatService: BonAchatService,
    @Inject(MAT_DIALOG_DATA) public data :any ,
   private dialogRef : MatDialogRef<DeleteBonAchatComponent>
  ){}

  ngOnInit(): void {
   if(this.data){
     this.bonAchat.idBa = this.data.idBa;
     this.bonAchat.bonANum = this.data.bonANum;
     
   }
  }

  deleteBonAchatById(){
    this.bonAchatService.deleteBonAchatById(this.bonAchat.idBa).subscribe(data => {
      this.dialogRef.close();
    })
  }

}
