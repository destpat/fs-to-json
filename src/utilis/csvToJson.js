import readCsv from './readCsv';

export default function csvToJson(csv) {
  return new Promise((resolve, reject) => {
    readCsv(csv).then((csvAsText) => {
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
    })
  });
}
