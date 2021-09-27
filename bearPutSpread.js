// const buyPut = {
//   strikeprice: 220,
//   premium: -9,
// };

// const sellPut = {
//   strikeprice: 200,
//   premium: 0.75,
// };

// const width = 10;


const buyPut = {
  strikeprice: 10900,
  premium: 180,
};

const sellPut = {
  strikeprice: 11000,
  premium: 130,
};

const width = 100;

const maxLoss = buyPut.premium-sellPut.premium;

const breakEven = sellPut.strikeprice + maxLoss;


// console.log(breakEven);
//
//
const mid = (buyPut.strikeprice + sellPut.strikeprice)/2
console.log(mid);
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
      buyPutProfit: sellPut.strikeprice>strikeprice ? ((buyPut.strikeprice-strikeprice)+buyPut.premium) : buyPut.premium,
      sellPutProfit: sellPut.strikeprice>strikeprice ? ((strikeprice-sellPut.strikeprice)+sellPut.premium) : sellPut.premium,
      net: 0
    }
    d.net = d.buyPutProfit+d.sellPutProfit;
    data.push(d);
  }

}

console.log(data);