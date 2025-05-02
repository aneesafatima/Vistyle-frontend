import {
  Skia,
  AlphaType,
  ColorType,
  useImage,
  SkImage,
  ImageInfo,
  PaintStyle,
  StrokeCap,
  BlendMode,
  StrokeJoin,
} from "@shopify/react-native-skia";
import { traceOutline } from "./marchingAlgo";
import { useEffect } from "react";

export default function useImageProcessing(
  orgURL: string,
  setStickerStatus: React.Dispatch<React.SetStateAction<boolean>>
) {
  const orgUriImg = useImage(orgURL);
  const maskUriImg = useImage(orgURL);
  useEffect(() => {
    if (orgUriImg && maskUriImg) {
      segmentItem();
      setStickerStatus(false);
    } else {
      console.log("Image not loaded yet");
    }
  }, [orgUriImg, maskUriImg]);

  function applyingStickerEffect(
    img: SkImage,
    mask: SkImage,
    width: number | null,
    height: number | null
  ) {
    console.log("In stixcker effect");
    if (img && width && height) {
      const surface = Skia.Surface.Make(width, height); //creates a surface to draw on
      const canvas = surface?.getCanvas(); //gets the canvas from the surface
      canvas?.drawImage(img, 0, 0); //draws the image on the canvas
      // const imagePixels = img.readPixels(); //reads the pixels from the image
      // const maskPixels = mask.readPixels(); //reads the pixels from the mask
      const imageInfo: ImageInfo = {
        width,
        height,
        colorType: ColorType.RGBA_8888, // RGBA format
        alphaType: AlphaType.Unpremul,
      };
      const pixels = canvas?.readPixels(0, 0, imageInfo); //reads the pixels from the image
      // if (maskPixels && imagePixels) {
      //   for (let i = 3; i < imagePixels.length; i += 4) {
      //     if (imagePixels[i] > 128) {
      //       maskPixels[i] = 255;
      //       maskPixels[i - 1] = 255;
      //       maskPixels[i - 2] = 255;
      //       maskPixels[i - 3] = 255;
      //     }
      //   }
      // }
      // const newMaskImage = Skia.Image.MakeImage(
      //   {
      //     width,
      //     height,
      //     colorType: ColorType.RGBA_8888,
      //     alphaType: AlphaType.Unpremul,
      //   },
      //   Skia.Data.fromBytes(maskPixels as Uint8Array),
      //   width * 4
      // );

      // if (newMaskImage) {
      //   canvas?.drawImage(newMaskImage, 0, 0);
      // }

      if (pixels) {
        const outline = traceOutline(pixels, width, height); //traces the outline of the image
        if (!outline) {
          return;
        }
        const strokePaint = Skia.Paint();
        strokePaint.setColor(Skia.Color("#ffffff")); //white color
        strokePaint.setStyle(PaintStyle.Stroke);
        strokePaint.setAntiAlias(true);
        strokePaint.setBlendMode(BlendMode.SrcOver); // X, Y offsets, blur radius
        strokePaint.setStrokeCap(StrokeCap.Round);
        strokePaint.setStrokeJoin(StrokeJoin.Round);
        strokePaint.setStrokeWidth(2);
        canvas?.drawPath(outline, strokePaint); //draws the outline on the canvas
        const sticker = surface?.makeImageSnapshot();
        console.log("Sticker: ", sticker?.encodeToBase64());
      }
    }
  }

  const segmentItem = () => {
    if (orgUriImg && maskUriImg) {
      console.log("In segment Item");
      applyingStickerEffect(
        orgUriImg,
        maskUriImg,
        orgUriImg?.width() ?? null,
        orgUriImg?.height() ?? null
      );
    }
  };
  return { segmentItem };
}
