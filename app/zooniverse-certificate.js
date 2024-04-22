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
    backgroundColor: '#ffffff',
  },

  main: {
    margin: '10mm',
    padding: '10mm',
    flexGrow: 1,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    border: '2mm solid #005d69',
  },
  userSection: {
    textAlign: 'center',
  },
  projectsSection: {
    marginTop: '4mm'
  },

  zooLogo: {
    display: 'block',
    width: '15mm',
    margin: '0 auto',
  },

  userName: {
    fontSize: '6mm',
    fontWeight: 'bold',
    marginBottom: '4mm',
    marginTop: '4mm',
    textTransform: 'uppercase',
  },
  userLogin: {
    color: '#5c5c5c',
    fontSize: '4mm',
  },
  decoDivider: {
    borderBottom: '0.25mm solid #5c5c5c',
    margin: '4mm auto',
    width: '60mm',
  },
  userTotalCount: {
    color: '#005d69',
    fontSize: '10mm',
    marginBottom: '2mm',
  },

  textBig: {
    fontSize: '6mm',
    fontWeight: 'bold',
    marginBottom: '2mm',
  },
  textSmall: {
    color: '#5c5c5c',
    fontSize: '2mm',
    marginBottom: '1mm',
  },

  textTitle: {
    fontSize: '5mm',
    fontWeight: 'bold',
    marginBottom: '2.5mm',
  },
  projectsList: {
    border: '0.25mm solid #000'
  },

  projectItem: {
    fontSize: '3mm',
    textTransform: 'uppercase',
  },
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
      elem(Page, { orientation: 'portrait', size: 'A4', style: styles.page },
        elem(View, { style: styles.main },
          elem(View, { style: styles.userSection },
            elem(Image, { style: styles.zooLogo,
              src: `${__dirname}/../assets/zooniverse-logo-teal.png`
            }),
            elem(Text, { style: styles.userName },
              name
            ),
            elem(Text, { style: styles.userLogin },
              `@${user_login}`
            ),
            elem(View, { style: styles.decoDivider }),
            elem(Text, { style: styles.userTotalCount },
              totalCount
            ),
            elem(Text, { style: styles.textBig },
              'Total Classifications'
            ),
            elem(Text, { style: styles.textSmall },
              'From the Zooniverse\'s legacy stats system.'
            ),
            elem(Text, { style: styles.textSmall },
              'You can add this number to your current total classifications to get an accourate figure.'
            ),
          ),
          elem(View, { style: styles.projectsSection },
            elem(Text, { style: styles.textTitle },
              'Your Top Projects'
            ),
            elem(View, { style: styles.projectsList },
              projects.map((project) => {
                return elem(Text, { style: styles.projectItem },
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
