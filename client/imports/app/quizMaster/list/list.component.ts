import { Component, OnInit } from '@angular/core';
import { QuizCollection } from '../../../../../both/collections/quiz.collection';
import template from './list.component.html';
import style from "./list.component.scss";
import { Observable } from "rxjs/Observable";

@Component({
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