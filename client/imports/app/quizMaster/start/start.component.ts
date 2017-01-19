import {Component, OnInit, OnDestroy} from '@angular/core';

import template from './start.component.html';
import style from './start.component.scss';
import {ActivatedRoute, Router} from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import {MeteorObservable} from "meteor-rxjs";
import {Quiz} from "../../../../../both/models/quiz.model";
import {Game} from "../../../../../both/models/game.model";
import {Player} from "../../../../../both/models/player.model";
import {GameCollection} from "../../../../../both/collections/game.collection";
import {GameResult} from "../../../../../both/models/gameResult.model";
import {ok} from "assert";

@Component({
    template,
    styles: [style]
})
export class StartComponent implements OnInit, OnDestroy {

    private subscription: Subscription;
    private gameSubscription: Subscription;

    quizId: string;
    quizName: string;
    questions: number;
    players: string[];
    gameNumber: string;
    gameId : string;
    timer : number;


    constructor(private activatedRoute: ActivatedRoute, private router : Router) { }

    ngOnInit() {
        this.timer = 20;

        // subscribe to router event
        this.subscription = this.activatedRoute.params.subscribe(
            (param: any) => {
                this.quizId = param['quizId'];
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

    startQuiz() {
        MeteorObservable.call("startGame", this.gameId, this.timer).subscribe((success : boolean) => {
            if(success) {
                this.router.navigateByUrl('master/manage/' + this.gameNumber);
            }
        });


    }

    private generateGameNumber(quizId: string) {
        MeteorObservable.call("addGameResult", quizId).subscribe((gameResult : GameResult) => {
            this.createGame(quizId, gameResult._id)
        }, (error) => {
            alert(error);
        });

    }

    private createGame(quizId : string, gameResultId : string) {
        MeteorObservable.call('addGame', quizId, gameResultId).subscribe((game : Game) => {
            this.gameNumber = game.gameNumber;
            this.gameId = game._id;
            this.subscribeGame(game._id);
        }, (error) =>{
            alert(error);
        });
    }

    private subscribeGame(gameId: string) {
        // https://github.com/Urigo/meteor-rxjs
        this.gameSubscription = GameCollection.find({_id: gameId})
            .map(games => games[0]) // game => games[0] picks first game found by _id, should only find one game
            .subscribe(game => this.fetchPlayersFromGame(game));
    }

    private fetchPlayersFromGame(game : Game) {
        let players :Player[] = game.players;
        if ( players != null && players.length > 0) {
            this.parsePlayerArray(players);
        }
    }

    private parsePlayerArray(players: Player[]) {
        let tmpArray: string[] = [];
        for (let player of players) {
            tmpArray.push(player.name);
        }
        this.players = tmpArray;
    }
}