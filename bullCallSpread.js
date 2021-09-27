const buyCall = {
  strikeprice: 10900,
  premium: 180,
};

const sellCall = {
  strikeprice: 11000,
  premium: 130,
};

const width = 100;


const maxLoss = buyCall.premium-sellCall.premium;

const breakEven = sellCall.strikeprice + maxLoss;


// console.log(breakEven);
//
//
const mid = buyCall.strikeprice > sellCall.strikeprice ? sellCall.strikeprice : buyCall.strikeprice;
// console.log(mid);
const strikeData = [];
for (var i = 1; i < 8; i++) {
  strikeData.push(mid-(width*i));
  strikeData.push(mid+(width*i));
}

strikeData.sort();

console.log(strikeData);

const data = [];
for(const i in strikeData) {
  if (strikeData[i]) {
    const strikeprice = strikeData[i];
    const d = {
      strikeprice,
      buyCallProfit: sellCall.strikeprice<strikeprice ? ((strikeprice-buyCall.strikeprice)-buyCall.premium) : -buyCall.premium,
      sellCallProfit: sellCall.strikeprice<strikeprice ? (sellCall.premium-(strikeprice-sellCall.strikeprice)) : sellCall.premium,
      net: 0
    }
    d.net = d.buyCallProfit+d.sellCallProfit;
    data.push(d);
  }

}

console.log(data);