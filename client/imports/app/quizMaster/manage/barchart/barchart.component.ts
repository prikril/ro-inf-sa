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
                    [colors]="barChartColors"
                    [legend]="barChartLegend"
                    [chartType]="barChartType"></canvas>
            </div>
        </div>`
})
export class BarChartComponent implements OnChanges{
    @Input() rightAnswer:number;
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
    private greenColor:any =
        {
            backgroundColor: "rgba(0,192,0,0.9)",
            borderColor: "rgba(0,192,0,1)",
            pointBackgroundColor: 'rgba(0,192,0,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(0,192,0,0.8)'
        };
    private redColor:any =
        {
            backgroundColor: "rgba(192,0,0,0.9)",
            borderColor: "rgba(192,0,0,1)",
            pointBackgroundColor: 'rgba(192,0,0,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(192,0,0,0.8)'
        };
    public barChartColors:Array<any> = [
        this.greenColor, this.redColor
    ];
    public barChartLabels:string[] = ['answers'];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;

    public barChartData:any[] = [
        {data: [this.votes1], label: this.answer1},
        {data: [this.votes2], label: this.answer2},
        {data: [this.votes3], label: this.answer3},
        {data: [this.votes4], label: this.answer4}
    ];

    ngOnChanges(changes: SimpleChanges) {
        for (let propName in changes) {
            let chng = changes[propName];
            console.log(propName + ': ' + chng.currentValue);
            switch (propName)
            {
                case 'rightAnswer' :
                    switch(chng.currentValue)
                    {
                        case 1 :
                            this.barChartColors = [this.greenColor, this.redColor, this.redColor, this.redColor];
                            break;
                        case 2 :
                            this.barChartColors = [this.redColor, this.greenColor, this.redColor, this.redColor];
                            break;
                        case 3 :
                            this.barChartColors = [this.redColor, this.redColor, this.greenColor, this.redColor];
                            break;
                        case 4 :
                            this.barChartColors = [this.redColor, this.redColor, this.redColor, this.greenColor];
                            break;
                        default:
                            this.barChartColors = [this.redColor, this.redColor, this.redColor, this.redColor];
                    }
                    break;
                case 'answer1' :
                    this.barChartData[0].label = chng.currentValue;
                    break;
                case 'answer2' :
                    this.barChartData[1].label = chng.currentValue;
                    break;
                case 'answer3' :
                    this.barChartData[2].label = chng.currentValue;
                    break;
                case 'answer4' :
                    this.barChartData[3].label = chng.currentValue;
                    break;
                case 'votes1' :
                    this.barChartData[0].data[0] = chng.currentValue;
                    break;
                case 'votes2' :
                    this.barChartData[1].data[0] = chng.currentValue;
                    break;
                case 'votes3' :
                    this.barChartData[2].data[0] = chng.currentValue;
                    break;
                case 'votes4' :
                    this.barChartData[3].data[0] = chng.currentValue;
                    break;
                default : ;
            }
        }
    }
}

