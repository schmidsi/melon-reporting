#!/bin/sh
yarn gitbook build
cd _book
now --public
now alias
