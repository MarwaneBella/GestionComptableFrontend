import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jspdf, { jsPDF } from 'jspdf';

@Component({
  selector: 'app-show-facture',
  templateUrl: './show-facture.component.html',
  styleUrls: ['./show-facture.component.css']
})
export class ShowFactureComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  openPDF(){
  
    const doc = new jsPDF('p', 'pt', 'a2');
    const pages = doc.internal.pageSize;
    doc.setProperties({
      title: `FACTURE`,
      
    });
    let DATA: any = document.getElementById('contenu');
   
    var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    var widthcontenu : any  = document.getElementById('contenu')?.offsetWidth;
  
    console.log("width contenu"+widthcontenu)
    console.log(pageHeight)
    console.log("pageWidth "+pageWidth)

    doc.html(DATA, {
      
      callback: (pdf) => {
      window.open(URL.createObjectURL(pdf.output("blob")))
      },
      x:(pageWidth - widthcontenu)/2,
      y: 10
    })


  }
}
