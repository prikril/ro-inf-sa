import { Component, OnInit } from '@angular/core';

import template from './manage.component.html';
import style from './manage.component.scss';
import { BarChartComponent } from './barchart/barchart.component';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from 'rxjs/Subscription';
import {Game} from "../../../../../both/models/game.model";
import {MeteorObservable} from "meteor-rxjs";
import {Question} from "../../../../../both/models/question.model";
import {Quiz} from "../../../../../both/models/quiz.model";
import {GameCollection} from "../../../../../both/collections/game.collection";
import {Observable} from "rxjs";
import {GameResultCollection} from "../../../../../both/collections/gameResult.collection";
import {GameResult} from "../../../../../both/models/gameResult.model";
import {GivenAnswer} from "../../../../../both/models/givenAnswers.model";
import undefined = Match.undefined;
import {forEach} from "@angular/router/src/utils/collection";
import {PlayerCollection} from "../../../../../both/collections/player.collection";
import {Player} from "../../../../../both/models/player.model";

@Component({
    template,
    styles: [style]
})
export class ManageComponent implements OnInit {

    private routeSubscription : Subscription;
    private currentQuestionSubscription : Subscription;
    private answersFromCompetitorSubscription : Subscription;
    private playerSubscription : Subscription;

    private timerSubscription : Subscription;

    private game : Game;
    private currentQuestion : number;
    private quiz : Quiz;
    private results : GameResult;
    private timer : number;
    private players : Player[];

    showResult : boolean = false;

    givenAnswers : number;
    rightAnswer : number;
    answersTotal : number;
    answerResults1 : number;
    answerResults2 : number;
    answerResults3 : number;
    answerResults4 : number;

    currentTimer : number;

    //Question properties for View
    question : string;
    answer1 : string;
    answer2 : string;
    answer3 : string;
    answer4 : string;

    constructor(private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.routeSubscription = this.activatedRoute.params.subscribe(
            (param : any) => {
                let gameNumber : string;
                gameNumber = param['gameNumber'];
                this.timer = param['timer'];
                this.getGameFromServer(gameNumber);
            });

        this.currentQuestion = 0;
        //Funktioniert:
        // let timer = Observable.timer(5000, 1000);
        // timer.subscribe(t=>{
        //     this.nextQuestion();
        // });
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
        this.currentQuestionSubscription.unsubscribe();
        this.answersFromCompetitorSubscription .unsubscribe();
        this.playerSubscription .unsubscribe();
    }

    private getGameFromServer(gameNumber : string) : void{
        MeteorObservable.call('fetchGameByNumber', gameNumber).subscribe((game : Game) => {
            this.game = game;
            this.timer = game.timer;
            //next async requests:
            this.getQuestionsFromGame(game.quizId);
            this.subscribeCurrentQuestion(game._id);
            this.subscribeAnswersFromCompetitor(game.gameResultId);
            this.subscribePlayers(game._id);
        }, (error) => {
            alert(`Error: ${error}`);
            throw new Error(error);
        });
    }

    private getQuestionsFromGame(quizId: string) : void {
        MeteorObservable.call('fetchQuizById', quizId).subscribe((quiz : Quiz) => {
            this.quiz = quiz;
            this.answersTotal = quiz.questions.length;

            //Call first question in quiz
            this.nextQuestion();
        }, (error) => {
            alert(`Error: ${error}`);
            throw new Error(error);
        });
    }

    private subscribeCurrentQuestion(gameId : string) {
        // https://github.com/Urigo/meteor-rxjs
        this.currentQuestionSubscription = GameCollection.find(gameId)
            .map(games => games[0]) // game => games[0] picks first game found by _id, should only find one game
            .subscribe(game => this.updateGame(game));
    }

    private subscribeAnswersFromCompetitor(gameResultId: string) {
        this.answersFromCompetitorSubscription = GameResultCollection.find(gameResultId)
            .map(gameResult => gameResult[0])
            .subscribe(gameResult => this.answerFromCompetitor(gameResult));
    }

    private subscribePlayers(gameId : string) {
        this.playerSubscription = PlayerCollection.find({gameId : gameId})
            .subscribe(playerResults => this.playerChanges(playerResults));
    }

    nextQuestion() : void {
        this.currentQuestion++;
        if(this.quiz.questions.length >= this.currentQuestion) {

            MeteorObservable.call('changeCurrentQuestion',
                this.game._id,
                this.quiz.questions[this.currentQuestion - 1]).subscribe();

            this.initializeResultProperties();
            this.setTimer();
            this.showResults(false);
        }
    }

    private updateGame(newGame : Game) {
        this.game = newGame;
        if(newGame.currentQuestion != undefined && newGame.currentQuestion != null) {
            this.question = newGame.currentQuestion.question;
            this.answer1 = newGame.currentQuestion.answers[0].answer;
            this.answer2 = newGame.currentQuestion.answers[1].answer;
            this.answer3 = newGame.currentQuestion.answers[2].answer;
            this.answer4 = newGame.currentQuestion.answers[3].answer;
        }
    }

    private initializeResultProperties() : void {
        this.answerResults1 = 0;
        this.answerResults2 = 0;
        this.answerResults3 = 0;
        this.answerResults4 = 0;

        this.givenAnswers = 0;
    }

    private setTimer() : void {
        this.currentTimer = this.timer;

        let timerObservable = Observable.timer(1000, 1000)
            .timeInterval()
            .pluck('interval')
            .take(this.timer);

        this.timerSubscription = timerObservable.subscribe(()=>{
            this.decreaseTimer();
        });
    }

    private decreaseTimer() : void {
        this.currentTimer--;
        if(this.currentTimer <= 0 && !this.showResult) {
            this.showResults(true);
        }
    }

    showResults(show : boolean) : void {
        if(this.game != undefined && show != undefined){
            MeteorObservable.call('toggleResults', this.game._id, show).subscribe();
            this.showResult = show;
            if (show) {
                this.calculateResults();
            }
        }
    }

    private answerFromCompetitor(gameResult: GameResult) {
        this.givenAnswers++;
        this.results = gameResult;

        if(this.givenAnswers >= this.game.players.length) {
            this.timerSubscription.unsubscribe();
            this.showResults(true);
        }
    }

    private playerChanges(players : Player[]) : void {
        this.players = players;
    }

    private calculateResults() {
        let givenAnswers : GivenAnswer[] = this.results.givenAnswers[this.currentQuestion - 1];
        for(let i = 0; i < 4; i++) {
            if(this.quiz.questions[this.currentQuestion - 1].answers[i].right) {
                this.rightAnswer = i + 1;
                break;
            }
        }

        if(givenAnswers != undefined) {
            for(let givenAnswer of givenAnswers) {
                if(givenAnswer.givenAnswer == this.rightAnswer) {
                    let scoreIncrease : number;
                    let scoreDecrease : number;

                    scoreIncrease = this.timer * 1000;
                    scoreDecrease = givenAnswer.timeAnswered - this.game.questionStarted;
                    scoreIncrease = scoreIncrease - scoreDecrease;
                    MeteorObservable.call("updateScore", givenAnswer.playerId, scoreIncrease).subscribe();
                }

                if(givenAnswer.givenAnswer == 1) {
                    this.answerResults1++;
                } else if(givenAnswer.givenAnswer == 2) {
                    this.answerResults2++;
                } else if(givenAnswer.givenAnswer == 3) {
                    this.answerResults3++;
                }else if(givenAnswer.givenAnswer == 4) {
                    this.answerResults4++;
                }
            }
        }

    }
}