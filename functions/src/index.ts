// require the express module
import 'dotenv/config';
import express from 'express';
import Yelp from './routes/yelp';
import BucketList from './routes/bucketlist'
import Favorites from './routes/favorites'
import Reviews from './routes/reviews'
import * as functions from "firebase-functions";


// require the cors module
import cors from "cors"
 
// creates an instance of an Express server
const app = express();
 
// enable Cross Origin Resource Sharing so this API can be used from web-apps on other domains
app.use(cors())
 
// allow POST and PUT requests to use JSON bodies
app.use(express.json())
app.use("/yelp",Yelp);
app.use("/bucketlist", BucketList );
app.use("/favorites", Favorites );
app.use("/reviews", Reviews );
// define the port
// const port = 5000;
 
// run the server
// app.listen(port, () => console.log(`Listening on port: ${port}.`));
export const api = functions.https.onRequest(app);