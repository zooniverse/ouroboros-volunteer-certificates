import csv from 'fast-csv'
import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))

export default async function readCSV (filename) {
  return new Promise((resolve, reject) => {
    const volunteers = []

    fs.createReadStream(path.resolve(__dirname, '..', filename))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', (row) => {
      volunteers.push(row)
    })
    .on('end', (rowCount) => {
      resolve(volunteers)
    })
  })
}
