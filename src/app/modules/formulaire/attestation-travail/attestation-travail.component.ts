import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';


@Component({
  selector: 'app-attestation-travail',
  templateUrl: './attestation-travail.component.html',
  styleUrls: ['./attestation-travail.component.css']
})
export class AttestationTravailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  openPDF(){
    let DATA: any = document.getElementById('htmlData');

    html2canvas(DATA).then(canvas => {
      
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);

      pdf.setProperties({
        title:'Facture'
        
      });

      window.open(URL.createObjectURL(pdf.output('blob' )));
      
    });
  }

}
