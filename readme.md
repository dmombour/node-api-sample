# Node-API Sample Application

Setup
Install the node modules (backend)
$ npm install
Install the bower modules (frontend)
$ bower install

Development (use nodemon)
Nodemon - if not installed install globally
$ npm install nodemon -g

Run
$ nodemon server.js

# This sample application *attempts* to demonstrate the following
- RESTful api /api/v1/todo
- Hypermedia following the HAL model via Resource and ResourceCollection wrapper classes. - http://stateless.co/hal_specification.html
- Partial OData implementation for server paging & filtering
    - $top = complete
    - $skip = complete
    - $orderby = incomplete
    - $filter = incomplete
- Documentation generation /help/
- Oauth Authentication with JWT tokens
- Angular JS application w/ secure RESTful api backend
- Social Auth integration

Documentation Generation provided by http://apidocjs.com/
Setup by installing apidocs globally
$ npm install apidoc -g

To generate docs use this
$ apidoc -i app/ -o www/help/

# Todo
TypeScript - $ tsc *.ts --watch
odata - skip, top, orderby, & partial filtering
oauth - twitter & google