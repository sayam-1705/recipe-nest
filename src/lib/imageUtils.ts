export async function fileToBase64(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);
  const binaryString = uint8Array.reduce(
    (data, byte) => data + String.fromCharCode(byte),
    ""
  );
  const base64String = btoa(binaryString);
  const mimeType = file.type || "image/png";
  return `data:${mimeType};base64,${base64String}`;
}
