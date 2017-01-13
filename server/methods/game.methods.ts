import {Meteor} from 'meteor/meteor';
import {GameCollection} from "../../both/collections/game.collection";
import {Game} from "../../both/models/game.model";


Meteor.methods({
    addGame: function(quizId: string) {

        let game = new Game();
        game.quizId = quizId;
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
    }
});

function genGameNumber() {
    let min = 100000;
    let max = 999999;
    return Math.floor(Math.random()* (max-min+1)+min);
}
