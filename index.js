const express = require("express")
const puppeteer =  require('puppeteer');
const app = express()

let port = process.env.PORT || 3001

async function main () {
  const browser = await puppeteer.launch({headless:true});
  
  const page = await browser.newPage();

  await page.goto('https://developer.chrome.com/');

  // Set screen size
  await page.setViewport({width: 1080, height: 1024});

  // Type into search box
  await page.type('.search-box__input', 'automate beyond recorder');

  // Wait and click on first result
  const searchResultSelector = '.search-box__link';
  await page.waitForSelector(searchResultSelector);
  await page.click(searchResultSelector);

  // Locate the full title with a unique string
  const textSelector = await page.waitForSelector(
    'text/Customize and automate'
  );
  const fullTitle = await textSelector.evaluate(el => el.textContent);

  // Print the full title
  console.log('The title of this blog post is "%s".', fullTitle);

  await browser.close();
};

setTimeout(()=>{
    main()
},1000)

app.listen(port,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log(`Started listening port ${port}`)
    }
})
