import { Component, OnInit } from '@angular/core';

import template from './question.component.html';
import style from "./question.component.scss";
import {Game} from "../../../../../both/models/game.model";
import {ActivatedRoute} from "@angular/router";
import {MeteorObservable} from "meteor-rxjs";
import {Question} from "../../../../../both/models/question.model";

@Component({
    selector: 'question',
    template,
    styles: [style]
})
export class QuestionComponent implements OnInit {
    game : Game;
    currentQuestion : Question;
    gameId : String = "530736";
    foundGame : boolean;
    quizId : String;


    constructor(private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        MeteorObservable.call('fetchGameByNumber', this.gameId).subscribe((game : Game) => {
            console.log("hello");
            this.game = game;
            this.foundGame = game != null;

            this.quizId = game.quizId;

            console.log(this.foundGame);
            console.log(this.gameId);
            console.log(this.game);
        });


    }


}