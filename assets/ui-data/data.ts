import * as Font from "expo-font";
export const FashionInterest: string[] = [
  "casual",
  "formal",
  "streetwear",
  "athleisure",
  "bohemian",
  "vintage",
  "gothic",
  "preppy",
  "punk",
  "minimalist",
  "maximalist",
  "artistic",
  "eclectic",
  "androgynous",
  "romantic",
  "Y2K",
  "grunge",
  "chic",
];


export const EditableElements: EditProfileType[] = [
  {
    label: "Name",
    name: "name",
    placeholder: "Enter your name",
    type: "text",
  },
  {
    label: "Description",
    name: "description",
    placeholder: "Your fashion mantra",
    type: "text",
  },
  {
    label: "Design House",
    name: "designHouse",
    type: "text",
  },
  {
    label: "Password",
    name: "password",
    placeholder: "Enter your current password",
    type: "password",
  },
  {
    label: "New Password",
    name: "newpassword",
    placeholder: "Enter a new password",
    type: "password",
  },
  {
    label: "Confirm New Password",
    name: "passwordConfirm",
    placeholder: "Confirm your new password",
    type: "password",
  },
];

export const shapeStyles = [
  {
    background: "#d5eeff",
    rounded: { borderTopLeftRadius: 999, borderTopRightRadius: 999 }, // rounded-t-full
    path: require("../images/1st-row-1.png"),
  }, // 1st row
  {
    background: "#f2e9d0",
    rounded: { borderRadius: 999, borderTopRightRadius: 0 }, // rounded-full rounded-tr-none
    path: require("../images/1st-row-2.png"),
  },
  {
    background: "#eaf6f6",
    rounded: { borderTopRightRadius: 999, borderBottomRightRadius: 999 }, // rounded-r-full
    path: require("../images/1st-row-3.png"),
  },

  {
    background: "#ffebeb",
    rounded: {}, // no rounding
    path: require("../images/2nd-row-1.png"),
  }, // 2nd row
  {
    background: "#e3e3e3",
    rounded: { borderRadius: 999, borderTopRightRadius: 0 }, // rounded-full rounded-tr-none
    path: require("../images/2nd-row-2.png"),
  },
  {
    background: "#e0f2fe",
    rounded: { borderRadius: 999 }, // rounded-full
    path: require("../images/2nd-row-3.png"),
  },

  {
    background: "#ffeee7",
    rounded: { borderRadius: 999, borderTopRightRadius: 0 }, // rounded-full rounded-tr-none
    path: require("../images/3rd-row-1.png"),
  }, // 3rd row
  {
    background: "#fff2be",
    rounded: {}, // no rounding
    path: require("../images/3rd-row-2.png"),
  },
  {
    background: "#f0ece2",
    rounded: { borderTopLeftRadius: 999, borderBottomLeftRadius: 999 }, // rounded-l-full
    path: require("../images/3rd-row-3.png"),
  },

  {
    background: "#eaf6f6",
    rounded: { borderRadius: 999, borderBottomLeftRadius: 0 }, // rounded-full rounded-bl-none
    path: require("../images/4th-row-1.png"),
  }, // 4th row
  {
    background: "#ffebeb",
    rounded: { borderRadius: 999 }, // rounded-full
    path: require("../images/4th-row-2.png"),
  },
  {
    background: "#d5eeff",
    rounded: {}, // no rounding
    path: require("../images/4th-row-3.png"),
  },

  {
    background: "#fefce8",
    rounded: {}, // no rounding
    path: require("../images/5th-row-1.png"),
  }, // 5th row
  {
    background: "#d3f6d1",
    rounded: { borderRadius: 999, borderTopRightRadius: 0 }, // rounded-full rounded-tr-none
    path: require("../images/5th-row-2.png"),
  },
  {
    background: "#ffe4e6",
    rounded: { borderRadius: 999 }, // rounded-full
    path: require("../images/5th-row-3.png"),
  },
];
export const fontLoader = async () => {
  await Font.loadAsync({
    "poppins-medium": require("../fonts/Poppins-Medium.ttf"),
    "interTight-bold": require("../fonts/InterTight-Bold.ttf"),
    "interTight-medium": require("../fonts/InterTight-Medium.ttf"),
    "interTight-regular": require("../fonts/InterTight-Regular.ttf"),
    "freckle-face": require("../fonts/FreckleFace-Regular.ttf"),
    georgia: require("../fonts/NotoSansGeorgian-VariableFont_wdth,wght.ttf"),
    "arial-rounded": require("../fonts/Arial-rounded.ttf"),
  });
};

export const houses = [
  "The Dreamer",
  "The Rebel",
  "The Minimalist",
  "The Iconic",
  "The Trendsetter",
  "The Vintage Soul",
  "The Explorer",
  "The Romantic",
];

export const houseEmojis: Record<string, string> = {
  "The Dreamer": "🌙",
  "The Rebel": "🔥",
  "The Minimalist": "⚪",
  "The Iconic": "💫",
  "The Trendsetter": "✨",
  "The Vintage Soul": "📻",
  "The Explorer": "🧭",
  "The Romantic": "💖",
};

type DesignHouse =
  | "theminimalist"
  | "thedreamer"
  | "therebel"
  | "theiconic"
  | "thetrendsetter"
  | "thevintagesoul"
  | "theexplorer"
  | "theromantic";
