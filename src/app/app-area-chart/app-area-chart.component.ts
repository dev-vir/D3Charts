import { Component, OnInit, ElementRef, ViewEncapsulation, Input, SimpleChanges, OnChanges, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-app-area-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app-area-chart.component.html',
  styleUrls: ['./app-area-chart.component.css']
})
export class AppAreaChartComponent implements OnInit,OnChanges {

  @ViewChild('areaChart', {static: true})
  chart: AppAreaChartComponent;

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
  histogram;

  
  
  constructor(private elRef: ElementRef) { 
    this.hostElement = this.elRef.nativeElement;
  }



  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.data) {
      // this.updateChart(changes.data.currentValue);
    }
  }

  private createChart(data: number[]) {
    this.removeExistingChartFromParent();

    // this.chart.data = [...this.chartData];


    // this.setChartDimensions();

    this.setColorScale();

    // this.addGraphicsElement();

    this.createXAxis();

    this.createYAxis();

    this.area = d3.area()
      .x((datum: any) => this.x(d3.mean([datum.x1, datum.x2])))
      .y0(this.y(0))
      .y1((datum: any) => this.y(datum.length))

    this.histogram = d3.histogram()
      .value((datum) => datum)
      .domain([0, this.xmax])
      .thresholds(this.x.ticks(this.hticks));

    this.processData(data);
    this.createAreaCharts();

  }

  private processData(data) {
    this.bins = [];
    data.forEach(row => {
      this.bins.push(this.histogram(row));
    });
  }

  private setChartDimesion() {
    let viewBoxHeight = 100;
    let viewBoxWidth = 200;
    this.svg  = d3.select(this.hostElement).append('svg')
      .attr('width', '100')
      .attr('height', '100%')
      .attr('viewBox', '0 0 ' + viewBoxWidth + ' ' + viewBoxHeight);
  }

  private addGraphicElement() {
    this.g = this.svg.append('g')
      .attr("transform", "translate(0, 0)");
  }

  private setColorScale() {
    this.colorScale = d3.scaleOrdinal(d3.schemeCategory10);
  }

  private createXAxis() {
    this.x = d3.scaleLinear()
        .domain([0, this.xmax])
        .range([30, 170]);
    this.g.append('g')
        .attr('transform', 'translate(0,90)')
        .attr("stroke-width", 0.5)
        .call(d3.axisBottom(this.x).tickSize(0).tickFormat(<any>''));

    this.g.append('g')
        .attr('transform', 'translate(0,90)')
        .style('font-size', '6')
        .style("stroke-dasharray", ("1,1"))
        .attr("stroke-width", 0.1)
        .call(d3.axisBottom(this.x).ticks(10).tickSize(-80));
  }

  private createYAxis() {
    this.y = d3.scaleLinear()
        .domain([0, this.ymax])
        .range([90, 10]);
    this.g.append('g')
        .attr('transform', 'translate(30,0)')
        .attr("stroke-width", 0.5)
        .call(d3.axisLeft(this.y).tickSize(0).tickFormat(<any>''));
    this.g.append('g')
        .attr('transform', 'translate(30,0)')
        .style("stroke-dasharray", ("1,1"))
        .attr("stroke-width", 0.1)
        .call(d3.axisLeft(this.y).ticks(4).tickSize(-140))
        .style('font-size', '6');

    if (this.showLabel === 1) {
        this.g.append('text')
        .attr('text-anchor', 'middle')
        .attr('transform', 'translate(10,50) rotate(-90)')
        .style('font-size', 8)
        .text('Frequency');
    }
  }


  // private createAreaCharts() {
  //   this.paths = [];
  //   this.bins.forEach((row, index) => {
  //     this.paths.push(this.g.append('path'))
  //       .datum(row)
  //       .attr('fill', this.colorScale('' + index))
  //       .attr("strock-width", 1.0)
  //       .attr('opacity', 0.5)
  //       .attr('d', (datum: any) => this.area(datum))
  //   });
  // }

  private createAreaCharts() {
    this.paths = [];
    this.bins.forEach((row, index) => {
        this.paths.push(this.g.append('path')
            .datum(row)
            .attr('fill', this.colorScale('' + index))
            .attr("stroke-width", 0.1)
            .attr('opacity', 0.5)
            .attr('d', (datum: any) => this.area(datum))
        );
    });
  }

  public upperChart(data: number[]) {
    if(!this.svg) {
      this.createChart(data);
      return;
    }

    this.processData(data);
    this.updateAreaCharts();
  }

  private updateAreaCharts() {
    this.paths.forEach((path, index) => {
      path.datum(this.bins[index])
        .transition().duration(this.transitionTime)
        .attr('d', d3.area()
          .x((datum: any) => this.x(d3.mean([datum.x1, datum.x2])))
          .y0(this.y(0))
          .y1((datum: any) => this.y(datum.length)));
    });
  }
  private removeExistingChartFromParent() {
    d3.select(this.hostElement).select('svg').remove();
  }

}
