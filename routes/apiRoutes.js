module.exports = (router, app, APIController) => {
    router.post("/promotions", app.oauth.authorise(), APIController.getAllPromotions);
    router.post("/promotion", app.oauth.authorise(), APIController.getPromotion);
    return router;
};
