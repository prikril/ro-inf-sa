import {Player} from "./player.model";
export interface Game {
    _id: string;
    quizId: string;
    gameNumber: string;
    running: boolean;
    players: Player[];
}
