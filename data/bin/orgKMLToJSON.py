#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
A Python 3 script for reading exported KML data from Google Maps and parsing out organization info into JSON.  This was
created to transform the existing Kalicos Google Maps data to a JSON format which could be loaded into MongoDB.

Example:
     python3 orgXMLToJSON.py kalicos-export.kml kalicos-json/

TODO:
  -Update to the latest organization JSON structure which has the concept of facilities/locations
  -Search for more strings that indicate needed items (see "ITEMS NEEDED" section below). For example, we could search case-insensitively for 'needed'
  -Finalize/test the storage of image URLs, these could be useful on a summary page
"""

import json
import os
import re
import sys
import xml.etree.ElementTree

import httplib2


def main():

    if len( sys.argv ) < 2:
        print( "Usage: orgKMLToJSON.py [KML file] [output dir]")
        sys.exit( 1 )

    kmlFile = sys.argv[1]
    jsonOutputDir = sys.argv[2]

    if not os.path.exists( kmlFile ):
        print( 'File %s does not exist' % kmlFile )
        sys.exit( 1 )

    if not os.path.isdir(jsonOutputDir):
        print( '%s does not exist or is not a directory' % jsonOutputDir)
        sys.exit( 1 )

    rootElem = xml.etree.ElementTree.parse( kmlFile ).getroot()
    kmlLastModifiedTime=os.path.getmtime( kmlFile )

    ns='{http://www.opengis.net/kml/2.2}'

    # used to grab the 'desc' group out of the CDATA and other HTML garbage
    # descriptionRegex=re.compile( r"(?P<img>.+img.+?\/>(<br>)+)(?P<desc>.+)" )
    descriptionRegex=re.compile( r"""((?P<img>.*\<img\ src\=)\"(?P<imgUrl>.+?)\".+\/>)?(?P<desc>.+)""")

    orgIndex=0
    # find all Placemark elements
    for placemark in rootElem.findall('.//%sPlacemark' % ns ):
        orgIndex+=1
        idStr=str(orgIndex)
        name = placemark.find( ns+'name' ).text
        descElem=placemark.find( ns+'description' )
        itemsNeeded = ''

        if descElem is not None:
            description = descElem.text
            # the raw KML descriptions are similar to the following lines:
            #   <img src="https://lh5.googleusercontent.com/proxy/J0Q6fnrBAcNsNkumvwteavzwxoGB3Xs90J24fgUo-0vBxRfnThM1Y43HLt9f-OozYu99shwySf0YA3ZzFFwBt68" height="200" width="auto" /><br><br>St. Francis Center is a refuge for men and women who are homeless in the metro Denver area, providing shelter along with services that enable people to meet their basic needs for daily survival and to transition out of homelessness.<br><br>ITEMS NEEDED: "WINTER 2015 travel size deodorants, travel size shampoo/conditioner, travel-sized lotions, bar soap, travel-sized liquid soap, after shave /cologne, baby powderq-tips, mouthwash, vaseline"<br>"Hand and body lotion, Liquid hand soap, Baby wipes, Chapstick, Women’s deodorant, Sunscreen, Hand sanitizer, Cold/cough medicine for adults/children, Children’s Tylenol/ibuprofen, Tylenol/aspirin/ibuprofen, Pepto-Bismol/antacid tablets, Sinus medicationToothbrushes/toothpaste, Wide-tooth combs, Hairbrushes, Disposable razors"
            #   More than 1300 families call RMC home in 8 communities across Colorado. ITEMS NEEDED: "Backpacks with or without school supplies-Books for children and adults-Play area toys or common area toys-Board games-A toy box for storage-Gift cards to local grocers or Walmart, to help with holiday gifts-Wrapping paper-Gently used office furniture – folding table and chairs, book shelf, file cabinet, table lamps"
            match = descriptionRegex.match(description)
            if match:
                groupDict = match.groupdict()
                if groupDict.get('desc'):
                    description = groupDict.get('desc')
                if groupDict.get('imgUrl'):
                    imgUrl=groupDict.get('imgUrl')
                    if not httpExists( imgUrl ):
                        imgUrl = None

            # strip any leftover <br> strings
            description = description.replace('<br>','\n')

            itemsNeededDelim = 'ITEMS NEEDED:'
            if itemsNeededDelim in description:
                splitStr = description.split(itemsNeededDelim)
                description = splitStr[0]
                itemsNeeded = splitStr[1].strip('\" ')

            if ':' in description:
                print( description )
        else:
            description=''

        address = ''
        isAccepted = 'false'
        coordStr=placemark.find('.//%scoordinates' % ns).text  # 3 coordinates - lon,lat,elevation
        coords=coordStr.split(',')
        lon=float(coords[0])
        lat=float(coords[1])

        # address = lookupAddressForLatLon(lat,lon)
        outobj = {
            'name': name,
            'category': '',
            'description': description,
            'address': address,
            'latLng': {'type': 'Point', 'coordinates': ( lat, lon ) },
            'itemsNeeded': itemsNeeded,
            'lastUpdatedEpochSecs': int(kmlLastModifiedTime),
            'source': 'Kalicos KML'
        }
        if imgUrl:
            outobj['imageUrl'] = imgUrl

        with open( os.path.join( jsonOutputDir, '%s.json' % idStr ), 'w') as f:
            print( 'Writing out JSON for %s' % name )
            json.dump( outobj, f, separators=(',',':') )

def httpExists(url):
    found = 0
    try:
        http = httplib2.Http()
        resp = http.request(url, "HEAD")[0]
        status = resp.status

        if status == 200:
            found = 1
        else:
            print( "Status %d: %s" % (status, url) )
    except Exception as e:
        print( e.__class__,  e, url )
    return found

if __name__ == "__main__":
    main()
