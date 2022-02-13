export default function (req, res, next) {
    const axios = require('axios')
    const cheerio = require('cheerio')
    const url = require('url')

    // Get query
    const parsed_url = new URL(req.rawHeaders[15])
    const articleUrl = decodeURIComponent(parsed_url.searchParams.get('url'))
    
    // Set hrequest header
    res.writeHead(200, { 'Content-Type': 'application/json' })

    // get data
    axios.get(articleUrl).then((response) => {
        const $ = cheerio.load(response.data)

        // Get primary articles
        const $el = $('#contenu #texte')
        const article = {
            title: $el.children('h1').text(),
            content: $el.children('.fck').html()
        }

        // Send data
        res.end(JSON.stringify(article))
    })

    // next is a function to call to invoke the next middleware
    // Don't forget to call next at the end if your middleware is not an endpoint!
    next()
}
