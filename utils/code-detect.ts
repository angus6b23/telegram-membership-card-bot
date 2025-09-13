import { readBarcodes } from "zxing-wasm/full";

export const detectCode = async (image: Blob) => {
  const res = await readBarcodes(image, {
    maxNumberOfSymbols: 1,
    tryHarder: true,
    tryDownscale: true,
    tryRotate: true,
    tryDenoise: true,
  });
  return res[0];
};
