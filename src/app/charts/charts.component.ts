import { Component, OnInit, Input } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.sass']
})
export class ChartsComponent {
  @Input() mealLog;
  @Input() daysArray;
  dataPlan: number[] = [];
  dataFact: number[] = [];
  // // dataPlan: number[] = [];
  // // dataFact: number[] = [];
  constructor(public recipeService: RecipeService) { }
  //
  // public barChartOptions:any = {
  //     scaleShowVerticalLines: false,
  //     responsive: true
  //   };
  //
  //   public barChartLabels:string[] = ['Day1', 'Day2', 'Day3', 'Day4', 'Day5', 'Day6', 'Day'];
  //   public barChartType:string = 'line';
  //   public barChartLegend:boolean = true;
  //
  //   public colors:any[] = ['red', 'green'];
  //   private barChartColors: any[] = [{ backgroundColor: ["#b8436d", "#00d9f9", "#00d9f9"] }];
  //
  //   public barChartData:any[] = [
  //     {data: [1000, 1800], label: 'Planed Calories'}
  //   ];
  //
  //   // events
  //   public chartClicked(e:any):void {
  //
  //   }
  //
  //   public chartHovered(e:any):void {
  //     console.log(e);
  //   }
  //
  //   // startUpdateGraph(){
  //   //   let test = this.recipeService.updateGraph(this.daysArray, this.loggedDaysArray);
  //   //   this.dataPlan.push(test[0]);
  //   //   this.dataFact.push(test[1]);
  //   //   console.log(this.dataPlan[0]);
  //   //   console.log(this.dataFact[0]);
  //   // }
  //   // public randomize():void {
  //   //   // Only Change 3 values
  //   //   let data = [
  //   //     Math.round(Math.random() * 100),
  //   //     59,
  //   //     80,
  //   //     (Math.random() * 100),
  //   //     56,
  //   //     (Math.random() * 100),
  //   //     40];
  //   //   let clone = JSON.parse(JSON.stringify(this.barChartData));
  //   //   clone[0].data = data;
  //   //   this.barChartData = clone;
  //   //   /**
  //   //    * (My guess), for Angular to recognize the change in the dataset
  //   //    * it has to change the dataset variable directly,
  //   //    * so one way around it, is to clone the data, change it and then
  //   //    * assign it;
  //   //    */
  //   // }
  // ngOnInit() {
  //
  // }
  //
  // update(){
  //   let final = this.recipeService.updateGraph(this.mealLog);
  //   this.dataPlan = final[0];
  //   this.dataFact = final[1];
  // }

  public barChartOptions:any = {
      scaleShowVerticalLines: false,
      responsive: true
    };
    public barChartLabels:string[] = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;

    public barChartData:any[] = [
      {data: [65, 59, 80, 81, 56, 55, 40], label: 'Planned Meals'},
      {data: [28, 48, 40, 19, 86, 27, 90], label: 'Actual Meals'}
    ];

    // events
    public chartClicked(e:any):void {
      console.log(e);
    }

    public chartHovered(e:any):void {
      console.log(e);
    }

    public randomize():void {

      console.log(this.barChartData);
      let final = this.recipeService.updateGraph(this.daysArray);
      console.log(final);
      this.dataPlan = [];
      this.dataFact = [];
      for(var i = 0; i < final[0].length; i++){
        this.dataPlan.push(final[0][i].totalCalories);
      }
      for(var i = 0; i < final[1].length; i++){
        this.dataFact.push(final[1][i].totalCalories);
      }
      // Only Change 3 values
      // let data = [Math.round(Math.random() * 100), 59, 80, (Math.random() * 100), 56, (Math.random() * 100), 40];
      let clone = JSON.parse(JSON.stringify(this.barChartData));
      console.log(clone);
      clone[0].data = this.dataPlan;
      clone[1].data = this.dataFact;
      console.log(clone[0].data);
      console.log(clone[1].data);
      this.barChartData = clone;
      console.log(this.barChartData);
      /**
       * (My guess), for Angular to recognize the change in the dataset
       * it has to change the dataset variable directly,
       * so one way around it, is to clone the data, change it and then
       * assign it;
       */
    }
}
