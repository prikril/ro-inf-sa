import {Meteor} from 'meteor/meteor';
import {GameCollection} from "../../both/collections/game.collection";
import {Game} from "../../both/models/game.model";
import {Player} from "../../both/models/player.model";
import {Question} from "../../both/models/question.model";
import {GivenAnswer} from "../../both/models/givenAnswers.model";


Meteor.methods({
    addGame: function(quizId: string, gameResultId : string) {
        let game = new Game;
        game.quizId = quizId;
        game.gameResultId = gameResultId;
        game.currentIndex = 0;
        game.gameNumber = String(genGameNumber());
        game.running = true;
        game.players = [];

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
            currentIndex : ++game.currentIndex
           }});
    }
});

function genGameNumber() {
    let min = 100000;
    let max = 999999;
    return Math.floor(Math.random()* (max-min+1)+min);
}
