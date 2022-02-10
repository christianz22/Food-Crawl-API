import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import yelp from './routes/yelp';
import reviews from './routes/reviews';
import favorites from './routes/favorites';
import bucketlist from './routes/bucketlist';


const app = express();
app.use(cors());
app.use(express.json());
app.use("/yelp", yelp );
app.use("/reviews", reviews );
app.use("/favorites", favorites );
app.use("/bucketlist", bucketlist );
export const api = functions.https.onRequest(app);