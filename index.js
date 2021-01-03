const axios = require('axios');
const cheerio = require('cheerio');
const trackingId = ""
const url = "https://celeritastransporte.com/seguimiento-paquete-pedidos/?refer="+trackingId+"&lang=es&c=141"

fetchData(url).then( (res) => {
    const html = res.data;
    const $ = cheerio.load(html);
    const statsTable = $('.order-tracking-situations > .rows > ul');
    statsTable.each(function() {
        let date = $(this).find('.date').text();
        console.log(date);
        let stat = $(this).find('.situation > .event-description').text().trim();
        console.log(stat);
        let time = $(this).find('.time').text();
        console.log(time);
    })
})

async function fetchData(url) {
    console.log("Crawling data...");

    let response = await axios(url).catch((err) => console.log(err));

    if (response.status !== 200) {
        console.log("Error ocurred while fetching data");
        return;
    }

    return response;
}