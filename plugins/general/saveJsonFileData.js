const fs = require('fs');
const path = require('path');

saveJsonFileData = async function(tools, rootDirectory) {
    tools.saveJsonData = async function(filePath, dataToSave){
        try {
            const saveData = JSON.stringify(dataToSave, null, 2);
            fs.writeFileSync(path.join(rootDirectory, filePath), saveData, 'utf8');
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = saveJsonFileData;