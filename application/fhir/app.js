var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var yamlconfig = require('yaml-config');
var configYaml = yamlconfig.readConfig('../config/config.yml');

//end event emitter

var host = configYaml.fhir.host;
var port = configYaml.fhir.port;



//setting midleware
app.use (function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "DELETE, GET, POST, PUT, OPTIONS");
//  res.removeHeader("x-powered-by");
  next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))

// parse application/json
app.use(bodyParser.json({limit: '50mb'}))

//import default fhir module
var DefaultFHIR = require("./default_fhir/controller");

//import patient_registers module
var Person = require("./patient_registers/person/controller");
var Patient = require("./patient_registers/patient/controller");
var RelatedPerson = require("./patient_registers/related_person/controller");
var Group = require("./patient_registers/group/controller");

// hardika add controller
var Organization = require("./service_provider_directory_resources/organization/controller");
var Endpoint = require("./service_provider_directory_resources/endpoint/controller");
var Location = require("./service_provider_directory_resources/location/controller");
var Practitioner = require("./service_provider_directory_resources/practitioner/controller");
var PractitionerRole = require("./service_provider_directory_resources/practitionerRole/controller");
var HealthcareService = require("./service_provider_directory_resources/healthcareService/controller");
// hardika end

//import routes
var routesDefaultFHIR	= require('./default_fhir/routes');
var routesPerson		= require('./patient_registers/person/routes');
var routesPatient		= require('./patient_registers/patient/routes');
var routesRelatedPerson	= require('./patient_registers/related_person/routes');
var routesGroup			= require('./patient_registers/group/routes');

//hardika add routes
var routesOrganization			= require('./service_provider_directory_resources/organization/routes');
var routesEndpoint			= require('./service_provider_directory_resources/endpoint/routes');
var routesLocation			= require('./service_provider_directory_resources/location/routes');
var routesPractitioner			= require('./service_provider_directory_resources/practitioner/routes');
var routesPractitionerRole			= require('./service_provider_directory_resources/practitionerRole/routes');
var routesHealthcareService			= require('./service_provider_directory_resources/healthcareService/routes');
//hardika end routes

//setrouting
routesDefaultFHIR(app, DefaultFHIR);
routesPerson(app, Person);
routesPatient(app, Patient);
routesRelatedPerson(app, RelatedPerson);
routesGroup(app, Group);

//setrouting add hcs
routesOrganization(app, Organization);
routesEndpoint(app, Endpoint);
routesLocation(app, Location);
routesPractitioner(app, Practitioner);
routesPractitionerRole(app, PractitionerRole);
routesHealthcareService(app, HealthcareService);
//setrouting end hcs

var server = app.listen(port, host, function () {
  console.log("Server running at http://%s:%s", host, port);
})