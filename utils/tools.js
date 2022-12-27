const isString = (val) => typeof val === 'string';

const isRule = (node) => node.type === 'rule';

const isCssModules = (name) => /\.css$/.test(name);

const isScssModules = (name) => /\.scss$/.test(name);

const isLessModules = (name) => /\.less$/.test(name);

const isStyleModules = (name) =>
  isCssModules(name) || isScssModules(name) || isLessModules(name);

const toCamel = str => str.replace(/(\w)\-(\w)/g, (_, prefixal, letter) => prefixal + letter.toUpperCase())

module.exports = {
  isString,
  isRule,
  isCssModules,
  isScssModules,
  isLessModules,
  isStyleModules,
  toCamel
}