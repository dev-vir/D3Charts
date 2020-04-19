import { Component, OnInit, ViewChild, OnChanges, Input, SimpleChange, SimpleChanges, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-area-chart',

  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.css']
})
export class AreaChartComponent implements OnInit, OnChanges {

  

  generateData(chartData) {
    chartData = [];
    for (let i = 0; i < (8 + Math.floor(Math.random() * 10)); i++) {
    chartData.push([
    `Index ${i}`,
    Math.floor(Math.random() * 100)
    ]);
   }
 }


  @ViewChild('areaChart', {static: true})
  chart: AreaChartComponent;

  @Input() transitionTime = 1000;
  @Input() xmax = 45;
  @Input() ymax = 200;
  @Input() hticks = 60;
  @Input() data: number[];
  @Input() showLabel = 1;
  hostElement;
  g;
  svg;
  colorScale;
  x;
  y;
  colors;
  bins;
  paths;
  area;

  constructor(private elRef: ElementRef) {
    this.hostElement = this.elRef.nativeElement;
   }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.data) {
      this.updateChart(changes.data.currentValue);
    }
  }

  updateChart(data: number[]) {
    this.createChart(data);
  }

  private createChart(data: number[]) {

    this.colorScale = d3.scaleOrdinal(d3.schemeCategory10); 

    let viewBoxHeight = 100;
    let viewBoxWidth = 200;
    this.svg = d3.select(this.hostElement).append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('viewBox', '0 0 ' + viewBoxWidth + ' ' + viewBoxHeight);

    this.x = d3.scaleLinear()
      .domain([0, 45])
      .range([30, 170]);

    this.y = d3.scaleLinear()
      .domain([0, 200])
      .range([90, 10]);

    this.area = d3.area()
      .x((datum: any) => this.x(d3.mean([datum.x1, datum.x2])))
      .y0(this.y(0))
      .y1((datum: any) => this.y(datum.length));

      this.bins.forEach((row, index) => {
        this.paths.push(
          this.g.append('path')
            .datum(row)
            .attr('fill', this.colorScale('' + index))
            .attr("stroke-width", 0.1)
            .attr('opacity', 0.5)
            .attr('d', (datum: any) => this.area(datum))
          );
      });

    // this.paths.forEach((path, index) => {
    //   path.datum(this.bins[index])
    //       .transition()
    //       .duration(1000)
    //       .attr('d', (datum: any) => this.area(datum))
    //     );
    //   });

    this.processData(data);
  } 

  private processData(data) {
    this.bins = [];
    data.forEach((row) => {
      this.bins.push(this.area(row))
    });
  }

}
