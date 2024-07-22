const { normalizeURL, getURLsFromHTML } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

//normalizeURL Tests

test('normalizeURL strip protocol', () => {
    const input = 'https://test.blog.com/path'
    const actual = normalizeURL(input)
    const expected = 'test.blog.com/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip trailing slash', () => {
    const input = 'https://test.blog.com/path/'
    const actual = normalizeURL(input)
    const expected = 'test.blog.com/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL decapitalize', () => {
    const input = 'https://TEST.blog.com/path'
    const actual = normalizeURL(input)
    const expected = 'test.blog.com/path'
    expect(actual).toEqual(expected)
})

//getURLsFromHTML Tests

test('getURLsFromHTML absolute', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://test.blog.com/"
                Blog
            </a>
        </body>
    </html>
    `
    const inputBaseURL = "https://test.blog.com"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://test.blog.com/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/"
                Blog
            </a>
        </body>
    </html>
    `
    const inputBaseURL = "https://test.blog.com"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://test.blog.com/path/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML both', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://test.blog.com/path1/"
                Blog Path 1
            </a>
            <a href="/path2/"
                Blog Path 2
            </a>
        </body>
    </html>
    `
    const inputBaseURL = "https://test.blog.com"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://test.blog.com/path1/", "https://test.blog.com/path2/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML invalid', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid"
                Invalid URL
            </a>
        </body>
    </html>
    `
    const inputBaseURL = "https://test.blog.com"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})