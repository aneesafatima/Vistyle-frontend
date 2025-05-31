module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "react-native-iconify/babel",
        {
          icons: [
            "mdi:heart",
            "mdi:home",
            "mdi:account",
            "feather:activity",
            "icon-park-outline:back",
            "fluent:design-ideas-20-regular",
            "iconamoon:swap-light",
            "material-symbols:question-mark-rounded",
            "gridicons:cross-small",
            "icomoon-free:enlarge2",
            "lets-icons:done-round-fill",
            "ic:round-info"
            // Add more icons here
          ],
        },
      ],
    ],
  };
};
