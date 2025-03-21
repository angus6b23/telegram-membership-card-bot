import { writeBarcode, WriteInputBarcodeFormat } from "zxing-wasm/full";

interface CreateCodeOption {
  format: string;
  text: string;
}
export const createCode = async (option: CreateCodeOption) => {
  const { format, text } = option;
  const code = await writeBarcode(text, {
    format: format as WriteInputBarcodeFormat,
    scale: 10,
  });
  return code.image;
};
