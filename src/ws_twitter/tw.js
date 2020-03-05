
const puppeteer = require('puppeteer');

const BASE_URL = 'https://twitter.com/';
const LOGIN_URL = 'https://twitter.com/login';
const USERNAME_URL = (username) => `https://twitter.com/${username}`;

let browser = null;
let page = null;

const tw = {

  start: async () => {

    browser = await puppeteer.launch({
      headless: false
    });

    page = await browser.newPage();

    await page.goto(BASE_URL);

  },

  efetualogin: async (username, password) => {

    await page.goto(LOGIN_URL);
    await page.waitFor('input[name="session[username_or_email]"]');
    await page.type('input[name="session[username_or_email]"]', username, { delay: 100 });
    await page.type('input[name="session[password]"]', password, { delay: 175 });
    await page.keyboard.press(String.fromCharCode(13));
    await page.waitFor(1000);
  },

  twittar: async (message) => {
    let url = await page.url();

    if (url != BASE_URL) {
      await page.goto(BASE_URL);
    }

    await page.waitFor(1000);
    await page.keyboard.press(String.fromCharCode(110));
    await page.waitFor(1000);
    await page.keyboard.type(message, { delay: 220 });
    await page.click('div[class="css-901oao r-1awozwy r-jwli3a r-6koalj r-18u37iz r-16y2uox r-1qd0xha r-a023e6 r-vw2c0b r-1777fci r-eljoum r-dnmrzs r-bcqeeo r-q4m81j r-qvutc0"]');

  },

  scrapinguser: async (username) => {

    let url = await page.url();

    if (url != USERNAME_URL(username)) {
      await page.goto(USERNAME_URL(username));
    }

    await page.waitFor('div[class="css-901oao r-hkyrab r-1qd0xha r-1b6yd1w r-1vr29t4 r-ad9z0x r-bcqeeo r-qvutc0"]');


    let details = await page.evaluate(() => {
      return {
        nome: document.querySelector('div[class="css-901oao r-hkyrab r-1qd0xha r-1b6yd1w r-1vr29t4 r-ad9z0x r-bcqeeo r-qvutc0"]').innerText,
        descricao: document.querySelector('div[class="css-1dbjc4n r-1adg3ll r-15d164r"]').innerText,
        seguindo: document.querySelector('span[class="css-901oao css-16my406 r-1qd0xha r-vw2c0b r-ad9z0x r-bcqeeo r-qvutc0"]').innerText,
        seguidores: document.querySelector('div[class="css-1dbjc4n r-1joea0r"]').innerText.replace('mil seguidores', ''),
        local: document.querySelector('span[class="css-901oao css-16my406 r-1re7ezh r-4qtqp9 r-1qd0xha r-ad9z0x r-zso239 r-bcqeeo r-qvutc0"]').innerText,
        url: document.querySelector('a[class="css-4rbku5 css-18t94o4 css-901oao css-16my406 r-13gxpu9 r-1loqt21 r-4qtqp9 r-1qd0xha r-ad9z0x r-zso239 r-bcqeeo r-qvutc0"]').getAttribute('href'),
        everificado: document.querySelector('span[class="css-901oao css-16my406 r-18u37iz r-1q142lx r-1qd0xha r-1b6yd1w r-ad9z0x r-bcqeeo r-qvutc0"]').lastChild ? true : false
      }
    })


    return details;

  },

  scrapingtwets: async (username, count = 10) => {

    let url = await page.url();

    if (url != USERNAME_URL(username)) {
      await page.goto(USERNAME_URL(username));
    }

    await page.waitFor('div[class="css-1dbjc4n"]');
    await page.waitFor(5000);

    let tweetsArray = await page.$$('article[class="css-1dbjc4n r-1loqt21 r-1udh08x r-o7ynqc r-1j63xyz"]');
    await page.waitFor(4000);

    let lastTweetsArrayLength = 0;
    let tweets = [];


    while (tweetsArray.length < count) {
      await page.evaluate(`window.scrollTo(0, document.body.scrollHeight)`);
      await page.waitFor(3000);


      tweetsArray = await page.$$('article[class="css-1dbjc4n r-1loqt21 r-1udh08x r-o7ynqc r-1j63xyz"]');

      if (lastTweetsArrayLength == tweetsArray.length) break;

      lastTweetsArrayLength = tweetsArray.length;
    }

    for (let tweetElement of tweetsArray) {

      let tweet = await tweetElement.$eval('div[class="css-901oao r-hkyrab r-1qd0xha r-a023e6 r-16dba41 r-ad9z0x r-bcqeeo r-bnwqim r-qvutc0"]', element => element.innerText);
      let postedDate = await tweetElement.$eval('a[class="css-4rbku5 css-18t94o4 css-901oao r-1re7ezh r-1loqt21 r-1q142lx r-1qd0xha r-a023e6 r-16dba41 r-ad9z0x r-bcqeeo r-3s2u2q r-qvutc0"]', element => element.getAttribute('title'));

      tweets.push(tweet, postedDate)
    }

    tweets = tweets.slice(0, count);

    return tweets;
  },

  finaliza: async () => {
    await browser.close();
  }

};

module.exports = tw;