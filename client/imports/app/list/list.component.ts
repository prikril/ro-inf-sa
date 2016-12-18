import { Component, OnInit } from '@angular/core';
import { Quiz } from '../../../../both/models/quiz.model';
import { QuizCollection } from '../../../../both/collections/quiz.collection';
import template from './list.component.html';
import style from "./list.component.scss";
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'list',
    template,
    styles: [style]
})
export class ListComponent implements OnInit {

    quizList: Observable<any[]>;

    constructor() {
        this.quizList = QuizCollection.find({}).zone();
    }

    ngOnInit() {
    }
}