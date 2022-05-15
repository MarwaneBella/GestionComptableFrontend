import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';


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

    let pdf = new jsPDF('p', 'pt', 'a2');
    // No difference
    pdf.setFontSize(5);
    // No difference
   // pdf.setDisplayMode("fullwidth", "continuous","FullScreen");
    
    pdf.html(DATA, {
      callback: (pdf) => {
        
        pdf.save("sample.pdf")
      }
    }) 
  }

}
