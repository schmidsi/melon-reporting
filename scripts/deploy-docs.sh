#!/bin/sh
npm run gitbook build
cd _book
now --public
now alias
