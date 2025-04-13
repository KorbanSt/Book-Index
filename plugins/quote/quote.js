const addQuote = require('./add.js');
const displayQuotes = require('./display.js');
const remove = require('./remove.js');
const edit = require('./edit.js');

quote = async function(app, tools) {
    await addQuote(app, tools);
    await displayQuotes(app, tools);
    await remove(app, tools);
    await edit(app, tools);
}

module.exports = quote;