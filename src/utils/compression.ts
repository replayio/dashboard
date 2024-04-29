import {
  compress as compressJSON,
  decompress as decompressJSON,
  trimUndefinedRecursively,
} from "compress-json/dist/index.js";

export function compress<Type extends Object>(data: Type): string {
  if (!data) {
    return "";
  }

  data = JSON.parse(JSON.stringify(data));

  trimUndefinedRecursively(data);

  const compressed = compressJSON(data);

  return JSON.stringify(compressed);
}

export function decompress<Type extends Object>(text: string): Type | null {
  if (text != null) {
    try {
      const compressed = JSON.parse(text);
      if (!compressed) {
        return compressed;
      }

      return decompressJSON(compressed) as Type;
    } catch (error) {}
  }

  return null;
}
