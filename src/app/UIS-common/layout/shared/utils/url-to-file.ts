/**
 * Función para obtener un File a partir de un base64.
 *
 * @param url - Archivo en base64
 * @param filename - Nombre del archivo
 * @returns - Retorna el archivo
 */
export const urlToFile = (
  url,
  filename = `created_file_${new Date().toISOString()}`
): Promise<File> =>
  fetch(url)
    .then((res) => res.arrayBuffer())
    .then((buf) => new File([buf], filename))
    .catch(() => null);

/**
 * Función para obtener un file a partir de un b64, es la versión sincrónica.
 *
 * @param newImage - Imagen en base64.
 * @param filename - Nombre del archivo.
 * @returns - Archivo con la imagen en base64.
 */
export const urlToFileSync = (newImage: string, filename: string) => {
  let arr = newImage.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};
