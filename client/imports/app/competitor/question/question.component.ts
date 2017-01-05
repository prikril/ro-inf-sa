import { Component, OnInit } from '@angular/core';

import template from './question.component.html';
import style from "./question.component.scss";

@Component({
    selector: 'question',
    template,
    styles: [style]
})
export class QuestionComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}