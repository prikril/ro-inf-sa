import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators, FormArray, FormControl
} from '@angular/forms';
import { Quiz } from '../../../../../both/models/quiz.model';
import template from './create.component.html';
import style from "./create.component.scss";
import {MeteorObservable} from "meteor-rxjs";
import {Router} from "@angular/router";

@Component({
    selector: 'create',
    template,
    styles: [style]
})
export class CreateComponent implements OnInit {

    quizForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private router : Router) { }

    ngOnInit() {
        this.quizForm = this.formBuilder.group({
            name: ['', Validators.required],
            questions: this.formBuilder.array([
                this.initQuestionFormGroup()
            ])
        });
    }

    /**
     * Creates a FormGroup for a question with answers
     * @returns {FormGroup}
     */
    initQuestionFormGroup() {
        return this.formBuilder.group({
            question: ['', Validators.required],
            answers: this.initAnswerFormGroup()
        }, {
            validator: this.validateAnswer
        });
    }

    validateAnswer(group: FormControl) {
        let valid = false;

        for(let answer of group.get('answers').value) {
            if (answer['right']) {
                valid = true;
            }
        }

        if (valid) {
            return null;
        } else {
            return {
                validateAnswer: {
                    valid: false
                }
            }
        }
    }

    /**
     * Creates a FormArray with four answers
     * @returns {FormArray}
     */
    initAnswerFormGroup(): FormArray {
        let answers: FormGroup[] = [];
        for(let i = 0; i < 4; i++) {
            answers.push(
                this.formBuilder.group({
                    answer: ['', Validators.required],
                    right: [false, Validators.required]
                })
            )
        }
        return this.formBuilder.array(answers);
    }

    /**
     * Adds more questions to the form
     */
    addQuestion() {
        const control = <FormArray>this.quizForm.controls['questions'];
        control.push(this.initQuestionFormGroup());
    }

    /**
     * Call it before you check the right answer
     * It will disable all other answers
     * @param questionIndex the index of the question in the array of Questions
     */
    checkRightAnswer(questionIndex: number) {
        this.uncheckAll(questionIndex);
    }

    /**
     * Sava the Quiz
     * @param model
     */
    save(model: Quiz) {
        MeteorObservable.call('saveQuiz', model).subscribe((quiz : Quiz) => {
            // Success Redirect ...
            this.router.navigateByUrl('master/list');
        }, (error) => {
            alert(`Error: ${error}`);
        });
    }

    /**
     * Unchecks all answer checkboxes from the given question index
     * @param questionIndex the index of the question in the array of Questions
     */
    private uncheckAll(questionIndex: number) {
        this.quizForm.get('questions');
        let answers = this.quizForm.get('questions').controls[questionIndex].get('answers').controls;

        for(let answer of answers) {
            answer.get('right').setValue(false);
        }
    }
}