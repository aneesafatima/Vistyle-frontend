const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

// Get the base config
const config = getDefaultConfig(__dirname);

// Apply the wrappers in order
const nativeWindConfig = withNativeWind(config, { input: './global.css' });
const finalConfig = wrapWithReanimatedMetroConfig(nativeWindConfig);

// Export the final config
module.exports = finalConfig;

