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
    fontSize: '4mm',
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
    width: '15mm',
    margin: '0 auto',
  },
  bigText: {
    fontSize: '16mm',
    textAlign: 'center',
  },
  smallText: {
    textAlign: 'center',
  },
  placeholder: {
    color: '#c040c0'
  }
})

function ZooniverseCertificate ({ volunteer }) {
  const {
    user_id,
    user_login,
    user_display_name,
    user_credited_name,
    projects = []
  } = volunteer

  const name = user_credited_name || user_display_name || user_login
  
  const totalCount = projects.reduce((accumulator, project) => {
    const count = (isValidProject(project)) ? project?.total_count || 0 : 0
    return accumulator + parseInt(count)
  }, 0)

  return (
    elem(Document, { title: `Zooniverse Volunteer Certificate for ${name}` },
      elem(Page, { orientation: 'landscape', size: 'A4', style: styles.page },
        elem(View, { style: styles.main },
          elem(View, {},
            elem(Image, { style: styles.zooLogo, src: `${__dirname}/../assets/zooniverse-logo-teal.png` }),
            elem(Text, { style: styles.placeholder },
              name
            ),
            elem(Text, { style: styles.placeholder },
              `@${user_login}`
            ),
            elem(Text, { style: styles.placeholder },
              totalCount
            ),
            elem(Text, { style: styles.placeholder },
              'Total Classifications'
            ),
            elem(Text, { style: styles.placeholder },
              'From the Zooniverse\'s legacy stats system.'
            ),
            elem(Text, { style: styles.placeholder },
              'You can add this number to your current total classifications to get an accourate figure.'
            ),
          ),
          elem(View, {},
            elem(Text, { style: styles.placeholder },
              'Your Top Projects'
            ),
            elem(View, {},
              projects.map((project) => {
                return elem(Text, {},
                  `${project.project_display_name} - ${project.total_count}`
                )
              })
            )
          )
        )
      )
    )
  )
}

function isValidProject (project) {
  return project?.project_id > 0
}

export default ZooniverseCertificate
