import {Meteor} from 'meteor/meteor';
import {GameCollection} from "../../both/collections/game.collection";
import {Game} from "../../both/models/game.model";


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
        return GameCollection.findOne(gameNumber);
    }
});

function genGameNumber() {
    let min = 100000;
    let max = 999999;
    return Math.floor(Math.random()* (max-min+1)+min);
}
