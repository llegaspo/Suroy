const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const { resolver } = defaultConfig;

resolver.sourceExts.push('cjs');

module.exports = defaultConfig;
