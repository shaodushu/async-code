const Router = require("koa-router");
const index = require("../../controllers/index");
const router = new Router({ prefix: "/api/v1" });

router.get("/data", index.getCode);

module.exports = router.routes();
