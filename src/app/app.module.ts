import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppAreaChartComponent } from './app-area-chart/app-area-chart.component';
import { AreaChartComponent } from './area-chart/area-chart.component';
import { MisrableComponent } from './misrable/misrable.component';
import { BarchartComponent } from './barchart/barchart.component';

@NgModule({
  declarations: [
    AppComponent,
    AppAreaChartComponent,
    AreaChartComponent,
    MisrableComponent,
    BarchartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
