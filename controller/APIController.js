module.exports = {
    getAllPromotions: getAllPromotions,
    getPromotion: getPromotion
};

const sourceFile1 = require('./data');
const sourceFile2 = require('./promo');

function getAllPromotions(req, res) {
    res.json(sourceFile1);
}

function getPromotion(req, res) {
    res.json(sourceFile2);
}
