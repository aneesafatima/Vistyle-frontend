import {
  Skia,
  useImage,
  BlendMode,
  AlphaType,
  ColorType,
} from "@shopify/react-native-skia";
import { SaveFormat, useImageManipulator } from "expo-image-manipulator";
import { Buffer } from "buffer";
import { useState, useContext } from "react";
import { GlobalContext } from "@/context/GlobalProvider";
export default function useImageProcessing(
  maskBase64: string | null,
  orgURL: string
) {
  const maskContext = useImageManipulator(
    `data:image/png;base64,${maskBase64}`
  ); // It initializes an image manipulation context object that provides chainable methods for performing tasks like resizing, cropping, and flipping.
  const originalImage = useImage(orgURL); //creates a skia image object; returns null until the image is loaded
  const segmentItem = async () => {
    console.log("IN SEGMENTATION FUNCTION");
    let finalMaskImg, finalOrgImg;

    maskContext.resize({
      width: 256,
      height: 256,
    }); //resizes the image to 256x256 pixels
    try {
      const contextMaskImg = await maskContext.renderAsync(); //renders the image to a base64 string

      const contextMaskResult = await contextMaskImg.saveAsync({
        format: SaveFormat.PNG,
        base64: true,
      }); //saves the image to a base64 string

      const mask = Skia.Data.fromBase64(maskBase64 as string);
      const maskedImage = Skia.Image.MakeImageFromEncoded(mask); //creates a skia image object
      const maskPixels = maskedImage?.readPixels();
      const orgPixels = originalImage?.readPixels();
      if (maskPixels instanceof Uint8Array && orgPixels instanceof Uint8Array) {
        for (let i = 0; i <= maskPixels.length - 4; i += 4) {
          if (
            maskPixels[i] == 0 &&
            maskPixels[i + 1] == 0 &&
            maskPixels[i + 2] == 0
          ) {
            maskPixels[i + 3] = 0; //sets the alpha value of the pixel to 0
          }
        }
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
            alphaType: AlphaType.Unpremul,
            colorType: ColorType.RGBA_8888,
          },
          maskData,
          256 * 4
        );
      }
      const offscreenSurface = Skia.Surface.MakeOffscreen(256, 256); //creates a skia surface object
      const paint = Skia.Paint(); //creates a skia paint object
      paint.setBlendMode(BlendMode.SrcIn); //sets the blend mode of the paint object to SrcIn
      if (finalMaskImg && offscreenSurface && finalOrgImg) {
        const canvas = offscreenSurface.getCanvas(); //gets the canvas object from the surface object
        canvas.drawImage(finalMaskImg, 0, 0); //draws the original image on the canvas object
        canvas.drawImage(finalOrgImg, 0, 0, paint); //draws the masked image on the canvas object
        const resultImage = offscreenSurface.makeImageSnapshot(); //creates a snapshot of the surface object
        // console.log(
        //   Buffer.from(resultImage.encodeToBytes()).toString("base64")
        // ); //logs the base64 encoded image to the console
      }
      console.log("Image Segmentation Done");
    } catch (error) {
      console.error("Error in segmentation: ", error);
    }
  };
  return { segmentItem };
}