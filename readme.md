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

Visit

http://yourserver:8082/help -> REST documentation

http://yourserver:8082 -> angular test UI 

http://yourserver:8082/api/v1/ -> REST api root


# This sample application *attempts* to demonstrate the following
- Token based authentication with JWT tokens. Support standard users as well as server to server tokens = complete
    - grant_type = password. used for standard username & password authentication
    - grant_type = client_credentials. used for server to server communcation. plus optional impersonation where by servers can request user based tokens in a simple single sign-on fashion
- RESTful api sample /api/v1/todo with JWT Authentication = complete
- Hypermedia following the HAL model via Resource and ResourceCollection wrapper classes. - http://stateless.co/hal_specification.html = complete
- OData implementation for REST server paging & filtering - incomplete
    - $top = complete
    - $skip = complete
    - $orderby = incomplete
    - $filter = incomplete
- Documentation generation /help/ = complete 
- Real-time events to complement REST interface (Socket.io) = complete
- Angular JS application w/ secure RESTful api backend = incomplete (tidy up UI)
- Social Auth integration
    - Facebook = complete
    - Google = complete
    - Twitter = complete
    - LinkedIn = complete
- TypeScript = incomplete (not started)

Documentation Generation provided by http://apidocjs.com/

Setup by installing apidocs globally

$ npm install apidoc -g

To generate docs use this

$ apidoc -i app/ -o www/help/
