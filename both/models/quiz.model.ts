import {Question} from "./question.model";

export class Quiz {
    _id: string;
    name: string;
    questions: Question[];
}