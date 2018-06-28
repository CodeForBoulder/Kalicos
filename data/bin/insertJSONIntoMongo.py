#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
A Python 3 script for inserting JSON data (in a directory) into a MongoDB instance

Example:
    python3 insertJSONIntoMongo.py json_data/ localhost:27017 mydb mycollection
"""

import json
import os
import sys

from pymongo import MongoClient


def main():

    if len( sys.argv ) < 5:
        print( "Usage: insertJSONIntoMongo.py [input dir with .json files] [Mongo url (host:port)] [Mongo DB name] [Mongo collection name]")
        sys.exit( 1 )

    indir = sys.argv[1]
    if not os.path.isdir(indir):
        print( '%s does not exist or is not a directory' % indir )
        sys.exit(1)

    mongoUrl = sys.argv[2]
    if not ':' in mongoUrl:
        print( 'Invalid Mongo URL.  Should be of the form "host:port"')
        sys.exit(1)

    split=mongoUrl.split(':')
    mongoHost=split[0]
    mongoPort=int(split[1])
    dbName=sys.argv[3]
    collectionName=sys.argv[4]

    json_files = [os.path.join(indir, f) for f in os.listdir(indir) if f.endswith('.json')]
    print( 'batch inserting %d files into MongoDB' % len(json_files) )

    # init mongodb db, collection
    client = MongoClient(mongoHost, mongoPort)
    db = client[dbName]
    coll = db[collectionName]

    idx=0
    for json_file in json_files:
        with open(json_file) as f:
            content = json.load(f)
            coll.insert(content)
            print("Inserted JSON %s" % (json_file))
            idx+=1

if __name__ == "__main__":
    main()