import { MongoObservable } from "meteor-rxjs";
import {Quiz} from "../models/quiz.model";

export const QuizCollection = new MongoObservable.Collection<Quiz>("quiz-collection");