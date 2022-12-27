const Koa = require("koa");

const router = require("./router");
const app = new Koa();
app.use(router.routes());
const PORT = 3000;
app.listen(PORT);
console.log(`server is starting at port ${PORT}`);
