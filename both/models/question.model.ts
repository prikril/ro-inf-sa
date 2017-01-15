import {Answer} from "./answer.model";

export class Question {
    _id: string;
    question: string;
    answers: Answer[];
}