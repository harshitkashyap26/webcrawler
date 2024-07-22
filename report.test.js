const { sortPages } = require('./report.js')
const { test, expect } = require('@jest/globals')

//normalizeURL Tests

test('sortPages', () => {
    const input = {
        'https://test.blog.com': 3,
        'https://test.blog.com/path1': 1,
        'https://test.blog.com/path2': 5,
        'https://test.blog.com/path3': 2,
        'https://test.blog.com/path4': 9,
    }
    const actual = sortPages(input)
    const expected = [
        ['https://test.blog.com/path4', 9],
        ['https://test.blog.com/path2', 5],
        ['https://test.blog.com', 3],
        ['https://test.blog.com/path3', 2],
        ['https://test.blog.com/path1', 1]
    ]
    expect(actual).toEqual(expected)
})