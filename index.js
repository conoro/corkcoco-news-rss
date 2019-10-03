// corkcoco-news-rss - Copyright Conor O'Neill 2019, conor@conoroneill.com
// LICENSE Apache-2.0
// Invoke like https://url.of.serverless.function/dev/rss?page=https://www.corkcoco.ie/en/news

module.exports.check = (event, context, callback) => {
  var request = require("request");
  var cheerio = require("cheerio");
  var RSS = require("rss");
  var sectionURL = event.query.page;

  var feed = new RSS({
    title: "Cork County Council News",
    description: "Return latest news stories from Cork County Council",
    feed_url: "http://example.com/rss.xml",
    site_url: sectionURL,
    image_url:
      "https://www.corkcoco.ie/sites/default/files/inline-images/crest-with-text.png",
    docs: "http://example.com/rss/docs.html",
    managingEditor: "conor@conoroneill.com",
    webMaster: "conor@conoroneill.com",
    copyright: "2019 Conor ONeill",
    language: "en",
    pubDate: "Oct 3, 2019 08:00:00 GMT",
    ttl: "60"
  });

  request(sectionURL, function(error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      $(".views-field-title").each(function() {
        var link =
          "https://www.corkcoco.ie" +
          $(this)
            .find("span")
            .find("a")
            .attr("href");
        if (link.indexOf(sectionURL) > -1) {
          var title = $(this).text();
          var currentDate = new Date();
          feed.item({
            title: title,
            description: title,
            url: link,
            author: "communications.office@corkcoco.ie",
            date: currentDate
          });
        }
      });
      var xml = feed.xml();
      context.succeed(xml);
    }
  });
};
