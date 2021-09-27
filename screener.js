const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const filePath = path.resolve(__dirname, './json/zerodha-nifty-500-stocks.json');
const mainData = JSON.parse(fs.readFileSync(filePath));
const outFilePath = path.resolve(__dirname, './json/screener-nifty-500-stocks.json');


const config = {
    method: 'GET',
    url: 'https://priceapi.moneycontrol.com/pricefeed/nse/equitycash/',
    data: {}
};

const promises = [];
for (const i in mainData) {
    const stock = mainData[i];
    const params = _.cloneDeep(config);
    params.url = params.url + stock.sc_id;
    // console.log(params.url);
    promises.push(axios(params));
}


// Evenly, it's possible to use .catch
Promise.all(promises).then((data) => {
    // console.log(data);
    const stocks = [];
    for (var i = 0; i < data.length; i++) {

      const share = data[i]['data']['data'];
      const str = data[i]['config']['url'];
      const code = str.split('/').pop();
      _.set(share, 'symbol', _.get(share, 'NSEID'));
      // console.log(stock);

        // const share = _.pick(_.get(data[i], 'data.0'), ['pdt_dis_nm', 'sc_id', 'stock_name', 'sc_sector_id', 'sc_sector']);
//         const share = _.pick(_.get(data[i], 'data.0'), ['pdt_dis_nm', 'sc_id', 'stock_name', 'sc_sector_id', 'sc_sector']);
//         _.set(share, 'ISINCode', code);
//         // console.log(share);
//         // console.log(data[i]['data'][0]);

//         // stocks[i]['share_id'] = data[i]['data']['data']['share_id'];
//         // stocks[i]['fullname'] = data[i]['data']['data']['SC_FULLNM'];
        stocks.push(share);
    }
    console.log(stocks);
//     //
    const merged = _(mainData) // start sequence
        .keyBy('symbol') // create a dictionary of the 1st array
        .merge(_.keyBy(stocks, 'symbol')) // create a dictionary of the 2nd array, and merge it to the 1st
        .values() // turn the combined dictionary to array
        .value(); // get the value (array) out of the sequence

console.log(merged);

    fs.writeFile(outFilePath, JSON.stringify(merged, null, 2), function(err) {
        if (err) throw err;
        console.log('complete');
    });

}).catch(reason => {
    console.log(reason.config.data)
    // console.log(reason.response.data)
});