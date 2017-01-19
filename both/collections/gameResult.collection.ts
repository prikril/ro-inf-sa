import { MongoObservable } from "meteor-rxjs";
import {GameResult} from "../models/gameResult.model";

export const GameResultCollection = new MongoObservable.Collection<GameResult>("gameResult-collection");