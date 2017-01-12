import {Component, OnInit, OnDestroy} from '@angular/core';

import template from './start.component.html';
import style from './start.component.scss';
import {ActivatedRoute} from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import {MeteorObservable} from "meteor-rxjs";
import {Quiz} from "../../../../../both/models/quiz.model";

@Component({
    template,
    styles: [style]
})
export class StartComponent implements OnInit, OnDestroy {

    private subscription: Subscription;
    quizId: string;
    quizName: string;
    questions: number;
    players: string[];


    constructor(private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        // subscribe to router event
        this.subscription = this.activatedRoute.params.subscribe(
            (param: any) => {
                this.quizId = param['quizId'];
                console.log(this.quizId);
                this.getQuizDetails(this.quizId);
            });
        //load competitors
        this.players = ["Player1", "Teilnehmer", "Spieler"];
    }

    ngOnDestroy() {
        // prevent memory leak by unsubscribing
        this.subscription.unsubscribe();
    }

    getQuizDetails(quizId: string) {
        MeteorObservable.call('fetchQuizById', quizId).subscribe((quiz : Quiz) => {
            this.quizName = quiz.name;
            this.questions = quiz.questions.length;
        }, (error) => {
            alert(`Error: ${error}`);
        });
    }
}