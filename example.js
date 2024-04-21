/*
Example React PDF script
Creates a single example.pdf file.
Source: https://react-pdf.org/

- Script is run with node.
- I couldn't properly set up JSX syntax, so I'm using React.createElement().
 */

import React, { createElement as elem } from 'react'
import ReactPDF, { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'

import { dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
})

// Create Document Component
const MyDocument = () => (
  elem(
    Document, null,
    elem(Page, { size: 'A4', style: styles.page },
      elem(View, { style: styles.section },
        elem(Text, null,
          'Section #1'
        )
      ),
      elem(View, { style: styles.section },
        elem(Text, null,
          'Section #2'
        )
      )
    )
  )
  /*
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
  */
)

ReactPDF.render(elem(MyDocument), `${__dirname}/example.pdf`)
