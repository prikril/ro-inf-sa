import { MongoObservable } from "meteor-rxjs";
import {Game} from "../models/game.model";

export const GameCollection = new MongoObservable.Collection<Game>("game-collection");