import fs from 'fs';
function readAndParseJsonFileSync() {
    try {
        const jsonData = fs.readFileSync('dbConfig.json', 'utf8');
        const jsonContent = JSON.parse(jsonData);
        return jsonContent;
    } catch (e) {
        console.log('dbConfig json is not find \n', e);
    }
}
export {readAndParseJsonFileSync};