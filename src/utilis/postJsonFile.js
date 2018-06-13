import axios from 'axios';

export default function () => {
  axios.post('https://test.sympl.fr/test.php', xlsxJson, {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
  })
}
