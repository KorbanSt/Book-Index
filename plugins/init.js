// Tools
const getJsonFileData = require('./general/getJsonFileData.js');
const saveJsonFileData = require('./general/saveJsonFileData.js');

// Backend
const addQuote = require('./quote/add.js');
const displayQuotes = require('./quote/display.js');

async function init(app, rootDirectory) {

    // Init Tools
    const tools = {};
    await getJsonFileData(tools, rootDirectory);
    await saveJsonFileData(tools, rootDirectory);

    await addQuote(app, tools);
    await displayQuotes(app, tools);
}

module.exports = init;
