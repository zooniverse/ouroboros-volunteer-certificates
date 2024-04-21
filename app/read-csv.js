import csv from 'fast-csv'
import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))

export default async function readCSV (filename) {
  return new Promise((resolve, reject) => {
    // List of volunteers and the projects they've worked on.
    const volunteers = []

    fs.createReadStream(path.resolve(__dirname, '..', filename))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', (row) => {
      // Find the volunteer.
      // If volunteer doesn't exist, add them to the list
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

      // Add the project to the volunteer's list of projects.
      let project = volunteer.projects.find(proj => proj.project_id === row.project_id)
      if (!project) {
        volunteer.projects.push({
          project_id: row.project_id,
          project_display_name: row.project_display_name,
          total_count: row.total_count,
        })
      }
    })
    .on('end', (rowCount) => {
      resolve(volunteers)
    })
  })
}
