import {
  Skia,
  useImage,
  BlendMode,
  AlphaType,
  ColorType,
} from "@shopify/react-native-skia";
import { Buffer } from "buffer";

export default function useImageProcessing(
  maskBase64: string | null,
  orgURL: string
) {
  const originalImage = useImage(orgURL); //creates a skia image object; returns null until the image is loaded
  const segmentItem = async () => {
    console.log("IN SEGMENTATION FUNCTION");
    let finalMaskImg, finalOrgImg;
    try {
      const mask = Skia.Data.fromBase64(maskBase64 as string);

      const maskedImage = Skia.Image.MakeImageFromEncoded(mask); //creates a skia image object
      const maskPixels = maskedImage?.readPixels();
      const orgPixels = originalImage?.readPixels();
      if (maskPixels instanceof Uint8Array && orgPixels instanceof Uint8Array) {
        const maskData = Skia.Data.fromBytes(maskPixels);
        const orgData = Skia.Data.fromBytes(orgPixels);
        finalOrgImg = Skia.Image.MakeImage(
          {
            width: 256,
            height: 256,
            alphaType: AlphaType.Opaque,
            colorType: ColorType.RGBA_8888,
          },
          orgData,
          256 * 4
        );
        finalMaskImg = Skia.Image.MakeImage(
          {
            width: 256,
            height: 256,
            alphaType: AlphaType.Opaque,
            colorType: ColorType.RGBA_8888,
          },
          maskData,
          256 * 4
        );
      }
      // console.log("Final Mask Image: ", finalMaskImg?.encodeToBase64()); //logs the final mask image to the console
      // console.log("Final Original Image: ", finalOrgImg?.encodeToBase64()); //logs the final original image to the console
      const offscreenSurface = Skia.Surface.MakeOffscreen(256, 256); //creates a skia surface object
      const paint = Skia.Paint(); //creates a skia paint object
      paint.setBlendMode(BlendMode.SrcIn); //sets the blend mode of the paint object to SrcIn
      if (finalMaskImg && offscreenSurface && finalOrgImg) {
        const canvas = offscreenSurface.getCanvas(); //gets the canvas object from the surface object
        canvas.drawImage(finalMaskImg, 0, 0); //draws the original image on the canvas object
        canvas.drawImage(finalOrgImg, 0, 0, paint); //draws the masked image on the canvas object
        const resultImage = offscreenSurface.makeImageSnapshot(); //creates a snapshot of the surface object
        console.log(
          Buffer.from(resultImage.encodeToBytes()).toString("base64")
        ); //logs the base64 encoded image to the console
      }
      console.log("Image Segmentation Done");
    } catch (error) {
      console.error("Error in segmentation: ", error);
    }
  };
  return { segmentItem };
}
