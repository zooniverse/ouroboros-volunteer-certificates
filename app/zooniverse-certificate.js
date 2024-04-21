/*
Zooniverse Certificate "React Component"/PDF template
Ref: https://react-pdf.org/

- Note that the PDF stylesheet has slight differences from CSS, e.g. pixels
  aren't valid units.
- I couldn't properly set up JSX syntax, so I'm using React.createElement().
 */

import { createElement as elem } from 'react'
import { Page, Text, View, Image, Document, StyleSheet } from '@react-pdf/renderer'

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

function ZooniverseCertificate ({ volunteer }) {
  const {
    user_id,
    user_login,
    user_display_name,
    user_credited_name,
    projects
  } = volunteer

  const name = user_credited_name || user_display_name || user_login

  return (
    elem(
      Document, null,
      elem(Page, { size: 'A4', style: styles.page },
        elem(View, { style: styles.main },
          elem(Image, { style: styles.zooLogo, src: `${__dirname}/../assets/zooniverse-logo-teal.png` }),
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
}

export default ZooniverseCertificate
