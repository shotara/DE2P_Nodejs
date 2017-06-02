
exports.addFeed = function(type) {
  var sql='';

  switch(type) {
    case '1':
      sql = `
        INSERT INTO deep_feed(deepMemberNo, deepCategoryNo, deepFeedStatus, deepFeedType, deepFeedCreateDate, deepFeedTitle, deepFeedImages, deepFeedContent)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?)
      `;
      break;
    case '2':
      sql = `
        INSERT INTO deep_feed_ready(deepMemberNo, deepCategoryNo, deepFeedStatus, deepFeedType, deepFeedCreateDate, deepFeedTitle, deepFeedImages, deepFeedContent)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?)
      `;
      break;
    }

    return sql;
}


exports.addFeedSeries = function(type) {
  var sql='';

  switch(type) {
    case '1':
      sql = `
        INSERT INTO deep_feed_series(deepFeedNo, deepMemberNo, deepFeedSeriesStatus, deepFeedSeriesId, deepFeedSeriesOrder, deepFeedSeriesCreateDate, deepFeedSeriesName)
        VALUES(?, ?, ?, ?, ?, ?, ?)
      `;
      break;
    case '2':
      sql = `
        INSERT INTO deep_feed_series_ready(deepFeedNo, deepMemberNo, deepFeedSeriesStatus, deepFeedSeriesId, deepFeedSeriesOrder, deepFeedSeriesCreateDate, deepFeedSeriesName)
        VALUES(?, ?, ?, ?, ?, ?, ?)
      `;
      break;
    }

    return sql;
}

exports.getFeedReadyLastInsertKey = function(type) {
  var sql='';

  switch(type) {
    case '1':
      sql = `SELECT max(deepFeedNo) as countMax FROM deep_feed`;
      break;
    case '2':
      sql = `SELECT max(deepFeedNo) as countMax FROM deep_feed_ready`;
      break;
    }

    return sql;
}
