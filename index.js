const converter = require('json-2-csv');
const rp = require('request-promise');
const fs = require('fs');

(async() => {

    const inputCsvFilePath = 'input.csv';
    const outputCsvFilePath = 'output.csv';
    const apiUrl = "http://www.zipcodeapi.com/rest/CXt1yJtzvJyBUIwkyRKwTrMnX41ieHPZS5hRf017agQt4pg9NWOARdHHduhbzKXc/distance.json/source/destination/mile";
    let resultArr = [];
    let promises = [];
    let json = {};
    var contents = fs.readFileSync(inputCsvFilePath, 'utf8');
    await converter.csv2jsonAsync(contents)
        .then((jsonArr) => {
            json = jsonArr;
        })
        .catch((err) => console.log(err));
    console.log(json);
    json.forEach(async(jsonObj, index) => {
        let tmpUrl = apiUrl.replace("source", jsonObj.source);
        tmpUrl = tmpUrl.replace("destination", jsonObj["destination\r"]);
        promises.push(rp(tmpUrl)
            .then((response) => {
                const res = JSON.parse(response);
                jsonObj.distance = res.distance;
            })
            .catch((err) => {
                jsonObj.distance = 'error';
                console.log(err);
                return Promise.resolve();
            }));
        resultArr.push(jsonObj);
    });
    console.log(promises.length);
    Promise.all(promises)
        .then(() => {
            converter.json2csvAsync(resultArr, { excelBOM: true })
                .then((csv) => {
                    console.log(csv);
                    fs.writeFileSync(outputCsvFilePath, csv);
                })
                .catch((err) => { console.log(err) });
        })



})();