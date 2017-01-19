import {Player} from "./player.model";
import {Question} from "./question.model";
import {GivenAnswer} from "./givenAnswers.model";

export class Game {
    _id: string;
    quizId: string;
    gameResultId : string;
    gameNumber: string;
    running: boolean;
    showResult: boolean;
    players: Player[];
    currentQuestion : Question;
    currentIndex : number;
    timer : number;
    questionStarted : number;
}
