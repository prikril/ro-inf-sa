import {Meteor} from 'meteor/meteor';
import {GameCollection} from "../../both/collections/game.collection";
import {GivenAnswer} from "../../both/models/givenAnswers.model";
import {GameResultCollection} from "../../both/collections/gameResult.collection";
import {GameResult} from "../../both/models/gameResult.model";
import {Quiz} from "../../both/models/quiz.model";
import {QuizCollection} from "../../both/collections/quiz.collection";
import {forEach} from "@angular/router/src/utils/collection";


Meteor.methods({
    addGameResult : function(quizId : string) : GameResult {
        let gameResult = new GameResult();
        let quiz : Quiz;

        quiz = QuizCollection.findOne(quizId);

        gameResult.quizId = quizId;

        for(let i = 0; i < quiz.questions.length; i++) {
            gameResult.givenAnswers[i] = [];
        }

        let id : string;
        id = GameResultCollection.collection.insert(gameResult);

        return GameResultCollection.findOne(id);
    },
    answerFromPlayer : function(
        gameId : string,
        playerId : string,
        answerNo : number) : void {

        let game = GameCollection.findOne(gameId);
        let gameResult = GameResultCollection.findOne(game.gameResultId);

        if(gameResult.givenAnswers[game.currentIndex - 1].filter(a => a.playerId = playerId).length == 0) {
            let answer = new GivenAnswer();

            answer.playerId = playerId;
            answer.givenAnswer = answerNo;

            gameResult.givenAnswers[game.currentIndex - 1].push(answer);

            GameResultCollection.update(gameResult._id, {$set : {givenAnswers : gameResult.givenAnswers}});
        }
    }
});