const to = Math.round((new Date().getTime()) / 1000);
const from = Math.round((new Date(new Date().setHours(0, 0, 0, 0)).getTime()) / 1000);
const optionCondiiton = [

    {
      name: "Call Writing",
      price: "negative",
      types: ["CE"],
      changeinOpenInterest: "positive",
    },
    {
      name: "Put Writing",
      price: "negative",
      types: ["PE"],
      changeinOpenInterest: "positive",
    },
    {
      name: "Call Unwinding",
      price: "positive",
      types: ["CE"],
      changeinOpenInterest: "negative",
    },
    {
      name: "Put Unwinding",
      price: "positive",
      types: ["PE"],
      changeinOpenInterest: "negative",
    },
    {
      name: "Long Build Up",
      price: "positive",
      types: ["PE", "CE"],
      changeinOpenInterest: "positive",
    },
    {
      name: "Short Build Up",
      price: "negative",
      types: ["PE", "CE"],
      changeinOpenInterest: "positive",
    },
    {
      name: "Long Unwinding",
      price: "negative",
      types: ["PE", "CE"],
      changeinOpenInterest: "negative",
    },
    {
      name: "Short Covering",
      price: "positive",
      types: ["PE", "CE"],
      changeinOpenInterest: "negative",
    },
  ]

const getPositionName = (option, type) => {
    const o = _.get(option, type);
    const price = Math.sign(o.change) === -1 ? 'negative' : 'positive';
    const changeinOpenInterest = Math.sign(o.changeinOpenInterest) === -1 ? 'negative' : 'positive';
    const conditions = _.filter(optionCondiiton, (res) => {
      return _.indexOf(res.types, type) > -1;
    })

    return _.find(conditions, { price, changeinOpenInterest });
  }


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
     "headers": {
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36",
    "sec-ch-ua-platform": "\"Windows\""
  },
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
        _.set(data[i], 'CE.change', _.get(option, 'CE.change').toFixed(2));
        _.set(data[i], 'PE.change', _.get(option, 'PE.change').toFixed(2));
        _.set(data[i], 'optionPrice', optionPrice);
        _.set(data[i], 'price', price);
        _.set(data[i], 'selectedStrikeprice', selectedStrikeprice);
        _.set(data[i], 'ceOptionAction', getPositionName(option, 'CE') );
        _.set(data[i], 'ceLastPrice', ceOptionLastPrice);
        _.set(data[i], 'ceOptionPremium', ceOptionPremium);
        _.set(data[i], 'peLastPrice', peOptionLastPrice);
        _.set(data[i], 'peOptionPremium', peOptionPremium);
        _.set(data[i], 'peOptionAction', getPositionName(option, 'PE') );
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
    "order": [[ 7, "asc" ]],
    "columns": [
      // {
      //   "data": "expiryDate",
      //   "title": "expiryDate"
      // },
      {
        "data": "price",
        "title": "price",
        "width": "5%"
      },
      // {
      //   "data": "optionPrice",
      //   "title": "optionPrice"
      // },
      {
        "data": "ceOptionAction.name",
        "title": "ceOptionAction"
      },
      {
        "data": "CE.changeinOpenInterest",
        "title": "C-OI",
        "width": "5%"
      },
      {
        "data": "CE.openInterest",
        "title": "OI",
        "width": "5%"
      },
      {
        "data": "CE.change",
        "title": "C-price",
        "width": "5%"
      },
      {
        "data": "ceLastPrice",
        "title": "ceLastPrice",
        "width": "5%"
      },
      // {
      //   "data": "ceOptionPremium",
      //   "title": "ceOptionPremium"
      // },
      {
        "data": "strikePrice",
        "title": "strikePrice",
        "width": "5%"
      },
      {
        "data": "peLastPrice",
        "title": "peLastPrice",
        "width": "5%"
      },
      // {
      //   "data": "peOptionPremium",
      //   "title": "peOptionPremium"
      // },
      {
        "data": "peOptionAction.name",
        "title": "peOptionAction",

      },
      {
        "data": "PE.change",
        "title": "C-price",
        "width": "5%"
      },
      {
        "data": "PE.changeinOpenInterest",
        "title": "C-OI",
        "width": "5%"
      },
      {
        "data": "PE.openInterest",
        "title": "OI",
        "width": "5%"
      }

    ],
    "rowCallback": function (row, data, index) {
      // console.log(data);

      if (data['peOptionPremium'] !== 0 && data['peOptionPremium'] > -10 && data['peOptionPremium'] < 10 && data['peOptionLastPrice'] < 300) {
        $('td', row).css('background-color', 'yellow');
      }

      if (data['ceOptionPremium'] !== 0 && data['ceOptionPremium'] > -10 && data['ceOptionPremium'] < 10 && data['ceOptionLastPrice'] < 300) {
        $('td', row).css('background-color', 'green');
      }

       if (data['strikePrice'] === data['selectedStrikeprice']) {
        $('td', row).css('background-color', 'Orange');
      }

    }

  });


})