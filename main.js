$(document).ready(function () {
  $("#NIFTY").attr('checked', true);

  let url = "https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY";
  $('input[type=radio][name=market]').change(function () {
    if (this.value == 'NIFTY') {
      url = "https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY"
    } else if (this.value == 'BANKNIFTY') {
      url = "https://www.nseindia.com/api/option-chain-indices?symbol=BANKNIFTY"
    }
    // console.log(url);
    // table.table().ajax().reload()
    table.ajax.url(url).load();
  });


  var settings = {
    url,
    "method": "GET",
    cache: true,
    "timeout": 0,
    "headers": {},
    dataSrc: function (json) {
      const data = _.get(json, 'filtered.data');
      const price = _.get(json, 'records.underlyingValue');
      const selectedStrikeprice = Math.round(Math.round(price) / 100) * 100;
      console.log(selectedStrikeprice);

      for (const i in data) {
        const option = data[i];
        const optionPrice = price > option.strikePrice ? parseFloat((price - option.strikePrice).toFixed(2)) : parseFloat((option.strikePrice - price).toFixed(2));
        // console.log(optionPrice);
        const ceOptionLastPrice = _.get(option, 'CE.lastPrice');
        const ceOptionPremium = option.strikePrice >= price ? 0 : parseFloat((ceOptionLastPrice - optionPrice).toFixed(2));
        // const ceOptionPremium = 0;
        const peOptionLastPrice = _.get(option, 'PE.lastPrice');
        const peOptionPremium = option.strikePrice <= price ? 0 : parseFloat((peOptionLastPrice - optionPrice).toFixed(2));
        // const peOptionPremium = 0;
        // console.log(ceOptionPremium);
        // const ceOptionPremium = optionPrice-_.get(option,'CE.lastPrice');

        _.set(data[i], 'optionPrice', optionPrice);
        _.set(data[i], 'price', price);
        _.set(data[i], 'selectedStrikeprice', selectedStrikeprice);
        _.set(data[i], 'ceOptionLastPrice', ceOptionLastPrice);
        _.set(data[i], 'ceOptionPremium', ceOptionPremium);
        _.set(data[i], 'peOptionLastPrice', peOptionLastPrice);
        _.set(data[i], 'peOptionPremium', peOptionPremium);
        // console.log(_.pick(data[i], ['strikePrice', 'optionPrice', 'ceOptionLastPrice']));
      }

      const filterData = _.chain(data).orderBy(['strikePrice'], ['asc']).drop(52).take(31).value();

      // for ( var i=0, ien=json.data.length ; i<ien ; i++ ) {
      //   json.data[i][0] = '<a href="/message/'+json.data[i][0]+'>View message</a>';
      // }
      return filterData;
    }
  };

  let dataSet = [];


  const table = $('#table').DataTable({
    // data: dataSet,
    ajax: settings,

    "pageLength": 50,
    "order": [[ 5, "asc" ]],
    "columns": [{
        "data": "expiryDate"
      },
      {
        "data": "price"
      },
      {
        "data": "optionPrice"
      },
      {
        "data": "ceOptionLastPrice"
      },
      {
        "data": "ceOptionPremium"
      },
      {
        "data": "strikePrice"
      },
      {
        "data": "peOptionLastPrice"
      },
      {
        "data": "peOptionPremium"
      }
    ],
    "rowCallback": function (row, data, index) {
      // console.log(data);
      if (data['strikePrice'] === data['selectedStrikeprice']) {
        $('td', row).css('background-color', 'Orange');
      }

      if (data['peOptionPremium'] !== 0 && data['peOptionPremium'] > -10 && data['peOptionPremium'] < 10 && data['peOptionPremium'] < 200) {
        $('td', row).css('background-color', 'green');
      }

      if (data['ceOptionPremium'] !== 0 && data['ceOptionPremium'] < 10 && data['ceOptionLastPrice'] < 200) {
        $('td', row).css('background-color', 'green');
      }
    }

  });


})