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

  constructor(public recipeService: RecipeService) { }

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

      let clone = JSON.parse(JSON.stringify(this.barChartData));
      console.log(clone);
      clone[0].data = this.dataPlan;
      clone[1].data = this.dataFact;
      console.log(clone[0].data);
      console.log(clone[1].data);
      this.barChartData = clone;
      console.log(this.barChartData);
    }
}
