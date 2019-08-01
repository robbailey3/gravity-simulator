#!/usr/bin/env bash

npm run build:prod
git add dist && git commit -m "Pushing to GH Pages"
git subtree push --prefix dist origin gh-pages


