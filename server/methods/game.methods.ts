import {Meteor} from 'meteor/meteor';
import {GameCollection} from "../../both/collections/game.collection";
import {Game} from "../../both/models/game.model";
import {Player} from "../../both/models/player.model";
import {Question} from "../../both/models/question.model";
import {GivenAnswer} from "../../both/models/givenAnswers.model";


Meteor.methods({
    addGame: function(quizId: string) {
        let game = new Game;
        game.quizId = quizId;
        game.currentIndex = 0;
        game.gameNumber = String(genGameNumber());
        game.running = true;
        game.players = [];
        game.givenAnswers = [];

        let id : string;
        id = GameCollection.collection.insert(game);
        return GameCollection.findOne(id);
    },

    fetchGameByNumber: function(gameNumber: string) {
        //search for running games by gameNumber
        return GameCollection.findOne({gameNumber: gameNumber, running: true});
    },

    joinGame: function(gameId:string, player: Player) {
        let game = GameCollection.findOne({_id: gameId, running: true});
        let players = game.players;
        players.push(player);
        GameCollection.update({_id: gameId, running: true}, {$set: {players: players}});
        return true;
    },
    fetchGameById: function(gameId : string) : Game {
        return GameCollection.findOne({_id : gameId,});
    },
    changeCurrentQuestion: function(gameId:string, question : Question) {
        let game = GameCollection.findOne(gameId);

        GameCollection.update(gameId, {$set: {
            currentQuestion : question,
            currentIndex : game.currentIndex++
           }});
    },
    answerFromPlayer : function(gameId : string,
                                playerId : string,
                                answerNo : number) : void {

        let game = GameCollection.findOne(gameId);

        if(game.givenAnswers.filter(a => a.playerId == playerId && a.questionIndex == game.currentIndex).length == 0) {
            let answer = new GivenAnswer();

            answer.givenAnswer = answerNo;
            answer.playerId = playerId;
            answer.questionIndex = game.currentIndex;

            game.givenAnswers.push(answer);

            GameCollection.update(game._id, {$set: {givenAnswers : game.givenAnswers}});
        }
    }
});

function genGameNumber() {
    let min = 100000;
    let max = 999999;
    return Math.floor(Math.random()* (max-min+1)+min);
}
