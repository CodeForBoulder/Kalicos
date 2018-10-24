const csv = require('csv'),
      fs  = require('fs')

// TODO: configure based on passed Args
var fileStream = fs.createReadStream('all_nonprofits.csv'),
    setFilter = (row => row['STATE'] == 'CO' && row['CITY_1'] == 'BOULDER'),
    parser = csv.parse({columns: true, skip_lines_with_error: true})

fileStream.setEncoding('utf8')
fileStream.on('data', chunk => parser.write(chunk))

function addressComponentStruct(str) {
  var arr = str.split(',')
  return {
    streetNumber: arr[0].trim().split(' ')[0],
    route: arr[0].trim().split(' ').splice(1).join(' '),
    locality: arr[1].trim(),
    state: arr[2].trim(),
    country: 'United States',
    postalCode: arr[3].trim()
  }
}

function orgStruct(obj) {
  return {
    fullName: obj['NAME'],
    ein: obj['EIN'],
    inCareOf: obj['ICO'],
    group: obj['GROUP_'],
    subsection: obj['SUBSECTION'],
    affiliation: obj['AFFILIATION'],
    classification: obj['CLASSIFICATION'],
    ruling: obj['RULING'],
    deductibility: obj['DEDUCTIBILITY'],
    foundation: obj['FOUNDATION'],
    activity: obj['ACTIVITY'],
    organization: obj['ORGANIZATION'],
    status1: obj['STATUS_1'],
    taxPeriod: obj['TAX_PERIOD'],
    assetCD: obj['ASSET_CD'],
    incomeCD: obj['INCOME_CD'],
    filingReqCD: obj['FILING_REQ_CD'],
    accPD: obj['ACCOUNT_PD'],
    assetAmount: obj['ASSET_AMT'],
    incomeAmount: obj['INCOME_AMT'],
    revenueAmount: obj['REVENUE_AMT'],
    irsCode: obj['code'],
    irsEco: obj['Eco'],
    irsDescription: obj['description'],
    irsCategory: obj['category'],
    locations: [],
    partialLocations: []
  }
}

function pLocationStruct(obj) {
  return {
    fullName: obj['NAME'],
    ein: obj['EIN'],
    street: obj['STREET'],
    city: obj['CITY'],
    state: obj['STATE'],
    zipCode: obj['ZIP']
  }
}

function fullLocation(obj) {
  var addr = addressComponentStruct(obj['Match_addr'])

  return {
    name: obj['NAME'],
    address: obj['Match_addr'],
    description: 'Not yet determined',
    addressComponents: addr,
    latLng: {
      type: 'Point',
      coordinates: [parseFloat(obj['Long']), parseFloat(obj['Lat'])]
    }
  }
}

function translate(obj) {
  var addr = obj['Match_addr']
  var output = new Object

  // Trying to only get Boulder CO
  if(!(setFilter(obj))) return

  if(addr.length == 0) {
    output = { orgMeta: orgStruct(obj), partial: pLocationStruct(obj) }
  } else {
    output = { orgMeta: orgStruct(obj), location: fullLocation(obj) }
  }

  fs.appendFile('output.json', JSON.stringify(output) + '\n', function (err) {
    if (err) throw err;
  })
}

parser.on('readable', _ => {
  while(data = parser.read()) {
    // console.log(data)
    translate(data)
  }
})

fileStream.on('end', () => console.log('\nFinished'))
