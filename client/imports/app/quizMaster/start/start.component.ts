import {Component, OnInit, OnDestroy} from '@angular/core';

import template from './start.component.html';
import style from './start.component.scss';
import {ActivatedRoute} from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import {MeteorObservable} from "meteor-rxjs";
import {Quiz} from "../../../../../both/models/quiz.model";
import {Game} from "../../../../../both/models/game.model";
import {Player} from "../../../../../both/models/player.model";
import {GameCollection} from "../../../../../both/collections/game.collection";

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
    gameNumber: string;
    game: Game;


    constructor(private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        // subscribe to router event
        this.subscription = this.activatedRoute.params.subscribe(
            (param: any) => {
                this.quizId = param['quizId'];
                console.log(this.quizId);
                this.getQuizDetails(this.quizId);
                this.initGame();
            });
    }

    ngOnDestroy() {
        // prevent memory leak by unsubscribing
        this.subscription.unsubscribe();
    }

    initGame() {
        //generate gameNumber
        this.generateGameNumber(this.quizId);
        //load competitors
        this.players = ["no Players"];
    }

    getQuizDetails(quizId: string) {
        MeteorObservable.call('fetchQuizById', quizId).subscribe((quiz : Quiz) => {
            this.quizName = quiz.name;
            this.questions = quiz.questions.length;
        }, (error) => {
            alert(`Error: ${error}`);
        });
    }

    private generateGameNumber(quizId: string) {
        MeteorObservable.call('addGame', quizId).subscribe((game : Game) => {
           this.gameNumber = game.gameNumber;
           //this.players = game.players;
           //this.game = game;
           this.listPlayers(game._id)
        });
    }

    private listPlayers(gameId: string) {
        GameCollection.find({_id: gameId}).observe({
            added: function (document) {
                // Do something to collection 2
                console.log("added");
            },
            changed: function (newDocument, oldDocument) {
                // ...
                console.log("changed");
                console.log(newDocument);
                //this.game = newDocument;
                this.buildPlayerNameArray();
            },
            removed: function (oldDocument) {
                // ...
                console.log("removed");
            }
        });
    }

    private buildPlayerNameArray() {
        console.log("vor player change");
        this.players = ["Player1", "Teilnehmer", "Spieler"];
        console.log(("nach player change"));
    }
}