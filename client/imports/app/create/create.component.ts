import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators, FormArray
} from '@angular/forms';
import { Quiz } from '../../../../both/models/quiz.model';
import template from './create.component.html';
import style from "./create.component.scss";

interface QuizFormModel {
    name: string;
    questions: QuestionFormModel[];
}

interface QuestionFormModel {
    question: string;
    answerOne: string;
    answerOneIsCorret: boolean;
    answerTwo: string;
    answerTwoIsCorret: boolean;
    answerThree: string;
    answerThreeIsCorret: boolean;
    answerFour: string;
    answerFourIsCorret: boolean;
}
/*
interface AnswerFormModel {
    answerOne: string;
    answerOneIsCorret: boolean;
    answerTwo: string;
    answerTwoIsCorret: boolean;
    answerThree: string;
    answerThreeIsCorret: boolean;
    answerFour: string;
    answerFourIsCorret: boolean;
}
*/

@Component({
    selector: 'create',
    template,
    styles: [style]
})
export class CreateComponent implements OnInit {

    quizForm: FormGroup;


    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.quizForm = this.formBuilder.group({
            name: ['', Validators.required],
            questions: this.formBuilder.array([
                this.initQuestionFormGroup()
            ])
        });

        console.log(this.quizForm);
    }

    initQuestionFormGroup() {
        return this.formBuilder.group({
            question: ['', Validators.required],
            answerOne: ['', Validators.required, Validators.minLength(4)],
            answerOneIsCorrect: [false, Validators.required],
            answerTwo: ['', Validators.required],
            answerTwoIsCorrect: [false, Validators.required],
            answerThree: ['', Validators.required],
            answerThreeIsCorrect: [false, Validators.required],
            answerFour: ['', Validators.required],
            answerFourIsCorrect: [false, Validators.required]
        })
    }

    /*
    initAnswerFormGroup() {
        return this.formBuilder.group({
            answerOne: ['', Validators.required, Validators.minLength(4)],
            answerOneIsCorret: [false, Validators.required],
            answerTwo: ['', Validators.required],
            answerTwoIsCorret: [false, Validators.required],
            answerThree: ['', Validators.required],
            answerThreeIsCorret: [false, Validators.required],
            answerFour: ['', Validators.required],
            answerFourIsCorret: [false, Validators.required]
        })
    }
    */

    /**
     * Adds more questions to the form
     */
    addQuestion() {
        const control = <FormArray>this.quizForm.controls['questions'];
        control.push(this.initQuestionFormGroup());
    }

    save(model: QuizFormModel) {
        console.log(model);
    }
}