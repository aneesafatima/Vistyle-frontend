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

export const fashionInterestColors: Record<
  string,
  { bg: string; text: string }
> = {
  casual: { bg: "#CFE8F2", text: "#2C3E50" }, // Light blue for a laid-back feel
  formal: { bg: "#DADFE3", text: "#2B2F33" }, // Cool-toned gray, business-like
  streetwear: { bg: "#DDF4B5", text: "#4A5E3C" }, // Pale lime green, urban vibe
  athleisure: { bg: "#FFD3D3", text: "#883838" }, // Sporty soft red-pink
  bohemian: { bg: "#F4DFC4", text: "#704D36" }, // Warm peachy beige
  vintage: { bg: "#F3D38A", text: "#5E3C0A" }, // Muted mustard — nostalgic
  gothic: { bg: "#D4D4D4", text: "#1F1F1F" }, // Slightly darker gray, grounded
  preppy: { bg: "#F5C4D0", text: "#70293A" }, // Polished soft rose
  punk: { bg: "#E2C4F5", text: "#4C2A6D" }, // Pale purple with attitude
  minimalist: { bg: "#E6E6E6", text: "#444444" }, // True minimalist contrast
  maximalist: { bg: "#FFCEDC", text: "#7B3E50" }, // Lively light pink
  artistic: { bg: "#C7DCF4", text: "#1A3F6A" }, // Light desaturated blue
  eclectic: { bg: "#FFE1B3", text: "#704214" }, // Creamy orange, creative
  androgynous: { bg: "#C5D1D8", text: "#2A2E33" }, // Balanced cool gray-blue
  romantic: { bg: "#F9B8C7", text: "#8B3F55" }, // Sweet dusty pink
  Y2K: { bg: "#F7B6E1", text: "#722F6B" }, // Bright retro pink-purple
  grunge: { bg: "#C3C78F", text: "#3D4022" }, // Dirty olive-green, softened
  chic: { bg: "#F0D8A8", text: "#6A5A3F" }, // Refined golden beige
};
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
    style: "bg-[#d5eeff] rounded-t-full",
    path: require("../images/1st-row-1.png"),
  }, // 1st row
  {
    style: "bg-[#f2e9d0] rounded-full rounded-tr-none",
    path: require("../images/1st-row-2.png"),
  },
  {
    style: "bg-[#eaf6f6] rounded-r-full",
    path: require("../images/1st-row-3.png"),
  },

  { style: "bg-[#ffebeb]", path: require("../images/2nd-row-1.png") }, // 2nd row
  {
    style: "bg-[#e3e3e3] rounded-full rounded-tr-none",
    path: require("../images/2nd-row-2.png"),
  },
  {
    style: "bg-sky-100 rounded-full",
    path: require("../images/2nd-row-3.png"),
  },

  {
    style: "bg-[#ffeee7] rounded-full rounded-tr-none",
    path: require("../images/3rd-row-1.png"),
  }, // 3rd row
  { style: "bg-[#fff2be]", path: require("../images/3rd-row-2.png") },
  {
    style: "bg-[#f0ece2] rounded-l-full",
    path: require("../images/3rd-row-3.png"),
  },

  {
    style: "bg-[#eaf6f6] rounded-full rounded-bl-none",
    path: require("../images/4th-row-1.png"),
  }, // 4th row
  {
    style: "bg-[#ffebeb] rounded-full",
    path: require("../images/4th-row-2.png"),
  },
  { style: "bg-[#d5eeff]", path: require("../images/4th-row-3.png") },

  { style: "bg-yellow-100", path: require("../images/5th-row-1.png") }, // 5th row
  {
    style: "bg-[#d3f6d1] rounded-full rounded-tr-none",
    path: require("../images/5th-row-2.png"),
  },
  {
    style: "bg-rose-100 rounded-full",
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
}
