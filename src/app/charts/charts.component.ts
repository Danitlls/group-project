import { Component, OnInit } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.sass']
})
export class ChartsComponent implements OnInit {
  public barChartOptions:any = {
      scaleShowVerticalLines: false,
      responsive: true
    };
    public barChartLabels:string[] = ['Day1', 'Day3', 'Day3', 'Day4', 'Day5', 'Day6', 'Day7'];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;

    public colors:any[] = ['red', 'green'];
    private barChartColors: any[] = [{ backgroundColor: ["#b8436d", "#00d9f9", "#00d9f9"] }];

    public barChartData:any[] = [
      {data: [657, 597, 808, 817, 568, 559, 405], label: 'Planed Calories'},
      {data: [281, 481, 402, 194, 865, 276, 906], label: 'Actual Caroies'}
    ];

    // events
    public chartClicked(e:any):void {
      console.log(e);
    }

    public chartHovered(e:any):void {
      console.log(e);
    }

    // public randomize():void {
    //   // Only Change 3 values
    //   let data = [
    //     Math.round(Math.random() * 100),
    //     59,
    //     80,
    //     (Math.random() * 100),
    //     56,
    //     (Math.random() * 100),
    //     40];
    //   let clone = JSON.parse(JSON.stringify(this.barChartData));
    //   clone[0].data = data;
    //   this.barChartData = clone;
    //   /**
    //    * (My guess), for Angular to recognize the change in the dataset
    //    * it has to change the dataset variable directly,
    //    * so one way around it, is to clone the data, change it and then
    //    * assign it;
    //    */
    // }
  ngOnInit() {
  }

}
