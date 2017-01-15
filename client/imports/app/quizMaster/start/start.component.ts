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
    private gameSubscription: Subscription;


    constructor(private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        // subscribe to router event
        this.subscription = this.activatedRoute.params.subscribe(
            (param: any) => {
                this.quizId = param['quizId'];
                //console.log(this.quizId); // only for debug
                this.getQuizDetails(this.quizId);
                this.initGame();
            });
    }

    ngOnDestroy() {
        // prevent memory leak by unsubscribing
        this.subscription.unsubscribe();
        this.gameSubscription.unsubscribe();
    }

    initGame() {
        //generate gameNumber
        this.generateGameNumber(this.quizId);
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
            this.subscribeGame(game._id);
        });
    }

    private subscribeGame(gameId: string) {
        // https://github.com/Urigo/meteor-rxjs
        this.gameSubscription = GameCollection.find({_id: gameId})
            .map(games => games[0]) // game => games[0] picks first game found by _id, should only find one game
            .subscribe(game => this.fetchPlayersFromGame(game));
    }

    private fetchPlayersFromGame(game : Game) {
        //console.log(game); // only for debug
        let players :Player[] = game.players;
        if ( players != null && players.length > 0) {
            this.parsePlayerArray(players);
        }
    }

    private parsePlayerArray(players: Player[]) {
        //console.log("parse player array"); // only for debug
        //console.log(players); // only for debug
        let tmpArray: string[] = [];
        for (let player of players) {
            //console.log(player.name); // only for debug
            tmpArray.push(player.name);
        }
        this.players = tmpArray;
    }
}