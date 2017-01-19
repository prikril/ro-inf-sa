import {Meteor} from 'meteor/meteor';
import {GameCollection} from "../../both/collections/game.collection";
import {Game} from "../../both/models/game.model";
import {Player} from "../../both/models/player.model";
import {Question} from "../../both/models/question.model";
import {GivenAnswer} from "../../both/models/givenAnswers.model";
import undefined = Match.undefined;


Meteor.methods({
    addGame: function(quizId: string, gameResultId : string) {
        let game = new Game;
        game.quizId = quizId;
        game.gameResultId = gameResultId;
        game.currentIndex = 0;
        game.gameNumber = String(genGameNumber());
        game.running = false;
        game.players = [];
        game.showResult = false;
        game.timer = 20;

        let id : string;
        id = GameCollection.collection.insert(game);
        return GameCollection.findOne(id);
    },

    fetchGameByNumber: function(gameNumber: string) {
        //search for games by gameNumber
        return GameCollection.findOne({gameNumber: gameNumber});
    },
    fetchNotRunningGameByNumber : function(gameNumber : string) {
        return GameCollection.findOne({gameNumber : gameNumber, running : false});
    },
    joinGame: function(gameId:string, player: Player) {
        let game = GameCollection.findOne({_id: gameId, running: false});
        if (game == undefined) {
            return false;
        }
        let players = game.players;
        players.push(player);
        GameCollection.update({_id: gameId}, {$set: {players: players}});
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
    },
    toggleResults: function(gameId:string, showResults : boolean) {
        GameCollection.update(gameId, {$set: {
            showResult : showResults
        }});
    },
    startGame: function (gameId: string, timer : number) : boolean{
        let game = GameCollection.findOne({_id : gameId, running : false});

        if (game == undefined) {
            return false;
        }
        GameCollection.update(game._id, {$set: {
            running : true,
            timer : timer}});
        return true;
    }
});

function genGameNumber() {
    let min = 100000;
    let max = 999999;
    return Math.floor(Math.random()* (max-min+1)+min);
}
