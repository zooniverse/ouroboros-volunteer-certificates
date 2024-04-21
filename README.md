# Ouroboros Volunteer Certificates

The script generates [Zooniverse](https://www.zooniverse.org) volunteer certificates for their contributions on Ouroboros.

Context: the Zooniverse wants to generate individualised certificates for each volunteer who submitted Classifications on the old Ouroboros system.

How it works:
- You run the script by supplying a CSV with volunteer classification data.
  - e.g. `npm start example-input.csv`
- The script generates PDF files, one for each volunteer, in the `/output` folder.

Based on [shaunanoordin/react-pdf-experiment](https://github.com/shaunanoordin/react-pdf-experiment).

## Usage

Requirements:
- Node (tested with node v20.9.0) and npm (tested with npm v10.1.0)

Running:
- Setup the repo with `npm install`
- Run `npm start (CSV FILENAME)`
- View the PDF files in `/output`
