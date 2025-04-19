import {
  Skia,
  AlphaType,
  ColorType,
  useImage,
  SkImage,
  ImageInfo,
} from "@shopify/react-native-skia";
import {
  ImageManipulatorContext,
  ImageManipulator,
  SaveFormat,
  useImageManipulator,
} from "expo-image-manipulator";
export default function useImageProcessing(
  maskBase64: string | null,
  orgURL: string
) {
  function applyingStickerEffect(
    img: SkImage | null,
    width: number | null,
    height: number | null
  ) {
    let c = 0;
    if (img && width && height) {
      const surface = Skia.Surface.Make(width, height); //creates a surface to draw on
      const canvas = surface?.getCanvas(); //gets the canvas from the surface
      canvas?.drawImage(img, 0, 0); //draws the image on the canvas
      const imageInfo: ImageInfo = {
        width: 50,
        height: 50,
        colorType: ColorType.RGBA_8888, // RGBA format
        alphaType: AlphaType.Unpremul, // Premultiplied alpha
      };
      const pixels = canvas?.readPixels(0, 0, imageInfo); //reads the pixels from the canvas
      if (pixels) {
        let lx = 0,
          ly = 0;
        const path = Skia.Path.Make(); //creates a path to draw on
        for (let x = 0; x < width; x++) {
          for (let y = 0; y < height; y++) {
            const index = (y * width + x) * 4;

            if (pixels[index + 3] > 0) {
              // Check if this pixel has any transparent neighbor
              const neighbors = [
                y > 0 && pixels[((y - 1) * width + x) * 4 + 3] === 0, // Top
                y < height - 1 && pixels[((y + 1) * width + x) * 4 + 3] === 0, // Bottom
                x > 0 && pixels[(y * width + (x - 1)) * 4 + 3] === 0, // Left
                x < width - 1 && pixels[(y * width + (x + 1)) * 4 + 3] === 0, // Right
              ];

              if (neighbors.some((n) => n)) {
                if (c == 0) {
                  c = 1;
                  path.moveTo(x, y); // Move to the pixel position
                } else {
                  path.quadTo(lx, ly, x, y); // Draw a line to the pixel position
                }
                lx = x;
                ly = y;
              }
            }
          }
        }
      }
    }
  }

  const orgUriImg = useImage(orgURL); //loads the image from the url and returns an object containing the image and its properties

  //check for repeated consoles of the final image + this hook running

  const maskImgContext = useImageManipulator(
    `data:image/png;base64,${maskBase64}`
  ); // It initializes an image manipulation context object that provides chainable methods for performing tasks like resizing, cropping, and flipping.

  async function resizeImage(
    context: ImageManipulatorContext,
    width: number | undefined,
    height?: number
  ) {
    try {
      context.resize({ width, height }); //resizes the image to the specified width and height
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
      const mask64Resized = await resizeImage(
        maskImgContext,
        orgUriImg?.width(),
        orgUriImg?.height()
      ); //resizes the mask image to the same width as the original image

      if (orgUriImg && mask64Resized) {
        const org = Skia.Data.fromBase64(orgUriImg.encodeToBase64()); //check what happens if it is string
        const mask = Skia.Data.fromBase64(mask64Resized); //check what happens if it is string
        const originalImage = Skia.Image.MakeImageFromEncoded(org);
        const orgPixels = originalImage?.readPixels();
        const maskedImage = Skia.Image.MakeImageFromEncoded(mask); //creates a skia image object
        const maskPixels = maskedImage?.readPixels();
        console.log(
          "Original Image: ",
          originalImage?.width(),
          originalImage?.height()
        );
        console.log(
          "Mask Image: ",
          maskedImage?.width(),
          maskedImage?.height()
        );
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
              width: originalImage?.width() || 256,
              height: originalImage?.height() || 256,
              alphaType: AlphaType.Unpremul,
              colorType: ColorType.RGBA_8888,
            },
            orgData,
            (originalImage?.width() || 256) * 4
          );
        }
        if (finalOrgImg) {
          console.log("Image Segmentation Done");
          const finalImgContext = ImageManipulator.manipulate(
            "data:image/png;base64," + finalOrgImg.encodeToBase64()
          );
          // const finalWidth = 200;
          // const aspectRatio =
          //   (originalImage?.height() || 256) / (originalImage?.width() || 256);
          // const finalHeight = Math.round(finalWidth * aspectRatio);
          const finalImg64 = await resizeImage(finalImgContext, 100);
          const final = Skia.Data.fromBase64(finalImg64 ?? ""); //check what happens if it is string
          const finalObj = Skia.Image.MakeImageFromEncoded(org);
          const finalPixels = finalObj?.readPixels();
          applyingStickerEffect(
            finalObj,
            finalObj?.width() ?? null,
            finalObj?.height() ?? null
          );
          // console.log("Final Image: ", finalImg64, finalObj?.width(), finalObj?.height());
        } //check what happens if it is string
      }
    } catch (error) {
      console.error("Error in segmentation: ", error);
    }
  };
  return { segmentItem };
}
