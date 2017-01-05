import { Component, OnInit } from '@angular/core';

import template from './start.component.html';
import style from './start.component.scss';

@Component({
    template,
    styles: [style]
})
export class StartComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}