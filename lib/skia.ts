import { Skia, AlphaType, ColorType } from "@shopify/react-native-skia";
import {
  ImageManipulatorContext,
  SaveFormat,
  useImageManipulator,
} from "expo-image-manipulator";
export default function useImageProcessing(
  maskBase64: string | null,
  orgURL: string
) {
  const maskImgContext = useImageManipulator(
    `data:image/png;base64,${maskBase64}`
  ); // It initializes an image manipulation context object that provides chainable methods for performing tasks like resizing, cropping, and flipping.\
  const originalImgContext = useImageManipulator(orgURL);
  // const originalImage = useImage(orgURL); //creates a skia image object; returns null until the image is loaded

  async function resizeImage(context: ImageManipulatorContext, width: number) {
    try {
      context.resize({ width }); //resizes the image to the specified width and height
      const contextImg = await context.renderAsync(); //renders the image to a base64 string
      const contextResult = await contextImg.saveAsync({
        format: SaveFormat.PNG,
        base64: true,
        compress: 1,
      }); //saves the image to a base64 string
      return contextResult.base64; //returns the base64 string of the image
    } catch (error) {
      console.error("Error in resizing image: ", error);
    }
  }

  const segmentItem = async () => {
    console.log("IN SEGMENTATION FUNCTION");
    let finalOrgImg;

    try {
      const mask64Resized = await resizeImage(maskImgContext, 256);

      const org64Resized = await resizeImage(originalImgContext, 256);
      if (org64Resized && mask64Resized) {
        const org = Skia.Data.fromBase64(org64Resized); //check what happens if it is string
        const mask = Skia.Data.fromBase64(mask64Resized); //check what happens if it is string
        const originalImage = Skia.Image.MakeImageFromEncoded(org);
        const orgPixels = originalImage?.readPixels();
        const maskedImage = Skia.Image.MakeImageFromEncoded(mask); //creates a skia image object
        const maskPixels = maskedImage?.readPixels();

        if (
          maskPixels instanceof Uint8Array &&
          orgPixels instanceof Uint8Array
        ) {
          for (let i = 0; i <= maskPixels.length - 4; i += 4) {
            if (
              maskPixels[i] == 0 &&
              maskPixels[i + 1] == 0 &&
              maskPixels[i + 2] == 0
            ) {
              orgPixels[i + 3] = 0; //sets the alpha value of the pixel to 0
            }
          }
          // const maskData = Skia.Data.fromBytes(maskPixels);
          const orgData = Skia.Data.fromBytes(orgPixels);

          finalOrgImg = Skia.Image.MakeImage(
            {
              width: 256,
              height: 256,
              alphaType: AlphaType.Unpremul,
              colorType: ColorType.RGBA_8888,
            },
            orgData,
            256 * 4
          );
        }
        if (finalOrgImg) console.log("Final Image: ", finalOrgImg);
        console.log("Image Segmentation Done");
      } //check what happens if it is string
    } catch (error) {
      console.error("Error in segmentation: ", error);
    }
  };
  return { segmentItem };
}
