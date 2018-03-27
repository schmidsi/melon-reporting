#!/bin/sh
npm run gitbook build
git branch -D gh-pages
git push -d origin gh-pages
git checkout --orphan gh-pages
git add -f _book
git commit -m "Deploy"
git subtree push --prefix _book origin gh-pages
git checkout master
git branch -D gh-pages
