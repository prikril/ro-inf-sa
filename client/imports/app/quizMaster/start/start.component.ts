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
import {Question} from "../../../../../both/models/question.model"
@Component({
    template,
    styles: [style]
})
export class StartComponent implements OnInit, OnDestroy {

    private subscription: Subscription;
    quizId: string;
    quiz : Quiz;
    quizName: string;
    questions: number;
    questionArray : Question[]
    players: string[];
    gameNumber: string;
    game: Game;
    questionNo : string;
    private gameSubscription: Subscription;


    constructor(private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        // subscribe to router event
        this.subscription = this.activatedRoute.params.subscribe(
            (param: any) => {
                this.quizId = param['quizId'];
                this.gameNumber = param['gameNo'];
                this.questionNo = param['questionNo'];
                console.log(this.quizId);
                this.getQuizDetails(this.quizId);
            });
    }

    ngOnDestroy() {
        // prevent memory leak by unsubscribing
        this.subscription.unsubscribe();
        this.gameSubscription.unsubscribe();
    }

    initGame() {
        //generate gameNumber
        if(this.gameNumber == undefined) {
            this.generateGameNumber(this.quizId);
            this.players = ["no Players"];
        }

        //Aufräumen, sehr unsauber -.-
        MeteorObservable.call('fetchGameByNumber', this.gameNumber).subscribe((game : Game) => {
            this.game = game;
            if(this.questionNo == undefined) {
                this.questionNo = "0";
            }
            else {
                this.changeQuestion();
            }
        });
    }

    private changeQuestion(){
        if (this.questionNo == undefined) {
            this.questionNo = "0";
        }

        let tmp = parseInt(this.questionNo) + 1;
        this.questionNo = tmp.toString();

        console.log("changin question");
        console.log("Quiz:" + this.quiz);
        console.log(this.quiz.questions.length);
        console.log(tmp);

        if (this.quiz != undefined && this.quiz.questions.length >= tmp){
            console.log("Game: " +this.game);
            this.game.currentQuestion = this.quiz.questions[tmp - 1];
            console.log("Question changed");
            console.log(this.game);
        }
    }

    getQuizDetails(quizId: string) {
        MeteorObservable.call('fetchQuizById', quizId).subscribe((quiz : Quiz) => {
            this.quizName = quiz.name;
            this.questions = quiz.questions.length;
            console.log("filling quiz");
            this.quiz = quiz;

            this.initGame();
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
        // game => games[0] picks first game found by _id, should only find one game
        this.gameSubscription = GameCollection.find({_id: gameId}).map(games => games[0]).subscribe(game => this.fetchPlayersFromGame(game));
    }

    private fetchPlayersFromGame(game : Game) {
        console.log(game);
        let players :Player[] = game.players;
        if ( players != null && players.length > 0) {
            this.parsePlayerArray(players);
        }
    }

    private parsePlayerArray(players: Player[]) {
        console.log("parse player array");
        console.log(players);
        let tmpArray: string[] = [];
        for (let player of players) {
            console.log(player.name);
            tmpArray.push(player.name);
        }
        this.players = tmpArray;
    }
}