/** @function
*   @return {Promise}
*   @description utilisation de FileReader
*   pour lire le fichier csv ou xlsx.
*/
export default function (file) {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onerror = () => {
      reader.abort();
      reject(new DOMException("Problem parsing input file."));
    };
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsBinaryString(file);
  });
}
