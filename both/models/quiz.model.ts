export interface Quiz {
    _id: string;
    name: string;
    questions: Question[];
}

export interface Question {
    _id: string;
    question: string;
    answers: Answer[];
}

export interface Answer {
    _id: string;
    answer: string;
    right: boolean;
}
