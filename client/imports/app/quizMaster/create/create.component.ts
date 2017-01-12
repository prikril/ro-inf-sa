import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators, FormArray
} from '@angular/forms';
import { Quiz } from '../../../../../both/models/quiz.model';
import { QuizCollection } from '../../../../../both/collections/quiz.collection';
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

        console.log(this.quizForm);
    }

    initQuestionFormGroup() {
        return this.formBuilder.group({
            question: ['', Validators.required],
            answers: this.initAnswerFormGroup()
        });
    }


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

    save(model: Quiz) {
        //QuizCollection.insert(model);
        MeteorObservable.call('saveQuiz', model).subscribe((quiz : Quiz) => {
            // Success Redirect ...
            this.router.navigateByUrl('master/list');
        }, (error) => {
            alert(`Error: ${error}`);
        });
    }
}