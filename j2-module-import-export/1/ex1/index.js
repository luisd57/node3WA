const {calculateTTC} = require('./utils');

const priceHT = [
    { name : "Apple", priceHT : 1.0, priceTTC : null },
    { name : "Orange", priceHT : 1.2, priceTTC : null },
    { name : "Rasberry", priceHT : 2.5, priceTTC : null },
];

const taxRate = 0.20;

priceHT.forEach(item => {
    item.priceTTC = calculateTTC(item.priceHT, taxRate);
});

console.log(priceHT);