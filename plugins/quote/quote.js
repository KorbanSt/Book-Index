const addQuote = require('./add.js');
const displayQuotes = require('./display.js');
const remove = require('./remove.js');

quote = async function(app, tools) {
    await addQuote(app, tools);
    await displayQuotes(app, tools);
    await remove(app, tools);
}

module.exports = quote;