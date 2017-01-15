import {Component, OnInit, getPlatform} from '@angular/core';

import template from './question.component.html';
import style from "./question.component.scss";
import {Game} from "../../../../../both/models/game.model";
import {ActivatedRoute} from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import {MeteorObservable} from "meteor-rxjs";
import {Question} from "../../../../../both/models/question.model";
import {Player} from "../../../../../both/models/player.model";
import {GameCollection} from "../../../../../both/collections/game.collection";
import {map} from "rxjs/operator/map";

@Component({
    selector: 'question',
    template,
    styles: [style]
})
export class QuestionComponent implements OnInit {

    private subscription: Subscription;
    private currentQuestionSubscription : Subscription;

    game : Game;
    currentQuestion : Question;
    gameId : String = "530736";
    foundGame : boolean;
    quizId : String;
    playerId : string;
    player : Player;


    constructor(private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.subscription = this.activatedRoute.params.subscribe(
            (param: any) => {
                this.playerId = param['playerId'];

                this.player = this.getPlayer(this.playerId);
                if(this.player == null) {
                    return;
                }
                console.log("create subscription2");

                this.game = this.getGame(this.player.gameId);
                if(this.game == null) {
                    return;
                }
                console.log("create subscription3");
                this.subscripteToCurrentQuestion(this.game._id);
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.currentQuestionSubscription.unsubscribe();
    }

    private getPlayer(playerId : string) : Player {
        let retPlayer : Player;
        MeteorObservable.call('fetchPlayerById', playerId).subscribe((player : Player) => {
            retPlayer = player;
        }, (error) => {
            alert(`Error while loading player information: ${error}`);
        });
        return retPlayer;
    }

    private getGame(gameId : string) : Game {
        let retGame : Game;
        MeteorObservable.call('fetchGameById', gameId).subscribe((game : Game) => {
            retGame = game;
        }, (error) => {
            alert(`Error while loading game information: ${error}`);
        });
        return retGame;
    }

    private subscripteToCurrentQuestion(gameId : string) {
        this.currentQuestionSubscription = GameCollection.find({_id: gameId})
            .map(games => games[0]).subscribe(game => this.changeQuestion(game.currentQuestion))
    }

    private changeQuestion(currentQuestion : Question) {
        console.log("Question changed");
    }
}