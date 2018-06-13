import fileReader from '../fileReader';

export default function csvToJson(csv) {
  return new Promise((resolve, reject) => {
    fileReader(csv).then((csvAsText) => {
      // @TODO Adding code for format object CSV to JSON
        var lines = csvAsText.split("\n");
        var result = [];
        resolve(result)
    }, (error) => {
      console.warn(error);
    })
  });
}
