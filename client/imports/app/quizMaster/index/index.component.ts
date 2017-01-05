import { Component, OnInit } from '@angular/core';

import template from './index.component.html';
import style from './index.component.scss';

@Component({
    template,
    styles: [style]
})
export class IndexComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}