import {Meteor} from 'meteor/meteor';
import {Quiz} from "../../both/models/quiz.model";
import {QuizCollection} from "../../both/collections/quiz.collection";
import {Game} from "../../both/models/game.model";
import {GivenAnswer} from "../../both/models/givenAnswers.model";
import undefined = Match.undefined;


Meteor.methods({
    saveQuiz: function(quizModel: Quiz) {
        let id : string;
        id = QuizCollection.collection.insert(quizModel);

        return QuizCollection.findOne(id);
    },

    fetchQuizById: function(quizId: string) {
        return QuizCollection.findOne(quizId);
    }
});