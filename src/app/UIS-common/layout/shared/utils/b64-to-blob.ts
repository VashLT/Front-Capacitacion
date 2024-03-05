/**
 * Función para convertir un b64 a blob.
 *
 * @param b64Data - Base64 del archivo.
 * @param contentType - Tipo de archivo.
 * @param sliceSize - Tamaño del muestreo.
 * @returns - Retorna el archivo como Blob.
 */
export const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
  b64Data = b64Data.split(",")[1];
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};
