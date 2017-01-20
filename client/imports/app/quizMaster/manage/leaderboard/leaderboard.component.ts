import {Component, Input, OnInit, OnChanges, SimpleChanges} from "@angular/core";
import {Player} from "../../../../../../both/models/player.model";

@Component({
    selector: 'leaderboard',
    template: `
<ul *ngFor="let player of sortedPlayers">
    <li>{{player.name}} - {{player.score}}</li>
</ul>`
})
export class LeaderboardComponent implements OnInit, OnChanges {
    @Input() players: Player[];
    sortedPlayers: Player[];

    ngOnInit() {
        this.sortedPlayers = this.players.sort((a, b) => a.score - b.score);
    }

    ngOnChanges(changes: SimpleChanges) {
        this.sortedPlayers = changes['players'].currentValue.sort((a, b) => b.score - a.score);
    }
}