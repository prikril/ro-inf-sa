import { Component, OnInit } from '@angular/core';
import template from './home.component.html';
import style from './home.component.scss';

@Component({
    template,
    styles: [style]
})
export class HomeComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

}
