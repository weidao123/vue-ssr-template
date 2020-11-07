const front = require("../controller/front");

module.exports = function (app) {
    app.get("*", front.renderPage);
};
