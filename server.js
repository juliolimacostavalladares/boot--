const { default: axios } = require('axios');
const puppeteer = require('puppeteer');

const cron = require('node-cron');

const faker = require('faker');

const fromMilli = Date.parse(0);
const dateOffset = faker.random.number(Date.parse(50) - fromMilli);

const newDate = new Date(fromMilli + dateOffset);

const dateTime = newDate.toJSON().split('T')[0].replace(/-/g, '/')

    const data = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        date: dateTime
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
      
        await page.goto('https://share.socialearn.co/u/juliolima1225');
      
        await page.waitForSelector('.btn.btn-white.d-none.d-md-block')
        await page.$eval('.btn.btn-white.d-none.d-md-block', e => e.setAttribute('target', ''))
      
        await page.click('.btn.btn-white.d-none.d-md-block')
          
        await page.waitForSelector('input[name="name"]')
      
        await page.type('input[name="name"]', data.name, {delay: 2});
      
        await page.type('input[name=username]', data.username, {delay: 2});
      
        await page.type('input[name=email]', data.email, {delay: 2});

        await page.$eval('select > option', e => e.removeAttribute('selected'))
        await page.$eval('select > option:nth-child(2)', e => e.setAttribute('selected', ''))
      
        await page.type('input[name=password]', data.password, {delay: 2});
      
        await page.type('input[name="password_confirmation"]', data.password, {delay: 2});
      
        await page.$eval('input[name="terms"]', e => e.setAttribute('checked', ''))
      
        await page.click('button[type="submit"]')
    
        await browser.close()
    
        console.log({
            name: data.name, username: data.username, 
            email: data.email, password: data.password, date: dateTime
        })
    }
        
    cron.schedule('*/0,1 * * * * *', async function() {
        Register()
    });
