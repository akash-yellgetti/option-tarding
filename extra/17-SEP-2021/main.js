$(document).ready(function () {


let url = "https://appfeeds.moneycontrol.com/jsonapi/fno/overview&format=json&inst_type=options&option_type=CE&id=NIFTY&ExpiryDate=2021-09-16";

  var callAjaxSettings = {
    url,
    "method": "GET",
    cache: true,
    "timeout": 0,
     "headers": {
    // "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36",
    // "sec-ch-ua-platform": "\"Windows\""
  },
    dataSrc: function (json) {
      console.log(json);

      const data = _.get(json, 'fno_list.item');

      return data;
    }
  };


  const callTable = $('#callTable').DataTable({
    ajax: callAjaxSettings,
    columns:[

{"data": "fno_exp" , "title": "fno_exp"},
{"data": "strikeprice" , "title": "strikeprice"},
{"data": "lastvalue" , "title": "lastvalue"},
{"data": "percentchange" , "title": "percentchange"},
{"data": "direction" , "title": "direction"},
{"data": "oi_change" , "title": "oi_change"},
{"data": "oi_percchg" , "title": "oi_percchg"},
{"data": "last_traded_date" , "title": "last_traded_date"},
{"data": "volume" , "title": "volume"}
]
  })

  const puturl = "https://appfeeds.moneycontrol.com/jsonapi/fno/overview&format=json&inst_type=options&option_type=PE&id=NIFTY&ExpiryDate=2021-09-16";

    var putAjaxSettings = {
    url: puturl,
    "method": "GET",
    cache: true,
    "timeout": 0,
     "headers": {

  },
    dataSrc: function (json) {
      console.log(json);

      const data = _.get(json, 'fno_list.item');

      return data;
    }
  };


  const putTable = $('#putTable').DataTable({
    ajax: putAjaxSettings,
    columns:[

{"data": "fno_exp" , "title": "fno_exp"},
{"data": "strikeprice" , "title": "strikeprice"},
{"data": "lastvalue" , "title": "lastvalue"},
{"data": "percentchange" , "title": "percentchange"},
{"data": "direction" , "title": "direction"},
{"data": "oi_change" , "title": "oi_change"},
{"data": "oi_percchg" , "title": "oi_percchg"},
{"data": "last_traded_date" , "title": "last_traded_date"},
{"data": "volume" , "title": "volume"}
]
  })
})