// minimist解析命令参数  node scripts/dev.js reactivity -f global
const args = require("minimist")(process.argv.slice(2));
const { build } = require("esbuild");
const { resolve } = require("path");

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
  globalName: pkg.buildOptions?.name, //打包的全局名字
  platform: format === "cjs" ? "node" : "browser", //平台
  watch: {
    //监控文件变化
    onRebuild(error) {
      if (!error) console.log("rebuilt~~~");
    },
  },
}).then(() => {
  console.log("watching~~~");
});
