import { Component, OnInit } from '@angular/core';

import template from './manage.component.html';
import style from './manage.component.scss';
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

@Component({
    template,
    styles: [style]
})
export class ManageComponent implements OnInit {

    private routeSubscription : Subscription;
    private currentQuestionSubscription : Subscription;
    private answersFromCompetitorSubscription : Subscription;

    private game : Game;
    private currentQuestion : number;
    private quiz : Quiz;

    showResult : boolean = false;

    givenAnswers : number;
    answersTotal : number;
    answerResults1 : number;
    answerResults2 : number;
    answerResults3 : number;
    answerResults4 : number;


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
    }

    private getGameFromServer(gameNumber : string) : void{
        MeteorObservable.call('fetchGameByNumber', gameNumber).subscribe((game : Game) => {
            this.game = game;
            //next async requests:
            this.getQuestionsFromGame(game.quizId);
            this.subscribeCurrentQuestion(game._id);
            this.subscribeAnswersFromCompetitor(game.gameResultId);
        }, (error) => {
            alert(`Error: ${error}`);
            throw new Error(error);
        });
    }

    private getQuestionsFromGame(quizId: string) : void {
        MeteorObservable.call('fetchQuizById', quizId).subscribe((quiz : Quiz) => {
            this.quiz = quiz;
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
            .subscribe(game => this.fillNextQuestion(game.currentQuestion));
    }

    private subscribeAnswersFromCompetitor(gameResultId: string) {
        this.answersFromCompetitorSubscription = GameResultCollection.find(gameResultId)
            .map(gameResult => gameResult[0])
            .subscribe(gameResult => this.answerFromCompetitor(gameResult));
    }

    nextQuestion() : void {
        this.currentQuestion++;
        if(this.quiz.questions.length >= this.currentQuestion) {

            MeteorObservable.call('changeCurrentQuestion',
                this.game._id,
                this.quiz.questions[this.currentQuestion - 1]).subscribe();

            this.showResults(false);
        }
    }

    private fillNextQuestion(newQuestion : Question) {
        if(newQuestion != undefined && newQuestion != null) {
            this.question = newQuestion.question;
            this.answer1 = newQuestion.answers[0].answer;
            this.answer2 = newQuestion.answers[1].answer;
            this.answer3 = newQuestion.answers[2].answer;
            this.answer4 = newQuestion.answers[3].answer;
        }
    }

    showResults(show : boolean) : void {
        if(this.game != undefined && show != undefined){
            MeteorObservable.call('toggleResults', this.game._id, show).subscribe();
            this.showResult = show;
        }
    }

    private answerFromCompetitor(gameResult: GameResult) {
        this.givenAnswers++;
    }
}