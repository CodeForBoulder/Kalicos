const states = [
  { value: 'AL' }, { value: 'AK' }, { value: 'AS' }, { value: 'AZ' }, { value: 'AR' },
  { value: 'CA' }, { value: 'CO' }, { value: 'CT' }, { value: 'DE' }, { value: 'DC' },
  { value: 'FM' }, { value: 'FL' }, { value: 'GA' }, { value: 'GU' }, { value: 'HI' },
  { value: 'ID' }, { value: 'IL' }, { value: 'IN' }, { value: 'IA' }, { value: 'KS' },
  { value: 'KY' }, { value: 'LA' }, { value: 'ME' }, { value: 'MH' }, { value: 'MD' },
  { value: 'MA' }, { value: 'MI' }, { value: 'MN' }, { value: 'MS' }, { value: 'MO' },
  { value: 'MT' }, { value: 'NE' }, { value: 'NV' }, { value: 'NH' }, { value: 'NJ' },
  { value: 'NM' }, { value: 'NY' }, { value: 'NC' }, { value: 'ND' }, { value: 'MP' },
  { value: 'OH' }, { value: 'OK' }, { value: 'OR' }, { value: 'PW' }, { value: 'PA' },
  { value: 'PR' }, { value: 'RI' }, { value: 'SC' }, { value: 'SD' }, { value: 'TN' },
  { value: 'TX' }, { value: 'UT' }, { value: 'VT' }, { value: 'VI' }, { value: 'VA' },
  { value: 'WA' }, { value: 'WV' }, { value: 'WI' }, { value: 'WY' }, { value: '' } 
]

function checkHandler(fn, name) {
  return fn ? fn(name) : null
}

function checkValue(data, name) {
  return data ? data[name] : undefined
}

export { checkHandler, checkValue, states }
