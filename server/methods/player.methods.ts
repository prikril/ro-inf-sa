import {Meteor} from 'meteor/meteor';
import {GameCollection} from "../../both/collections/game.collection";
import {Player} from "../../both/models/player.model";
import {PlayerCollection} from "../../both/collections/player.collection";
import undefined = Match.undefined;


Meteor.methods({
    addPlayer: function(gameId: string, name: string) {

        let player = new Player();
        player.gameId = gameId;
        player.name = name;
        player.playing = true;
        player.score = 0;

        let id : string;
        id = PlayerCollection.collection.insert(player);
        return PlayerCollection.findOne(id);
    },

    fetchPlayerById: function(playerId: string) {
        //search for playing players by playerNumber
        return PlayerCollection.findOne({_id: playerId, playing: true});
    },

    updateScore: function(playerId: string, addToScore : number) {
        let player = PlayerCollection.findOne(playerId);
        if (player == undefined) {
            return;
        }
        PlayerCollection.update(playerId, {$set: {score: player.score + addToScore}});
    }
});

