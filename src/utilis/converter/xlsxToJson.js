import readxlsxFile from '../reader/readXlsxFile';

export default function (xlsxFile) {
return new Promise((resolve, reject) => {
  readxlsxFile(xlsxFile).then((res) => {
      return resolve(res);
    }, (error) => {
      console.warn(error.message);
    })
  });
}
