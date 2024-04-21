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
      let volunteer = volunteers.find(vol => vol.user_id === row.user_id)

      if (!volunteer) {
        volunteer = {
          user_id: row?.user_id,
          user_login: row?.user_login,
          user_display_name: row?.user_display_name,
          user_credited_name: row?.user_credited_name,
          projects: [],
        }
        volunteers.push(volunteer)
      }

    })
    .on('end', (rowCount) => {
      resolve(volunteers)
    })
  })
}
