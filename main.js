/*
Main script
Creates PDF files. 
Ref: https://react-pdf.org/

- Script is run with node.
- I couldn't properly set up JSX syntax, so I'm using React.createElement().
 */

import { createElement as elem } from 'react'
import ReactPDF from '@react-pdf/renderer'
import ZooniverseCertificate from './app/zooniverse-certificate.js'
import readCSV from './app/read-csv.js'

import { dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))

async function main () {
  console.log('# Ouroboros Volunteer Certificates for the Zooniverse')

  const inputFilename = process?.argv?.[2]
  if (!inputFilename) {
    console.log('Please specify an input CSV file. e.g.:')
    console.log('npm start example-input.csv')
    return 1
  }

  const volunteers = await readCSV(inputFilename)
  console.log(`${inputFilename} includes ${volunteers.length} volunteers`)

  volunteers.forEach(volunteer => {
    const outputFilename = `${__dirname}/output/${volunteer.user_login}.pdf`
    ReactPDF.render(elem(ZooniverseCertificate, { volunteer }), outputFilename)
    console.log(`- Created ${outputFilename}`)
  })
}

main()

/*
const names = ['Shaun', 'Sean', 'Mark']

console.log('React-PDF Experiment')
console.log(`This experiment will creates ${names.length} 'Zooniverse certificate' PDF files in the /output folder`)
console.log(`Each certificate will have a Zooniverse logo and the name of one user: ${names.join(', ')}`)

names.forEach((name) => {
  const filename = `${__dirname}/output/${name}.pdf`
  ReactPDF.render(elem(ZooniverseCertificate, { name }), filename)
  console.log(`- Created ${filename}`)
})

console.log('DONE')
 */
