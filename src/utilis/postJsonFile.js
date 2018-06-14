import axios from 'axios';

/** @function
  * @param {Object[]} jsonFile
 *  @description
 *  Envoie une requête POST pour vérifier que
 *  les données sont valides
 */
export default function (jsonFile) {
  console.log('sending object');
  console.log(jsonFile);
  axios.post('https://test.sympl.fr/test.php', jsonFile).then((res) => {
    console.log(res);
    return res
  })
  .catch((err) => {
    console.error(err);
  })
}
