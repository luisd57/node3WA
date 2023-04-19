function calculateTTC(price, taxRate) {
    const taxAmount = price * taxRate;
    const priceTTC = price + taxAmount;
    return parseFloat(priceTTC.toFixed(2));
}

module.exports = {
    calculateTTC
};