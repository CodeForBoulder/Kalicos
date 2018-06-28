#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Python 3 script for transforming IRS CSV data (files named all_nonprofits.csv, for example) into organization JSON
files in the output directory

Example:
    python3 irsToJSON.py all_nonprofits.csv json_output_dir/

Restrictions on what is converted to JSON (for example, only a single city) is in the shouldConvert() function
 """

import csv
import json
import os
import re
import sys


def main():

    if len( sys.argv ) < 2:
        print( "Usage: irsToJSON.py [IRS CSV file] [output dir]")
        sys.exit( 1 )

    csvFile = sys.argv[1]
    jsonOutputDir = sys.argv[2]

    if not os.path.exists( csvFile ):
        print( 'File %s does not exist' % csvFile )
        sys.exit( 1 )

    if not os.path.isdir(jsonOutputDir):
        print( '%s does not exist or is not a directory' % jsonOutputDir)
        sys.exit( 1 )

    lastModifiedTime = os.path.getmtime(csvFile)

    with open( csvFile, 'r' ) as infile:
        csvreader = csv.reader(infile)
        isheader = True
        for row in csvreader:
            if isheader:
                isheader = False
                continue

            organization = parseLine(row, lastModifiedTime)
            if shouldConvert(organization):
                writeToFile(organization, jsonOutputDir)

def parseLine(fields,csvLastModifiedTime):
    organization={}
    #expecting lines of the form:
    #ID_NUM,Match_addr,EIN,NAME,ICO,STREET,CITY_1,STATE,ZIP,GROUP_,SUBSECTION,AFFILIATION,CLASSIFICATION,RULING,DEDUCTIBILITY,FOUNDATION,ACTIVITY,ORGANIZATION,STATUS_1,TAX_PERIOD,ASSET_CD,INCOME_CD,FILING_REQ_CD,PF_FILING_REQ_CD,ACCT_PD,ASSET_AMT,INCOME_AMT,REVENUE_AMT,code,Zip5,Zip4,Eco,Lat,Long,description,category
    #0,,61519148,AVON LIONS CHARITIES INC,% DUANE E STARR,PO BOX 39,AVON,CT,06001-0039,0,3,3,1000,199902,1,15,0,1,1,201506.0,0,0,2,0,6,0.0,0.0,0.0,T12,6001,39,,,,Fund Raising & Fund Distribution ,philanthropy
    #1,"34 Stockbridge Dr, Avon, Connecticut, 06001",66074890,DELTA MU HOUSE ASSOCIATION OF KAPPA KAPPA GAMMA FRATERNITY INC,% KAREN GREENBERG,34 STOCKBRIDGE DR,AVON,CT,06001-4415,0,6,3,1000,199604,2,0,36000000,1,1,201506.0,0,0,2,0,6,0.0,0.0,0.0,,6001,4415,,41.79941940307621,-72.8992004394531,,

    index = int(fields[0])
    if index % 10000 == 0:
        print( 'Parsing record '+str(index) )

    organization['name'] = fields[3]

    expectedNFields=36
    if len(fields) != expectedNFields:
        raise Exception('Expected %d fields in CSV data, found %d' % (expectedNFields, len(fields)) )

    #mailing address components
    street = fields[5]  #for example, '44 COPPLESTONE RD'
    streetmatch = re.compile('''(?P<streetnum>[0-9]+)?\s?(?P<streetname>.+)''').match( street )
    if streetmatch:
        d = streetmatch.groupdict()
        organization['mailing_address_components'] = {}
        organization['mailing_address_components']['street_number'] = d.get('streetnum')
        organization['mailing_address_components']['route'] = d.get('streetname')  #street name
        organization['mailing_address_components']['locality'] = fields[6] #city
        organization['mailing_address_components']['state'] = fields[7]
        organization['mailing_address_components']['postal_code'] = fields[8]
        organization['mailing_address_components']['country'] = 'US'

        #mailing address
        if fields[1]:
            organization['mailing_address'] = fields[1]
        else:
            street = '%s %s' % (organization['mailing_address_components']['street_number'],organization['mailing_address_components']['route'])
            if organization['mailing_address_components']['street_number'] is None:
                street = organization['mailing_address_components']['route']
            organization['mailing_address'] = '%s %s %s %s %s' % \
                                              (street,
                                               organization['mailing_address_components']['locality'],
                                               organization['mailing_address_components']['state'],
                                               organization['mailing_address_components']['postal_code'],
                                               organization['mailing_address_components']['country'])

    # locations - in our case we add one location with the same address info
    hq = {}
    hq['name'] = 'Headquarters'
    hq['address'] = organization.get('mailing_address')
    hq['address_components'] = organization.get('mailing_address_components')
    if fields[32] and fields[33]:
        hq['latLng'] = {'type': 'Point', 'coordinates': (fields[32], fields[33]) }
    locations = [hq]
    organization['locations'] = locations

    # other info
    organization['EIN'] = fields[2]
    if fields[25]:
        organization['assetAmount'] = fields[25]
    if fields[26]:
        organization['incomeAmount'] = fields[26]
    if fields[27]:
        organization['revenueAmount'] = fields[27]
    organization['nteeCode'] = fields[28].strip()
    organization['nteeDescription'] = fields[34].strip()
    organization['nteeCategory'] = fields[35].strip()
    organization['lastUpdatedEpochMs'] = csvLastModifiedTime
    return organization

def shouldConvert(organization):
    if not organization.get('mailing_address_components') or not organization.get('mailing_address_components').get('locality'):
        return False
    if organization['mailing_address_components']['locality'].lower() == 'Boulder'.lower() and \
        organization['mailing_address_components']['state'].lower() == 'CO'.lower():
        return True

def writeToFile(organization,outDir):
    orgname = organization['name'].upper().replace(' ', '_').replace('/','_')
    filename = os.path.join(outDir, '%s.json' % orgname )
    idx=1
    while os.path.isfile(filename):
        idx+=1
        filename=os.path.join(outDir, '%s_%d.json' % (orgname,idx) )

    with open(filename, 'w') as f:
        print('Writing out JSON for %s' % filename)
        json.dump(organization, f, separators=(',', ':'))

if __name__ == "__main__":
    main()
