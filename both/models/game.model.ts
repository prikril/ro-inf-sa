import {Player} from "./player.model";
import {Question} from "./question.model";
import {GivenAnswer} from "./givenAnswers.model";

export class Game {
    _id: string;
    quizId: string;
    gameNumber: string;
    running: boolean;
    players: Player[];
    currentQuestion : Question;
    currentIndex : number;
    givenAnswers : GivenAnswer[];
}
