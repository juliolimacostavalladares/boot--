const { default: axios } = require('axios');
const puppeteer = require('puppeteer');

const cron = require('node-cron');

const faker = require('faker');


const data = {
	name: faker.name.firstName(),
	email: faker.internet.email(),
	username: faker.internet.userName(),
	password: faker.internet.password(),
}

async function Register () {
    const browser = await puppeteer.launch({'args' : ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
  
    await page.setViewport({ width: 1920, height: 1080 });
    await page.setDefaultNavigationTimeout(0); 
    await page.setRequestInterception(true);
  
    page.on('request', (req) => {
      if(req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image' || req.resourceType() == 'texttrack' || req.resourceType() == 'eventsource' || req.resourceType() == 'manifest' ){
          req.abort();
      }
      else {
          req.continue();
      }
    });
  
    await page.goto('https://fusioncashss.xyz/5325938409614');
  
    await page.waitForSelector('.btn.btn-white.d-none.d-md-block')
    await page.$eval('.btn.btn-white.d-none.d-md-block', e => e.setAttribute('target', ''))
  
    await page.click('.btn.btn-white.d-none.d-md-block')
  
      

  
    await page.type('input[name=fullname]', data.name, {delay: 2});
  
    await page.type('input[name=username]', data.username, {delay: 2});
  
    await page.type('input[name=email]', data.email, {delay: 2});
  
    await page.type('input[name=password]', data.password, {delay: 2});
  
    await page.type('input[name=passwordAgain]', data.password, {delay: 2});
  
    await page.$eval('input[type="checkbox"]', e => e.setAttribute('checked', ''))
  
    await page.click('.btn.btn-auth.text-white.btn-block')

    await browser.close()

    return {name: data.name, username: data.username, email: data.email, password: data.password}
}

	
cron.schedule('*/0,3 * * * * *', async function() {
    Register()
});