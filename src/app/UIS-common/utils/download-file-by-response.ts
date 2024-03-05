/**
 * Función para descargar un archivo proveniente de backend.
 *
 * @param res - Respuesta de backend.
 * @param filename - Nombre del archivo.
 */
export const downloadFile = (res, filename) => {
  const dataType = res.type;
  const binaryData = [];
  binaryData.push(res);
  const fileObjectURL = window.URL.createObjectURL(
    new Blob(binaryData, { type: dataType })
  );
  const a = document.createElement('a');
  a.download = filename;
  a.href = fileObjectURL;
  document.body.appendChild(a);
  a.click();
  a.remove();
};
