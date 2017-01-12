import { Component, OnInit } from '@angular/core';

import template from './standby.component.html';
import style from "./standby.component.scss";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {MeteorObservable} from "meteor-rxjs";
import {Game} from "../../../../../both/models/game.model";

@Component({
    selector: 'standby',
    template,
    styles: [style]
})
export class StandbyComponent implements OnInit {

    joinForm: FormGroup;
    foundGame: boolean;

    constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.joinForm = this.formBuilder.group({
            gameNumber: ['', Validators.required],
            name: ['', Validators.required]
        });
    }

    join(formValues: Object) {
        if (this.joinForm.valid) {
            let gameNumber = formValues["gameNumber"];
            let name = formValues["name"];
            MeteorObservable.call('fetchGameByNumber', gameNumber).subscribe((game : Game) => {
                this.foundGame = game != null;

            }, (error) => {
                alert(`Error: ${error}`);
            });
        }
    }
}