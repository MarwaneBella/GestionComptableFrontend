import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { StatistiqueService } from './statistique.service';

export interface DataCouted{
  bonHonoraire: number;
  categorie: number;
  produit: number;
  bonAchat: number;
  facture: number;
  client: number;
  fournisseur: number;
  reglementFournisseur: number;
  reglementClient: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dataCounted: DataCouted  = {
    bonHonoraire: 0,
    categorie: 0,
    produit: 0,
    bonAchat: 0,
    facture: 0,
    client: 0,
    fournisseur: 0,
    reglementFournisseur: 0,
    reglementClient: 0
  };

  multi = [
    {
      "name": "2020",
      "series": [
        {
          "name": "Dépens",
          "value": 7300000
        },
        {
          "name": "Recette",
          "value": 8940000
        }
      ]
    },
  
    {
      "name": "2021",
      "series": [
        {
          "name": "Dépens",
          "value": 7870000
        },
        {
          "name": "Recette",
          "value": 8270000
        }
      ]
    },
  
    {
      "name": "2022",
      "series": [
        {
          "name": "Dépens",
          "value": 5000002
        },
        {
          "name": "Recette",
          "value": 5800000
        }
      ]
    }
  ];
  view: [number, number] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Années';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Montant En Dirhame';
  legendTitle: string = 'Years';

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#FF5370', '#2ed8b6', '#ff0000'],
  };

  constructor(private statistiqueService: StatistiqueService) {
  }
  ngOnInit(): void {

    this.SetNumbersOfAll();
    console.log(this.dataCounted);
  }

  SetNumbersOfAll(){
    this.statistiqueService.getNumbersOfAll().subscribe(data =>{
      console.log(data);
      this.dataCounted = data;
    })
  }

  

 onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }




  /*multi = [
    {
      "name": "Germany",
      "series": [
        {
          "name": "1990",
          "value": 0
        },
        {
          "name": "1994",
          "value": 62000000
        },
        {
          "name": "1995",
          "value": 62000000
        },
        {
          "name": "2010",
          "value": 73000000
        },
        {
          "name": "2011",
          "value": 89400000
        }
      ]
    }
  ];
  view: [number,number] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;

  colorScheme: Color  ={
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#E44D25', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor() {
  }
  ngOnInit(): void {
  }

  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }*/
}


  


