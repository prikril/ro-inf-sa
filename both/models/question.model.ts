import {Answer} from "./answer.model";


export interface Question {
    _id: string;
    question: string;
    answers: Answer[];
}
