// import puppeteer, { Browser } from "puppeteer";
import axios from "axios";
import cheerio from "cheerio";

class RequestManager {
  public static instance: RequestManager;

  static getInstance() {
    if (typeof RequestManager.instance === "object") {
      return RequestManager.instance;
    }
    RequestManager.instance = new RequestManager();
    return RequestManager.instance;
  }

  // public async build(others = {}): Promise<Browser | null> {
  //   try {
  //     const args = {
  //       headless: false,
  //       defaultViewport: null,
  //       ...others
  //       // slowMo: 200,
  //     };
  //     return await puppeteer.launch(args);
  //   } catch (error) {
  //     console.log(`error is `, error);
  //     return null;
  //   }
  // }

  public async getContent(url: string): Promise<string> {
    const response = await axios.get(url);
    let resObj: any = {},
      //set a reference to the document that came back
      $ = cheerio.load(response.data),
      //create a reference to the meta elements
      $title = $('head title').text(),
      $desc = $('meta[name="description"]').attr('content'),
      $kwd = $('meta[name="keywords"]').attr('content'),
      $ogTitle = $('meta[property="og:title"]').attr('content'),
      $ogImage = $('meta[property="og:image"]').attr('content'),
      $ogkeywords = $('meta[property="og:keywords"]').attr('content');

    if ($title) {
      resObj.title = $title;
    }

    if ($desc) {
      resObj.description = $desc;
    }

    if ($kwd) {
      resObj.keywords = $kwd;
    }

    if ($ogImage && $ogImage.length) {
      resObj.ogImage = $ogImage;
    }

    if ($ogTitle && $ogTitle.length) {
      resObj.ogTitle = $ogTitle;
    }

    if ($ogkeywords && $ogkeywords.length) {
      resObj.ogkeywords = $ogkeywords;
    }

    return resObj;
  }
}

export default RequestManager.getInstance();
