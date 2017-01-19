import {GivenAnswer} from "./givenAnswers.model";
export class GameResult{
    _id : string;
    quizId : string;
    givenAnswers : {[questionNo : number] : GivenAnswer[]} = {};
}
