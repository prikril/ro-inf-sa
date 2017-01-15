import {Meteor} from 'meteor/meteor';
import {GameCollection} from "../../both/collections/game.collection";
import {Game} from "../../both/models/game.model";
import {Player} from "../../both/models/player.model";
import {Question, QuestionImpl} from "../../both/models/question.model";


Meteor.methods({
    addGame: function(quizId: string) {
        let game = {
            quizId: quizId,
            gameNumber: String(genGameNumber()),
            running: true,
            players: [],
            currentQuestion : new QuestionImpl
        };

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
        return true; //TODO: add if statement
    },
    fetchGameById: function(gameId:string) {
        let game = GameCollection.findOne({_id: gameId, running: true});

        return game;
    },

    changeCurrentQuestion: function(gameId:string, question : Object) {
        GameCollection.update({_id : gameId, running: true}, {$set: {currentQuestion : question}});
        return true; //TODO: add if statement
    }
});

function genGameNumber() {
    let min = 100000;
    let max = 999999;
    return Math.floor(Math.random()* (max-min+1)+min);
}
