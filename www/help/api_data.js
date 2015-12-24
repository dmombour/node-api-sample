define({ "api": [
  {
    "type": "get",
    "url": "/auth/token",
    "title": "Get",
    "group": "Authentication",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"_links\": {\n   \"self\": \"/api/v1/auth/token\"\n },\n \"items\": [\n   {\n     \"_links\": {\n       \"self\": \"/api/v1/todos/0\"\n     },\n     \"name\": \"item_0\",\n     \"id\": 0\n   },\n   {\n     \"_links\": {\n       \"self\": \"/api/v1/todos/1\"\n     },\n     \"name\": \"item_1\",\n     \"id\": 1\n   }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/auth.js",
    "groupTitle": "Authentication",
    "name": "GetAuthToken"
  },
  {
    "type": "post",
    "url": "/auth/token",
    "title": "Create access token",
    "description": "<p>Authenticating users is an essential element of a typical security model to confirm the identification of a user (or in some cases, a machine) that is trying to log on or access resources.</p> <p>There are 3 basic models used. Standard username &amp; password identity flow used for known registered users of the system (grant_type=password). Next is used for machine to machine trust, these tokens can be used to represent a server or they can be used to impersonate a user as well (grant_type=client_credentials). To impersonate or gain access to a user based token simply specify the uniqueid and optionally the user details.</p> <p>x-www-formurlencoded</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "grant_type",
            "description": "<p>The type of grant. Either of these choices [password] = standard username &amp; password flow. [client_credentials] = used for server to server connections.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>The username. REQUIRED with grant_type=password.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>The password. REQUIRED with grant_type=password.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "client_id",
            "description": "<p>The client_id. REQUIRED with grant_type=client_credentials.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "client_secret",
            "description": "<p>The client_secret. REQUIRED with grant_type=client_credentials.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "uniqueid",
            "description": "<p>The unqiue string (Example - email address, username, phone numbers, User ID, UID etc...) from your user management or identity system. OPTIONAL with grant_type=client_credentials.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstname",
            "description": "<p>User's first name. OPTIONAL with grant_type=client_credentials.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastname",
            "description": "<p>User's last name. OPTIONAL with grant_type=client_credentials.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "pictureurl",
            "description": "<p>URL of user's avatar or profile picture. OPTIONAL with grant_type=client_credentials.</p>"
          }
        ]
      }
    },
    "group": "Authentication",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"token_type\": \"bearer\",\n  \"expires_in\": 5183999,\n  \"access_token\": \"eyJ0eXAiOiJKV.....\",\n  \"refresh_token\": \"none\",\n  \"scope\": \"read write\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/auth.js",
    "groupTitle": "Authentication",
    "name": "PostAuthToken"
  },
  {
    "type": "delete",
    "url": "/todo:id",
    "title": "Delete by id",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>unique ID.</p>"
          }
        ]
      }
    },
    "group": "Todos",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/todo.js",
    "groupTitle": "Todos",
    "name": "DeleteTodoId"
  },
  {
    "type": "get",
    "url": "/todo:id",
    "title": "Get by id",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>unique ID.</p>"
          }
        ]
      }
    },
    "group": "Todos",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"_links\": {\n    \"self\": \"/api/v1/todo/0\"\n  },\n  \"name\": \"item\",\n  \"id\": 0\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/todo.js",
    "groupTitle": "Todos",
    "name": "GetTodoId"
  },
  {
    "type": "get",
    "url": "/todos",
    "title": "Get",
    "group": "Todos",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"_links\": {\n   \"self\": \"/api/v1/todos\"\n },\n \"items\": [\n   {\n     \"_links\": {\n       \"self\": \"/api/v1/todos/0\"\n     },\n     \"name\": \"item_0\",\n     \"id\": 0\n   },\n   {\n     \"_links\": {\n       \"self\": \"/api/v1/todos/1\"\n     },\n     \"name\": \"item_1\",\n     \"id\": 1\n   }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/todo.js",
    "groupTitle": "Todos",
    "name": "GetTodos"
  },
  {
    "type": "post",
    "url": "/todo",
    "title": "Create",
    "group": "Todos",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created\n{\n  \"_links\": {\n    \"self\": \"/api/v1/todo/0\"\n  },\n  \"name\": \"item\",\n  \"id\": 0\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/todo.js",
    "groupTitle": "Todos",
    "name": "PostTodo"
  },
  {
    "type": "put",
    "url": "/todo:id",
    "title": "Update by id",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>unique ID.</p>"
          }
        ]
      }
    },
    "group": "Todos",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"_links\": {\n    \"self\": \"/api/v1/todo/0\"\n  },\n  \"name\": \"item\",\n  \"id\": 0\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/todo.js",
    "groupTitle": "Todos",
    "name": "PutTodoId"
  }
] });
