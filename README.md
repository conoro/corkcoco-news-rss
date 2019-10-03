# Cork County Council RSS
This Serverless function provides an RSS feed for the news page on Cork County Council's website. That currently resides at https://www.corkcoco.ie/en/news

## Installing and using
* Configure your AWS account
* Install Node.js 10.x

```bash
git clone git@github.com:conoro/corkcoco-news-rss.git
cd corkcoco-news-rss
npm install -g serverless
npm install
serverless deploy
```

Then you access the RSS feed like so:

* https://url.of.serverless.function/dev/rss?page=https://www.corkcoco.ie/en/news

(Page has been kept as a parameter in case they move the news URL)

LICENSE Apache-2.0

Copyright Conor O'Neill 2019, conor@conoroneill.com
