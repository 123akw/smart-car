import fs from 'fs';

function readAndParseJsonFileSync(path) {
    try {
        const jsonData = fs.readFileSync(path, 'utf8');
        return JSON.parse(jsonData);
    } catch (e) {
        console.error('error:dbConfig json is not find \n', e);
    }
}
export { readAndParseJsonFileSync };