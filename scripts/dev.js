// minimist解析命令参数  node scripts/dev.js reactivity -f global
const args = require("minimist")(process.argv.slice(2));
const { build } = require("esbuild");
const { resolve } = require("path");
console.log(args);

const target = args._[0] || "reactivity";
const format = args.f || "global";

// 开发环境只打包一个
const pkg = require(resolve(__dirname, `../packages/${target}/package.json`));

// iife 立即执行
// cjs
// esm

const outputFormat = format.startsWith("global")
  ? "iife"
  : format === "cjs"
  ? "cjs"
  : "esm";

const outfile = resolve(
  __dirname,
  `../packages/${target}/dist/${target}.${format}.js`
);

build({
  entryPoints: [resolve(__dirname, `../packages/${target}/src/index.ts`)],
  outfile,
  bundle: true, //所有包打到一起
  sourcemap: true,
  format: outputFormat,
  globalName: format === "cjs" ? "node" : "browser",
  watch: {
    //监控文件变化
    onRebuild(error) {
      if (!error) console.log("rebuilt~~~");
    },
  },
}).then(() => {
  console.log("watching~~~");
});
