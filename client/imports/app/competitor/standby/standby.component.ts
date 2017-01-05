import { Component, OnInit } from '@angular/core';

import template from './standby.component.html';
import style from "./standby.component.scss";

@Component({
    selector: 'standby',
    template,
    styles: [style]
})
export class StandbyComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}