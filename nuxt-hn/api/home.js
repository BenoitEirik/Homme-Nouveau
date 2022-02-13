export default function (req, res, next) {
    const axios = require('axios')
    const cheerio = require('cheerio')
    
    // Set hrequest header
    res.writeHead(200, { 'Content-Type': 'application/json' })

    // URL
    const url = 'https://www.hommenouveau.fr/'

    // get data
    var json = {}
    axios.get(url).then((response) => {
        const $ = cheerio.load(response.data)

        // Get primary articles
        const primaryArticleElements = $('#aLaUne #diapo .viewport .overview li')
        const primaryArticles  = []
        primaryArticleElements.each((index, el) => {
            primaryArticles.push({
                id: index,
                url: $(el).children('.titreDiapo').attr('href'),
                img: $(el).children('a').children('img').attr('src'),
                title: $(el).children('.titreDiapo').text(),
                description: $(el).children('#accroche').text(),
            })
        })

        // Get secondary articles
        const secondaryArticleElements = $('#aLaUne-suite article')
        const secondaryArticles = []
        secondaryArticleElements.each((index, el) => {
            secondaryArticles.push({
                id: index,
                url: $(el).children('a').attr('href'),
                img: $(el).children('a').children('.conteneurImg').children('img').attr('src'),
                title: $(el).children('a').children('h1').text(),
                detail: $(el).children('a').children('.detailBillet').text(),
                description: $(el).children('a').children('.fck').children('p').text()
            })
        })

        // Set json payload
        json = {
            primaryArticles,
            secondaryArticles
        }

        // Send data
        res.end(JSON.stringify(json))
    })

    // next is a function to call to invoke the next middleware
    // Don't forget to call next at the end if your middleware is not an endpoint!
    next()
}
