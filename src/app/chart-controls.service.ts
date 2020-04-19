import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ChartControlService {
    showData = false;
    fullScreen = false;
    constructor() { }
}