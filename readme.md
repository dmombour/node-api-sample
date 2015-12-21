# Node-API Sample Application

Setup
$ npm install

Start -> use nodemon!
$ nodemon server.js

# This sample application attempts to demonstrate the following
- RESTful api /api/v1/sample
- Hypermedia following the HAL model via Resource and ResourceCollection wrapper classes.
- OData server side paging using $top & $skip
- Documentation generation /help/
- Oauth Authentication
- Social Auth

Documentation Generation provided by http://apidocjs.com/
Setup by installing apidocs globally
$ npm install apidoc -g

To generate docs use this
$ apidoc -i app/ -o www/help/

# Todo

TypeScript - $ tsc *.ts --watch
odata - skip, top, orderby, & partial filtering
oauth - fb, twitter & social