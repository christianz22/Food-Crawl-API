import express from "express";
import { getClient } from "../db";

const routes = express.Router();

// POST /bucketlist
routes.post("/", async (req, res) => {
  // Add your bucketlst items
  const newReviews = req.body;

  const client = await getClient();

  const results = await client.db().collection("reviews").insertOne({
    user: newReviews.user,
    restaurant: newReviews.restaurantId,
    title: newReviews.title,
    review: newReviews.review
  });

  res.json(results);
});

// GET /commute/:user
// example /commute/BJ
// Returns all of commutes for a specific user
routes.get("/:user", async (req, res) => {
  const user = req.params.user;
  const client = await getClient();
  if (req.query.restaurantId){
    const results = await client
    .db()
    .collection("reviews")
    .find({
      user: user,
      restaurantId: req.query.restaurantId
    })
    .toArray();

   

  res.json(results);
  } else {
    const results = await client
    .db()
    .collection("reviews")
    .find({
      user: user,
    })
    .toArray();

   

  res.json(results);
  }
  // db.bucketlist.find({user: 'BJ' })

});

routes.get("/", async (req, res) => {
  const client = await getClient();
  const {restaurantId} = req.query
  // db.bucketlist.find({user: 'BJ' })
  if(restaurantId){
    const results = await client
    .db()
    .collection("reviews")
    .find({
      restaurant: restaurantId,
    })
    .toArray();

    res.set("Cache-Control", "public, max-age=30, s-maxage=30");

  res.json(results);
  }
});

export default routes;