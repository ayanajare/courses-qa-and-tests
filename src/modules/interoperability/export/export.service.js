import xlsx from 'node-xlsx';

const fs = require('node:fs');


export async function createExport(transfers, filePath) {
  // Préparer les données pour node-xlsx
  const data = [
    [
      'Date',
      'Montant',
      'Description',
      'Compte Source',
      'Compte Destination'
    ],
    ...transfers.map(t => [
      t.date,
      t.amount,
      t.description,
      t.sourceAccount,
      t.destinationAccount
    ])
  ];

  // Générer le buffer xlsx
  const buffer = xlsx.build([{ name: 'Transferts', data }]);

  // Écrire le buffer dans un fichier
  await fs.promises.writeFile(filePath, buffer);

  return filePath;
}

