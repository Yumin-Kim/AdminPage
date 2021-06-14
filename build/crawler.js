const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const stringify = require("csv-stringify/lib/sync");
const fs = require("fs").promises;
(async () => {
  // 브라우저를 실행한다.
  // 옵션으로 headless모드를 끌 수 있다.
  const browser = await puppeteer.launch({
    headless: false,
  });

  // 새로운 페이지를 연다.
  await Promise.all(
    new Array(30).fill().map(async (el, index) => {
      try {
        const page = await browser.newPage();
        // 페이지의 크기를 설정한다.
        await page.setViewport({
          width: 1366,
          height: 768,
        });
        console.log(index);
        await page.goto(
          `https://www.bobaedream.co.kr/mycar/mycar_list.php?gubun=I&page=${
            index + 1
          }&order=S11&view_size=100`
        );
        // await page.goto(
        //   `https://www.bobaedream.co.kr/mycar/mycar_list.php?gubun=K&page=${
        //     index + 1
        //   }&order=S11&view_size=10000`
        // );

        // 페이지의 HTML을 가져온다.
        const content = await page.content();
        // $에 cheerio를 로드한다.
        const $ = cheerio.load(content);
        // 복사한 리스트의 Selector로 리스트를 모두 가져온다.
        const lists = await $(`.list-inner`);
        // 모든 리스트를 순환한다.
        let data = [];
        await lists.each((index, list) => {
          let nthArray = [];
          const regExArr = [/동/g, /인승/g, /기통/g, /마력/g, /kgm/g];
          new Array(5).fill().map((el, idx) => {
            nthArray.push(
              $(list)
                .find(`.title .is-list dd:nth-child(${idx + 1})`)
                .text()
            );
          });
          regExArr.map((el, idx) => {
            nthArray[idx] =
              nthArray[idx].match(el) === null ? "" : nthArray[idx];
          });

          data.push([
            $(list).find(".title .tit  a").text(),
            ...nthArray,
            $(list).find(".fuel .text").text(),
            $(list).find(".km .text").text(),
            `${$(list).find(".price b .cr").text()}만원`,
          ]);
        });
        console.log(data);
        const str = stringify(data);
        await fs.appendFile("test.csv", "\uFEFF" + str);
        await page.waitForTimeout(10000);
        await page.evaluate(async () => {
          await new Promise(function (resolve) {
            setTimeout(resolve, 10000);
          });
        });
        // 브라우저를 종료한다.
        await page.close();
      } catch (error) {
        console.log(error);
      } finally {
        await browser.close();
      }
    })
  );
})();

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}
