import { Component, OnInit } from '@angular/core';

import template from './standby.component.html';
import style from "./standby.component.scss";
import {Subscription} from 'rxjs/Subscription';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {MeteorObservable} from "meteor-rxjs";
import {Game} from "../../../../../both/models/game.model";
import {Player} from "../../../../../both/models/player.model";
import {Router} from "@angular/router";
import {GameCollection} from "../../../../../both/collections/game.collection";

@Component({
    selector: 'standby',
    template,
    styles: [style]
})
export class StandbyComponent implements OnInit {
    private quizStartSubscription : Subscription;

    joinForm: FormGroup;
    foundGame: boolean;
    playerId: string;

    constructor(
        private formBuilder: FormBuilder,
        private router : Router
    ) { }

    ngOnInit() {
        this.joinForm = this.formBuilder.group({
            gameNumber: ['', Validators.required],
            name: ['', Validators.required]
        });
    }

    ngOnDestroy() {
        this.quizStartSubscription.unsubscribe();
    }

    join(formValues: Object) {
        if (this.joinForm.valid) {
            let gameNumber = formValues["gameNumber"];
            let name = formValues["name"];
            MeteorObservable.call('fetchNotRunningGameByNumber', gameNumber).subscribe((game : Game) => {
                if (game == null) {
                    this.foundGame = false;
                } else {
                    this.foundGame = true;
                    this.createPlayerForGame(game._id, name);
                }

            }, (error) => {
                alert(`Error: ${error}`);
            });
        }
    }

    private createPlayerForGame(gameId: string, name: string) {
        MeteorObservable.call('addPlayer', gameId, name).subscribe((player : Player) => {
            if (player != null) {
                //success
                this.addPlayerToGame(gameId, player);
            }

        }, (error) => {
            alert(`Error: ${error}`);
        });
    }

    private addPlayerToGame(gameId: string, player: Player) {
        MeteorObservable.call('joinGame', gameId, player).subscribe((success : boolean) => {
            if (success) {
                //player added
                this.playerId = player._id;

                this.subscribeGame(gameId);
            }

        }, (error) => {
            alert(`Error: ${error}`);
        });
    }

    private subscribeGame(gameId: string) {
        this.quizStartSubscription = GameCollection.find(gameId)
            .map(games => games[0]) // game => games[0] picks first game found by _id, should only find one game
            .subscribe(game => this.quizStart(game));
    }

    private quizStart(game : Game){
        if(game != undefined && game.running) {
            this.router.navigateByUrl('competitor/question/'+this.playerId);
        }
    }
}