
#### Mở một tab mới của trình duyệt
```
browser.newPage

page.newPage()
```
#### Đi đến một trang web
```
page.goto

page = await browser.newPage();
await page.goto('https://viblo.asia/');
```

#### Set header cho trình duyệt
```
page.setExtraHTTPHeaders

await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8'
});
```

#### Set agent cho trình duyệt
```
page.setUserAgent

await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36');
```

#### Set độ rộng cho browser
```
page.setViewport

await page.setViewport({width: 1500, height: 1500});
```

#### Tự enter dữ liệu vào một ô input
```
page.type

await page.type("input[name='email']", 'viblo@gmail.com', {delay: 100});
```

#### Click vào 1 chỗ bất kỳ (button, link, input ...)
```
page.click

page.click("input[type='submit']");
await page.click('span[data-hook="ryp-review-submit-button"]');
```

#### Để trình duyệt load hoặc chờ đợi một khoảng thời gian
```
page.waitFor

page.waitFor(7000);
```

#### Đợi một element xuất hiện, ví dự bạn muốn đợi có button login xuất hiện
```
page.waitForSelector

await page.waitForSelector('#continue');
```

#### Cho phép bạn thực hiện những câu lệnh js trên browser
```
page.evaluate

 let captcha = await page.evaluate(() => {
          return document.getElementById('auth-captcha-image-container');
});
```

#### Giống với lệnh evaluate
```
page.$eval

const stockAvailable = await newPage.$eval('.instock.availability', text => {
    // Strip new line and tab spaces
    text = text.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, "");
    // Get the number of stock available
    let regexp = /^.*\((.*)\).*$/i;
    let stockAvailable = regexp.exec(text)[1].split(' ')[0];
    return stockAvailable;
});
```

#### Kiểm tra xem có id là auth-captcha-image-container hay không?
```
await page.evaluate(() => {
    const reviewLists = document.querySelectorAll(".ryp__star__button");
    reviewLists.forEach(async (review, i) => {
        let j = i + 1;
        if (j % 5 === 0) {
            reviewLists[i].click();
        }
    });
});
```

#### Đóng browser
Khi đã hoàn thành xong tất cả các task, bạn chú ý đừng quên lệnh này, nếu không browser sẽ luôn được mở mới, sẽ cực kỳ tốn ram của hệ thống nhé bạn.
```
browser.close();
```

## Migration
Create migration
```
node_modules/.bin/sequelize-cli migration:create --name <migration_name>
node_modules/.bin/sequelize-cli migration:create --name=<migration_name>
```

Run migration
```
node_modules/.bin/sequelize-cli db:migrate
```

Create model
```
node_modules/.bin/sequelize-cli model:generate --name <model_name> --attributes <attr1:data_type>,<attr2:data_type>,...
node_modules/.bin/sequelize-cli model:generate --name=<model_name> --attributes <attr1:data_type>,<attr2:data_type>,...

node_modules/.bin/sequelize-cli model:generate --name=user --attributes firstName:string,lastName:string,email:string
```

Create seed
```
node_modules/.bin/sequelize-cli seed:generate --name <seed_name>
node_modules/.bin/sequelize-cli seed:generate --name=<seed_name>
```

Run seed
```
node_modules/.bin/sequelize-cli db:seed:all
```
