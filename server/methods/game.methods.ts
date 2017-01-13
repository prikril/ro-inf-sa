import {Meteor} from 'meteor/meteor';
import {GameCollection} from "../../both/collections/game.collection";
import {Game} from "../../both/models/game.model";
import {Player} from "../../both/models/player.model";


Meteor.methods({
    addGame: function(quizId: string) {
        let game = {
            quizId: quizId,
            gameNumber: String(genGameNumber()),
            running: true,
            players: []
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
        return true;
    }
});

function genGameNumber() {
    let min = 100000;
    let max = 999999;
    return Math.floor(Math.random()* (max-min+1)+min);
}
