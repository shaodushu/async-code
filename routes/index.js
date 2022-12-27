const Router = require("koa-router");

const router = new Router();

router.use(require("./v1"));

module.exports = router;
