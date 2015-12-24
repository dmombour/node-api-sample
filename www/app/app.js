'use strict';
var appName = 'MyApp';
var appControllers = angular.module('appControllers', []);
var appServices = angular.module('appServices', []);
var app = angular.module(appName, ['ngRoute', 'ngCookies', 'LocalStorageModule', 'appControllers', 'appServices']);
