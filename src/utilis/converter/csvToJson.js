import readCsvFile from '../reader/readCsvFile';

export default function csvToJson(csv) {
  return new Promise((resolve, reject) => {
    readCsvFile(csv).then((csvAsText) => {
      // Ajouter le code pour formater l'objet du CSV
        var lines = csvAsText.split("\n");
        var result = [];
        var headers = lines[0].split(",");
        for(var i = 1; i < lines.length; i++){
          var obj = {};
          var currentline=lines[i].split(",");
          for(var j=0; j < headers.length; j++){
            obj[headers[j]] = currentline[j];
          }
          result.push(obj);
        }
        resolve(result)
    }, (error) => {
      console.warn(error);
    })
  });
}
