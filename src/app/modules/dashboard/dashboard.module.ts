import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { GroupedVerticalBarChartComponent } from './grouped-vertical-bar-chart/grouped-vertical-bar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { AdvancedPieChartComponent } from './advanced-pie-chart/advanced-pie-chart.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';



@NgModule({
  declarations: [
    DashboardComponent,
    GroupedVerticalBarChartComponent,
    LineChartComponent,
    PieChartComponent,
    AdvancedPieChartComponent,
    DoughnutChartComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxChartsModule
  ]
})
export class DashboardModule { }
