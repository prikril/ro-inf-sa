import { MongoObservable } from "meteor-rxjs";
import {Player} from "../models/player.model";

export const PlayerCollection = new MongoObservable.Collection<Player>("player-collection");