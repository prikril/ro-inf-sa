import { Component, OnInit } from '@angular/core';

import template from './question.component.html';
import style from "./question.component.scss";
import {Game} from "../../../../../both/models/game.model";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from 'rxjs/Subscription';
import {MeteorObservable} from "meteor-rxjs";
import {Question} from "../../../../../both/models/question.model";
import {GameCollection} from "../../../../../both/collections/game.collection";
import {Player} from "../../../../../both/models/player.model";
import {PlayerCollection} from "../../../../../both/collections/player.collection";

@Component({
    selector: 'question',
    template,
    styles: [style]
})
export class QuestionComponent implements OnInit {

    private gameSubscription : Subscription;
    private routeSubscription : Subscription;
    private playerSubscription : Subscription;

    game : Game;
    player : Player;
    playerId : string;
    foundGame : boolean;
    quizId : String;
    answerGiven: boolean = false;
    showResult: boolean = false;
    selectedAnswer : number;

    //Question properties for View
    question : string;
    answer1 : string;
    answer2 : string;
    answer3 : string;
    answer4 : string;
    score : number;


    constructor(private activatedRoute: ActivatedRoute) { }
    ngOnInit() {
        this.routeSubscription = this.activatedRoute.params.subscribe(
            (param : any) => {
                this.playerId = param['playerId'];
                this.getPlayerFromServer(this.playerId);
            });
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
        this.gameSubscription.unsubscribe();
    }

    answerQuestion(answer : number) : void {
        if (this.answerGiven) {
            return;
        }

        if(answer < 1 || answer > 4) {
            alert("Answer out of range");
            throw new RangeError("Given Answer: " + answer);
        }
        MeteorObservable.call('answerFromPlayer', this.game._id,
            this.playerId,
            answer).subscribe((success : boolean) => {
            if(success) {
                this.answerGiven = true;
                this.selectedAnswer = answer;
            }
        });
    }

    private getPlayerFromServer(playerId : string) : void {
        MeteorObservable.call('fetchPlayerById', playerId).subscribe((player : Player) => {
            this.player = player;
            //next async requests:
            this.score = player.score;
            this.getGameFromServer(player.gameId);
            this.subscribeGame(player.gameId);
            this.subscribePlayer(player._id);
        }, (error) => {
            alert(`Error: ${error}`);
            throw new Error(error);
        });
    }

    private getGameFromServer(gameId : string) : void {
        MeteorObservable.call('fetchGameById', gameId).subscribe((game : Game) => {
            this.game = game;
            //next async requests:
        }, (error) => {
            alert(`Error: ${error}`);
            throw new Error(error);
        });
    }

    private subscribeGame(gameId : string) {
        // https://github.com/Urigo/meteor-rxjs
        this.gameSubscription = GameCollection.find(gameId)
            .map(games => games[0]) // game => games[0] picks first game found by _id, should only find one game
            .subscribe(game => this.gameChanged(game));
    }

    private subscribePlayer(playerId : string) {
        this.playerSubscription = PlayerCollection.find(playerId)
            .map(player => player[0])
            .subscribe(player => this.getNewScore(player.score));
    }

    private gameChanged(game : Game) {
        if(game != undefined && game != null) {
            this.showResult = game.showResult;
            if(!this.showResult && game.currentQuestion != undefined){
                this.question = game.currentQuestion.question;
                this.answer1 = game.currentQuestion.answers[0].answer;
                this.answer2 = game.currentQuestion.answers[1].answer;
                this.answer3 = game.currentQuestion.answers[2].answer;
                this.answer4 = game.currentQuestion.answers[3].answer;

                this.answerGiven = false;
                this.selectedAnswer = null;
            }

        }
    }

    private getNewScore(score: number) {
        this.score = score;
    }
}