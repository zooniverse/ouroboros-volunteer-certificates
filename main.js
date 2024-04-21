/*
Main script
Creates PDF files. 
Ref: https://react-pdf.org/

- Script is run with node.
- I couldn't properly set up JSX syntax, so I'm using React.createElement().
*/

import React, { createElement as elem } from 'react'
import ReactPDF, { Page, Text, View, Image, Document, StyleSheet } from '@react-pdf/renderer'

import { dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))

// Create styles
const styles = StyleSheet.create({
  page: {
    fontSize: '10mm',
    backgroundColor: '#202020',
  },
  main: {
    margin: '20mm',
    padding: '20mm',
    flexGrow: 1,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    border: '2mm solid #00979d',
  },
  zooLogo: {
    display: 'block',
    width: '50mm',
    margin: '0 auto',
  },
  bigText: {
    fontSize: '16mm',
    textAlign: 'center',
  },
  smallText: {
    textAlign: 'center',
  },
})

const ZooniverseCertificate = ({ name }) => (
  elem(
    Document, null,
    elem(Page, { size: 'A4', style: styles.page },
      elem(View, { style: styles.main },
        elem(Image, { style: styles.zooLogo, src: `${__dirname}/assets/zooniverse-logo-teal.png` }),
        elem(Text, { style: styles.bigText },
          name
        ),
        elem(Text, { style: styles.smallText },
          'is a Zooniverse volunteer'
        )
      )
    )
  )
)

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
