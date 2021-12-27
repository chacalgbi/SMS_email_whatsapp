const csv = require('csv-parser')
const fs = require('fs')
const results = [];

module.exports = function ler_csv(arquivo) {
    return new Promise((resolve, reject) => {
        fs.createReadStream(`./${arquivo}`)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                resolve(results);
            });
    });
}