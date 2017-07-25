import { Component, OnInit, Input } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.sass']
})
export class ChartsComponent implements OnInit {
  @Input() mealLog;
    dataPlan: number = 400;
    dataFact: number = 600;
  // dataPlan: number[] = [];
  // dataFact: number[] = [];
  constructor(public recipeService: RecipeService) { }

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
      {data: [this.dataFact], label: 'Planed Calories'},
      {data: [this.dataPlan], label: 'Actual Caroies'}
    ];

    // events
    public chartClicked(e:any):void {

    }

    public chartHovered(e:any):void {
      console.log(e);
    }

    // startUpdateGraph(){
    //   let test = this.recipeService.updateGraph(this.daysArray, this.loggedDaysArray);
    //   this.dataPlan.push(test[0]);
    //   this.dataFact.push(test[1]);
    //   console.log(this.dataPlan[0]);
    //   console.log(this.dataFact[0]);
    // }
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
    let final = this.recipeService.updateGraph(this.mealLog);
    this.dataPlan = final[0];
    this.dataFact = final[1];
  }

  update(){

  }

}
