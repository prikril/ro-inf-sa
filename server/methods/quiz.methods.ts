import {Meteor} from 'meteor/meteor';
import {Quiz} from "../../both/models/quiz.model";
import {QuizCollection} from "../../both/collections/quiz.collection";


Meteor.methods({
    saveQuiz: function(quizModel: Quiz) {
        let id : string;
        id = QuizCollection.collection.insert(quizModel);

        return QuizCollection.collection.find(id).fetch()[0];
    },

    fetchQuizById: function(quizId: string) {
        return QuizCollection.findOne(quizId);
    }
});