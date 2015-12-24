# Node-API Sample Application

Setup

Install the node modules (backend)

$ npm install

Install the bower modules (frontend)

$ bower install

Development (use nodemon if you want your changes to restart your server)

Nodemon - if not installed install globally

$ npm install nodemon -g

Run

$ nodemon server.js

or

$ node server.js


# This sample application *attempts* to demonstrate the following
- Oauth Authentication with JWT tokens.
    - grant_type = password. used for standard username & password authentication
    - grant_type = client_credentials. used for server to server communcation. plus optional impersonation.
- RESTful api /api/v1/todo w/ Authentication = complete
- Documentation generation /help/ = incomplete (implement header template) 
- Hypermedia following the HAL model via Resource and ResourceCollection wrapper classes. - http://stateless.co/hal_specification.html = complete
- Partial OData implementation for server paging & filtering
    - $top = complete
    - $skip = complete
    - $orderby = incomplete
    - $filter = incomplete
- Angular JS application w/ secure RESTful api backend = incomplete (tidy up UI)
- Social Auth integration
    - Facebook = complete
    - Google = complete
    - Twitter = incomplete (twitter doesn't have email addresses?)
    - LinkedIn = incomplete (needs testing)
- Real-time events (Socket.io) = incomplete (not started)
- TypeScript = incomplete (not started)

Documentation Generation provided by http://apidocjs.com/

Setup by installing apidocs globally

$ npm install apidoc -g

To generate docs use this

$ apidoc -i app/ -o www/help/
