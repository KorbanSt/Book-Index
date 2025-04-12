// Tools
const getJsonFileData = require('./general/getJsonFileData.js');
const saveJsonFileData = require('./general/saveJsonFileData.js');

// Backend
const add = require('./quote/add.js');

async function init(app, rootDirectory) {

    // Init Tools
    const tools = {};
    await getJsonFileData(tools, rootDirectory);
    await saveJsonFileData(tools, rootDirectory);

    await add(app, tools);
}

module.exports = init;
