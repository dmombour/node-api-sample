define({ "api": [
  {
    "type": "delete",
    "url": "/sample:id",
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
    "group": "Sample",
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
    "filename": "app/controllers/sampleController.js",
    "groupTitle": "Sample",
    "name": "DeleteSampleId"
  },
  {
    "type": "get",
    "url": "/sample",
    "title": "Get",
    "group": "Sample",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"_links\": {\n   \"self\": \"/api/v1/sample\"\n },\n \"items\": [\n   {\n     \"_links\": {\n       \"self\": \"/api/v1/sample/0\"\n     },\n     \"name\": \"item_0\",\n     \"id\": 0\n   },\n   {\n     \"_links\": {\n       \"self\": \"/api/v1/sample/1\"\n     },\n     \"name\": \"item_1\",\n     \"id\": 1\n   }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/sampleController.js",
    "groupTitle": "Sample",
    "name": "GetSample"
  },
  {
    "type": "get",
    "url": "/sample:id",
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
    "group": "Sample",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"_links\": {\n    \"self\": \"/api/v1/sample/0\"\n  },\n  \"name\": \"item\",\n  \"id\": 0\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/sampleController.js",
    "groupTitle": "Sample",
    "name": "GetSampleId"
  },
  {
    "type": "post",
    "url": "/sample",
    "title": "Create",
    "group": "Sample",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created\n{\n  \"_links\": {\n    \"self\": \"/api/v1/sample/0\"\n  },\n  \"name\": \"item\",\n  \"id\": 0\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/sampleController.js",
    "groupTitle": "Sample",
    "name": "PostSample"
  },
  {
    "type": "put",
    "url": "/sample:id",
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
    "group": "Sample",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"_links\": {\n    \"self\": \"/api/v1/sample/0\"\n  },\n  \"name\": \"item\",\n  \"id\": 0\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/sampleController.js",
    "groupTitle": "Sample",
    "name": "PutSampleId"
  },
  {
    "type": "get",
    "url": "/meet/:id",
    "title": "Get User information",
    "name": "GetUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstname",
            "description": "<p>Firstname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Lastname of the User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"firstname\": \"John\",\n  \"lastname\": \"Doe\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The <code>id</code> of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UserNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/meetController.js",
    "groupTitle": "User"
  }
] });
