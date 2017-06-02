module.exports = function() {
  var route = require('express').Router();
  var feedController = require('../controllers/feedController.js');

  // write method
  route.get('/writeFeed', function(req,res) {
    var output = `
      <h1>Feed Write</h1>
      <form action="/feed/writeFeed" method="post">
        <input type="hidden" name="mode" value =1>
        <p>
          Category
          <input type="text" name="inputCategoryNo">
        </p>
        <p>
          Type
          <input type="text" name="inputFeedType">
        </p>
        <p>
          Title
          <input type="text" name="inputFeedTitle">
        </p>
        <p>
          Content
          <input type="textarea" name="inputFeedContent">
        </p>
        <p>
          isSeries
          <input type="text" name="isSeries">
        </p>
        <p>
          FeedSeriesOrder
          <input type="text" name="inputFeedSeriesOrder">
        </p>
        <p>
          SeriesName
          <input type="text" name="inputFeedSeriesName">
        </p>
        <p>
          <input type="submit">
        </p>
      </form>

    `;

    res.send(output);
  });

  route.post('/writeFeed', function(req,res) {
    feedController.writeFeed(req,res);
  });

  // set method
  route.get('/getFeed', function(req,res) {
    res.send("Get Feed");
  });

  // set method
  route.get('/setFeed', function(req,res) {
    res.send("Set Feed");
  });

  // delete method
  route.get('/deleteFeed', function(req,res) {
    res.send("Delete Feed");
  });

  // list method
  route.get('/listFeed', function(req,res) {
    res.send("List Feed");
  });

  // search method
  route.get('/searchFeed', function(req,res) {
    res.send("Search Feed");
  });

  return route;
}
