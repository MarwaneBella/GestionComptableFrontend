import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { StatistiqueService } from '../statistique.service';

@Component({
  selector: 'app-advanced-pie-chart',
  templateUrl: './advanced-pie-chart.component.html',
  styleUrls: ['./advanced-pie-chart.component.css']
})
export class AdvancedPieChartComponent implements OnInit {

  single:[];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  colorScheme: Color  ={
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#FF5370', '#2ed8b6','#4099ff','#FFB64D','#f677ff']
  };

  constructor(private statistiqueService: StatistiqueService) { }

  ngOnInit(): void {
    this.setDataPieChart();
  }

  setDataPieChart(){
    this.statistiqueService.getDataPieChart().subscribe(data  =>{
      this.single =  JSON.parse(data);
    })
  }

}
