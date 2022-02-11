import express from "express";
import { getClient } from "../db";

const routes = express.Router();

// POST /bucketlist
routes.post("/", async (req, res) => {
  // Add your bucketlst items
  const newBucketList = req.body;

  const client = await getClient();

  const results = await client.db().collection("bucketlist").insertOne(newBucketList);

  res.json(results);
});

routes.delete("/:userId/:restaurantId", async (req, res) => {
  // Delete your bucketlst items
 

  const client = await getClient();

  const results = await client.db().collection("bucketlist").deleteOne({user: req.params.userId, restaurantId: req.params.restaurantId });

  res.json(results);
});

// GET /commute/:user
// example /commute/BJ
// Returns all of commutes for a specific user
routes.get("/:user", async (req, res) => {
  const user = req.params.user;
  const client = await getClient();

  const results = await client
    .db()
    .collection("bucketlist")
    .find({
      user: user,
    })
    .toArray();

    

  res.json(results);

});


export default routes;