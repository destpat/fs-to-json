import XLSX from 'xlsx';
import fileReader from '../fileReader';
/**
 *  @function
 *  @param {Object[]} xlsxFile
 *  @return {Promise}
 *  @description Utilise js-xlsx pour transformer
 *  le fichier xlsx en objet JSON avec le format
 *  requis pour la validation du serveur
 */
export default function (xlsxFile) {
  return new Promise((resolve, reject) => {
    let commands = [];
    fileReader(xlsxFile).then((res) => {
      var workbook = XLSX.read(res, {
        type: 'binary'
      });
      var XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
      /* Ajout d'un objet par référence de commande, dans le tableau commands */
      XL_row_object.forEach((row) => {
        if (!commands.filter(element => element.externalReference === row['Référence commande']).length) {
          commands.push({
            externalReference : row['Référence commande']
          })
        }
      })
      /* Binding entre les clés de l'objet XLSX et le format attendu */
      commands.forEach((command) => {
        let items = [];
        let recipientAddress = {};
        XL_row_object.forEach((row) => {
          if (command.externalReference === row['Référence commande']) {
            items.push({
              description : row['Description produit'],
              externalReference : row['Référence produit'],
              quantity : row['Quantité'],
              value : row['Valeur unitaire'],
              currency : row['Devise (ex : EUR, USD)']
            });

            command.recipientFirstname = command.recipientFirstname ? command.recipientFirstname : row['Prénom destinataire']
            command.recipientLastname = command.recipientLastname ? command.recipientLastname : row['Nom de famille destinataire']
            command.recipientEmail = command.recipientEmail ? command.recipientEmail : row['Email destinataire']
            command.recipientPhoneNumber = command.recipientPhoneNumber ? command.recipientPhoneNumber : row['Numéro téléphone destinataire']
            command.offerName = command.offerName ? command.offerName : row['Offre de livraison']

            recipientAddress.street = recipientAddress.street ? recipientAddress.street : row['Adresse destination (ligne 1)']
            recipientAddress.postalCode = recipientAddress.postalCode ? recipientAddress.postalCode : row['Adresse destination (code postal)']
            recipientAddress.city = recipientAddress.city ? recipientAddress.city : row['Adresse destination (ville)']
            recipientAddress.country = recipientAddress.country ? recipientAddress.country : row['Adresse destination (pays)']
          }
        })
        command.items = items;
        command.recipientAddress = recipientAddress;
        recipientAddress = {};
        items = [];
      })
      resolve({
        commands : commands,
        XL_row_object : XL_row_object
      })
    }, (error) => {
    console.warn(error.message);
  })
 });
}
