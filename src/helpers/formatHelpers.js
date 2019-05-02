const showdown  = require('showdown'),
    converter = new showdown.Converter();

export function markdownToHtml(str) {
   return converter.makeHtml(str);
}