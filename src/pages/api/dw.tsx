import { parse } from 'node-html-parser';
import  Axios from 'axios'; 

const userAgents = [
    "Mozilla/5.0 (Linux; Android 10; Pixel 3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Mobile Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (Android 10; Mobile; rv:89.0) Gecko/89.0 Firefox/89.0",
    "Mozilla/5.0 (iPad; CPU OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Mobile Safari/537.36",
    "Mozilla/5.0 (Linux; Android 8.0.0; Nexus 5X Build/OPR6.170623.021) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Mobile Safari/537.36",
    "Mozilla/5.0 (Android 7.0; Mobile; rv:89.0) Gecko/89.0 Firefox/89.0",
    "Mozilla/5.0 (Linux; Android 10; LM-G820) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Mobile Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (Linux; Android 9; SM-A505F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Mobile Safari/537.36"
  ];

const randomUserAgent = () => {
    return userAgents[Math.floor(Math.random() * userAgents.length)];
};

const HEADERS = {
    "User-Agent": randomUserAgent(),
    "Cookie": "",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-us,en;q=0.5",
    "Sec-Fetch-Mode": "navigate",
    "Referer": "https://www.instagram.com/",
    "Access-Control-Allow-Origin": "*",
    "Content-Type" : "application/x-www-form-urlencoded"
  };

export default async function handler(req:any, res:any) {
    try {
        const query = req.query;
        const { url } = query;

        if(!url){
            res.status(400).json({message: "Bad request"});
        }

        let response = await Axios(
          {
              method : 'get',
              withCredentials: false,
              url :url,
              headers : HEADERS
          }
         );
    
         let result = parse(response.data);
         const parsedJson = JSON.parse(result.querySelector("script[type='application/ld+json']").rawText);
         res.status(200).json({ data : parsedJson[0]["video"][0]["contentUrl"] })
    } catch (error) {
        console.log(error);
    }
  }