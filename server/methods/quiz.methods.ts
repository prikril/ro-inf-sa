import {Meteor} from 'meteor/meteor';
import {Quiz} from "../../both/models/quiz.model";
import {QuizCollection} from "../../both/collections/quiz.collection";


Meteor.methods({
    saveQuiz: function(quizModel: Quiz) {
        return QuizCollection.insert(quizModel);
    }
});