import { readBarcodes } from "zxing-wasm/full";

export const detectCode = async (image: Blob) => {
  const res = await readBarcodes(image, { maxNumberOfSymbols: 1 });
  return res[0];
};
