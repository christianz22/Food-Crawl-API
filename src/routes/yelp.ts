// require the express module
import express from "express";
import axios from "axios";

// create a new Router object
const routes = express.Router();
const yelpApiKey : string = process.env.YELP_API_KEY || '';

routes.get("/", (req, res) => {
  axios
    .get(`https://api.yelp.com/v3/businesses/search`, {
      params: { term: req.query?.term || '', location: req.query?.location },
      headers: {Authorization: `Bearer ${yelpApiKey}`},
    })
    .then((response: any) => {
      res.json(response.data.businesses);
    })
    .catch((error) => {
      res.status(500);
      res.json(error.message);
    });
});

routes.get("/:id", (req, res) => {
  axios
    .get(`https://api.yelp.com/v3/businesses/${req.params.id}`, {

      headers: {Authorization: `Bearer ${yelpApiKey}`},
    })
    .then((response: any) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.status(500);
      res.json(error.message);
    });
});

export default routes;