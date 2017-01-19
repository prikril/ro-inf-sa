import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

@Component({
    selector: 'bar-chart',
    template: `
        <div>
            <div style="display: block">
                <canvas baseChart
                    [datasets]="barChartData"
                    [labels]="barChartLabels"
                    [options]="barChartOptions"
                    [legend]="barChartLegend"
                    [chartType]="barChartType"></canvas>
            </div>
        </div>`
})
export class BarChartComponent implements OnChanges{
    @Input() question:string;
    @Input() answer1:string;
    @Input() answer2:string;
    @Input() answer3:string;
    @Input() answer4:string;
    @Input() votes1:number;
    @Input() votes2:number;
    @Input() votes3:number;
    @Input() votes4:number;

    public barChartOptions:any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels:string[] = [this.answer1, this.answer2, this.answer3, this.answer4];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;

    public barChartData:any[] = [
        {data: [this.votes1, this.votes2, this.votes3, this.votes4], label: 'votes'}
    ];

    ngOnChanges(changes: SimpleChanges) {
        for (let propName in changes) {
            let chng = changes[propName];
            console.log(propName + ': ' + chng.currentValue);
            switch (propName)
            {
                case 'answer1' :
                    this.barChartLabels[0] = chng.currentValue;
                    break;
                case 'answer2' :
                    this.barChartLabels[1] = chng.currentValue;
                    break;
                case 'answer3' :
                    this.barChartLabels[2] = chng.currentValue;
                    break;
                case 'answer4' :
                    this.barChartLabels[3] = chng.currentValue;
                    break;
                case 'votes1' :
                    this.barChartData[0].data[0] = chng.currentValue;
                    break;
                case 'votes2' :
                    this.barChartData[0].data[1] = chng.currentValue;
                    break;
                case 'votes3' :
                    this.barChartData[0].data[2] = chng.currentValue;
                    break;
                case 'votes4' :
                    this.barChartData[0].data[3] = chng.currentValue;
                    break;
                default : ;
            }
        }
    }
}

