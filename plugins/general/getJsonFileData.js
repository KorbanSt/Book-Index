const fs = require('fs');
const path = require('path');

getJsonFileData = async function(tools, rootDirectory) {
    tools.getJsonData = async function(filePath){
        try {
            return JSON.parse(fs.readFileSync(path.join(rootDirectory, filePath), 'utf8'));
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}

module.exports = getJsonFileData;