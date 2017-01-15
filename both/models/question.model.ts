import {Answer} from "./answer.model";


export interface Question {
    _id: string;
    question: string;
    answers: Answer[];
}

export class QuestionImpl  {
    _id: string;
    question: string;
    answers: Answer[];
}
