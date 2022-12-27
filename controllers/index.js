const shell = require("shelljs");
const path = require("path");
const fs = require("fs");
const aes = require("../utils/aes");
const hasCache = async (ctx) => {
  // 关闭强缓存
  ctx.set("cache-control", "no-cache");
  const jsPath = path.resolve(__dirname, "../dist/index.js");
  const content = fs.readFileSync(jsPath).toString();
  const crypto = require("crypto");
  // 对返回的内容做摘要
  const hash = crypto.createHash("sha1").update(content).digest("hex");
  // 记录最新内容的摘要
  ctx.set("etag", hash);
  // 对比最新的摘要和上次的摘要
  if (hash === ctx.header["if-none-match"]) {
    console.log("协商缓存命中");
    ctx.status = 304;
  } else {
    // 同步
    // 执行 git status 命令
    const { code } = shell.exec("yarn build");
    if (code === 0) {
      ctx.body = { data: aes.encrypt(content) };
    }
  }
};

class Code {
  static async getCode(ctx) {
    hasCache(ctx);
  }
}

module.exports = Code;
