var feedModel = require('../models/feedModel');
var commonController = require('./commonController.js');

exports.writeFeed = function(req, res) {

  if(!(req.session.deepMemberNo >0)) {
    console.log('No Member');
    res.send('noLogin');
  }

  var checkParam = [
    req.body.mode,
    req.body.inputCategoryNo,
    req.body.inputFeedType,
    req.body.inputFeedTitle,
    req.body.inputFeedContent
  ]

  if(commonController.parameterCheck(checkParam)) {
    var mode = commonController.serversideXSS(req.body.mode);
    var categoryNo = commonController.serversideXSS(req.body.inputCategoryNo);
    var feedFeedStatus = 1;
    var feedType = commonController.serversideXSS(req.body.inputFeedType);
    var feedCreateDate = (new Date).getTime()/1000;
    var feedTitle = commonController.serversideXSS(req.body.inputFeedTitle);
    var feedImages = -1;
    var feedContent = commonController.serversideXSS(req.body.inputFeedContent);

    var isSeries = commonController.serversideXSS(req.body.isSeries);
    var feedSeriesId = '';
    var feedSeriesOrder = '';
    var feedSeriesName = '';

    if(isSeries==1) {
      feedSeriesOrder = commonController.serversideXSS(req.body.inputFeedSeriesOrder);
      feedSeriesName = commonController.serversideXSS(req.body.inputFeedSeriesName);
      feedSeriesId = 0;
    }

    var map = {
      mode : mode,
      inputMemberNo : req.session.deepMemberNo,
      inputCategoryNo : categoryNo,
      inputFeedStatus : feedFeedStatus,
      inputFeedType : feedType,
      inputFeedCreateDate : feedCreateDate,
      inputFeedTitle : feedTitle,
      inputFeedImages : feedImages,
      inputFeedContent : feedContent,
      isSeries : isSeries,
      inputFeedSeriesId : feedSeriesId,
      inputFeedSeriesOrder : feedSeriesOrder,
      inputFeedSeriesName : feedSeriesName
    };

    feedModel.addFeed(map, req, res);

  } else {
    console.log('Parameter ERROR');
    res.send("입력이잘못됌요");
  }
}
