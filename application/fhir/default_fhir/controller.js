var Apiclient = require('apiclient');
var sha1 = require('sha1');
var validator = require('validator');
var bytes = require('bytes');
var uniqid = require('uniqid');
var yamlconfig = require('yaml-config');
var path = require('path');

var configYaml = yamlconfig.readConfig(path.resolve('../../application/config/config.yml'));

var host = configYaml.fhir.host;
var port = configYaml.fhir.port;

//event emitter
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

//phoenix
//query data melalui rest phoenix
var seedPhoenix = require(path.resolve('../../application/config/seed_phoenix.json'));
	seedPhoenix.base.hostname = configYaml.phoenix.host;
	seedPhoenix.base.port 		= configYaml.phoenix.port;
	
var Api = new Apiclient(seedPhoenix);

seedPhoenixFHIR = require(path.resolve('../../application/config/seed_phoenix_fhir.json'));
seedPhoenixFHIR.base.hostname = configYaml.phoenix.host;
seedPhoenixFHIR.base.port 	  = configYaml.phoenix.port;

var ApiFHIR  = new Apiclient(seedPhoenixFHIR);

var controller = {
		get:{
			identityAssuranceLevel: function getIdentityAssuranceLevel(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				checkApikey(apikey, ipAddres, function(result){
					if(result.err_code == 0){	
						if(_id == "" || typeof _id == 'undefined'){
							//method, endpoint, params, options, callback
							ApiFHIR.get('identityAssuranceLevel', {"apikey": apikey, "_id": 0}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getIdentityAssuranceLevel"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var assuranceLevel = JSON.parse(body); 
								  	//cek apakah ada error atau tidak
								  	if(assuranceLevel.err_code == 0){
									  	//cek jumdata dulu
									  	if(assuranceLevel.data.length > 0){
									  		res.json({"err_code": 0, "data":assuranceLevel.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Identity Assurance Level is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": assuranceLevel.error, "application": "Api FHIR", "function": "getIdentityAssuranceLevel"});
								  	}
								  }
							})
						}else{
							if(validator.isInt(_id)){
								//method, endpoint, params, options, callback
								ApiFHIR.get('identityAssuranceLevel', {"apikey": apikey, "_id": _id}, {}, function(error, response, body){
									if(error){
									  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getIdentityAssuranceLevel"});
									  }else{
									  	//cek apakah ada error atau tidak
									  	var assuranceLevel = JSON.parse(body); 
									  	
									  	//cek apakah ada error atau tidak
									  	if(assuranceLevel.err_code == 0){
										  	//cek jumdata dulu
										  	if(assuranceLevel.data.length > 0){
										  		res.json({"err_code": 0, "data":assuranceLevel.data});
										  	}else{
									  			res.json({"err_code": 2, "err_msg": "Identity Assurance Level is not found"});	
										  	}
									  	}else{
									  		res.json({"err_code": 3, "err_msg": assuranceLevel.error, "application": "Api FHIR", "function": "getIdentityAssuranceLevel"});
									  	}
									  }
								})
							}else{
								res.json({"err_code": 4, "err_msg": "Id must be a number."});	
							}
						}
					}else{
						result.err_code = 500;
						res.json(result);
					}	
				});
			},
			identityAssuranceLevelCode: function getIdentityAssuranceLevelCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var code = req.params.code.replace(/[^\w\s ,]/gi, '').trim().toLowerCase();

				if(code == "" || typeof code == 'undefined'){
					res.json({"err_code": 5, "err_msg": "Code is required."});		
				}else{
					checkApikey(apikey, ipAddres, function(result){
					if(result.err_code == 0){			
						//method, endpoint, params, options, callback
						ApiFHIR.get('identityAssuranceLevelCode', {"apikey": apikey, "code": code}, {}, function(error, response, body){
							if(error){
							  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getIdentityAssuranceLevelCode"});
							  }else{
							  	//cek apakah ada error atau tidak
							  	var assuranceLevel = JSON.parse(body); 
							  	
							  	//cek apakah ada error atau tidak
							  	if(assuranceLevel.err_code == 0){
								  	//cek jumdata dulu
								  	if(assuranceLevel.data.length > 0){
								  		res.json({"err_code": 0, "data":assuranceLevel.data});
								  	}else{
							  			res.json({"err_code": 2, "err_msg": "Identity Assurance Level Code is not found"});	
								  	}
							  	}else{
							  		res.json({"err_code": 3, "err_msg": assuranceLevel.error, "application": "Api FHIR", "function": "getIdentityAssuranceLevelCode"});
							  	}
							  }
						})
					
					}else{
						result.err_code = 500;
						res.json(result);
					}	
				});
				}
			},
			administrativeGender: function getAdministrativeGender(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				checkApikey(apikey, ipAddres, function(result){
					if(result.err_code == 0){	
						if(_id == "" || typeof _id == 'undefined'){
							//method, endpoint, params, options, callback
							ApiFHIR.get('administrativeGender', {"apikey": apikey, "_id": 0}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getAdministrativeGender"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var administrativeGender = JSON.parse(body); 
								  	//cek apakah ada error atau tidak
								  	if(administrativeGender.err_code == 0){
									  	//cek jumdata dulu
									  	if(administrativeGender.data.length > 0){
									  		res.json({"err_code": 0, "data":administrativeGender.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Administrative Gender is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": administrativeGender.error, "application": "Api FHIR", "function": "getAdministrativeGender"});
								  	}
								  }
							})
						}else{
							if(validator.isInt(_id)){
								//method, endpoint, params, options, callback
								ApiFHIR.get('administrativeGender', {"apikey": apikey, "_id": _id}, {}, function(error, response, body){
									if(error){
									  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getAdministrativeGender"});
									  }else{
									  	//cek apakah ada error atau tidak
									  	var administrativeGender = JSON.parse(body); 
									  	
									  	//cek apakah ada error atau tidak
									  	if(administrativeGender.err_code == 0){
										  	//cek jumdata dulu
										  	if(administrativeGender.data.length > 0){
										  		res.json({"err_code": 0, "data":administrativeGender.data});
										  	}else{
									  			res.json({"err_code": 2, "err_msg": "Administrative Gender is not found"});	
										  	}
									  	}else{
									  		res.json({"err_code": 3, "err_msg": administrativeGender.error, "application": "Api FHIR", "function": "getAdministrativeGender"});
									  	}
									  }
								})
							}else{
								res.json({"err_code": 4, "err_msg": "Id must be a number."});	
							}
						}
					}else{
						result.err_code = 500;
						res.json(result);
					}	
				});
			},
			administrativeGenderCode: function getAdministrativeGenderCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var code = req.params.code.replace(/[^\w\s ,]/gi, '').trim().toLowerCase();

				if(code == "" || typeof code == 'undefined'){
					res.json({"err_code": 4, "err_msg": "Code is required."});
				}else{
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){
							//method, endpoint, params, options, callback
							ApiFHIR.get('administrativeGenderCode', {"apikey": apikey, "code": code}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getAdministrativeGenderCode"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var administrativeGender = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(administrativeGender.err_code == 0){
									  	//cek jumdata dulu
									  	if(administrativeGender.data.length > 0){
									  		res.json({"err_code": 0, "data":administrativeGender.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Administrative Gender Code is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": administrativeGender.error, "application": "Api FHIR", "function": "getAdministrativeGender"});
								  	}
								  }
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}
			},
			maritalStatus: function getMaritalStatus(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				
				checkApikey(apikey, ipAddres, function(result){
					if(result.err_code == 0){
						if(_id == "" || typeof _id == 'undefined'){
							//method, endpoint, params, options, callback
							ApiFHIR.get('maritalStatus', {"apikey": apikey, "_id": 0}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getMaritalStatus"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var maritalStatus = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(maritalStatus.err_code == 0){
									  	//cek jumdata dulu
									  	if(maritalStatus.data.length > 0){
									  		res.json({"err_code": 0, "data":maritalStatus.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Marital Status is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": maritalStatus.error, "application": "Api FHIR", "function": "getMaritalStatus"});
								  	}
								  }
							})	
						}else{
							if(validator.isInt(_id)){
								ApiFHIR.get('maritalStatus', {"apikey": apikey, "_id": _id}, {}, function(error, response, body){
									if(error){
									  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getMaritalStatus"});
									  }else{
									  	//cek apakah ada error atau tidak
									  	var maritalStatus = JSON.parse(body); 
									  	
									  	//cek apakah ada error atau tidak
									  	if(maritalStatus.err_code == 0){
										  	//cek jumdata dulu
										  	if(maritalStatus.data.length > 0){
										  		res.json({"err_code": 0, "data":maritalStatus.data});
										  	}else{
									  			res.json({"err_code": 2, "err_msg": "Marital Status is not found"});	
										  	}
									  	}else{
									  		res.json({"err_code": 3, "err_msg": maritalStatus.error, "application": "Api FHIR", "function": "getMaritalStatus"});
									  	}
									  }
								})
							}else{
								res.json({"err_code": 4, "err_msg": "Id must be a number."});
							}
							
						}
					}else{
						result.err_code = 500;
						res.json(result);
					}	
				});
			},
			maritalStatusCode: function getMaritalStatusCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var code = req.params.code.replace(/[^\w\s ,]/gi, '').trim().toUpperCase();

				if(code == "" || typeof code == 'undefined'){
					res.json({"err_code": 4, "err_msg": "Code is required."});			
				}else{
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){
							ApiFHIR.get('maritalStatusCode', {"apikey": apikey, "code": code}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getMaritalStatus"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var maritalStatus = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(maritalStatus.err_code == 0){
									  	//cek jumdata dulu
									  	if(maritalStatus.data.length > 0){
									  		res.json({"err_code": 0, "data":maritalStatus.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Marital Status Code is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": maritalStatus.error, "application": "Api FHIR", "function": "getMaritalStatus"});
								  	}
								  }
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}	
			},
			contactRole: function getContactRole(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				
				checkApikey(apikey, ipAddres, function(result){
					if(result.err_code == 0){
						if(_id == "" || typeof _id == 'undefined'){
							//method, endpoint, params, options, callback
							ApiFHIR.get('contactRole', {"apikey": apikey, "_id": 0}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getContactRole"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var contactRole = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(contactRole.err_code == 0){
									  	//cek jumdata dulu
									  	if(contactRole.data.length > 0){
									  		res.json({"err_code": 0, "data":contactRole.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Contact Role is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": contactRole.error, "application": "Api FHIR", "function": "getContactRole"});
								  	}
								  }
							})	
						}else{
							if(validator.isInt(_id)){
								ApiFHIR.get('contactRole', {"apikey": apikey, "_id": _id}, {}, function(error, response, body){
									if(error){
									  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getContactRole"});
									  }else{
									  	//cek apakah ada error atau tidak
									  	var contactRole = JSON.parse(body); 
									  	
									  	//cek apakah ada error atau tidak
									  	if(contactRole.err_code == 0){
										  	//cek jumdata dulu
										  	if(contactRole.data.length > 0){
										  		res.json({"err_code": 0, "data":contactRole.data});
										  	}else{
									  			res.json({"err_code": 2, "err_msg": "Contact Role is not found"});	
										  	}
									  	}else{
									  		res.json({"err_code": 3, "err_msg": contactRole.error, "application": "Api FHIR", "function": "getContactRole"});
									  	}
									  }
								})
							}else{
								res.json({"err_code": 4, "err_msg": "Id must be a number."});
							}
							
						}
					}else{
						result.err_code = 500;
						res.json(result);
					}	
				});
			},
			contactRoleCode: function getContactRoleCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var code = req.params.code.replace(/[^\w\s ,]/gi, '').trim().toUpperCase();

				if(code == "" || typeof code == 'undefined'){
					res.json({"err_code": 4, "err_msg": "Code is required."});
				}else{
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){	
							ApiFHIR.get('contactRoleCode', {"apikey": apikey, "code": code}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getContactRoleCode"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var contactRole = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(contactRole.err_code == 0){
									  	//cek jumdata dulu
									  	if(contactRole.data.length > 0){
									  		res.json({"err_code": 0, "data":contactRole.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Contact Role Code is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": contactRole.error, "application": "Api FHIR", "function": "getContactRole"});
								  	}
								  }
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}
			},
			animalSpecies: function getAnimalSpecies(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				
				checkApikey(apikey, ipAddres, function(result){
					if(result.err_code == 0){
						if(_id == "" || typeof _id == 'undefined'){
							//method, endpoint, params, options, callback
							ApiFHIR.get('animalSpecies', {"apikey": apikey, "_id": 0}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getAnimalSpecies"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var animalSpecies = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(animalSpecies.err_code == 0){
									  	//cek jumdata dulu
									  	if(animalSpecies.data.length > 0){
									  		res.json({"err_code": 0, "data":animalSpecies.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Animal Species is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": animalSpecies.error, "application": "Api FHIR", "function": "getAnimalSpecies"});
								  	}
								  }
							})	
						}else{
							if(validator.isInt(_id)){
								ApiFHIR.get('animalSpecies', {"apikey": apikey, "_id": _id}, {}, function(error, response, body){
									if(error){
									  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getAnimalSpecies"});
									  }else{
									  	//cek apakah ada error atau tidak
									  	var animalSpecies = JSON.parse(body); 
									  	
									  	//cek apakah ada error atau tidak
									  	if(animalSpecies.err_code == 0){
										  	//cek jumdata dulu
										  	if(animalSpecies.data.length > 0){
										  		res.json({"err_code": 0, "data":animalSpecies.data});
										  	}else{
									  			res.json({"err_code": 2, "err_msg": "Animal Species is not found"});	
										  	}
									  	}else{
									  		res.json({"err_code": 3, "err_msg": animalSpecies.error, "application": "Api FHIR", "function": "getAnimalSpecies"});
									  	}
									  }
								})
							}else{
								res.json({"err_code": 4, "err_msg": "Id must be a number."});
							}
							
						}
					}else{
						result.err_code = 500;
						res.json(result);
					}	
				});
			},
			animalSpeciesCode: function getAnimalSpeciesCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var code = req.params.code.replace(/[^\w\s ,]/gi, '').trim();

				if(code == "" || typeof code == 'undefined'){
					res.json({"err_code": 4, "err_msg": "Code is required."});
				}else{
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){	
							ApiFHIR.get('animalSpeciesCode', {"apikey": apikey, "code": code}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getAnimalSpeciesCode"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var animalSpecies = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(animalSpecies.err_code == 0){
									  	//cek jumdata dulu
									  	if(animalSpecies.data.length > 0){
									  		res.json({"err_code": 0, "data":animalSpecies.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Animal Species Code is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": animalSpecies.error, "application": "Api FHIR", "function": "getAnimalSpeciesCode"});
								  	}
								  }
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}
			},
			animalBreeds: function getAnimalBreeds(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				
				checkApikey(apikey, ipAddres, function(result){
					if(result.err_code == 0){
						if(_id == "" || typeof _id == 'undefined'){
							//method, endpoint, params, options, callback
							ApiFHIR.get('animalBreeds', {"apikey": apikey, "_id": 0}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getAnimalBreeds"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var animalBreeds = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(animalBreeds.err_code == 0){
									  	//cek jumdata dulu
									  	if(animalBreeds.data.length > 0){
									  		res.json({"err_code": 0, "data":animalBreeds.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Animal Breeds is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": animalBreeds.error, "application": "Api FHIR", "function": "getAnimalBreeds"});
								  	}
								  }
							})	
						}else{
							if(validator.isInt(_id)){
								ApiFHIR.get('animalBreeds', {"apikey": apikey, "_id": _id}, {}, function(error, response, body){
									if(error){
									  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getAnimalBreeds"});
									  }else{
									  	//cek apakah ada error atau tidak
									  	var animalBreeds = JSON.parse(body); 
									  	
									  	//cek apakah ada error atau tidak
									  	if(animalBreeds.err_code == 0){
										  	//cek jumdata dulu
										  	if(animalBreeds.data.length > 0){
										  		res.json({"err_code": 0, "data":animalBreeds.data});
										  	}else{
									  			res.json({"err_code": 2, "err_msg": "Animal Breeds is not found"});	
										  	}
									  	}else{
									  		res.json({"err_code": 3, "err_msg": animalBreeds.error, "application": "Api FHIR", "function": "getAnimalBreeds"});
									  	}
									  }
								})
							}else{
								res.json({"err_code": 4, "err_msg": "Id must be a number."});
							}
							
						}
					}else{
						result.err_code = 500;
						res.json(result);
					}	
				});
			},
			animalBreedsCode: function getAnimalBreedsCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var code = req.params.code.replace(/[^\w\s ,]/gi, '').trim();

				if(code == "" || typeof code == 'undefined'){
					res.json({"err_code": 4, "err_msg": "Code is required."});
				}else{
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){	
							ApiFHIR.get('animalBreedsCode', {"apikey": apikey, "code": code}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getAnimalBreedsCode"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var animalBreeds = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(animalBreeds.err_code == 0){
									  	//cek jumdata dulu
									  	if(animalBreeds.data.length > 0){
									  		res.json({"err_code": 0, "data":animalBreeds.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Animal Breeds Code is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": animalBreeds.error, "application": "Api FHIR", "function": "getAnimalBreedsCode"});
								  	}
								  }
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}
			},
			animalGenderStatus: function getAnimalGenderStatus(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				
				checkApikey(apikey, ipAddres, function(result){
					if(result.err_code == 0){
						if(_id == "" || typeof _id == 'undefined'){
							//method, endpoint, params, options, callback
							ApiFHIR.get('animalGenderStatus', {"apikey": apikey, "_id": 0}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getAnimalGenderStatus"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var animalGenderStatus = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(animalGenderStatus.err_code == 0){
									  	//cek jumdata dulu
									  	if(animalGenderStatus.data.length > 0){
									  		res.json({"err_code": 0, "data":animalGenderStatus.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Animal Gender Status is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": animalGenderStatus.error, "application": "Api FHIR", "function": "getAnimalGenderStatus"});
								  	}
								  }
							})	
						}else{
							if(validator.isInt(_id)){
								ApiFHIR.get('animalGenderStatus', {"apikey": apikey, "_id": _id}, {}, function(error, response, body){
									if(error){
									  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getAnimalGenderStatus"});
									  }else{
									  	//cek apakah ada error atau tidak
									  	var animalGenderStatus = JSON.parse(body); 
									  	
									  	//cek apakah ada error atau tidak
									  	if(animalGenderStatus.err_code == 0){
										  	//cek jumdata dulu
										  	if(animalGenderStatus.data.length > 0){
										  		res.json({"err_code": 0, "data":animalGenderStatus.data});
										  	}else{
									  			res.json({"err_code": 2, "err_msg": "Animal Gender Status is not found"});	
										  	}
									  	}else{
									  		res.json({"err_code": 3, "err_msg": animalGenderStatus.error, "application": "Api FHIR", "function": "getAnimalGenderStatus"});
									  	}
									  }
								})
							}else{
								res.json({"err_code": 4, "err_msg": "Id must be a number."});
							}
							
						}
					}else{
						result.err_code = 500;
						res.json(result);
					}	
				});
			},
			animalGenderStatusCode: function getAnimalGenderStatusCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var code = req.params.code.replace(/[^\w\s ,]/gi, '').trim().toLowerCase();

				if(code == "" || typeof code == 'undefined'){
					res.json({"err_code": 4, "err_msg": "Code is required."});
				}else{
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){	
							ApiFHIR.get('animalGenderStatusCode', {"apikey": apikey, "code": code}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getAnimalGenderStatusCode"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var animalGenderStatus = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(animalGenderStatus.err_code == 0){
									  	//cek jumdata dulu
									  	if(animalGenderStatus.data.length > 0){
									  		res.json({"err_code": 0, "data":animalGenderStatus.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Animal Gender Status Code is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": animalGenderStatus.error, "application": "Api FHIR", "function": "getAnimalGenderStatusCode"});
								  	}
								  }
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}
			},
			languages: function getLanguages(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				
				checkApikey(apikey, ipAddres, function(result){
					if(result.err_code == 0){
						if(_id == "" || typeof _id == 'undefined'){
							//method, endpoint, params, options, callback
							ApiFHIR.get('languages', {"apikey": apikey, "_id": 0}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getLanguages"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var languages = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(languages.err_code == 0){
									  	//cek jumdata dulu
									  	if(languages.data.length > 0){
									  		res.json({"err_code": 0, "data":languages.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Languages is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": languages.error, "application": "Api FHIR", "function": "getLanguages"});
								  	}
								  }
							})	
						}else{
							if(validator.isInt(_id)){
								ApiFHIR.get('languages', {"apikey": apikey, "_id": _id}, {}, function(error, response, body){
									if(error){
									  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getLanguages"});
									  }else{
									  	//cek apakah ada error atau tidak
									  	var languages = JSON.parse(body); 
									  	
									  	//cek apakah ada error atau tidak
									  	if(languages.err_code == 0){
										  	//cek jumdata dulu
										  	if(languages.data.length > 0){
										  		res.json({"err_code": 0, "data":languages.data});
										  	}else{
									  			res.json({"err_code": 2, "err_msg": "Languages is not found"});	
										  	}
									  	}else{
									  		res.json({"err_code": 3, "err_msg": languages.error, "application": "Api FHIR", "function": "getLanguages"});
									  	}
									  }
								})
							}else{
								res.json({"err_code": 4, "err_msg": "Id must be a number."});
							}
							
						}
					}else{
						result.err_code = 500;
						res.json(result);
					}	
				});
			},
			languagesCode: function getLanguagesCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var code = req.params.code.replace(/[^\w\s ,]/gi, '').trim();

				if(code == "" || typeof code == 'undefined'){
					res.json({"err_code": 4, "err_msg": "Code is required."});
				}else{
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){	
							ApiFHIR.get('languagesCode', {"apikey": apikey, "code": code}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getLanguagesCode"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var languages = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(languages.err_code == 0){
									  	//cek jumdata dulu
									  	if(languages.data.length > 0){
									  		res.json({"err_code": 0, "data":languages.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Languages code is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": languages.error, "application": "Api FHIR", "function": "getLanguagesCode"});
								  	}
								  }
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}
			},
			linkType: function getLinkType(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				
				checkApikey(apikey, ipAddres, function(result){
					if(result.err_code == 0){
						if(_id == "" || typeof _id == 'undefined'){
							//method, endpoint, params, options, callback
							ApiFHIR.get('linkType', {"apikey": apikey, "_id": 0}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getLinkType"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var linkType = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(linkType.err_code == 0){
									  	//cek jumdata dulu
									  	if(linkType.data.length > 0){
									  		res.json({"err_code": 0, "data":linkType.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Link Type is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": linkType.error, "application": "Api FHIR", "function": "getLinkType"});
								  	}
								  }
							})	
						}else{
							if(validator.isInt(_id)){
								ApiFHIR.get('linkType', {"apikey": apikey, "_id": _id}, {}, function(error, response, body){
									if(error){
									  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getLinkType"});
									  }else{
									  	//cek apakah ada error atau tidak
									  	var linkType = JSON.parse(body); 
									  	
									  	//cek apakah ada error atau tidak
									  	if(linkType.err_code == 0){
										  	//cek jumdata dulu
										  	if(linkType.data.length > 0){
										  		res.json({"err_code": 0, "data":linkType.data});
										  	}else{
									  			res.json({"err_code": 2, "err_msg": "Link Type is not found"});	
										  	}
									  	}else{
									  		res.json({"err_code": 3, "err_msg": linkType.error, "application": "Api FHIR", "function": "getLinkType"});
									  	}
									  }
								})
							}else{
								res.json({"err_code": 4, "err_msg": "Id must be a number."});
							}
							
						}
					}else{
						result.err_code = 500;
						res.json(result);
					}	
				});
			},
			linkTypeCode: function getLinkTypeCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var code = req.params.code.replace(/[^\w\s ,]/gi, '').trim().toLowerCase();

				if(code == "" || typeof code == 'undefined'){
					res.json({"err_code": 4, "err_msg": "Code is required."});
				}else{
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){	
							ApiFHIR.get('linkTypeCode', {"apikey": apikey, "code": code}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getLinkTypeCode"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var linkType = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(linkType.err_code == 0){
									  	//cek jumdata dulu
									  	if(linkType.data.length > 0){
									  		res.json({"err_code": 0, "data":linkType.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Link Type code is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": linkType.error, "application": "Api FHIR", "function": "getLinkTypeCode"});
								  	}
								  }
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}
			},
			relatedPersonRelationshipType: function getRelatedPersonRelationshipType(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				
				checkApikey(apikey, ipAddres, function(result){
					if(result.err_code == 0){
						if(_id == "" || typeof _id == 'undefined'){
							//method, endpoint, params, options, callback
							ApiFHIR.get('relatedPersonRelationshipType', {"apikey": apikey, "_id": 0}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getRelatedPersonRelationshipType"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var relatedPersonRelationshipType = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(relatedPersonRelationshipType.err_code == 0){
									  	//cek jumdata dulu
									  	if(relatedPersonRelationshipType.data.length > 0){
									  		res.json({"err_code": 0, "data":relatedPersonRelationshipType.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Related Person Relationship Type is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": relatedPersonRelationshipType.error, "application": "Api FHIR", "function": "getRelatedPersonRelationshipType"});
								  	}
								  }
							})	
						}else{
							if(validator.isInt(_id)){
								ApiFHIR.get('relatedPersonRelationshipType', {"apikey": apikey, "_id": _id}, {}, function(error, response, body){
									if(error){
									  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getRelatedPersonRelationshipType"});
									  }else{
									  	//cek apakah ada error atau tidak
									  	var relatedPersonRelationshipType = JSON.parse(body); 
									  	
									  	//cek apakah ada error atau tidak
									  	if(relatedPersonRelationshipType.err_code == 0){
										  	//cek jumdata dulu
										  	if(relatedPersonRelationshipType.data.length > 0){
										  		res.json({"err_code": 0, "data":relatedPersonRelationshipType.data});
										  	}else{
									  			res.json({"err_code": 2, "err_msg": "Related Person Relationship Type is not found"});	
										  	}
									  	}else{
									  		res.json({"err_code": 3, "err_msg": relatedPersonRelationshipType.error, "application": "Api FHIR", "function": "getRelatedPersonRelationshipType"});
									  	}
									  }
								})
							}else{
								res.json({"err_code": 4, "err_msg": "Id must be a number."});
							}
							
						}
					}else{
						result.err_code = 500;
						res.json(result);
					}	
				});
			},
			relatedPersonRelationshipTypeCode: function getRelatedPersonRelationshipTypeCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var code = req.params.code.replace(/[^\w\s ,]/gi, '').trim().toUpperCase();

				if(code == "" || typeof code == 'undefined'){
					res.json({"err_code": 4, "err_msg": "Code is required."});
				}else{
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){	
							ApiFHIR.get('relatedPersonRelationshipTypeCode', {"apikey": apikey, "code": code}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getRelatedPersonRelationshipTypeCode"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var relatedPersonRelationshipType = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(relatedPersonRelationshipType.err_code == 0){
									  	//cek jumdata dulu
									  	if(relatedPersonRelationshipType.data.length > 0){
									  		res.json({"err_code": 0, "data":relatedPersonRelationshipType.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Related Person Relationship Type Code is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": relatedPersonRelationshipType.error, "application": "Api FHIR", "function": "getRelatedPersonRelationshipTypeCode"});
								  	}
								  }
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}
			},
			groupType: function getGroupType(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				
				checkApikey(apikey, ipAddres, function(result){
					if(result.err_code == 0){
						if(_id == "" || typeof _id == 'undefined'){
							//method, endpoint, params, options, callback
							ApiFHIR.get('groupType', {"apikey": apikey, "_id": 0}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getGroupType"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var groupType = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(groupType.err_code == 0){
									  	//cek jumdata dulu
									  	if(groupType.data.length > 0){
									  		res.json({"err_code": 0, "data":groupType.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Group Type is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": groupType.error, "application": "Api FHIR", "function": "getGroupType"});
								  	}
								  }
							})	
						}else{
							if(validator.isInt(_id)){
								ApiFHIR.get('groupType', {"apikey": apikey, "_id": _id}, {}, function(error, response, body){
									if(error){
									  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getGroupType"});
									  }else{
									  	//cek apakah ada error atau tidak
									  	var groupType = JSON.parse(body); 
									  	
									  	//cek apakah ada error atau tidak
									  	if(groupType.err_code == 0){
										  	//cek jumdata dulu
										  	if(groupType.data.length > 0){
										  		res.json({"err_code": 0, "data":groupType.data});
										  	}else{
									  			res.json({"err_code": 2, "err_msg": "Group Type is not found"});	
										  	}
									  	}else{
									  		res.json({"err_code": 3, "err_msg": groupType.error, "application": "Api FHIR", "function": "getGroupType"});
									  	}
									  }
								})
							}else{
								res.json({"err_code": 4, "err_msg": "Id must be a number."});
							}
							
						}
					}else{
						result.err_code = 500;
						res.json(result);
					}	
				});
			},
			groupTypeCode: function getGroupTypeCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var code = req.params.code.replace(/[^\w\s ,]/gi, '').trim().toLowerCase();

				if(code == "" || typeof code == 'undefined'){
					res.json({"err_code": 4, "err_msg": "Code is required."});
				}else{
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){	
							ApiFHIR.get('groupTypeCode', {"apikey": apikey, "code": code}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getGroupTypeCode"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var groupType = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(groupType.err_code == 0){
									  	//cek jumdata dulu
									  	if(groupType.data.length > 0){
									  		res.json({"err_code": 0, "data":groupType.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Group Type Code is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": groupType.error, "application": "Api FHIR", "function": "getGroupTypeCode"});
								  	}
								  }
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}
			},
			identifierUse: function getIdentifierUse(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				
				checkApikey(apikey, ipAddres, function(result){
					if(result.err_code == 0){
						if(_id == "" || typeof _id == 'undefined'){
							//method, endpoint, params, options, callback
							ApiFHIR.get('identifierUse', {"apikey": apikey, "_id": 0}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getIdentifierUse"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var identifierUse = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(identifierUse.err_code == 0){
									  	//cek jumdata dulu
									  	if(identifierUse.data.length > 0){
									  		res.json({"err_code": 0, "data":identifierUse.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Identifier Use is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": identifierUse.error, "application": "Api FHIR", "function": "getIdentifierUse"});
								  	}
								  }
							})	
						}else{
							if(validator.isInt(_id)){
								ApiFHIR.get('identifierUse', {"apikey": apikey, "_id": _id}, {}, function(error, response, body){
									if(error){
									  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getIdentifierUse"});
									  }else{
									  	//cek apakah ada error atau tidak
									  	var identifierUse = JSON.parse(body); 
									  	
									  	//cek apakah ada error atau tidak
									  	if(identifierUse.err_code == 0){
										  	//cek jumdata dulu
										  	if(identifierUse.data.length > 0){
										  		res.json({"err_code": 0, "data":identifierUse.data});
										  	}else{
									  			res.json({"err_code": 2, "err_msg": "Identifier Use is not found"});	
										  	}
									  	}else{
									  		res.json({"err_code": 3, "err_msg": identifierUse.error, "application": "Api FHIR", "function": "getIdentifierUse"});
									  	}
									  }
								})
							}else{
								res.json({"err_code": 4, "err_msg": "Id must be a number."});
							}
							
						}
					}else{
						result.err_code = 500;
						res.json(result);
					}	
				});
			},
			identifierUseCode: function getIdentifierUseCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var code = req.params.code.replace(/[^\w\s ,]/gi, '').trim().toLowerCase();

				if(code == "" || typeof code == 'undefined'){
					res.json({"err_code": 4, "err_msg": "Code is required."});
				}else{
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){	
							ApiFHIR.get('identifierUseCode', {"apikey": apikey, "code": code}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getIdentifierUseCode"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var identifierUse = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(identifierUse.err_code == 0){
									  	//cek jumdata dulu
									  	if(identifierUse.data.length > 0){
									  		res.json({"err_code": 0, "data":identifierUse.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Identifier Use Code is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": identifierUse.error, "application": "Api FHIR", "function": "getIdentifierUseCode"});
								  	}
								  }
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}
			},
			identifierType: function getIdentifierType(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				
				checkApikey(apikey, ipAddres, function(result){
					if(result.err_code == 0){
						if(_id == "" || typeof _id == 'undefined'){
							//method, endpoint, params, options, callback
							ApiFHIR.get('identifierType', {"apikey": apikey, "_id": 0}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getIdentifierType"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var identifierType = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(identifierType.err_code == 0){
									  	//cek jumdata dulu
									  	if(identifierType.data.length > 0){
									  		res.json({"err_code": 0, "data":identifierType.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Identifier Type is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": identifierType.error, "application": "Api FHIR", "function": "getIdentifierType"});
								  	}
								  }
							})	
						}else{
							if(validator.isInt(_id)){
								ApiFHIR.get('identifierType', {"apikey": apikey, "_id": _id}, {}, function(error, response, body){
									if(error){
									  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getIdentifierUse"});
									  }else{
									  	//cek apakah ada error atau tidak
									  	var identifierType = JSON.parse(body); 
									  	
									  	//cek apakah ada error atau tidak
									  	if(identifierType.err_code == 0){
										  	//cek jumdata dulu
										  	if(identifierType.data.length > 0){
										  		res.json({"err_code": 0, "data":identifierType.data});
										  	}else{
									  			res.json({"err_code": 2, "err_msg": "Identifier Type is not found"});	
										  	}
									  	}else{
									  		res.json({"err_code": 3, "err_msg": identifierType.error, "application": "Api FHIR", "function": "getIdentifierType"});
									  	}
									  }
								})
							}else{
								res.json({"err_code": 4, "err_msg": "Id must be a number."});
							}
							
						}
					}else{
						result.err_code = 500;
						res.json(result);
					}	
				});
			},
			identifierTypeCode: function getIdentifierTypeCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var code = req.params.code.replace(/[^\w\s ,]/gi, '').toUpperCase();

				if(code == "" || typeof code == 'undefined'){
					res.json({"err_code": 4, "err_msg": "Code is required."});
				}else{
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){	
							ApiFHIR.get('identifierTypeCode', {"apikey": apikey, "code": code}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getIdentifierTypeCode"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var identifierType = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(identifierType.err_code == 0){
									  	//cek jumdata dulu
									  	if(identifierType.data.length > 0){
									  		res.json({"err_code": 0, "data":identifierType.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Identifier Type Code is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": identifierType.error, "application": "Api FHIR", "function": "getIdentifierTypeCode"});
								  	}
								  }
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}
			},
			nameUse: function getNameUse(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				
				checkApikey(apikey, ipAddres, function(result){
					if(result.err_code == 0){
						if(_id == "" || typeof _id == 'undefined'){
							//method, endpoint, params, options, callback
							ApiFHIR.get('nameUse', {"apikey": apikey, "_id": 0}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getNameUse"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var nameUse = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(nameUse.err_code == 0){
									  	//cek jumdata dulu
									  	if(nameUse.data.length > 0){
									  		res.json({"err_code": 0, "data":nameUse.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Name Use is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": nameUse.error, "application": "Api FHIR", "function": "getNameUse"});
								  	}
								  }
							})	
						}else{
							if(validator.isInt(_id)){
								ApiFHIR.get('nameUse', {"apikey": apikey, "_id": _id}, {}, function(error, response, body){
									if(error){
									  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getNameUse"});
									  }else{
									  	//cek apakah ada error atau tidak
									  	var nameUse = JSON.parse(body); 
									  	
									  	//cek apakah ada error atau tidak
									  	if(nameUse.err_code == 0){
										  	//cek jumdata dulu
										  	if(nameUse.data.length > 0){
										  		res.json({"err_code": 0, "data":nameUse.data});
										  	}else{
									  			res.json({"err_code": 2, "err_msg": "Name Use is not found"});	
										  	}
									  	}else{
									  		res.json({"err_code": 3, "err_msg": nameUse.error, "application": "Api FHIR", "function": "getNameUse"});
									  	}
									  }
								})
							}else{
								res.json({"err_code": 4, "err_msg": "Id must be a number."});
							}
							
						}
					}else{
						result.err_code = 500;
						res.json(result);
					}	
				});
			},
			nameUseCode: function getNameUseCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var code = req.params.code.replace(/[^\w\s ,]/gi, '').trim().toLowerCase();

				if(code == "" || typeof code == 'undefined'){
					res.json({"err_code": 4, "err_msg": "Code is required."});
				}else{
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){	
							ApiFHIR.get('nameUseCode', {"apikey": apikey, "code": code}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getNameUseCode"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var nameUse = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(nameUse.err_code == 0){
									  	//cek jumdata dulu
									  	if(nameUse.data.length > 0){
									  		res.json({"err_code": 0, "data":nameUse.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Name Use Code is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": nameUse.error, "application": "Api FHIR", "function": "getNameUseCode"});
								  	}
								  }
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}
			},
			contactPointSystem: function getContactPointSystem(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				
				checkApikey(apikey, ipAddres, function(result){
					if(result.err_code == 0){
						if(_id == "" || typeof _id == 'undefined'){
							//method, endpoint, params, options, callback
							ApiFHIR.get('contactPointSystem', {"apikey": apikey, "_id": 0}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getContactPointSystem"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var contactPointSystem = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(contactPointSystem.err_code == 0){
									  	//cek jumdata dulu
									  	if(contactPointSystem.data.length > 0){
									  		res.json({"err_code": 0, "data":contactPointSystem.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Contact Point System is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": contactPointSystem.error, "application": "Api FHIR", "function": "getContactPointSystem"});
								  	}
								  }
							})	
						}else{
							if(validator.isInt(_id)){
								ApiFHIR.get('contactPointSystem', {"apikey": apikey, "_id": _id}, {}, function(error, response, body){
									if(error){
									  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getContactPointSystem"});
									  }else{
									  	//cek apakah ada error atau tidak
									  	var contactPointSystem = JSON.parse(body); 
									  	
									  	//cek apakah ada error atau tidak
									  	if(contactPointSystem.err_code == 0){
										  	//cek jumdata dulu
										  	if(contactPointSystem.data.length > 0){
										  		res.json({"err_code": 0, "data":contactPointSystem.data});
										  	}else{
									  			res.json({"err_code": 2, "err_msg": "Contact Point System is not found"});	
										  	}
									  	}else{
									  		res.json({"err_code": 3, "err_msg": contactPointSystem.error, "application": "Api FHIR", "function": "getContactPointSystem"});
									  	}
									  }
								})
							}else{
								res.json({"err_code": 4, "err_msg": "Id must be a number."});
							}
							
						}
					}else{
						result.err_code = 500;
						res.json(result);
					}	
				});
			},
			contactPointSystemCode: function getContactPointSystemCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var code = req.params.code.replace(/[^\w\s ,]/gi, '').trim().toLowerCase();

				if(code == "" || typeof code == 'undefined'){
					res.json({"err_code": 4, "err_msg": "Code is required."});
				}else{
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){	
							ApiFHIR.get('contactPointSystemCode', {"apikey": apikey, "code": code}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getContactPointSystemCode"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var contactPointSystem = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(contactPointSystem.err_code == 0){
									  	//cek jumdata dulu
									  	if(contactPointSystem.data.length > 0){
									  		res.json({"err_code": 0, "data":contactPointSystem.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Contact Point System Code is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": contactPointSystem.error, "application": "Api FHIR", "function": "getContactPointSystemCode"});
								  	}
								  }
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}
			},
			contactPointUse: function getContactPointUse(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				
				checkApikey(apikey, ipAddres, function(result){
					if(result.err_code == 0){
						if(_id == "" || typeof _id == 'undefined'){
							//method, endpoint, params, options, callback
							ApiFHIR.get('contactPointUse', {"apikey": apikey, "_id": 0}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getContactPointUse"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var contactPointUse = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(contactPointUse.err_code == 0){
									  	//cek jumdata dulu
									  	if(contactPointUse.data.length > 0){
									  		res.json({"err_code": 0, "data":contactPointUse.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Contact Point Use is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": contactPointUse.error, "application": "Api FHIR", "function": "getContactPointUse"});
								  	}
								  }
							})	
						}else{
							if(validator.isInt(_id)){
								ApiFHIR.get('contactPointUse', {"apikey": apikey, "_id": _id}, {}, function(error, response, body){
									if(error){
									  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getContactPointUse"});
									  }else{
									  	//cek apakah ada error atau tidak
									  	var contactPointUse = JSON.parse(body); 
									  	
									  	//cek apakah ada error atau tidak
									  	if(contactPointUse.err_code == 0){
										  	//cek jumdata dulu
										  	if(contactPointUse.data.length > 0){
										  		res.json({"err_code": 0, "data":contactPointUse.data});
										  	}else{
									  			res.json({"err_code": 2, "err_msg": "Contact Point Use is not found"});	
										  	}
									  	}else{
									  		res.json({"err_code": 3, "err_msg": contactPointUse.error, "application": "Api FHIR", "function": "getContactPointUse"});
									  	}
									  }
								})
							}else{
								res.json({"err_code": 4, "err_msg": "Id must be a number."});
							}
							
						}
					}else{
						result.err_code = 500;
						res.json(result);
					}	
				});
			},
			contactPointUseCode: function getContactPointUseCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var code = req.params.code.replace(/[^\w\s ,]/gi, '').trim().toLowerCase();

				if(code == "" || typeof code == 'undefined'){
					res.json({"err_code": 4, "err_msg": "Code is required."});
				}else{
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){	
							ApiFHIR.get('contactPointUseCode', {"apikey": apikey, "code": code}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getContactPointUseCode"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var contactPointUse = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(contactPointUse.err_code == 0){
									  	//cek jumdata dulu
									  	if(contactPointUse.data.length > 0){
									  		res.json({"err_code": 0, "data":contactPointUse.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Contact Point Use Code is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": contactPointUse.error, "application": "Api FHIR", "function": "getContactPointUseCode"});
								  	}
								  }
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}
			},
			addressUse: function getAddressUse(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				
				checkApikey(apikey, ipAddres, function(result){
					if(result.err_code == 0){
						if(_id == "" || typeof _id == 'undefined'){
							//method, endpoint, params, options, callback
							ApiFHIR.get('addressUse', {"apikey": apikey, "_id": 0}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getAddressUse"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var addressUse = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(addressUse.err_code == 0){
									  	//cek jumdata dulu
									  	if(addressUse.data.length > 0){
									  		res.json({"err_code": 0, "data":addressUse.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Address Use is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": addressUse.error, "application": "Api FHIR", "function": "getAddressUse"});
								  	}
								  }
							})	
						}else{
							if(validator.isInt(_id)){
								ApiFHIR.get('addressUse', {"apikey": apikey, "_id": _id}, {}, function(error, response, body){
									if(error){
									  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getAddressUse"});
									  }else{
									  	//cek apakah ada error atau tidak
									  	var addressUse = JSON.parse(body); 
									  	
									  	//cek apakah ada error atau tidak
									  	if(addressUse.err_code == 0){
										  	//cek jumdata dulu
										  	if(addressUse.data.length > 0){
										  		res.json({"err_code": 0, "data":addressUse.data});
										  	}else{
									  			res.json({"err_code": 2, "err_msg": "Address Use is not found"});	
										  	}
									  	}else{
									  		res.json({"err_code": 3, "err_msg": addressUse.error, "application": "Api FHIR", "function": "getAddressUse"});
									  	}
									  }
								})
							}else{
								res.json({"err_code": 4, "err_msg": "Id must be a number."});
							}
							
						}
					}else{
						result.err_code = 500;
						res.json(result);
					}	
				});
			},
			addressUseCode: function getAddressUseCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var code = req.params.code.replace(/[^\w\s ,]/gi, '').trim().toLowerCase();

				if(code == "" || typeof code == 'undefined'){
					res.json({"err_code": 4, "err_msg": "Code is required."});
				}else{
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){	
							ApiFHIR.get('addressUseCode', {"apikey": apikey, "code": code}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getAddressUseCode"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var addressUse = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(addressUse.err_code == 0){
									  	//cek jumdata dulu
									  	if(addressUse.data.length > 0){
									  		res.json({"err_code": 0, "data":addressUse.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Address Use Code is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": addressUse.error, "application": "Api FHIR", "function": "getAddressUseCode"});
								  	}
								  }
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}
			},
			addressType: function getAddressType(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				
				checkApikey(apikey, ipAddres, function(result){
					if(result.err_code == 0){
						if(_id == "" || typeof _id == 'undefined'){
							//method, endpoint, params, options, callback
							ApiFHIR.get('addressType', {"apikey": apikey, "_id": 0}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getAddressType"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var addressType = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(addressType.err_code == 0){
									  	//cek jumdata dulu
									  	if(addressType.data.length > 0){
									  		res.json({"err_code": 0, "data":addressType.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Address Type is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": addressType.error, "application": "Api FHIR", "function": "getAddressType"});
								  	}
								  }
							})	
						}else{
							if(validator.isInt(_id)){
								ApiFHIR.get('addressType', {"apikey": apikey, "_id": _id}, {}, function(error, response, body){
									if(error){
									  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getAddressType"});
									  }else{
									  	//cek apakah ada error atau tidak
									  	var addressType = JSON.parse(body); 
									  	
									  	//cek apakah ada error atau tidak
									  	if(addressType.err_code == 0){
										  	//cek jumdata dulu
										  	if(addressType.data.length > 0){
										  		res.json({"err_code": 0, "data":addressType.data});
										  	}else{
									  			res.json({"err_code": 2, "err_msg": "Address Type is not found"});	
										  	}
									  	}else{
									  		res.json({"err_code": 3, "err_msg": addressType.error, "application": "Api FHIR", "function": "getAddressType"});
									  	}
									  }
								})
							}else{
								res.json({"err_code": 4, "err_msg": "Id must be a number."});
							}
							
						}
					}else{
						result.err_code = 500;
						res.json(result);
					}	
				});
			},
			addressTypeCode: function getAddressTypeCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var code = req.params.code.replace(/[^\w\s ,]/gi, '').trim().toLowerCase();

				if(code == "" || typeof code == 'undefined'){
					res.json({"err_code": 4, "err_msg": "Code is required."});
				}else{
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){	
							ApiFHIR.get('addressTypeCode', {"apikey": apikey, "code": code}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getAddressTypeCode"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var addressType = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(addressType.err_code == 0){
									  	//cek jumdata dulu
									  	if(addressType.data.length > 0){
									  		res.json({"err_code": 0, "data":addressType.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Address Type Code is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": addressType.error, "application": "Api FHIR", "function": "getAddressTypeCode"});
								  	}
								  }
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}
			},
			organizationType: function getOrganizationType(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				
				checkApikey(apikey, ipAddres, function(result){
					if(result.err_code == 0){
						if(_id == "" || typeof _id == 'undefined'){
							//method, endpoint, params, options, callback
							ApiFHIR.get('organizationType', {"apikey": apikey, "_id": 0}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getOrganizationType"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var organizationType = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(organizationType.err_code == 0){
									  	//cek jumdata dulu
									  	if(organizationType.data.length > 0){
									  		res.json({"err_code": 0, "data":organizationType.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Organization Type is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": organizationType.error, "application": "Api FHIR", "function": "getOrganizationType"});
								  	}
								  }
							})	
						}else{
							if(validator.isInt(_id)){
								ApiFHIR.get('organizationType', {"apikey": apikey, "_id": _id}, {}, function(error, response, body){
									if(error){
									  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getOrganizationType"});
									  }else{
									  	//cek apakah ada error atau tidak
									  	var organizationType = JSON.parse(body); 
									  	
									  	//cek apakah ada error atau tidak
									  	if(organizationType.err_code == 0){
										  	//cek jumdata dulu
										  	if(organizationType.data.length > 0){
										  		res.json({"err_code": 0, "data":organizationType.data});
										  	}else{
									  			res.json({"err_code": 2, "err_msg": "Organization Type is not found"});	
										  	}
									  	}else{
									  		res.json({"err_code": 3, "err_msg": organizationType.error, "application": "Api FHIR", "function": "getOrganizationType"});
									  	}
									  }
								})
							}else{
								res.json({"err_code": 4, "err_msg": "Id must be a number."});
							}
							
						}
					}else{
						result.err_code = 500;
						res.json(result);
					}	
				});
			},
			organizationTypeCode: function getOrganizationTypeCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var code = req.params.code.replace(/[^\w\s ,]/gi, '').trim().toLowerCase();

				if(code == "" || typeof code == 'undefined'){
					res.json({"err_code": 4, "err_msg": "Code is required."});
				}else{
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){	
							ApiFHIR.get('organizationTypeCode', {"apikey": apikey, "code": code}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getOrganizationTypeCode"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var organizationType = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(organizationType.err_code == 0){
									  	//cek jumdata dulu
									  	if(organizationType.data.length > 0){
									  		res.json({"err_code": 0, "data":organizationType.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Organization Type Code is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": organizationType.error, "application": "Api FHIR", "function": "getOrganizationTypeCode"});
								  	}
								  }
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}				
			},
			contactentityType: function getContactentityType(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				
				checkApikey(apikey, ipAddres, function(result){
					if(result.err_code == 0){
						if(_id == "" || typeof _id == 'undefined'){
							//method, endpoint, params, options, callback
							ApiFHIR.get('contactentityType', {"apikey": apikey, "_id": 0}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getContactentityType"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var contactentityType = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(contactentityType.err_code == 0){
									  	//cek jumdata dulu
									  	if(contactentityType.data.length > 0){
									  		res.json({"err_code": 0, "data":contactentityType.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Contact Entity Type is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": contactentityType.error, "application": "Api FHIR", "function": "getContactentityType"});
								  	}
								  }
							})	
						}else{
							if(validator.isInt(_id)){
								ApiFHIR.get('contactentityType', {"apikey": apikey, "_id": _id}, {}, function(error, response, body){
									if(error){
									  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getContactentityType"});
									  }else{
									  	//cek apakah ada error atau tidak
									  	var contactentityType = JSON.parse(body); 
									  	
									  	//cek apakah ada error atau tidak
									  	if(contactentityType.err_code == 0){
										  	//cek jumdata dulu
										  	if(contactentityType.data.length > 0){
										  		res.json({"err_code": 0, "data":contactentityType.data});
										  	}else{
									  			res.json({"err_code": 2, "err_msg": "Contact Entity Type is not found"});	
										  	}
									  	}else{
									  		res.json({"err_code": 3, "err_msg": contactentityType.error, "application": "Api FHIR", "function": "getContactentityType"});
									  	}
									  }
								})
							}else{
								res.json({"err_code": 4, "err_msg": "Id must be a number."});
							}
							
						}
					}else{
						result.err_code = 500;
						res.json(result);
					}	
				});
			},
			contactentityTypeCode: function getContactentityTypeCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var code = req.params.code.replace(/[^\w\s ,]/gi, '').trim().toLowerCase();

				if(code == "" || typeof code == 'undefined'){
					res.json({"err_code": 4, "err_msg": "Code is required."});
				}else{
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){	
							ApiFHIR.get('contactentityTypeCode', {"apikey": apikey, "code": code}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getContactentityTypeCode"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var contactentityType = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(contactentityType.err_code == 0){
									  	//cek jumdata dulu
									  	if(contactentityType.data.length > 0){
									  		res.json({"err_code": 0, "data":contactentityType.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Contactentity Type Code is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": contactentityType.error, "application": "Api FHIR", "function": "getContactentityTypeCode"});
								  	}
								  }
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}				
			},
			locationStatus: function getLocationStatus(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				
				checkApikey(apikey, ipAddres, function(result){
					if(result.err_code == 0){
						if(_id == "" || typeof _id == 'undefined'){
							//method, endpoint, params, options, callback
							ApiFHIR.get('locationStatus', {"apikey": apikey, "_id": 0}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getLocationStatus"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var locationStatus = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(locationStatus.err_code == 0){
									  	//cek jumdata dulu
									  	if(locationStatus.data.length > 0){
									  		res.json({"err_code": 0, "data":locationStatus.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Location Status is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": locationStatus.error, "application": "Api FHIR", "function": "getLocationStatus"});
								  	}
								  }
							})	
						}else{
							if(validator.isInt(_id)){
								ApiFHIR.get('locationStatus', {"apikey": apikey, "_id": _id}, {}, function(error, response, body){
									if(error){
									  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getLocationStatus"});
									  }else{
									  	//cek apakah ada error atau tidak
									  	var locationStatus = JSON.parse(body); 
									  	
									  	//cek apakah ada error atau tidak
									  	if(locationStatus.err_code == 0){
										  	//cek jumdata dulu
										  	if(locationStatus.data.length > 0){
										  		res.json({"err_code": 0, "data":locationStatus.data});
										  	}else{
									  			res.json({"err_code": 2, "err_msg": "Location Status is not found"});	
										  	}
									  	}else{
									  		res.json({"err_code": 3, "err_msg": locationStatus.error, "application": "Api FHIR", "function": "getLocationStatus"});
									  	}
									  }
								})
							}else{
								res.json({"err_code": 4, "err_msg": "Id must be a number."});
							}
							
						}
					}else{
						result.err_code = 500;
						res.json(result);
					}	
				});
			},
			locationStatusCode: function getLocationStatusCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var code = req.params.code.replace(/[^\w\s ,]/gi, '').trim().toLowerCase();

				if(code == "" || typeof code == 'undefined'){
					res.json({"err_code": 4, "err_msg": "Code is required."});
				}else{
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){	
							ApiFHIR.get('locationStatusCode', {"apikey": apikey, "code": code}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getLocationStatusCode"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var locationStatus = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(locationStatus.err_code == 0){
									  	//cek jumdata dulu
									  	if(locationStatus.data.length > 0){
									  		res.json({"err_code": 0, "data":locationStatus.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Location Status Code is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": locationStatus.error, "application": "Api FHIR", "function": "getLocationStatusCode"});
								  	}
								  }
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}				
			},
			bedStatus: function getBedStatus(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				
				checkApikey(apikey, ipAddres, function(result){
					if(result.err_code == 0){
						if(_id == "" || typeof _id == 'undefined'){
							//method, endpoint, params, options, callback
							ApiFHIR.get('bedStatus', {"apikey": apikey, "_id": 0}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getBedStatus"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var bedStatus = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(bedStatus.err_code == 0){
									  	//cek jumdata dulu
									  	if(bedStatus.data.length > 0){
									  		res.json({"err_code": 0, "data":bedStatus.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Bed Status is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": bedStatus.error, "application": "Api FHIR", "function": "getBedStatus"});
								  	}
								  }
							})	
						}else{
							if(validator.isInt(_id)){
								ApiFHIR.get('bedStatus', {"apikey": apikey, "_id": _id}, {}, function(error, response, body){
									if(error){
									  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getBedStatus"});
									  }else{
									  	//cek apakah ada error atau tidak
									  	var bedStatus = JSON.parse(body); 
									  	
									  	//cek apakah ada error atau tidak
									  	if(bedStatus.err_code == 0){
										  	//cek jumdata dulu
										  	if(bedStatus.data.length > 0){
										  		res.json({"err_code": 0, "data":bedStatus.data});
										  	}else{
									  			res.json({"err_code": 2, "err_msg": "Bed Status is not found"});	
										  	}
									  	}else{
									  		res.json({"err_code": 3, "err_msg": bedStatus.error, "application": "Api FHIR", "function": "getBedStatus"});
									  	}
									  }
								})
							}else{
								res.json({"err_code": 4, "err_msg": "Id must be a number."});
							}
							
						}
					}else{
						result.err_code = 500;
						res.json(result);
					}	
				});
			},
			bedStatusCode: function getBedStatusCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var code = req.params.code.replace(/[^\w\s ,]/gi, '').trim().toLowerCase();

				if(code == "" || typeof code == 'undefined'){
					res.json({"err_code": 4, "err_msg": "Code is required."});
				}else{
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){	
							ApiFHIR.get('bedStatusCode', {"apikey": apikey, "code": code}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getBedStatusCode"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var bedStatus = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(bedStatus.err_code == 0){
									  	//cek jumdata dulu
									  	if(bedStatus.data.length > 0){
									  		res.json({"err_code": 0, "data":bedStatus.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Bed Status Code is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": bedStatus.error, "application": "Api FHIR", "function": "getBedStatusCode"});
								  	}
								  }
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}				
			},
			locationMode: function getLocationMode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				
				checkApikey(apikey, ipAddres, function(result){
					if(result.err_code == 0){
						if(_id == "" || typeof _id == 'undefined'){
							//method, endpoint, params, options, callback
							ApiFHIR.get('locationMode', {"apikey": apikey, "_id": 0}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getLocationMode"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var locationMode = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(locationMode.err_code == 0){
									  	//cek jumdata dulu
									  	if(locationMode.data.length > 0){
									  		res.json({"err_code": 0, "data":locationMode.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Location Mode is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": locationMode.error, "application": "Api FHIR", "function": "getLocationMode"});
								  	}
								  }
							})	
						}else{
							if(validator.isInt(_id)){
								ApiFHIR.get('locationMode', {"apikey": apikey, "_id": _id}, {}, function(error, response, body){
									if(error){
									  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getLocationMode"});
									  }else{
									  	//cek apakah ada error atau tidak
									  	var locationMode = JSON.parse(body); 
									  	
									  	//cek apakah ada error atau tidak
									  	if(locationMode.err_code == 0){
										  	//cek jumdata dulu
										  	if(locationMode.data.length > 0){
										  		res.json({"err_code": 0, "data":locationMode.data});
										  	}else{
									  			res.json({"err_code": 2, "err_msg": "Location Mode is not found"});	
										  	}
									  	}else{
									  		res.json({"err_code": 3, "err_msg": locationMode.error, "application": "Api FHIR", "function": "getLocationMode"});
									  	}
									  }
								})
							}else{
								res.json({"err_code": 4, "err_msg": "Id must be a number."});
							}
							
						}
					}else{
						result.err_code = 500;
						res.json(result);
					}	
				});
			},
			locationModeCode: function getLocationModeCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var code = req.params.code.replace(/[^\w\s ,]/gi, '').trim().toLowerCase();

				if(code == "" || typeof code == 'undefined'){
					res.json({"err_code": 4, "err_msg": "Code is required."});
				}else{
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){	
							ApiFHIR.get('locationModeCode', {"apikey": apikey, "code": code}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getLocationModeCode"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var locationMode = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(locationMode.err_code == 0){
									  	//cek jumdata dulu
									  	if(locationMode.data.length > 0){
									  		res.json({"err_code": 0, "data":locationMode.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Location Mode Code is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": locationMode.error, "application": "Api FHIR", "function": "getLocationModeCode"});
								  	}
								  }
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}				
			},
			serviceDeliveryLocationRoleType: function getServiceDeliveryLocationRoleType(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				
				checkApikey(apikey, ipAddres, function(result){
					if(result.err_code == 0){
						if(_id == "" || typeof _id == 'undefined'){
							//method, endpoint, params, options, callback
							ApiFHIR.get('serviceDeliveryLocationRoleType', {"apikey": apikey, "_id": 0}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getServiceDeliveryLocationRoleType"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var serviceDeliveryLocationRoleType = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(serviceDeliveryLocationRoleType.err_code == 0){
									  	//cek jumdata dulu
									  	if(serviceDeliveryLocationRoleType.data.length > 0){
									  		res.json({"err_code": 0, "data":serviceDeliveryLocationRoleType.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Service Delivery Location Role Type is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": serviceDeliveryLocationRoleType.error, "application": "Api FHIR", "function": "getServiceDeliveryLocationRoleType"});
								  	}
								  }
							})	
						}else{
							if(validator.isInt(_id)){
								ApiFHIR.get('serviceDeliveryLocationRoleType', {"apikey": apikey, "_id": _id}, {}, function(error, response, body){
									if(error){
									  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getServiceDeliveryLocationRoleType"});
									  }else{
									  	//cek apakah ada error atau tidak
									  	var serviceDeliveryLocationRoleType = JSON.parse(body); 
									  	
									  	//cek apakah ada error atau tidak
									  	if(serviceDeliveryLocationRoleType.err_code == 0){
										  	//cek jumdata dulu
										  	if(serviceDeliveryLocationRoleType.data.length > 0){
										  		res.json({"err_code": 0, "data":locationMode.data});
										  	}else{
									  			res.json({"err_code": 2, "err_msg": "Service Delivery Location Role Type is not found"});	
										  	}
									  	}else{
									  		res.json({"err_code": 3, "err_msg": serviceDeliveryLocationRoleType.error, "application": "Api FHIR", "function": "getServiceDeliveryLocationRoleType"});
									  	}
									  }
								})
							}else{
								res.json({"err_code": 4, "err_msg": "Id must be a number."});
							}
							
						}
					}else{
						result.err_code = 500;
						res.json(result);
					}	
				});
			},
			serviceDeliveryLocationRoleTypeCode: function getServiceDeliveryLocationRoleTypeCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var code = req.params.code.replace(/[^\w\s ,]/gi, '').trim().toLowerCase();

				if(code == "" || typeof code == 'undefined'){
					res.json({"err_code": 4, "err_msg": "Code is required."});
				}else{
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){	
							ApiFHIR.get('serviceDeliveryLocationRoleTypeCode', {"apikey": apikey, "code": code}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getServiceDeliveryLocationRoleTypeCode"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var serviceDeliveryLocationRoleType = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(serviceDeliveryLocationRoleType.err_code == 0){
									  	//cek jumdata dulu
									  	if(serviceDeliveryLocationRoleType.data.length > 0){
									  		res.json({"err_code": 0, "data":serviceDeliveryLocationRoleType.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Service Delivery Location Role Type Code is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": serviceDeliveryLocationRoleType.error, "application": "Api FHIR", "function": "getServiceDeliveryLocationRoleTypeCode"});
								  	}
								  }
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}				
			},
			locationPhysicalType: function getLocationPhysicalType(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;
				checkApikey(apikey, ipAddres, function(result){
					if(result.err_code == 0){
						if(_id == "" || typeof _id == 'undefined'){
							//method, endpoint, params, options, callback
							ApiFHIR.get('locationPhysicalType', {"apikey": apikey, "_id": 0}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getLocationPhysicalType"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var locationPhysicalType = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(locationPhysicalType.err_code == 0){
									  	//cek jumdata dulu
									  	if(locationPhysicalType.data.length > 0){
									  		res.json({"err_code": 0, "data":locationPhysicalType.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Location Physical Type is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": locationPhysicalType.error, "application": "Api FHIR", "function": "getLocationPhysicalType"});
								  	}
								  }
							})	
						}else{
							if(validator.isInt(_id)){
								ApiFHIR.get('locationPhysicalType', {"apikey": apikey, "_id": _id}, {}, function(error, response, body){
									if(error){
									  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getLocationPhysicalType"});
									  }else{
									  	//cek apakah ada error atau tidak
									  	var locationPhysicalType = JSON.parse(body); 
									  	
									  	//cek apakah ada error atau tidak
									  	if(locationPhysicalType.err_code == 0){
										  	//cek jumdata dulu
										  	if(locationPhysicalType.data.length > 0){
										  		res.json({"err_code": 0, "data":locationPhysicalType.data});
										  	}else{
									  			res.json({"err_code": 2, "err_msg": "Location Physical Type is not found"});	
										  	}
									  	}else{
									  		res.json({"err_code": 3, "err_msg": locationPhysicalType.error, "application": "Api FHIR", "function": "getLocationPhysicalType"});
									  	}
									  }
								})
							}else{
								res.json({"err_code": 4, "err_msg": "Id must be a number."});
							}
							
						}
					}else{
						result.err_code = 500;
						res.json(result);
					}	
				});
			},
			locationPhysicalTypeCode: function getLocationPhysicalTypeCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var code = req.params.code.replace(/[^\w\s ,]/gi, '').trim().toLowerCase();

				if(code == "" || typeof code == 'undefined'){
					res.json({"err_code": 4, "err_msg": "Code is required."});
				}else{
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){	
							ApiFHIR.get('locationPhysicalTypeCode', {"apikey": apikey, "code": code}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getLocationPhysicalType"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var locationPhysicalType = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(locationPhysicalType.err_code == 0){
									  	//cek jumdata dulu
									  	if(locationPhysicalType.data.length > 0){
									  		res.json({"err_code": 0, "data":locationPhysicalType.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Location Physical Type Code is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": locationPhysicalType.error, "application": "Api FHIR", "function": "getLocationPhysicalTypeCode"});
								  	}
								  }
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}				
			},
			qualificationCode: function getQualificationCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;
				checkApikey(apikey, ipAddres, function(result){
					if(result.err_code == 0){
						if(_id == "" || typeof _id == 'undefined'){
							//method, endpoint, params, options, callback
							ApiFHIR.get('qualificationCode', {"apikey": apikey, "_id": 0}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getQualificationCode"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var qualificationCode = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(qualificationCode.err_code == 0){
									  	//cek jumdata dulu
									  	if(qualificationCode.data.length > 0){
									  		res.json({"err_code": 0, "data":qualificationCode.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Qualification Code is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": qualificationCode.error, "application": "Api FHIR", "function": "getQualificationCode"});
								  	}
								  }
							})	
						}else{
							if(validator.isInt(_id)){
								ApiFHIR.get('qualificationCode', {"apikey": apikey, "_id": _id}, {}, function(error, response, body){
									if(error){
									  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getQualificationCode"});
									  }else{
									  	//cek apakah ada error atau tidak
									  	var qualificationCode = JSON.parse(body); 
									  	
									  	//cek apakah ada error atau tidak
									  	if(qualificationCode.err_code == 0){
										  	//cek jumdata dulu
										  	if(qualificationCode.data.length > 0){
										  		res.json({"err_code": 0, "data":qualificationCode.data});
										  	}else{
									  			res.json({"err_code": 2, "err_msg": "Qualification Code is not found"});	
										  	}
									  	}else{
									  		res.json({"err_code": 3, "err_msg": qualificationCode.error, "application": "Api FHIR", "function": "getQualificationCode"});
									  	}
									  }
								})
							}else{
								res.json({"err_code": 4, "err_msg": "Id must be a number."});
							}
							
						}
					}else{
						result.err_code = 500;
						res.json(result);
					}	
				});
			},
			qualificationCodeCode: function getQualificationCodeCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var code = req.params.code.replace(/[^\w\s ,]/gi, '').trim().toLowerCase();

				if(code == "" || typeof code == 'undefined'){
					res.json({"err_code": 4, "err_msg": "Code is required."});
				}else{
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){	
							ApiFHIR.get('qualificationCodeCode', {"apikey": apikey, "code": code}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getQualificationCode"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var qualificationCode = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(qualificationCode.err_code == 0){
									  	//cek jumdata dulu
									  	if(qualificationCode.data.length > 0){
									  		res.json({"err_code": 0, "data":qualificationCode.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Qualification Code Code is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": qualificationCode.error, "application": "Api FHIR", "function": "getQualificationCodeCode"});
								  	}
								  }
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}				
			},
			practitionerRoleCode: function getPractitionerRoleCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;
				checkApikey(apikey, ipAddres, function(result){
					if(result.err_code == 0){
						if(_id == "" || typeof _id == 'undefined'){
							//method, endpoint, params, options, callback
							ApiFHIR.get('practitionerRoleCode', {"apikey": apikey, "_id": 0}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getPractitionerRoleCode"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var practitionerRoleCode = JSON.parse(body); 
								  	//cek apakah ada error atau tidak
								  	if(practitionerRoleCode.err_code == 0){
									  	//cek jumdata dulu
									  	if(practitionerRoleCode.data.length > 0){
									  		res.json({"err_code": 0, "data":practitionerRoleCode.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Practitioner Role Code is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": practitionerRoleCode.error, "application": "Api FHIR", "function": "getPractitionerRoleCode"});
								  	}
								  }
							})	
						}else{
							if(validator.isInt(_id)){
								ApiFHIR.get('practitionerRoleCode', {"apikey": apikey, "_id": _id}, {}, function(error, response, body){
									if(error){
									  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getPractitionerRoleCode"});
									  }else{
									  	//cek apakah ada error atau tidak
									  	var practitionerRoleCode = JSON.parse(body); 
									  	
									  	//cek apakah ada error atau tidak
									  	if(practitionerRoleCode.err_code == 0){
										  	//cek jumdata dulu
										  	if(practitionerRoleCode.data.length > 0){
										  		res.json({"err_code": 0, "data":practitionerRoleCode.data});
										  	}else{
									  			res.json({"err_code": 2, "err_msg": "Practitioner Role Code is not found"});	
										  	}
									  	}else{
									  		res.json({"err_code": 3, "err_msg": practitionerRoleCode.error, "application": "Api FHIR", "function": "getPractitionerRoleCode"});
									  	}
									  }
								})
							}else{
								res.json({"err_code": 4, "err_msg": "Id must be a number."});
							}
							
						}
					}else{
						result.err_code = 500;
						res.json(result);
					}	
				});
			},
			practitionerRoleCodeCode: function getPractitionerRoleCodeCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var code = req.params.code.replace(/[^\w\s ,]/gi, '').trim().toLowerCase();

				if(code == "" || typeof code == 'undefined'){
					res.json({"err_code": 4, "err_msg": "Code is required."});
				}else{
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){	
							ApiFHIR.get('practitionerRoleCodeCode', {"apikey": apikey, "code": code}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getPractitionerRoleCode"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var practitionerRoleCode = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(practitionerRoleCode.err_code == 0){
									  	//cek jumdata dulu
									  	if(practitionerRoleCode.data.length > 0){
									  		res.json({"err_code": 0, "data":practitionerRoleCode.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Practitioner Role Code Code is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": practitionerRoleCode.error, "application": "Api FHIR", "function": "getPractitionerRoleCodeCode"});
								  	}
								  }
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}				
			},
			practiceCode: function getPracticeCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;
				checkApikey(apikey, ipAddres, function(result){
					if(result.err_code == 0){
						if(_id == "" || typeof _id == 'undefined'){
							//method, endpoint, params, options, callback
							ApiFHIR.get('practiceCode', {"apikey": apikey, "_id": 0}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getPracticeCode"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var practiceCode = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(practiceCode.err_code == 0){
									  	//cek jumdata dulu
									  	if(practiceCode.data.length > 0){
									  		res.json({"err_code": 0, "data":practiceCode.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Practice Code is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": practiceCode.error, "application": "Api FHIR", "function": "getPracticeCode"});
								  	}
								  }
							})	
						}else{
							if(validator.isInt(_id)){
								ApiFHIR.get('practiceCode', {"apikey": apikey, "_id": _id}, {}, function(error, response, body){
									if(error){
									  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getPracticeCode"});
									  }else{
									  	//cek apakah ada error atau tidak
									  	var practiceCode = JSON.parse(body); 
									  	
									  	//cek apakah ada error atau tidak
									  	if(practiceCode.err_code == 0){
										  	//cek jumdata dulu
										  	if(practiceCode.data.length > 0){
										  		res.json({"err_code": 0, "data":practiceCode.data});
										  	}else{
									  			res.json({"err_code": 2, "err_msg": "Practice Code is not found"});	
										  	}
									  	}else{
									  		res.json({"err_code": 3, "err_msg": practiceCode.error, "application": "Api FHIR", "function": "getPracticeCode"});
									  	}
									  }
								})
							}else{
								res.json({"err_code": 4, "err_msg": "Id must be a number."});
							}
							
						}
					}else{
						result.err_code = 500;
						res.json(result);
					}	
				});
			},
			practiceCodeCode: function getPracticeCodeCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var code = req.params.code.replace(/[^\w\s ,]/gi, '').trim().toLowerCase();

				if(code == "" || typeof code == 'undefined'){
					res.json({"err_code": 4, "err_msg": "Code is required."});
				}else{
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){	
							ApiFHIR.get('practiceCodeCode', {"apikey": apikey, "code": code}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getPracticeCode"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var practiceCode = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(practiceCode.err_code == 0){
									  	//cek jumdata dulu
									  	if(practiceCode.data.length > 0){
									  		res.json({"err_code": 0, "data":practiceCode.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Practice Code Code is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": practiceCode.error, "application": "Api FHIR", "function": "getPracticeCodeCode"});
								  	}
								  }
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}				
			},
			daysOfWeek: function getDaysOfWeek(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;
				checkApikey(apikey, ipAddres, function(result){
					if(result.err_code == 0){
						if(_id == "" || typeof _id == 'undefined'){
							//method, endpoint, params, options, callback
							ApiFHIR.get('daysOfWeek', {"apikey": apikey, "_id": 0}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getDaysOfWeek"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var daysOfWeek = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(daysOfWeek.err_code == 0){
									  	//cek jumdata dulu
									  	if(daysOfWeek.data.length > 0){
									  		res.json({"err_code": 0, "data":daysOfWeek.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Days Of Week is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": daysOfWeek.error, "application": "Api FHIR", "function": "getDaysOfWeek"});
								  	}
								  }
							})	
						}else{
							if(validator.isInt(_id)){
								ApiFHIR.get('daysOfWeek', {"apikey": apikey, "_id": _id}, {}, function(error, response, body){
									if(error){
									  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getDaysOfWeek"});
									  }else{
									  	//cek apakah ada error atau tidak
									  	var daysOfWeek = JSON.parse(body); 
									  	
									  	//cek apakah ada error atau tidak
									  	if(daysOfWeek.err_code == 0){
										  	//cek jumdata dulu
										  	if(daysOfWeek.data.length > 0){
										  		res.json({"err_code": 0, "data":daysOfWeek.data});
										  	}else{
									  			res.json({"err_code": 2, "err_msg": "Days Of Week is not found"});	
										  	}
									  	}else{
									  		res.json({"err_code": 3, "err_msg": daysOfWeek.error, "application": "Api FHIR", "function": "getDaysOfWeek"});
									  	}
									  }
								})
							}else{
								res.json({"err_code": 4, "err_msg": "Id must be a number."});
							}
							
						}
					}else{
						result.err_code = 500;
						res.json(result);
					}	
				});
			},
			daysOfWeekCode: function getDaysOfWeekCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var code = req.params.code.replace(/[^\w\s ,]/gi, '').trim().toLowerCase();

				if(code == "" || typeof code == 'undefined'){
					res.json({"err_code": 4, "err_msg": "Code is required."});
				}else{
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){	
							ApiFHIR.get('daysOfWeekCode', {"apikey": apikey, "code": code}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getDaysOfWeek"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var daysOfWeek = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(daysOfWeek.err_code == 0){
									  	//cek jumdata dulu
									  	if(daysOfWeek.data.length > 0){
									  		res.json({"err_code": 0, "data":daysOfWeek.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Days Of Week Code is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": daysOfWeek.error, "application": "Api FHIR", "function": "getDaysOfWeekCode"});
								  	}
								  }
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}				
			},
			serviceCategory: function getServiceCategory(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;
				checkApikey(apikey, ipAddres, function(result){
					if(result.err_code == 0){
						if(_id == "" || typeof _id == 'undefined'){
							//method, endpoint, params, options, callback
							ApiFHIR.get('serviceCategory', {"apikey": apikey, "_id": 0}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getServiceCategory"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var serviceCategory = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(serviceCategory.err_code == 0){
									  	//cek jumdata dulu
									  	if(serviceCategory.data.length > 0){
									  		res.json({"err_code": 0, "data":serviceCategory.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Service Category is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": serviceCategory.error, "application": "Api FHIR", "function": "getServiceCategory"});
								  	}
								  }
							})	
						}else{
							if(validator.isInt(_id)){
								ApiFHIR.get('serviceCategory', {"apikey": apikey, "_id": _id}, {}, function(error, response, body){
									if(error){
									  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getServiceCategory"});
									  }else{
									  	//cek apakah ada error atau tidak
									  	var serviceCategory = JSON.parse(body); 
									  	
									  	//cek apakah ada error atau tidak
									  	if(serviceCategory.err_code == 0){
										  	//cek jumdata dulu
										  	if(serviceCategory.data.length > 0){
										  		res.json({"err_code": 0, "data":serviceCategory.data});
										  	}else{
									  			res.json({"err_code": 2, "err_msg": "Service Category is not found"});	
										  	}
									  	}else{
									  		res.json({"err_code": 3, "err_msg": serviceCategory.error, "application": "Api FHIR", "function": "getServiceCategory"});
									  	}
									  }
								})
							}else{
								res.json({"err_code": 4, "err_msg": "Id must be a number."});
							}
							
						}
					}else{
						result.err_code = 500;
						res.json(result);
					}	
				});
			},
			serviceCategoryCode: function getServiceCategoryCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var code = req.params.code.replace(/[^\w\s ,]/gi, '').trim().toLowerCase();

				if(code == "" || typeof code == 'undefined'){
					res.json({"err_code": 4, "err_msg": "Code is required."});
				}else{
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){	
							ApiFHIR.get('serviceCategoryCode', {"apikey": apikey, "code": code}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getServiceCategory"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var serviceCategory = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(serviceCategory.err_code == 0){
									  	//cek jumdata dulu
									  	if(serviceCategory.data.length > 0){
									  		res.json({"err_code": 0, "data":serviceCategory.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Service Category Code is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": serviceCategory.error, "application": "Api FHIR", "function": "getServiceCategoryCode"});
								  	}
								  }
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}				
			},
			serviceType	: function getServiceType	(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;
				checkApikey(apikey, ipAddres, function(result){
					if(result.err_code == 0){
						if(_id == "" || typeof _id == 'undefined'){
							//method, endpoint, params, options, callback
							ApiFHIR.get('serviceType', {"apikey": apikey, "_id": 0}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getServiceType	"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var serviceType	 = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(serviceType	.err_code == 0){
									  	//cek jumdata dulu
									  	if(serviceType	.data.length > 0){
									  		res.json({"err_code": 0, "data":serviceType	.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Service Type is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": serviceType	.error, "application": "Api FHIR", "function": "getServiceType"});
								  	}
								  }
							})	
						}else{
							if(validator.isInt(_id)){
								ApiFHIR.get('serviceType	', {"apikey": apikey, "_id": _id}, {}, function(error, response, body){
									if(error){
									  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getServiceType	"});
									  }else{
									  	//cek apakah ada error atau tidak
									  	var serviceType	 = JSON.parse(body); 
									  	
									  	//cek apakah ada error atau tidak
									  	if(serviceType	.err_code == 0){
										  	//cek jumdata dulu
										  	if(serviceType	.data.length > 0){
										  		res.json({"err_code": 0, "data":serviceType	.data});
										  	}else{
									  			res.json({"err_code": 2, "err_msg": "Service Type is not found"});	
										  	}
									  	}else{
									  		res.json({"err_code": 3, "err_msg": serviceType	.error, "application": "Api FHIR", "function": "getServiceType	"});
									  	}
									  }
								})
							}else{
								res.json({"err_code": 4, "err_msg": "Id must be a number."});
							}
							
						}
					}else{
						result.err_code = 500;
						res.json(result);
					}	
				});
			},
			serviceTypeCode: function getServiceTypeCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var code = req.params.code.replace(/[^\w\s ,]/gi, '').trim().toLowerCase();

				if(code == "" || typeof code == 'undefined'){
					res.json({"err_code": 4, "err_msg": "Code is required."});
				}else{
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){	
							ApiFHIR.get('serviceTypeCode', {"apikey": apikey, "code": code}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getServiceType	"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var serviceType	 = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(serviceType	.err_code == 0){
									  	//cek jumdata dulu
									  	if(serviceType	.data.length > 0){
									  		res.json({"err_code": 0, "data":serviceType	.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Service Type Code is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": serviceType	.error, "application": "Api FHIR", "function": "getServiceTypeCode"});
								  	}
								  }
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}				
			},
			serviceProvisionConditions: function getServiceProvisionConditions(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;
				checkApikey(apikey, ipAddres, function(result){
					if(result.err_code == 0){
						if(_id == "" || typeof _id == 'undefined'){
							//method, endpoint, params, options, callback
							ApiFHIR.get('serviceProvisionConditions', {"apikey": apikey, "_id": 0}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getServiceProvisionConditions"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var serviceProvisionConditions = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(serviceProvisionConditions.err_code == 0){
									  	//cek jumdata dulu
									  	if(serviceProvisionConditions.data.length > 0){
									  		res.json({"err_code": 0, "data":serviceProvisionConditions.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Service Provision Conditions is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": serviceProvisionConditions.error, "application": "Api FHIR", "function": "getServiceProvisionConditions"});
								  	}
								  }
							})	
						}else{
							if(validator.isInt(_id)){
								ApiFHIR.get('serviceProvisionConditions', {"apikey": apikey, "_id": _id}, {}, function(error, response, body){
									if(error){
									  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getServiceProvisionConditions"});
									  }else{
									  	//cek apakah ada error atau tidak
									  	var serviceProvisionConditions = JSON.parse(body); 
									  	
									  	//cek apakah ada error atau tidak
									  	if(serviceProvisionConditions.err_code == 0){
										  	//cek jumdata dulu
										  	if(serviceProvisionConditions.data.length > 0){
										  		res.json({"err_code": 0, "data":serviceProvisionConditions.data});
										  	}else{
									  			res.json({"err_code": 2, "err_msg": "Service Provision Conditions is not found"});	
										  	}
									  	}else{
									  		res.json({"err_code": 3, "err_msg": serviceProvisionConditions.error, "application": "Api FHIR", "function": "getServiceProvisionConditions"});
									  	}
									  }
								})
							}else{
								res.json({"err_code": 4, "err_msg": "Id must be a number."});
							}
							
						}
					}else{
						result.err_code = 500;
						res.json(result);
					}	
				});
			},
			serviceProvisionConditionsCode: function getServiceProvisionConditionsCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var code = req.params.code.replace(/[^\w\s ,]/gi, '').trim().toLowerCase();

				if(code == "" || typeof code == 'undefined'){
					res.json({"err_code": 4, "err_msg": "Code is required."});
				}else{
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){	
							ApiFHIR.get('serviceProvisionConditionsCode', {"apikey": apikey, "code": code}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getServiceProvisionConditions"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var serviceProvisionConditions = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(serviceProvisionConditions.err_code == 0){
									  	//cek jumdata dulu
									  	if(serviceProvisionConditions.data.length > 0){
									  		res.json({"err_code": 0, "data":serviceProvisionConditions.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Service Provision Conditions Code is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": serviceProvisionConditions.error, "application": "Api FHIR", "function": "getServiceProvisionConditionsCode"});
								  	}
								  }
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}				
			},
			serviceReferralMethod: function getServiceReferralMethod(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;
				checkApikey(apikey, ipAddres, function(result){
					if(result.err_code == 0){
						if(_id == "" || typeof _id == 'undefined'){
							//method, endpoint, params, options, callback
							ApiFHIR.get('serviceReferralMethod', {"apikey": apikey, "_id": 0}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getServiceReferralMethod"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var serviceReferralMethod = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(serviceReferralMethod.err_code == 0){
									  	//cek jumdata dulu
									  	if(serviceReferralMethod.data.length > 0){
									  		res.json({"err_code": 0, "data":serviceReferralMethod.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Service Category is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": serviceReferralMethod.error, "application": "Api FHIR", "function": "getServiceReferralMethod"});
								  	}
								  }
							})	
						}else{
							if(validator.isInt(_id)){
								ApiFHIR.get('serviceReferralMethod', {"apikey": apikey, "_id": _id}, {}, function(error, response, body){
									if(error){
									  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getServiceReferralMethod"});
									  }else{
									  	//cek apakah ada error atau tidak
									  	var serviceReferralMethod = JSON.parse(body); 
									  	
									  	//cek apakah ada error atau tidak
									  	if(serviceReferralMethod.err_code == 0){
										  	//cek jumdata dulu
										  	if(serviceReferralMethod.data.length > 0){
										  		res.json({"err_code": 0, "data":serviceReferralMethod.data});
										  	}else{
									  			res.json({"err_code": 2, "err_msg": "Service Category is not found"});	
										  	}
									  	}else{
									  		res.json({"err_code": 3, "err_msg": serviceReferralMethod.error, "application": "Api FHIR", "function": "getServiceReferralMethod"});
									  	}
									  }
								})
							}else{
								res.json({"err_code": 4, "err_msg": "Id must be a number."});
							}
							
						}
					}else{
						result.err_code = 500;
						res.json(result);
					}	
				});
			},
			serviceReferralMethodCode: function getServiceReferralMethodCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var code = req.params.code.replace(/[^\w\s ,]/gi, '').trim().toLowerCase();

				if(code == "" || typeof code == 'undefined'){
					res.json({"err_code": 4, "err_msg": "Code is required."});
				}else{
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){	
							ApiFHIR.get('serviceReferralMethodCode', {"apikey": apikey, "code": code}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getServiceReferralMethod"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var serviceReferralMethod = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(serviceReferralMethod.err_code == 0){
									  	//cek jumdata dulu
									  	if(serviceReferralMethod.data.length > 0){
									  		res.json({"err_code": 0, "data":serviceReferralMethod.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "Service Category Code is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": serviceReferralMethod.error, "application": "Api FHIR", "function": "getServiceReferralMethodCode"});
								  	}
								  }
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}				
			},
			endpointStatus: function getEndpointStatus(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;
				checkApikey(apikey, ipAddres, function(result){
					if(result.err_code == 0){
						if(_id == "" || typeof _id == 'undefined'){
							//method, endpoint, params, options, callback
							ApiFHIR.get('endpointStatus', {"apikey": apikey, "_id": 0}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getEndpointStatus"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var endpointStatus = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(endpointStatus.err_code == 0){
									  	//cek jumdata dulu
									  	if(endpointStatus.data.length > 0){
									  		res.json({"err_code": 0, "data":endpointStatus.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "End Point Status is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": endpointStatus.error, "application": "Api FHIR", "function": "getEndpointStatus"});
								  	}
								  }
							})	
						}else{
							if(validator.isInt(_id)){
								ApiFHIR.get('endpointStatus', {"apikey": apikey, "_id": _id}, {}, function(error, response, body){
									if(error){
									  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getEndpointStatus"});
									  }else{
									  	//cek apakah ada error atau tidak
									  	var endpointStatus = JSON.parse(body); 
									  	
									  	//cek apakah ada error atau tidak
									  	if(endpointStatus.err_code == 0){
										  	//cek jumdata dulu
										  	if(endpointStatus.data.length > 0){
										  		res.json({"err_code": 0, "data":endpointStatus.data});
										  	}else{
									  			res.json({"err_code": 2, "err_msg": "End Point Status is not found"});	
										  	}
									  	}else{
									  		res.json({"err_code": 3, "err_msg": endpointStatus.error, "application": "Api FHIR", "function": "getEndpointStatus"});
									  	}
									  }
								})
							}else{
								res.json({"err_code": 4, "err_msg": "Id must be a number."});
							}
							
						}
					}else{
						result.err_code = 500;
						res.json(result);
					}	
				});
			},
			endpointStatusCode: function getEndpointStatusCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var code = req.params.code.replace(/[^\w\s ,]/gi, '').trim().toLowerCase();

				if(code == "" || typeof code == 'undefined'){
					res.json({"err_code": 4, "err_msg": "Code is required."});
				}else{
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){	
							ApiFHIR.get('endpointStatusCode', {"apikey": apikey, "code": code}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getEndpointStatus"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var endpointStatus = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(endpointStatus.err_code == 0){
									  	//cek jumdata dulu
									  	if(endpointStatus.data.length > 0){
									  		res.json({"err_code": 0, "data":endpointStatus.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "End Point Status Code is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": endpointStatus.error, "application": "Api FHIR", "function": "getEndpointStatusCode"});
								  	}
								  }
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}				
			},
			endpointConnectionType: function getEndpointConnectionType(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;
				checkApikey(apikey, ipAddres, function(result){
					if(result.err_code == 0){
						if(_id == "" || typeof _id == 'undefined'){
							//method, endpoint, params, options, callback
							ApiFHIR.get('endpointConnectionType', {"apikey": apikey, "_id": 0}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getEndpointConnectionType"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var endpointConnectionType = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(endpointConnectionType.err_code == 0){
									  	//cek jumdata dulu
									  	if(endpointConnectionType.data.length > 0){
									  		res.json({"err_code": 0, "data":endpointConnectionType.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "End Point Connection Type is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": endpointConnectionType.error, "application": "Api FHIR", "function": "getEndpointConnectionType"});
								  	}
								  }
							})	
						}else{
							if(validator.isInt(_id)){
								ApiFHIR.get('endpointConnectionType', {"apikey": apikey, "_id": _id}, {}, function(error, response, body){
									if(error){
									  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getEndpointConnectionType"});
									  }else{
									  	//cek apakah ada error atau tidak
									  	var endpointConnectionType = JSON.parse(body); 
									  	
									  	//cek apakah ada error atau tidak
									  	if(endpointConnectionType.err_code == 0){
										  	//cek jumdata dulu
										  	if(endpointConnectionType.data.length > 0){
										  		res.json({"err_code": 0, "data":endpointConnectionType.data});
										  	}else{
									  			res.json({"err_code": 2, "err_msg": "End Point Connection Type is not found"});	
										  	}
									  	}else{
									  		res.json({"err_code": 3, "err_msg": endpointConnectionType.error, "application": "Api FHIR", "function": "getEndpointConnectionType"});
									  	}
									  }
								})
							}else{
								res.json({"err_code": 4, "err_msg": "Id must be a number."});
							}
							
						}
					}else{
						result.err_code = 500;
						res.json(result);
					}	
				});
			},
			endpointConnectionTypeCode: function getEndpointConnectionTypeCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var code = req.params.code.replace(/[^\w\s ,]/gi, '').trim().toLowerCase();

				if(code == "" || typeof code == 'undefined'){
					res.json({"err_code": 4, "err_msg": "Code is required."});
				}else{
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){	
							ApiFHIR.get('endpointConnectionTypeCode', {"apikey": apikey, "code": code}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getEndpointConnectionType"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var endpointConnectionType = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(endpointConnectionType.err_code == 0){
									  	//cek jumdata dulu
									  	if(endpointConnectionType.data.length > 0){
									  		res.json({"err_code": 0, "data":endpointConnectionType.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "End Point Connection Type Code is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": endpointConnectionType.error, "application": "Api FHIR", "function": "getEndpointConnectionTypeCode"});
								  	}
								  }
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}				
			},
			endpointPayloadType: function getEndpointPayloadType(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;
				checkApikey(apikey, ipAddres, function(result){
					if(result.err_code == 0){
						if(_id == "" || typeof _id == 'undefined'){
							//method, endpoint, params, options, callback
							ApiFHIR.get('endpointPayloadType', {"apikey": apikey, "_id": 0}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getEndpointPayloadType"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var endpointPayloadType = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(endpointPayloadType.err_code == 0){
									  	//cek jumdata dulu
									  	if(endpointPayloadType.data.length > 0){
									  		res.json({"err_code": 0, "data":endpointPayloadType.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "End Point Status is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": endpointPayloadType.error, "application": "Api FHIR", "function": "getEndpointPayloadType"});
								  	}
								  }
							})	
						}else{
							if(validator.isInt(_id)){
								ApiFHIR.get('endpointPayloadType', {"apikey": apikey, "_id": _id}, {}, function(error, response, body){
									if(error){
									  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getEndpointPayloadType"});
									  }else{
									  	//cek apakah ada error atau tidak
									  	var endpointPayloadType = JSON.parse(body); 
									  	
									  	//cek apakah ada error atau tidak
									  	if(endpointPayloadType.err_code == 0){
										  	//cek jumdata dulu
										  	if(endpointPayloadType.data.length > 0){
										  		res.json({"err_code": 0, "data":endpointPayloadType.data});
										  	}else{
									  			res.json({"err_code": 2, "err_msg": "End Point Status is not found"});	
										  	}
									  	}else{
									  		res.json({"err_code": 3, "err_msg": endpointPayloadType.error, "application": "Api FHIR", "function": "getEndpointPayloadType"});
									  	}
									  }
								})
							}else{
								res.json({"err_code": 4, "err_msg": "Id must be a number."});
							}
							
						}
					}else{
						result.err_code = 500;
						res.json(result);
					}	
				});
			},
			endpointPayloadTypeCode: function getEndpointPayloadTypeCode(req, res){
				var ipAddres = req.Payload.remoteAddress;
				var apikey = req.params.apikey;
				var code = req.params.code.replace(/[^\w\s ,]/gi, '').trim().toLowerCase();

				if(code == "" || typeof code == 'undefined'){
					res.json({"err_code": 4, "err_msg": "Code is required."});
				}else{
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){	
							ApiFHIR.get('endpointPayloadTypeCode', {"apikey": apikey, "code": code}, {}, function(error, response, body){
								if(error){
								  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "getEndpointPayloadType"});
								  }else{
								  	//cek apakah ada error atau tidak
								  	var endpointPayloadType = JSON.parse(body); 
								  	
								  	//cek apakah ada error atau tidak
								  	if(endpointPayloadType.err_code == 0){
									  	//cek jumdata dulu
									  	if(endpointPayloadType.data.length > 0){
									  		res.json({"err_code": 0, "data":endpointPayloadType.data});
									  	}else{
								  			res.json({"err_code": 2, "err_msg": "End Point Status Code is not found"});	
									  	}
								  	}else{
								  		res.json({"err_code": 3, "err_msg": endpointPayloadType.error, "application": "Api FHIR", "function": "getEndpointPayloadTypeCode"});
								  	}
								  }
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}				
			}
		},
		post: {
			identityAssuranceLevel: function addIdentityAssuranceLevel(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				
				var code = req.body.code.trim().toLowerCase();
				var display = req.body.display;
				var definition = req.body.definition.replace(/[^\w\s ,]/gi, '');
				
				var err_code = 0;
				var err_msg = '';
				
				//input checking
				if(validator.isEmpty(code)){
					err_code = 1;
					err_msg = "Code is required";
				}

				if(validator.isEmpty(display)){
					err_code = 2;
					err_msg = "Display is required";
				}

				if(validator.isEmpty(definition)){
					err_code = 3;
					err_msg = "Definition is required";
				}

				if(err_code == 0){
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){
							checkCode(apikey, code, 'IDENTITY_ASSURANCE_LEVEL', function(resultCode){
								if(resultCode.err_code == 0){
									//susun body
									var dataAssuranceLevel = {
																"code": code,	
																"display": display,
																"definition": definition
															};
									
									//method, endpoint, params, options, callback
									ApiFHIR.post('identityAssuranceLevel', {"apikey": apikey}, {body: dataAssuranceLevel, json:true}, function(error, response, body){
										if(error){
										  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "addIdentityAssuranceLevel"});
										  }else{
										  	//cek apakah ada error atau tidak
										  	var assuranceLevel = body; //object
										  	//cek apakah ada error atau tidak
										  	if(assuranceLevel.err_code == 0){  	
										  		res.json({"err_code": 0, "err_msg": "Identity assurance level has been add.", "data":assuranceLevel.data});
										  	}else{
										  		res.json({"err_code": 3, "err_msg": assuranceLevel.error, "application": "Api FHIR", "function": "addIdentityAssuranceLevel"});
										  	}
										  }
									})
								}else{
									res.json(resultCode);
								}
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}else{
					res.json({"err_code": err_code, "err_msg": err_msg});
				}
			},
			administrativeGender: function addAdministrativeGender(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				
				var code = req.body.code.trim().toLowerCase();
				var display = req.body.display;
				var definition = req.body.definition.replace(/[^\w\s ,]/gi, '');
				
				var err_code = 0;
				var err_msg = '';
				
				//input checking
				if(validator.isEmpty(code)){
					err_code = 1;
					err_msg = "Code is required";
				}

				if(validator.isEmpty(display)){
					err_code = 2;
					err_msg = "Display is required";
				}

				if(validator.isEmpty(definition)){
					err_code = 3;
					err_msg = "Definition is required";
				}

				if(err_code == 0){
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){
							checkCode(apikey, code, 'ADMINISTRATIVE_GENDER', function(resultCode){
								if(resultCode.err_code == 0){
									//susun body
									var dataAdministrativeGender = {
																"code": code,	
																"display": display,
																"definition": definition
															};
									
									//method, endpoint, params, options, callback
									ApiFHIR.post('administrativeGender', {"apikey": apikey}, {body: dataAdministrativeGender, json:true}, function(error, response, body){
										if(error){
										  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "addAdministrativeGender"});
										  }else{
										  	//cek apakah ada error atau tidak
										  	var administrativeGender = body; //object
										  	//cek apakah ada error atau tidak
										  	if(administrativeGender.err_code == 0){  	
										  		res.json({"err_code": 0, "err_msg": "Administrative Gender has been add.", "data":administrativeGender.data});
										  	}else{
										  		res.json({"err_code": 3, "err_msg": administrativeGender.error, "application": "Api FHIR", "function": "addAdministrativeGender"});
										  	}
										  }
									})
								}else{
									res.json(resultCode);
								}
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}else{
					res.json({"err_code": err_code, "err_msg": err_msg});
				}
			},
			maritalStatus: function addMaritalStatus(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				
				var code = req.body.code.trim().toUpperCase();
				var display = req.body.display;
				var definition = req.body.definition.replace(/[^\w\s ,]/gi, '');
				
				if(code == 'UNK'){
					var maritalSystem = host + ':' + port + '/' + apikey + '/null-flavor';	
				}else{
					var maritalSystem = host + ':' + port + '/' + apikey + '/marital-status';
				}
				

				var err_code = 0;
				var err_msg = '';
				
				//input checking
				if(validator.isEmpty(code)){
					err_code = 1;
					err_msg = "Code is required";
				}

				if(validator.isEmpty(display)){
					err_code = 2;
					err_msg = "Display is required";
				}

				if(validator.isEmpty(definition)){
					err_code = 3;
					err_msg = "Definition is required";
				}

				if(err_code == 0){
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){
							checkCode(apikey, code, 'MARITAL_STATUS', function(resultCode){
								if(resultCode.err_code == 0){
									//susun body
									var dataMaritalStatus = {
																"code": code,	
																"display": display,
																"definition": definition,
																"system": maritalSystem
															};
									
									//method, endpoint, params, options, callback
									ApiFHIR.post('maritalStatus', {"apikey": apikey}, {body: dataMaritalStatus, json:true}, function(error, response, body){
										if(error){
										  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "addMaritalStatus"});
										  }else{
										  	//cek apakah ada error atau tidak
										  	var maritalStatus = body; //object
										  	//cek apakah ada error atau tidak
										  	if(maritalStatus.err_code == 0){
											  	res.json({"err_code": 0, "err_msg": "Marital Status has been add.", "data":maritalStatus.data});
										  	}else{
										  		res.json({"err_code": 3, "err_msg": maritalStatus.error, "application": "Api FHIR", "function": "addMaritalStatus"});
										  	}
										  }
									})
								}else{
									res.json(resultCode);
								}
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}else{
					res.json({"err_code": err_code, "err_msg": err_msg});
				}
			},
			contactRole: function addContactRole(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				
				var code = req.body.code.trim().toUpperCase();
				var description = req.body.description.replace(/[^\w\s ,]/gi, '');

				var err_code = 0;
				var err_msg = '';
				
				//input checking
				if(validator.isEmpty(code)){
					err_code = 1;
					err_msg = "Code is required";
				}

				if(validator.isEmpty(description)){
					err_code = 3;
					err_msg = "Description is required";
				}

				if(err_code == 0){
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){
							checkCode(apikey, code, 'CONTACT_ROLE', function(resultCode){
								if(resultCode.err_code == 0){
									//susun body
									var dataContactRole = {
																"code": code,	
																"description": description
															};
									
									//method, endpoint, params, options, callback
									ApiFHIR.post('contactRole', {"apikey": apikey}, {body: dataContactRole, json:true}, function(error, response, body){
										if(error){
										  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "addContactRole"});
										  }else{
										  	//cek apakah ada error atau tidak
										  	var contactRole = body; //object
										  	//cek apakah ada error atau tidak
										  	if(contactRole.err_code == 0){
											  	res.json({"err_code": 0, "err_msg": "Contact Role has been add.", "data":contactRole.data});
										  	}else{
										  		res.json({"err_code": 3, "err_msg": contactRole.error, "application": "Api FHIR", "function": "addContactRole"});
										  	}
										  }
									})
								}else{
									res.json(resultCode);
								}
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}else{
					res.json({"err_code": err_code, "err_msg": err_msg});
				}
			},
			animalSpecies: function addAnimalSpecies(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				
				var code = req.body.code.trim();
				var display = req.body.display.replace(/[^\w\s ,]/gi, '');

				var err_code = 0;
				var err_msg = '';
				
				//input checking
				if(validator.isEmpty(code)){
					err_code = 1;
					err_msg = "Code is required";
				}

				if(validator.isEmpty(display)){
					err_code = 3;
					err_msg = "Display is required";
				}

				if(err_code == 0){
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){
							checkCode(apikey, code, 'ANIMAL_SPECIES', function(resultCode){
								if(resultCode.err_code == 0){
									//susun body
									var dataAnimalSpecies = {
																"code": code,	
																"display": display
															};
									
									//method, endpoint, params, options, callback
									ApiFHIR.post('animalSpecies', {"apikey": apikey}, {body: dataAnimalSpecies, json:true}, function(error, response, body){
										if(error){
										  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "addAnimalSpecies"});
										  }else{
										  	//cek apakah ada error atau tidak
										  	var animalSpecies = body; //object
										  	//cek apakah ada error atau tidak
										  	if(animalSpecies.err_code == 0){
											  	res.json({"err_code": 0, "err_msg": "Animal Species has been add.", "data":animalSpecies.data});
										  	}else{
										  		res.json({"err_code": 3, "err_msg": animalSpecies.error, "application": "Api FHIR", "function": "addAnimalSpecies"});
										  	}
										  }
									})
								}else{
									res.json(resultCode);
								}
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}else{
					res.json({"err_code": err_code, "err_msg": err_msg});
				}
			},
			animalBreeds: function addAnimalBreeds(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				
				var code = req.body.code.trim();
				var display = req.body.display.replace(/[^\w\s ,]/gi, '');

				var err_code = 0;
				var err_msg = '';
				
				//input checking
				if(validator.isEmpty(code)){
					err_code = 1;
					err_msg = "Code is required";
				}

				if(validator.isEmpty(display)){
					err_code = 3;
					err_msg = "Display is required";
				}

				if(err_code == 0){
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){
							checkCode(apikey, code, 'ANIMAL_BREEDS', function(resultCode){
								if(resultCode.err_code == 0){
									//susun body
									var dataAnimalBreeds = {
																"code": code,	
																"display": display
															};
									
									//method, endpoint, params, options, callback
									ApiFHIR.post('animalBreeds', {"apikey": apikey}, {body: dataAnimalBreeds, json:true}, function(error, response, body){
										if(error){
										  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "addAnimalBreeds"});
										  }else{
										  	//cek apakah ada error atau tidak
										  	var animalBreeds = body; //object
										  	//cek apakah ada error atau tidak
										  	if(animalBreeds.err_code == 0){
											  	res.json({"err_code": 0, "err_msg": "Animal Breeds has been add.", "data":animalBreeds.data});
										  	}else{
										  		res.json({"err_code": 3, "err_msg": animalBreeds.error, "application": "Api FHIR", "function": "addAnimalBreeds"});
										  	}
										  }
									})
								}else{
									res.json(resultCode);
								}
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}else{
					res.json({"err_code": err_code, "err_msg": err_msg});
				}
			},
			animalGenderStatus: function addAnimalGenderStatus(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				
				var code = req.body.code.trim().toLowerCase();
				var display = req.body.display;
				var definition = req.body.definition.replace(/[^\w\s ,]/gi, '');

				var err_code = 0;
				var err_msg = '';
				
				//input checking
				if(validator.isEmpty(code)){
					err_code = 1;
					err_msg = "Code is required";
				}

				if(validator.isEmpty(display)){
					err_code = 2;
					err_msg = "Display is required";
				}

				if(validator.isEmpty(definition)){
					err_code = 3;
					err_msg = "Definition is required";
				}

				if(err_code == 0){
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){
							checkCode(apikey, code, 'ANIMAL_GENDER_STATUS', function(resultCode){
								if(resultCode.err_code == 0){
									//susun body
									var dataAnimalGenderStatus = {
																"code": code,	
																"display": display,
																"definition": definition
															};
									
									//method, endpoint, params, options, callback
									ApiFHIR.post('animalGenderStatus', {"apikey": apikey}, {body: dataAnimalGenderStatus, json:true}, function(error, response, body){
										if(error){
										  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "addAnimalGenderStatus"});
										  }else{
										  	//cek apakah ada error atau tidak
										  	var animalGenderStatus = body; //object
										  	//cek apakah ada error atau tidak
										  	if(animalGenderStatus.err_code == 0){
											  	res.json({"err_code": 0, "err_msg": "Animal Gender Status has been add.", "data":animalGenderStatus.data});
										  	}else{
										  		res.json({"err_code": 3, "err_msg": animalGenderStatus.error, "application": "Api FHIR", "function": "addAnimalGenderStatus"});
										  	}
										  }
									})
								}else{
									res.json(resultCode);
								}
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}else{
					res.json({"err_code": err_code, "err_msg": err_msg});
				}
			},
			languages: function addLanguages(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				
				var code = req.body.code.trim();
				var display = req.body.display;
				
				var err_code = 0;
				var err_msg = '';
				
				//input checking
				if(validator.isEmpty(code)){
					err_code = 1;
					err_msg = "Code is required";
				}

				if(validator.isEmpty(display)){
					err_code = 2;
					err_msg = "Display is required";
				}

				if(err_code == 0){
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){
							checkCode(apikey, code, 'LANGUAGES', function(resultCode){
								if(resultCode.err_code == 0){
									//susun body
									var dataLanguages = {
															"code": code,	
															"display": display
														};
									
									//method, endpoint, params, options, callback
									ApiFHIR.post('languages', {"apikey": apikey}, {body: dataLanguages, json:true}, function(error, response, body){
										if(error){
										  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "addLanguages"});
										  }else{
										  	//cek apakah ada error atau tidak
										  	var languages = body; //object
										  	//cek apakah ada error atau tidak
										  	if(languages.err_code == 0){
											  	res.json({"err_code": 0, "err_msg": "Language has been add.", "data":languages.data});
										  	}else{
										  		res.json({"err_code": 3, "err_msg": languages.error, "application": "Api FHIR", "function": "addLanguages"});
										  	}
										  }
									})
								}else{
									res.json(resultCode);
								}
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}else{
					res.json({"err_code": err_code, "err_msg": err_msg});
				}
			},
			linkType: function addLinkType(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				
				var code = req.body.code.trim().toLowerCase();
				var display = req.body.display;
				var definition = req.body.definition;
				
				var err_code = 0;
				var err_msg = '';
				
				//input checking
				if(validator.isEmpty(code)){
					err_code = 1;
					err_msg = "Code is required";
				}

				if(validator.isEmpty(display)){
					err_code = 2;
					err_msg = "Display is required";
				}

				if(validator.isEmpty(definition)){
					err_code = 2;
					err_msg = "Definition is required";
				}

				if(err_code == 0){
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){
							checkCode(apikey, code, 'LINK_TYPE', function(resultCode){
								if(resultCode.err_code == 0){
									//susun body
									var dataLinkType = {
															"code": code,	
															"display": display,
															"definition": definition
														};
									
									//method, endpoint, params, options, callback
									ApiFHIR.post('linkType', {"apikey": apikey}, {body: dataLinkType, json:true}, function(error, response, body){
										if(error){
										  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "addLinkType"});
										  }else{
										  	//cek apakah ada error atau tidak
										  	var linkType = body; //object
										  	//cek apakah ada error atau tidak
										  	if(linkType.err_code == 0){
											  	res.json({"err_code": 0, "err_msg": "Link Type has been add.", "data":linkType.data});
										  	}else{
										  		res.json({"err_code": 3, "err_msg": linkType.error, "application": "Api FHIR", "function": "addLinkType"});
										  	}
										  }
									})
								}else{
									res.json(resultCode);
								}
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}else{
					res.json({"err_code": err_code, "err_msg": err_msg});
				}
			},
			relatedPersonRelationshipType: function addRelatedPersonRelationshipType(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				
				var code = req.body.code.trim().toUpperCase();
				var display = req.body.display;
				var system  = host + ':' + port + '/' + apikey + '/relatedperson-relationshiptype';
				var err_code = 0;
				var err_msg = '';
				
				//input checking
				if(validator.isEmpty(code)){
					err_code = 1;
					err_msg = "Code is required";
				}

				if(validator.isEmpty(display)){
					err_code = 2;
					err_msg = "Display is required";
				}

				if(typeof req.body.definition !== 'undefined'){
					definition = req.body.definition.replace(/[^\w\s , ( )]/gi, '');
				}else{
					definition = "";
				}

				if(err_code == 0){
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){
							checkCode(apikey, code, 'RELATEDPERSON_RELATIONSHIPTYPE', function(resultCode){
								if(resultCode.err_code == 0){
									//susun body
									var dataRelatedPersonRelationshipType = {
															"code": code,	
															"system": system,
															"display": display,
															"definition": definition
														};
									
									//method, endpoint, params, options, callback
									ApiFHIR.post('relatedPersonRelationshipType', {"apikey": apikey}, {body: dataRelatedPersonRelationshipType, json:true}, function(error, response, body){
										if(error){
										  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "addRelatedPersonRelationshipType"});
										  }else{
										  	//cek apakah ada error atau tidak
										  	var relatedPersonRelationshipType = body; //object
										  	//cek apakah ada error atau tidak
										  	if(relatedPersonRelationshipType.err_code == 0){
											  	res.json({"err_code": 0, "err_msg": "Related Person Relationship Type has been add.", "data":relatedPersonRelationshipType.data});
										  	}else{
										  		res.json({"err_code": 3, "err_msg": relatedPersonRelationshipType.error, "application": "Api FHIR", "function": "addRelatedPersonRelationshipType"});
										  	}
										  }
									})
								}else{
									res.json(resultCode);
								}
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}else{
					res.json({"err_code": err_code, "err_msg": err_msg});
				}
			},
			groupType: function addGroupType(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				
				var code = req.body.code.trim().toLowerCase();
				var display = req.body.display;
				var definition = req.body.definition;

				var err_code = 0;
				var err_msg = '';
				
				//input checking
				if(validator.isEmpty(code)){
					err_code = 1;
					err_msg = "Code is required";
				}

				if(validator.isEmpty(display)){
					err_code = 2;
					err_msg = "Display is required";
				}

				if(validator.isEmpty(definition)){
					err_code = 2;
					err_msg = "Definition is required";
				}

				if(err_code == 0){
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){
							checkCode(apikey, code, 'GROUP_TYPE', function(resultCode){
								if(resultCode.err_code == 0){
									//susun body
									var dataGroupType = {
															"code": code,	
															"display": display,
															"definition": definition
														};
									
									//method, endpoint, params, options, callback
									ApiFHIR.post('groupType', {"apikey": apikey}, {body: dataGroupType, json:true}, function(error, response, body){
										if(error){
										  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "addGroupType"});
										  }else{
										  	//cek apakah ada error atau tidak
										  	var groupType = body; //object
										  	//cek apakah ada error atau tidak
										  	if(groupType.err_code == 0){
											  	res.json({"err_code": 0, "err_msg": "Group Type has been add.", "data":groupType.data});
										  	}else{
										  		res.json({"err_code": 3, "err_msg": groupType.error, "application": "Api FHIR", "function": "addGroupType"});
										  	}
										  }
									})
								}else{
									res.json(resultCode);
								}
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}else{
					res.json({"err_code": err_code, "err_msg": err_msg});
				}
			},
			identifierUse: function addIdentifierUse(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				
				var code = req.body.code.trim().toLowerCase();
				var display = req.body.display.replace(/[^\w\s , ( )]/gi, '');;
				var definition = req.body.definition.replace(/[^\w\s , ( )]/gi, '');

				var err_code = 0;
				var err_msg = '';
				
				//input checking
				if(validator.isEmpty(code)){
					err_code = 1;
					err_msg = "Code is required";
				}

				if(validator.isEmpty(display)){
					err_code = 2;
					err_msg = "Display is required";
				}

				if(validator.isEmpty(definition)){
					err_code = 2;
					err_msg = "Definition is required";
				}

				if(err_code == 0){
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){
							checkCode(apikey, code, 'IDENTIFIER_USE', function(resultCode){
								if(resultCode.err_code == 0){
									//susun body
									var dataIdentifierUse = {
															"code": code,	
															"display": display,
															"definition": definition
														};
									
									//method, endpoint, params, options, callback
									ApiFHIR.post('identifierUse', {"apikey": apikey}, {body: dataIdentifierUse, json:true}, function(error, response, body){
										if(error){
										  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "addIdentifierUse"});
										  }else{
										  	//cek apakah ada error atau tidak
										  	var identifierUse = body; //object
										  	//cek apakah ada error atau tidak
										  	if(identifierUse.err_code == 0){
											  	res.json({"err_code": 0, "err_msg": "Identifier Use has been add.", "data":identifierUse.data});
										  	}else{
										  		res.json({"err_code": 3, "err_msg": identifierUse.error, "application": "Api FHIR", "function": "addIdentifierUse"});
										  	}
										  }
									})
								}else{
									res.json(resultCode);
								}
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}else{
					res.json({"err_code": err_code, "err_msg": err_msg});
				}
			},
			identifierType: function addIdentifierType(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				
				var code = req.body.code.trim().toUpperCase();
				var display = req.body.display.replace(/[^\w\s , ( )]/gi, '');;
				
				var err_code = 0;
				var err_msg = '';
				
				//input checking
				if(validator.isEmpty(code)){
					err_code = 1;
					err_msg = "Code is required";
				}

				if(validator.isEmpty(display)){
					err_code = 2;
					err_msg = "Display is required";
				}

				if(err_code == 0){
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){
							checkCode(apikey, code, 'IDENTIFIER_TYPE', function(resultCode){
								if(resultCode.err_code == 0){
									//susun body
									var dataIdentifierType = {
															"code": code,	
															"display": display
														};
									
									//method, endpoint, params, options, callback
									ApiFHIR.post('identifierType', {"apikey": apikey}, {body: dataIdentifierType, json:true}, function(error, response, body){
										if(error){
										  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "addIdentifierType"});
										  }else{
										  	//cek apakah ada error atau tidak
										  	var identifierType = body; //object
										  	//cek apakah ada error atau tidak
										  	if(identifierType.err_code == 0){
											  	res.json({"err_code": 0, "err_msg": "Identifier Type has been add.", "data":identifierType.data});
										  	}else{
										  		res.json({"err_code": 3, "err_msg": identifierType.error, "application": "Api FHIR", "function": "addIdentifierType"});
										  	}
										  }
									})
								}else{
									res.json(resultCode);
								}
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}else{
					res.json({"err_code": err_code, "err_msg": err_msg});
				}
			},
			nameUse: function addNameUse(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				
				var code = req.body.code.trim().toLowerCase();
				var display = req.body.display;
				var definition = req.body.definition.replace(/[^\w\s , ( ) /]/gi, '');
				
				var err_code = 0;
				var err_msg = '';
				
				//input checking
				if(validator.isEmpty(code)){
					err_code = 1;
					err_msg = "Code is required";
				}

				if(validator.isEmpty(display)){
					err_code = 2;
					err_msg = "Display is required";
				}

				if(validator.isEmpty(definition)){
					err_code = 2;
					err_msg = "Definition is required";
				}

				if(err_code == 0){
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){
							checkCode(apikey, code, 'NAME_USE', function(resultCode){
								if(resultCode.err_code == 0){
									//susun body
									var dataNameUse = {
														"code": code,	
														"display": display,
														"definition": definition
													};
								
									//method, endpoint, params, options, callback
									ApiFHIR.post('nameUse', {"apikey": apikey}, {body: dataNameUse, json:true}, function(error, response, body){
										if(error){
										  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "addNameUse"});
										  }else{
										  	//cek apakah ada error atau tidak
										  	var nameUse = body; //object
										  	//cek apakah ada error atau tidak
										  	if(nameUse.err_code == 0){
											  	res.json({"err_code": 0, "err_msg": "Name Use has been add.", "data":nameUse.data});
										  	}else{
										  		res.json({"err_code": 3, "err_msg": nameUse.error, "application": "Api FHIR", "function": "addNameUse"});
										  	}
										  }
									})
								}else{
									res.json(resultCode);
								}
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}else{
					res.json({"err_code": err_code, "err_msg": err_msg});
				}
			},
			contactPointSystem: function addContactPointSystem(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				
				var code = req.body.code.trim().toLowerCase();
				var display = req.body.display;
				var definition = req.body.definition.replace(/[^\w\s , ( ) /]/gi, '');
				
				var err_code = 0;
				var err_msg = '';
				
				//input checking
				if(validator.isEmpty(code)){
					err_code = 1;
					err_msg = "Code is required";
				}

				if(validator.isEmpty(display)){
					err_code = 2;
					err_msg = "Display is required";
				}

				if(validator.isEmpty(definition)){
					err_code = 2;
					err_msg = "Definition is required";
				}

				if(err_code == 0){
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){
							checkCode(apikey, code, 'CONTACT_POINT_SYSTEM', function(resultCode){
								if(resultCode.err_code == 0){
									//susun body
									var dataContactPointSystem = {
														"code": code,	
														"display": display,
														"definition": definition
													};
								
									//method, endpoint, params, options, callback
									ApiFHIR.post('contactPointSystem', {"apikey": apikey}, {body: dataContactPointSystem, json:true}, function(error, response, body){
										if(error){
										  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "addContactPointSystem"});
										  }else{
										  	//cek apakah ada error atau tidak
										  	var contactPointSystem = body; //object
										  	//cek apakah ada error atau tidak
										  	if(contactPointSystem.err_code == 0){
											  	res.json({"err_code": 0, "err_msg": "Contact Point System has been add.", "data":contactPointSystem.data});
										  	}else{
										  		res.json({"err_code": 3, "err_msg": contactPointSystem.error, "application": "Api FHIR", "function": "addContactPointSystem"});
										  	}
										  }
									})
								}else{
									res.json(resultCode);
								}
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}else{
					res.json({"err_code": err_code, "err_msg": err_msg});
				}
			},
			contactPointUse: function addContactPointUse(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				
				var code = req.body.code.trim().toLowerCase();
				var display = req.body.display;
				var definition = req.body.definition.replace(/[^\w\s , ( ) /]/gi, '');
				
				var err_code = 0;
				var err_msg = '';
				
				//input checking
				if(validator.isEmpty(code)){
					err_code = 1;
					err_msg = "Code is required";
				}

				if(validator.isEmpty(display)){
					err_code = 2;
					err_msg = "Display is required";
				}

				if(validator.isEmpty(definition)){
					err_code = 2;
					err_msg = "Definition is required";
				}

				if(err_code == 0){
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){
							checkCode(apikey, code, 'CONTACT_POINT_USE', function(resultCode){
								if(resultCode.err_code == 0){
									//susun body
									var dataContactPointUse = {
														"code": code,	
														"display": display,
														"definition": definition
													};
								
									//method, endpoint, params, options, callback
									ApiFHIR.post('contactPointUse', {"apikey": apikey}, {body: dataContactPointUse, json:true}, function(error, response, body){
										if(error){
										  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "addContactPointUse"});
										  }else{
										  	//cek apakah ada error atau tidak
										  	var contactPointUse = body; //object
										  	//cek apakah ada error atau tidak
										  	if(contactPointUse.err_code == 0){
											  	res.json({"err_code": 0, "err_msg": "Contact Point Use has been add.", "data":contactPointUse.data});
										  	}else{
										  		res.json({"err_code": 3, "err_msg": contactPointUse.error, "application": "Api FHIR", "function": "addContactPointUse"});
										  	}
										  }
									})
								}else{
									res.json(resultCode);
								}
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}else{
					res.json({"err_code": err_code, "err_msg": err_msg});
				}
			},
			addressUse: function addAddressUse(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				
				var code = req.body.code.trim().toLowerCase();
				var display = req.body.display;
				var definition = req.body.definition.replace(/[^\w\s , ( ) / .]/gi, '');
				
				var err_code = 0;
				var err_msg = '';
				
				//input checking
				if(validator.isEmpty(code)){
					err_code = 1;
					err_msg = "Code is required";
				}

				if(validator.isEmpty(display)){
					err_code = 2;
					err_msg = "Display is required";
				}

				if(validator.isEmpty(definition)){
					err_code = 2;
					err_msg = "Definition is required";
				}

				if(err_code == 0){
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){
							checkCode(apikey, code, 'ADDRESS_USE', function(resultCode){
								if(resultCode.err_code == 0){
									//susun body
									var dataAddressUse = {
														"code": code,	
														"display": display,
														"definition": definition
													};
								
									//method, endpoint, params, options, callback
									ApiFHIR.post('addressUse', {"apikey": apikey}, {body: dataAddressUse, json:true}, function(error, response, body){
										if(error){
										  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "addAddressUse"});
										  }else{
										  	//cek apakah ada error atau tidak
										  	var addressUse = body; //object
										  	//cek apakah ada error atau tidak
										  	if(addressUse.err_code == 0){
											  	res.json({"err_code": 0, "err_msg": "Address Use has been add.", "data":addressUse.data});
										  	}else{
										  		res.json({"err_code": 3, "err_msg": addressUse.error, "application": "Api FHIR", "function": "addAddressUse"});
										  	}
										  }
									})
								}else{
									res.json(resultCode);
								}
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}else{
					res.json({"err_code": err_code, "err_msg": err_msg});
				}
			},
			addressType: function addAddressType(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				
				var code = req.body.code.trim().toLowerCase();
				var display = req.body.display;
				var definition = req.body.definition.replace(/[^\w\s , ( ) / .]/gi, '');
				
				var err_code = 0;
				var err_msg = '';
				
				//input checking
				if(validator.isEmpty(code)){
					err_code = 1;
					err_msg = "Code is required";
				}

				if(validator.isEmpty(display)){
					err_code = 2;
					err_msg = "Display is required";
				}

				if(validator.isEmpty(definition)){
					err_code = 2;
					err_msg = "Definition is required";
				}

				if(err_code == 0){
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){
							checkCode(apikey, code, 'ADDRESS_TYPE', function(resultCode){
								if(resultCode.err_code == 0){
									//susun body
									var dataAddressType = {
														"code": code,	
														"display": display,
														"definition": definition
													};
								
									//method, endpoint, params, options, callback
									ApiFHIR.post('addressType', {"apikey": apikey}, {body: dataAddressType, json:true}, function(error, response, body){
										if(error){
										  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "addAddressType"});
										  }else{
										  	//cek apakah ada error atau tidak
										  	var addressType = body; //object
										  	//cek apakah ada error atau tidak
										  	if(addressType.err_code == 0){
											  	res.json({"err_code": 0, "err_msg": "Address Type has been add.", "data":addressType.data});
										  	}else{
										  		res.json({"err_code": 3, "err_msg": addressType.error, "application": "Api FHIR", "function": "addAddressType"});
										  	}
										  }
									})
								}else{
									res.json(resultCode);
								}
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}else{
					res.json({"err_code": err_code, "err_msg": err_msg});
				}
			},
			//post hcs add
			organizationType: function addOrganizationType(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				
				var code = req.body.code.trim().toLowerCase();
				var display = req.body.display;
				var definition = req.body.definition.replace(/[^\w\s , ( ) / .]/gi, '');
				
				var err_code = 0;
				var err_msg = '';
				
				//input checking
				if(validator.isEmpty(code)){
					err_code = 1;
					err_msg = "Code is required";
				}

				if(validator.isEmpty(display)){
					err_code = 2;
					err_msg = "Display is required";
				}

				if(validator.isEmpty(definition)){
					err_code = 2;
					err_msg = "Definition is required";
				}
				
				if(err_code == 0){
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){
							checkCode(apikey, code, 'ORGANIZATION_TYPE', function(resultCode){
								if(resultCode.err_code == 0){
									//susun body
									var dataOrganizationType = {
														"code": code,	
														"display": display,
														"definition": definition
													};
									console.log(dataOrganizationType);
									//method, endpoint, params, options, callback
									ApiFHIR.post('organizationType', {"apikey": apikey}, {body: dataOrganizationType, json:true}, function(error, response, body){
										if(error){
										  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "addOrganizationType"});
										  }else{
										  	//cek apakah ada error atau tidak
										  	var organizationType = body; //object
										  	//cek apakah ada error atau tidak
										  	if(organizationType.err_code == 0){
											  	res.json({"err_code": 0, "err_msg": "Organization Type has been add.", "data":organizationType.data});
										  	}else{
										  		res.json({"err_code": 3, "err_msg": organizationType.error, "application": "Api FHIR", "function": "addOrganizationType"});
										  	}
										  }
									})
								}else{
									res.json(resultCode);
								}
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}else{
					res.json({"err_code": err_code, "err_msg": err_msg});
				}
			},
			contactentityType: function addContactentityType(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				
				var code = req.body.code.trim().toLowerCase();
				var display = req.body.display;
				var definition = req.body.definition.replace(/[^\w\s , ( ) / .]/gi, '');
				
				var err_code = 0;
				var err_msg = '';
				
				//input checking
				if(validator.isEmpty(code)){
					err_code = 1;
					err_msg = "Code is required";
				}

				if(validator.isEmpty(display)){
					err_code = 2;
					err_msg = "Display is required";
				}

				if(validator.isEmpty(definition)){
					err_code = 2;
					err_msg = "Definition is required";
				}

				if(err_code == 0){
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){
							checkCode(apikey, code, 'CONTACT_ENTITY_TYPE', function(resultCode){
								if(resultCode.err_code == 0){
									//susun body
									var dataContactentityType = {
														"code": code,	
														"display": display,
														"definition": definition
													};
									console.log(dataContactentityType);
									//method, endpoint, params, options, callback
									ApiFHIR.post('contactentityType', {"apikey": apikey}, {body: dataContactentityType, json:true}, function(error, response, body){
										if(error){
										  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "addContactentityType"});
										  }else{
										  	//cek apakah ada error atau tidak
										  	var contactentityType = body; //object
										  	//cek apakah ada error atau tidak
												console.log(contactentityType);
										  	if(contactentityType.err_code == 0){
											  	res.json({"err_code": 0, "err_msg": "Contactentity Type has been add.", "data":contactentityType.data});
										  	}else{
										  		res.json({"err_code": 3, "err_msg": contactentityType.error, "application": "Api FHIR", "function": "addContactentityType"});
										  	}
										  }
									})
								}else{
									res.json(resultCode);
								}
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}else{
					res.json({"err_code": err_code, "err_msg": err_msg});
				}
			},
			locationStatus: function addLocationStatus(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				
				var code = req.body.code.trim().toLowerCase();
				var display = req.body.display;
				var definition = req.body.definition.replace(/[^\w\s , ( ) / .]/gi, '');
				
				var err_code = 0;
				var err_msg = '';
				
				//input checking
				if(validator.isEmpty(code)){
					err_code = 1;
					err_msg = "Code is required";
				}

				if(validator.isEmpty(display)){
					err_code = 2;
					err_msg = "Display is required";
				}

				if(validator.isEmpty(definition)){
					err_code = 2;
					err_msg = "Definition is required";
				}

				if(err_code == 0){
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){
							checkCode(apikey, code, 'LOCATION_STATUS', function(resultCode){
								if(resultCode.err_code == 0){
									//susun body
									var dataLocationStatus = {
														"code": code,	
														"display": display,
														"definition": definition
													};
								
									//method, endpoint, params, options, callback
									ApiFHIR.post('locationStatus', {"apikey": apikey}, {body: dataLocationStatus, json:true}, function(error, response, body){
										if(error){
										  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "addLocationStatus"});
										  }else{
										  	//cek apakah ada error atau tidak
										  	var locationStatus = body; //object
										  	//cek apakah ada error atau tidak
										  	if(locationStatus.err_code == 0){
											  	res.json({"err_code": 0, "err_msg": "Location Status has been add.", "data":locationStatus.data});
										  	}else{
										  		res.json({"err_code": 3, "err_msg": locationStatus.error, "application": "Api FHIR", "function": "addLocationStatus"});
										  	}
										  }
									})
								}else{
									res.json(resultCode);
								}
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}else{
					res.json({"err_code": err_code, "err_msg": err_msg});
				}
			},
			bedStatus: function addBedStatus(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				
				var code = req.body.code.trim().toLowerCase();
				var description = req.body.description;
				
				var err_code = 0;
				var err_msg = '';
				
				//input checking
				if(validator.isEmpty(code)){
					err_code = 1;
					err_msg = "Code is required";
				}

				if(validator.isEmpty(description)){
					err_code = 2;
					err_msg = "Description is required";
				}

				if(err_code == 0){
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){
							checkCode(apikey, code, 'BED_STATUS', function(resultCode){
								if(resultCode.err_code == 0){
									//susun body
									var dataBedStatus = {
														"code": code,	
														"description": description
													};
								
									//method, endpoint, params, options, callback
									ApiFHIR.post('bedStatus', {"apikey": apikey}, {body: dataBedStatus, json:true}, function(error, response, body){
										if(error){
										  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "addBedStatus"});
										  }else{
										  	//cek apakah ada error atau tidak
										  	var bedStatus = body; //object
										  	//cek apakah ada error atau tidak
										  	if(bedStatus.err_code == 0){
											  	res.json({"err_code": 0, "err_msg": "Bed Status has been add.", "data":bedStatus.data});
										  	}else{
										  		res.json({"err_code": 3, "err_msg": bedStatus.error, "application": "Api FHIR", "function": "addBedStatus"});
										  	}
										  }
									})
								}else{
									res.json(resultCode);
								}
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}else{
					res.json({"err_code": err_code, "err_msg": err_msg});
				}
			},
			locationMode: function addLocationMode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				
				var code = req.body.code.trim().toLowerCase();
				var display = req.body.display;
				var definition = req.body.definition.replace(/[^\w\s , ( ) / .]/gi, '');
				
				var err_code = 0;
				var err_msg = '';
				
				//input checking
				if(validator.isEmpty(code)){
					err_code = 1;
					err_msg = "Code is required";
				}

				if(validator.isEmpty(display)){
					err_code = 2;
					err_msg = "Display is required";
				}

				if(validator.isEmpty(definition)){
					err_code = 2;
					err_msg = "Definition is required";
				}

				if(err_code == 0){
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){
							checkCode(apikey, code, 'LOCATION_MODE', function(resultCode){
								if(resultCode.err_code == 0){
									//susun body
									var dataLocationMode = {
														"code": code,	
														"display": display,
														"definition": definition
													};
								
									//method, endpoint, params, options, callback
									ApiFHIR.post('locationMode', {"apikey": apikey}, {body: dataLocationMode, json:true}, function(error, response, body){
										if(error){
										  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "addLocationMode"});
										  }else{
										  	//cek apakah ada error atau tidak
										  	var locationMode = body; //object
										  	//cek apakah ada error atau tidak
										  	if(locationMode.err_code == 0){
											  	res.json({"err_code": 0, "err_msg": "Location Mode has been add.", "data":locationMode.data});
										  	}else{
										  		res.json({"err_code": 3, "err_msg": locationMode.error, "application": "Api FHIR", "function": "addLocationMode"});
										  	}
										  }
									})
								}else{
									res.json(resultCode);
								}
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}else{
					res.json({"err_code": err_code, "err_msg": err_msg});
				}
			},
			serviceDeliveryLocationRoleType: function addServiceDeliveryLocationRoleType(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				
				var code = req.body.code.trim().toLowerCase();
				var display = req.body.display;
				var definition = req.body.definition.replace(/[^\w\s , ( ) / .]/gi, '');
				
				var err_code = 0;
				var err_msg = '';
				
				//input checking
				if(validator.isEmpty(code)){
					err_code = 1;
					err_msg = "Code is required";
				}

				if(validator.isEmpty(display)){
					err_code = 2;
					err_msg = "Display is required";
				}

				if(validator.isEmpty(definition)){
					err_code = 2;
					err_msg = "Definition is required";
				}

				if(err_code == 0){
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){
							checkCode(apikey, code, 'SERVICE_DELIVERY_LOCATION_ROLE_TYPE', function(resultCode){
								if(resultCode.err_code == 0){
									//susun body
									var dataServiceDeliveryLocationRoleTypeCode = {
														"code": code,	
														"display": display,
														"definition": definition
													};
								
									//method, endpoint, params, options, callback
									ApiFHIR.post('serviceDeliveryLocationRoleType', {"apikey": apikey}, {body: dataServiceDeliveryLocationRoleTypeCode, json:true}, function(error, response, body){
										if(error){
										  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "addServiceDeliveryLocationRoleType"});
										  }else{
										  	//cek apakah ada error atau tidak
										  	var serviceDeliveryLocationRoleType = body; //object
										  	//cek apakah ada error atau tidak
										  	if(serviceDeliveryLocationRoleType.err_code == 0){
											  	res.json({"err_code": 0, "err_msg": "Service Delivery Location Role Type has been add.", "data":serviceDeliveryLocationRoleType.data});
										  	}else{
										  		res.json({"err_code": 3, "err_msg": serviceDeliveryLocationRoleType.error, "application": "Api FHIR", "function": "addServiceDeliveryLocationRoleType"});
										  	}
										  }
									})
								}else{
									res.json(resultCode);
								}
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}else{
					res.json({"err_code": err_code, "err_msg": err_msg});
				}
			},
			locationPhysicalType: function addLocationPhysicalType(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				
				var code = req.body.code.trim().toLowerCase();
				var display = req.body.display;
				var definition = req.body.definition.replace(/[^\w\s , ( ) / .]/gi, '');
				
				var err_code = 0;
				var err_msg = '';
				
				//input checking
				if(validator.isEmpty(code)){
					err_code = 1;
					err_msg = "Code is required";
				}

				if(validator.isEmpty(display)){
					err_code = 2;
					err_msg = "Display is required";
				}

				if(validator.isEmpty(definition)){
					err_code = 2;
					err_msg = "Definition is required";
				}

				if(err_code == 0){
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){
							checkCode(apikey, code, 'LOCATION_PHYSICAL_TYPE', function(resultCode){
								if(resultCode.err_code == 0){
									//susun body
									var dataLocationPhysicalType = {
														"code": code,	
														"display": display,
														"definition": definition
													};
								
									//method, endpoint, params, options, callback
									ApiFHIR.post('locationPhysicalType', {"apikey": apikey}, {body: dataLocationPhysicalType, json:true}, function(error, response, body){
										if(error){
										  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "addLocationPhysicalType"});
										  }else{
										  	//cek apakah ada error atau tidak
										  	var locationPhysicalType = body; //object
										  	//cek apakah ada error atau tidak
										  	if(locationPhysicalType.err_code == 0){
											  	res.json({"err_code": 0, "err_msg": "Location Physical Type has been add.", "data":locationPhysicalType.data});
										  	}else{
										  		res.json({"err_code": 3, "err_msg": locationPhysicalType.error, "application": "Api FHIR", "function": "addLocationPhysicalType"});
										  	}
										  }
									})
								}else{
									res.json(resultCode);
								}
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}else{
					res.json({"err_code": err_code, "err_msg": err_msg});
				}
			},
			qualificationCode: function addQualificationCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				
				var code = req.body.code.trim().toLowerCase();
				var description = req.body.description;
				
				var err_code = 0;
				var err_msg = '';
				
				//input checking
				if(validator.isEmpty(code)){
					err_code = 1;
					err_msg = "Code is required";
				}

				if(validator.isEmpty(description)){
					err_code = 2;
					err_msg = "Description is required";
				}

				if(err_code == 0){
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){
							checkCode(apikey, code, 'QUALIFICATION_CODE', function(resultCode){
								if(resultCode.err_code == 0){
									//susun body
									var dataQualificationCode = {
														"code": code,	
														"description": description
													};
								
									//method, endpoint, params, options, callback
									ApiFHIR.post('qualificationCode', {"apikey": apikey}, {body: dataQualificationCode, json:true}, function(error, response, body){
										if(error){
										  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "addQualificationCode"});
										  }else{
										  	//cek apakah ada error atau tidak
										  	var qualificationCode = body; //object
										  	//cek apakah ada error atau tidak
										  	if(qualificationCode.err_code == 0){
											  	res.json({"err_code": 0, "err_msg": "Qualification Code has been add.", "data":qualificationCode.data});
										  	}else{
										  		res.json({"err_code": 3, "err_msg": qualificationCode.error, "application": "Api FHIR", "function": "addQualificationCode"});
										  	}
										  }
									})
								}else{
									res.json(resultCode);
								}
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}else{
					res.json({"err_code": err_code, "err_msg": err_msg});
				}
			},
			practitionerRoleCode: function addPractitionerRoleCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				
				var code = req.body.code.trim().toLowerCase();
				var display = req.body.display;
				var definition = req.body.definition.replace(/[^\w\s , ( ) / .]/gi, '');
				
				var err_code = 0;
				var err_msg = '';
				
				//input checking
				if(validator.isEmpty(code)){
					err_code = 1;
					err_msg = "Code is required";
				}

				if(validator.isEmpty(display)){
					err_code = 2;
					err_msg = "Display is required";
				}
				
				if(validator.isEmpty(definition)){
					err_code = 2;
					err_msg = "Definition is required";
				}

				if(err_code == 0){
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){
							checkCode(apikey, code, 'PRACTITIONER_ROLE_CODE', function(resultCode){
								if(resultCode.err_code == 0){
									//susun body
									var dataPractitionerRoleCode = {
														"code": code,	
														"display": display,
														"definition": definition
													};
								
									//method, endpoint, params, options, callback
									ApiFHIR.post('practitionerRoleCode', {"apikey": apikey}, {body: dataPractitionerRoleCode, json:true}, function(error, response, body){
										if(error){
										  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "addPractitionerRoleCode"});
										  }else{
										  	//cek apakah ada error atau tidak
										  	var practitionerRoleCode = body; //object
										  	//cek apakah ada error atau tidak
										  	if(practitionerRoleCode.err_code == 0){
											  	res.json({"err_code": 0, "err_msg": "Practitioner Role Code has been add.", "data":practitionerRoleCode.data});
										  	}else{
										  		res.json({"err_code": 3, "err_msg": practitionerRoleCode.error, "application": "Api FHIR", "function": "addPractitionerRoleCode"});
										  	}
										  }
									})
								}else{
									res.json(resultCode);
								}
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}else{
					res.json({"err_code": err_code, "err_msg": err_msg});
				}
			},
			practiceCode: function addPracticeCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				
				var code = req.body.code.trim().toLowerCase();
				var display = req.body.display;
				
				var err_code = 0;
				var err_msg = '';
				
				//input checking
				if(validator.isEmpty(code)){
					err_code = 1;
					err_msg = "Code is required";
				}

				if(validator.isEmpty(display)){
					err_code = 2;
					err_msg = "Display is required";
				}

				if(err_code == 0){
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){
							checkCode(apikey, code, 'PRACTICE_CODE', function(resultCode){
								if(resultCode.err_code == 0){
									//susun body
									var dataPracticeCode = {
														"code": code,	
														"display": display
													};
								
									//method, endpoint, params, options, callback
									ApiFHIR.post('practiceCode', {"apikey": apikey}, {body: dataPracticeCode, json:true}, function(error, response, body){
										if(error){
										  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "addPracticeCode"});
										  }else{
										  	//cek apakah ada error atau tidak
										  	var practiceCode = body; //object
										  	//cek apakah ada error atau tidak
										  	if(practiceCode.err_code == 0){
											  	res.json({"err_code": 0, "err_msg": "PracticeCode has been add.", "data":practiceCode.data});
										  	}else{
										  		res.json({"err_code": 3, "err_msg": practiceCode.error, "application": "Api FHIR", "function": "addPracticeCode"});
										  	}
										  }
									})
								}else{
									res.json(resultCode);
								}
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}else{
					res.json({"err_code": err_code, "err_msg": err_msg});
				}
			},
			daysOfWeek: function addDaysOfWeek(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				
				var code = req.body.code.trim().toLowerCase();
				var display = req.body.display;
				var definition = req.body.definition.replace(/[^\w\s , ( ) / .]/gi, '');
				
				var err_code = 0;
				var err_msg = '';
				
				//input checking
				if(validator.isEmpty(code)){
					err_code = 1;
					err_msg = "Code is required";
				}

				if(validator.isEmpty(display)){
					err_code = 2;
					err_msg = "Display is required";
				}

				if(validator.isEmpty(definition)){
					err_code = 2;
					err_msg = "Definition is required";
				}

				if(err_code == 0){
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){
							checkCode(apikey, code, 'DAYS_OF_WEEK', function(resultCode){
								if(resultCode.err_code == 0){
									//susun body
									var dataDaysOfWeek = {
														"code": code,	
														"display": display,
														"definition": definition
													};
								
									//method, endpoint, params, options, callback
									ApiFHIR.post('daysOfWeek', {"apikey": apikey}, {body: dataDaysOfWeek, json:true}, function(error, response, body){
										if(error){
										  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "addDaysOfWeek"});
										  }else{
										  	//cek apakah ada error atau tidak
										  	var daysOfWeek = body; //object
										  	//cek apakah ada error atau tidak
										  	if(daysOfWeek.err_code == 0){
											  	res.json({"err_code": 0, "err_msg": "Days Of Week has been add.", "data":daysOfWeek.data});
										  	}else{
										  		res.json({"err_code": 3, "err_msg": daysOfWeek.error, "application": "Api FHIR", "function": "addDaysOfWeek"});
										  	}
										  }
									})
								}else{
									res.json(resultCode);
								}
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}else{
					res.json({"err_code": err_code, "err_msg": err_msg});
				}
			},
			serviceCategory: function addServiceCategory(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				
				var code = req.body.code.trim().toLowerCase();
				var display = req.body.display;
				var definition = req.body.definition.replace(/[^\w\s , ( ) / .]/gi, '');
				
				var err_code = 0;
				var err_msg = '';
				
				//input checking
				if(validator.isEmpty(code)){
					err_code = 1;
					err_msg = "Code is required";
				}

				if(validator.isEmpty(display)){
					err_code = 2;
					err_msg = "Display is required";
				}

				if(validator.isEmpty(definition)){
					err_code = 2;
					err_msg = "Definition is required";
				}

				if(err_code == 0){
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){
							checkCode(apikey, code, 'SERVICE_CATEGORY', function(resultCode){
								if(resultCode.err_code == 0){
									//susun body
									var dataServiceCategory = {
														"code": code,	
														"display": display,
														"definition": definition
													};
								
									//method, endpoint, params, options, callback
									ApiFHIR.post('serviceCategory', {"apikey": apikey}, {body: dataServiceCategory, json:true}, function(error, response, body){
										if(error){
										  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "addServiceCategory"});
										  }else{
										  	//cek apakah ada error atau tidak
										  	var serviceCategory = body; //object
										  	//cek apakah ada error atau tidak
										  	if(serviceCategory.err_code == 0){
											  	res.json({"err_code": 0, "err_msg": "Service Category has been add.", "data":serviceCategory.data});
										  	}else{
										  		res.json({"err_code": 3, "err_msg": serviceCategory.error, "application": "Api FHIR", "function": "addServiceCategory"});
										  	}
										  }
									})
								}else{
									res.json(resultCode);
								}
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}else{
					res.json({"err_code": err_code, "err_msg": err_msg});
				}
			},
			serviceType: function addServiceType(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				
				var code = req.body.code.trim().toLowerCase();
				var display = req.body.display;
				var definition = req.body.definition.replace(/[^\w\s , ( ) / .]/gi, '');
				
				var err_code = 0;
				var err_msg = '';
				
				//input checking
				if(validator.isEmpty(code)){
					err_code = 1;
					err_msg = "Code is required";
				}

				if(validator.isEmpty(display)){
					err_code = 2;
					err_msg = "Display is required";
				}

				if(validator.isEmpty(definition)){
					err_code = 2;
					err_msg = "Definition is required";
				}

				if(err_code == 0){
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){
							checkCode(apikey, code, 'SERVICE_TYPE', function(resultCode){
								if(resultCode.err_code == 0){
									//susun body
									var dataServiceType = {
														"code": code,	
														"display": display,
														"definition": definition
													};
								
									//method, endpoint, params, options, callback
									ApiFHIR.post('serviceType', {"apikey": apikey}, {body: dataServiceType, json:true}, function(error, response, body){
										if(error){
										  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "addServiceType"});
										  }else{
										  	//cek apakah ada error atau tidak
										  	var serviceType = body; //object
										  	//cek apakah ada error atau tidak
										  	if(serviceType.err_code == 0){
											  	res.json({"err_code": 0, "err_msg": "Service Type has been add.", "data":serviceType.data});
										  	}else{
										  		res.json({"err_code": 3, "err_msg": serviceType.error, "application": "Api FHIR", "function": "addServiceType"});
										  	}
										  }
									})
								}else{
									res.json(resultCode);
								}
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}else{
					res.json({"err_code": err_code, "err_msg": err_msg});
				}
			},
			serviceProvisionConditions: function addServiceProvisionConditions(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				
				var code = req.body.code.trim().toLowerCase();
				var display = req.body.display;
				var definition = req.body.definition.replace(/[^\w\s , ( ) / .]/gi, '');
				
				var err_code = 0;
				var err_msg = '';
				
				//input checking
				if(validator.isEmpty(code)){
					err_code = 1;
					err_msg = "Code is required";
				}

				if(validator.isEmpty(display)){
					err_code = 2;
					err_msg = "Display is required";
				}

				if(validator.isEmpty(definition)){
					err_code = 2;
					err_msg = "Definition is required";
				}

				if(err_code == 0){
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){
							checkCode(apikey, code, 'SERVICE_PROVISION_CONDITIONS', function(resultCode){
								if(resultCode.err_code == 0){
									//susun body
									var dataServiceProvisionConditions = {
														"code": code,	
														"display": display,
														"definition": definition
													};
								
									//method, endpoint, params, options, callback
									ApiFHIR.post('serviceProvisionConditions', {"apikey": apikey}, {body: dataServiceProvisionConditions, json:true}, function(error, response, body){
										if(error){
										  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "addServiceProvisionConditions"});
										  }else{
										  	//cek apakah ada error atau tidak
										  	var serviceProvisionConditions = body; //object
										  	//cek apakah ada error atau tidak
										  	if(serviceProvisionConditions.err_code == 0){
											  	res.json({"err_code": 0, "err_msg": "Service Provision Conditions has been add.", "data":serviceProvisionConditions.data});
										  	}else{
										  		res.json({"err_code": 3, "err_msg": serviceProvisionConditions.error, "application": "Api FHIR", "function": "addServiceProvisionConditions"});
										  	}
										  }
									})
								}else{
									res.json(resultCode);
								}
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}else{
					res.json({"err_code": err_code, "err_msg": err_msg});
				}
			},
			serviceReferralMethod: function addServiceReferralMethod(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				
				var code = req.body.code.trim().toLowerCase();
				var display = req.body.display;
				var definition = req.body.definition.replace(/[^\w\s , ( ) / .]/gi, '');
				
				var err_code = 0;
				var err_msg = '';
				
				//input checking
				if(validator.isEmpty(code)){
					err_code = 1;
					err_msg = "Code is required";
				}

				if(validator.isEmpty(display)){
					err_code = 2;
					err_msg = "Display is required";
				}

				if(validator.isEmpty(definition)){
					err_code = 2;
					err_msg = "Definition is required";
				}

				if(err_code == 0){
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){
							checkCode(apikey, code, 'SERVICE_REFERRAL_METHOD', function(resultCode){
								if(resultCode.err_code == 0){
									//susun body
									var dataServiceReferralMethod = {
														"code": code,	
														"display": display,
														"definition": definition
													};
								
									//method, endpoint, params, options, callback
									ApiFHIR.post('serviceReferralMethod', {"apikey": apikey}, {body: dataServiceReferralMethod, json:true}, function(error, response, body){
										if(error){
										  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "addServiceReferralMethod"});
										  }else{
										  	//cek apakah ada error atau tidak
										  	var serviceReferralMethod = body; //object
										  	//cek apakah ada error atau tidak
										  	if(serviceReferralMethod.err_code == 0){
											  	res.json({"err_code": 0, "err_msg": "Service Type has been add.", "data":serviceReferralMethod.data});
										  	}else{
										  		res.json({"err_code": 3, "err_msg": serviceReferralMethod.error, "application": "Api FHIR", "function": "addServiceReferralMethod"});
										  	}
										  }
									})
								}else{
									res.json(resultCode);
								}
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}else{
					res.json({"err_code": err_code, "err_msg": err_msg});
				}
			},
			endpointStatus: function addEndpointStatus(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				
				var code = req.body.code.trim().toLowerCase();
				var display = req.body.display;
				var definition = req.body.definition.replace(/[^\w\s , ( ) / .]/gi, '');
				
				var err_code = 0;
				var err_msg = '';
				
				//input checking
				if(validator.isEmpty(code)){
					err_code = 1;
					err_msg = "Code is required";
				}

				if(validator.isEmpty(display)){
					err_code = 2;
					err_msg = "Display is required";
				}

				if(validator.isEmpty(definition)){
					err_code = 2;
					err_msg = "Definition is required";
				}

				if(err_code == 0){
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){
							checkCode(apikey, code, 'ENDPOINT_STATUS', function(resultCode){
								if(resultCode.err_code == 0){
									//susun body
									var dataEndpointStatus = {
														"code": code,	
														"display": display,
														"definition": definition
													};
								
									//method, endpoint, params, options, callback
									ApiFHIR.post('endpointStatus', {"apikey": apikey}, {body: dataEndpointStatus, json:true}, function(error, response, body){
										if(error){
										  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "addEndpointStatus"});
										  }else{
										  	//cek apakah ada error atau tidak
										  	var endpointStatus = body; //object
												//cek apakah ada error atau tidak
										  	if(endpointStatus.err_code == 0){
											  	res.json({"err_code": 0, "err_msg": "Endpoint Status has been add.", "data":endpointStatus.data});
										  	}else{
										  		res.json({"err_code": 3, "err_msg": endpointStatus.error, "application": "Api FHIR", "function": "addEndpointStatus"});
										  	}
										  }
									})
								}else{
									res.json(resultCode);
								}
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}else{
					res.json({"err_code": err_code, "err_msg": err_msg});
				}
			},
			endpointConnectionType: function addEndpointConnectionType(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				
				var code = req.body.code.trim().toLowerCase();
				var display = req.body.display;
				var definition = req.body.definition.replace(/[^\w\s , ( ) / .]/gi, '');
				
				var err_code = 0;
				var err_msg = '';
				
				//input checking
				if(validator.isEmpty(code)){
					err_code = 1;
					err_msg = "Code is required";
				}

				if(validator.isEmpty(display)){
					err_code = 2;
					err_msg = "Display is required";
				}

				if(validator.isEmpty(definition)){
					err_code = 2;
					err_msg = "Definition is required";
				}

				if(err_code == 0){
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){
							checkCode(apikey, code, 'ENDPOINT_CONNECTION_TYPE', function(resultCode){
								if(resultCode.err_code == 0){
									//susun body
									var dataEndpointConnectionType = {
														"code": code,	
														"display": display,
														"definition": definition
													};
								
									//method, endpoint, params, options, callback
									ApiFHIR.post('endpointConnectionType', {"apikey": apikey}, {body: dataEndpointConnectionType, json:true}, function(error, response, body){
										if(error){
										  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "addEndpointConnectionType"});
										  }else{
										  	//cek apakah ada error atau tidak
										  	var endpointConnectionType = body; //object
										  	//cek apakah ada error atau tidak
										  	if(endpointConnectionType.err_code == 0){
											  	res.json({"err_code": 0, "err_msg": "Endpoint Status has been add.", "data":endpointConnectionType.data});
										  	}else{
										  		res.json({"err_code": 3, "err_msg": endpointConnectionType.error, "application": "Api FHIR", "function": "addEndpointConnectionType"});
										  	}
										  }
									})
								}else{
									res.json(resultCode);
								}
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}else{
					res.json({"err_code": err_code, "err_msg": err_msg});
				}
			},
			endpointPayloadType: function addEndpointPayloadType(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				
				var code = req.body.code.trim().toLowerCase();
				var display = req.body.display;
				
				var err_code = 0;
				var err_msg = '';
				
				//input checking
				if(validator.isEmpty(code)){
					err_code = 1;
					err_msg = "Code is required";
				}

				if(validator.isEmpty(display)){
					err_code = 2;
					err_msg = "Display is required";
				}

				

				if(err_code == 0){
					checkApikey(apikey, ipAddres, function(result){
						if(result.err_code == 0){
							checkCode(apikey, code, 'ENDPOINT_PAYLOAD_TYPE', function(resultCode){
								if(resultCode.err_code == 0){
									//susun body
									var dataEndpointPayloadType = {
														"code": code,	
														"display": display
													};
								
									//method, endpoint, params, options, callback
									ApiFHIR.post('endpointPayloadType', {"apikey": apikey}, {body: dataEndpointPayloadType, json:true}, function(error, response, body){
										if(error){
										  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "addEndpointPayloadType"});
										  }else{
										  	//cek apakah ada error atau tidak
										  	var endpointPayloadType = body; //object
										  	//cek apakah ada error atau tidak
										  	if(endpointPayloadType.err_code == 0){
											  	res.json({"err_code": 0, "err_msg": "Endpoint Status has been add.", "data":endpointPayloadType.data});
										  	}else{
										  		res.json({"err_code": 3, "err_msg": endpointPayloadType.error, "application": "Api FHIR", "function": "addEndpointPayloadType"});
										  	}
										  }
									})
								}else{
									res.json(resultCode);
								}
							})
						}else{
							result.err_code = 500;
							res.json(result);
						}	
					});
				}else{
					res.json({"err_code": err_code, "err_msg": err_msg});
				}
			}
			//post hcs end
		},
		put: {
			identityAssuranceLevel: function updateIdentityAssuranceLevel(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				var dataAssuranceLevel = {};

				if(typeof req.body.code !== 'undefined'){
					var code = req.body.code.trim().toLowerCase();
					dataAssuranceLevel.code = code;
				}

				if(typeof req.body.display !== 'undefined'){
					var display = req.body.display;
					dataAssuranceLevel.display = display;
				}

				if(typeof req.body.definition !== 'undefined'){
					var definition = req.body.definition.replace(/[^\w\s ,]/gi, '');
					dataAssuranceLevel.definition = definition;
				}


				if(_id == "" || typeof _id == 'undefined'){
					res.json({"err_code": 5, "err_msg": "Id is required."});	
				}else{
					if(validator.isInt(_id)){
						checkApikey(apikey, ipAddres, function(result){
							if(result.err_code == 0){
								checkId(apikey, _id, 'IDENTITY_ASSURANCE_LEVEL', function(resultCheckId){
									if(resultCheckId.err_code == 0){
										if(typeof req.body.code !== 'undefined'){
											checkCode(apikey, code, 'IDENTITY_ASSURANCE_LEVEL', function(resultCode){
												if(resultCode.err_code == 0){
													//method, endpoint, params, options, callback
													ApiFHIR.put('identityAssuranceLevel', {"apikey": apikey, "_id": _id}, {body: dataAssuranceLevel, json: true}, function(error, response, body){
														if(error){
														  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateIdentityAssuranceLevel"});
														  }else{
														  	//cek apakah ada error atau tidak
														  	var assuranceLevel = body; 
														  	
														  	//cek apakah ada error atau tidak
														  	if(assuranceLevel.err_code == 0){
															  	res.json({"err_code": 0, "err_msg": "Identity Assurance has been update.","data":assuranceLevel.data});
														  	}else{
														  		res.json({"err_code": 3, "err_msg": assuranceLevel.error, "application": "Api FHIR", "function": "updateIdentityAssuranceLevel"});
														  	}
														  }
													})
												}else{
													res.json(resultCode);
												}
											})
										}else{
											//method, endpoint, params, options, callback
											ApiFHIR.put('identityAssuranceLevel', {"apikey": apikey, "_id": _id}, {body: dataAssuranceLevel, json: true}, function(error, response, body){
												if(error){
												  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateIdentityAssuranceLevel"});
												  }else{
												  	//cek apakah ada error atau tidak
												  	var assuranceLevel = body; 
												  	
												  	//cek apakah ada error atau tidak
												  	if(assuranceLevel.err_code == 0){
													  	res.json({"err_code": 0, "err_msg": "Identity Assurance has been update.","data":assuranceLevel.data});
												  	}else{
												  		res.json({"err_code": 3, "err_msg": assuranceLevel.error, "application": "Api FHIR", "function": "updateIdentityAssuranceLevel"});
												  	}
												  }
											})
										}
									}else{
										res.json(resultCheckId);
									}
								})
							}else{
								result.err_code = 500;
								res.json(result);
							}	
						});
					}else{
						res.json({"err_code": 4, "err_msg": "Id must be a number."});	
					}
				}
			},
			administrativeGender: function updateAdministrativeGender(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				var dataAdministrativeGender = {};

				if(typeof req.body.code !== 'undefined'){
					var code = req.body.code.trim().toLowerCase();
					dataAdministrativeGender.code = code;
				}

				if(typeof req.body.display !== 'undefined'){
					var display = req.body.display;
					dataAdministrativeGender.display = display;
				}

				if(typeof req.body.definition !== 'undefined'){
					var definition = req.body.definition.replace(/[^\w\s ,]/gi, '');
					dataAdministrativeGender.definition = definition;
				}


				if(_id == "" || typeof _id == 'undefined'){
					res.json({"err_code": 5, "err_msg": "Id is required."});	
				}else{
					if(validator.isInt(_id)){
						checkApikey(apikey, ipAddres, function(result){
							if(result.err_code == 0){
								checkId(apikey, _id, 'ADMINISTRATIVE_GENDER', function(resultCheckId){
									if(resultCheckId == 0){
										if(typeof req.body.code !== 'undefined'){
											checkCode(apikey, code, 'ADMINISTRATIVE_GENDER', function(resultCode){
												if(resultCode.err_code == 0){
													//method, endpoint, params, options, callback
													ApiFHIR.put('administrativeGender', {"apikey": apikey, "_id": _id}, {body: dataAdministrativeGender, json: true}, function(error, response, body){
														if(error){
														  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateAdministrativeGender"});
														  }else{
														  	//cek apakah ada error atau tidak
														  	var administrativeGender = body; 
														  	
														  	//cek apakah ada error atau tidak
														  	if(administrativeGender.err_code == 0){
															  	res.json({"err_code": 0, "err_msg": "Administrative Gender has been update.","data":administrativeGender.data});
														  	}else{
														  		res.json({"err_code": 3, "err_msg": administrativeGender.error, "application": "Api FHIR", "function": "updateAdministrativeGender"});
														  	}
														  }
													})
												}else{
													res.json(resultCode);
												}
											})
										}else{
											//method, endpoint, params, options, callback
											ApiFHIR.put('administrativeGender', {"apikey": apikey, "_id": _id}, {body: dataAdministrativeGender, json: true}, function(error, response, body){
												if(error){
												  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateAdministrativeGender"});
												  }else{
												  	//cek apakah ada error atau tidak
												  	var administrativeGender = body; 
												  	
												  	//cek apakah ada error atau tidak
												  	if(administrativeGender.err_code == 0){
													  	res.json({"err_code": 0, "err_msg": "Administrative Gender has been update.","data":administrativeGender.data});
												  	}else{
												  		res.json({"err_code": 3, "err_msg": administrativeGender.error, "application": "Api FHIR", "function": "updateAdministrativeGender"});
												  	}
												  }
											})
										}
									}else{
										res.json(resultCheckId);
									}
								})
							}else{
								result.err_code = 500;
								res.json(result);
							}	
						});
					}else{
						res.json({"err_code": 4, "err_msg": "Id must be a number."});	
					}
				}
			},
			maritalStatus: function updateMaritalStatus(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;
				
				var dataMaritalStatus = {};

				if(typeof req.body.code !== 'undefined'){
					var code = req.body.code.trim().toUpperCase();
					dataMaritalStatus.code = code;
				}

				if(typeof req.body.display !== 'undefined'){
					var display = req.body.display;
					dataMaritalStatus.display = display;
				}

				if(typeof req.body.definition !== 'undefined'){
					var definition = req.body.definition.replace(/[^\w\s ,]/gi, '');
					dataMaritalStatus.definition = definition;
				}


				if(_id == "" || typeof _id == 'undefined'){
					res.json({"err_code": 5, "err_msg": "Id is required."});	
				}else{
					if(validator.isInt(_id)){
						checkApikey(apikey, ipAddres, function(result){
							if(result.err_code == 0){
								checkId(apikey, _id, 'MARITAL_STATUS', function(resultCheckId){
									if(resultCheckId.err_code == 0){
										if(typeof req.body.code !== 'undefined'){
											checkCode(apikey, code, 'MARITAL_STATUS', function(resultCode){
												if(resultCode.err_code == 0){
													//method, endpoint, params, options, callback
													ApiFHIR.put('maritalStatus', {"apikey": apikey, "_id": _id}, {body: dataMaritalStatus, json: true}, function(error, response, body){
														if(error){
														  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateMaritalStatus"});
														  }else{
														  	//cek apakah ada error atau tidak
														  	var maritalStatus = body; 
														  	
														  	//cek apakah ada error atau tidak
														  	if(maritalStatus.err_code == 0){
															  	res.json({"err_code": 0, "err_msg": "Marital Status has been update.","data":maritalStatus.data});
														  	}else{
														  		res.json({"err_code": 3, "err_msg": maritalStatus.error, "application": "Api FHIR", "function": "updateMaritalStatus"});
														  	}
														  }
													})
												}else{
													res.json(resultCode);
												}
											})
										}else{
											//method, endpoint, params, options, callback
											ApiFHIR.put('maritalStatus', {"apikey": apikey, "_id": _id}, {body: dataMaritalStatus, json: true}, function(error, response, body){
												if(error){
												  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateMaritalStatus"});
												  }else{
												  	//cek apakah ada error atau tidak
												  	var maritalStatus = body; 
												  	
												  	//cek apakah ada error atau tidak
												  	if(maritalStatus.err_code == 0){
													  	res.json({"err_code": 0, "err_msg": "Marital Status has been update.","data":maritalStatus.data});
												  	}else{
												  		res.json({"err_code": 3, "err_msg": maritalStatus.error, "application": "Api FHIR", "function": "updateMaritalStatus"});
												  	}
												  }
											})
										}
									}else{
										res.json(resultCheckId);
									}
								})
							}else{
								result.err_code = 500;
								res.json(result);
							}	
						});
					}else{
						res.json({"err_code": 4, "err_msg": "Id must be a number."});	
					}
				}
			},
			contactRole: function updateContactRole(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				var dataMaritalStatus = {};

				if(typeof req.body.code !== 'undefined'){
					var code = req.body.code.trim().toUpperCase();
					dataMaritalStatus.code = code;
				}

				if(typeof req.body.description !== 'undefined'){
					description = req.body.description.replace(/[^\w\s ,]/gi, '');
					dataMaritalStatus.description = description;
				}


				if(_id == "" || typeof _id == 'undefined'){
					res.json({"err_code": 5, "err_msg": "Id is required."});	
				}else{
					if(validator.isInt(_id)){
						checkApikey(apikey, ipAddres, function(result){
							if(result.err_code == 0){
								checkId(apikey, _id, 'CONTACT_ROLE', function(resultCheckId){
									if(resultCheckId.err_code == 0){
										if(typeof req.body.code !== 'undefined'){
											checkCode(apikey, code, 'CONTACT_ROLE', function(resultCode){
												if(resultCode.err_code == 0){
													//method, endpoint, params, options, callback
													ApiFHIR.put('contactRole', {"apikey": apikey, "_id": _id}, {body: dataMaritalStatus, json: true}, function(error, response, body){
														if(error){
														  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateContactRole"});
														  }else{
														  	//cek apakah ada error atau tidak
														  	var contactRole = body; 
														  	
														  	//cek apakah ada error atau tidak
														  	if(contactRole.err_code == 0){
															  	res.json({"err_code": 0, "err_msg": "Contact Role has been update.","data":contactRole.data});
														  	}else{
														  		res.json({"err_code": 3, "err_msg": contactRole.error, "application": "Api FHIR", "function": "updateContactRole"});
														  	}
														  }
													})
												}else{
													res.json(resultCode);
												}
											})
										}else{
											//method, endpoint, params, options, callback
											ApiFHIR.put('contactRole', {"apikey": apikey, "_id": _id}, {body: dataMaritalStatus, json: true}, function(error, response, body){
												if(error){
												  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateContactRole"});
												  }else{
												  	//cek apakah ada error atau tidak
												  	var contactRole = body; 
												  	
												  	//cek apakah ada error atau tidak
												  	if(contactRole.err_code == 0){
													  	res.json({"err_code": 0, "err_msg": "Contact Role has been update.","data":contactRole.data});
												  	}else{
												  		res.json({"err_code": 3, "err_msg": contactRole.error, "application": "Api FHIR", "function": "updateContactRole"});
												  	}
												  }
											})
										}
									}else{
										res.json(resultCheckId);
									}
								})
							}else{
								result.err_code = 500;
								res.json(result);
							}	
						});
					}else{
						res.json({"err_code": 4, "err_msg": "Id must be a number."});	
					}
				}
			},
			animalSpecies: function updateAnimalSpecies(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				var dataAnimalSpecies = {};

				if(typeof req.body.code !== 'undefined'){
					var code = req.body.code.trim();
					dataAnimalSpecies.code = code;
				}

				if(typeof req.body.display !== 'undefined'){
					display = req.body.display.replace(/[^\w\s ,]/gi, '');
					dataAnimalSpecies.display = display;
				}


				if(_id == "" || typeof _id == 'undefined'){
					res.json({"err_code": 5, "err_msg": "Id is required."});	
				}else{
					if(validator.isInt(_id)){
						checkApikey(apikey, ipAddres, function(result){
							if(result.err_code == 0){
								checkId(apikey, _id, 'ANIMAL_SPECIES', function(resultCheckId){
									if(resultCheckId.err_code == 0){
										if(typeof req.body.code !== 'undefined'){
											checkCode(apikey, code, 'ANIMAL_SPECIES', function(resultCode){
												if(resultCode.err_code == 0){
													//method, endpoint, params, options, callback
													ApiFHIR.put('animalSpecies', {"apikey": apikey, "_id": _id}, {body: dataAnimalSpecies, json: true}, function(error, response, body){
														if(error){
														  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateAnimalSpecies"});
														  }else{
														  	//cek apakah ada error atau tidak
														  	var animalSpecies = body; 
														  	
														  	//cek apakah ada error atau tidak
														  	if(animalSpecies.err_code == 0){
															  	res.json({"err_code": 0, "err_msg": "Animal Species has been update.","data":animalSpecies.data});
														  	}else{
														  		res.json({"err_code": 3, "err_msg": animalSpecies.error, "application": "Api FHIR", "function": "updateAnimalSpecies"});
														  	}
														  }
													})
												}else{
													res.json(resultCode);
												}
											})
										}else{
											//method, endpoint, params, options, callback
											ApiFHIR.put('animalSpecies', {"apikey": apikey, "_id": _id}, {body: dataAnimalSpecies, json: true}, function(error, response, body){
												if(error){
												  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateAnimalSpecies"});
												  }else{
												  	//cek apakah ada error atau tidak
												  	var animalSpecies = body; 
												  	
												  	//cek apakah ada error atau tidak
												  	if(animalSpecies.err_code == 0){
													  	res.json({"err_code": 0, "err_msg": "Animal Species has been update.","data":animalSpecies.data});
												  	}else{
												  		res.json({"err_code": 3, "err_msg": animalSpecies.error, "application": "Api FHIR", "function": "updateAnimalSpecies"});
												  	}
												  }
											})
										}
									}else{
										res.json(resultCheckId);
									}
								})
							}else{
								result.err_code = 500;
								res.json(result);
							}	
						});
					}else{
						res.json({"err_code": 4, "err_msg": "Id must be a number."});	
					}
				}
			},
			animalBreeds: function updateAnimalBreeds(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				var dataAnimalBreeds = {};

				if(typeof req.body.code !== 'undefined'){
					var code = req.body.code.trim();
					dataAnimalBreeds.code = code;
				}

				if(typeof req.body.display !== 'undefined'){
					display = req.body.display;//.replace(/[^\w\s ,]/gi, '');
					dataAnimalBreeds.display = display;
				}


				if(_id == "" || typeof _id == 'undefined'){
					res.json({"err_code": 5, "err_msg": "Id is required."});	
				}else{
					if(validator.isInt(_id)){
						checkApikey(apikey, ipAddres, function(result){
							if(result.err_code == 0){
								checkId(apikey, _id, 'ANIMAL_BREEDS', function(resultCheckId){
									if(resultCheckId.err_code == 0){
										if(typeof req.body.code !== 'undefined'){
											checkCode(apikey, code, 'ANIMAL_BREEDS', function(resultCode){
												if(resultCode.err_code == 0){
													//method, endpoint, params, options, callback
													ApiFHIR.put('animalBreeds', {"apikey": apikey, "_id": _id}, {body: dataAnimalBreeds, json: true}, function(error, response, body){
														if(error){
														  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateAnimalBreeds"});
														  }else{
														  	//cek apakah ada error atau tidak
														  	var animalBreeds = body; 
														  	
														  	//cek apakah ada error atau tidak
														  	if(animalBreeds.err_code == 0){
															  	res.json({"err_code": 0, "err_msg": "Animal Breeds has been update.","data":animalBreeds.data});
														  	}else{
														  		res.json({"err_code": 3, "err_msg": animalBreeds.error, "application": "Api FHIR", "function": "updateAnimalBreeds"});
														  	}
														  }
													})
												}else{
													res.json(resultCode);
												}
											})
										}else{
											//method, endpoint, params, options, callback
											ApiFHIR.put('animalBreeds', {"apikey": apikey, "_id": _id}, {body: dataAnimalBreeds, json: true}, function(error, response, body){
												if(error){
												  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateAnimalBreeds"});
												  }else{
												  	//cek apakah ada error atau tidak
												  	var animalBreeds = body; 
												  	
												  	//cek apakah ada error atau tidak
												  	if(animalBreeds.err_code == 0){
													  	res.json({"err_code": 0, "err_msg": "Animal Breeds has been update.","data":animalBreeds.data});
												  	}else{
												  		res.json({"err_code": 3, "err_msg": animalBreeds.error, "application": "Api FHIR", "function": "updateAnimalBreeds"});
												  	}
												  }
											})
										}
									}else{
										res.json(resultCheckId);
									}
								})
							}else{
								result.err_code = 500;
								res.json(result);
							}	
						});
					}else{
						res.json({"err_code": 4, "err_msg": "Id must be a number."});	
					}
				}
			},
			animalGenderStatus: function updateAnimalGenderStatus(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				var dataAnimalGenderStatus = {};

				if(typeof req.body.code !== 'undefined'){
					var code = req.body.code.trim().toLowerCase();
					dataAnimalGenderStatus.code = code;
				}

				if(typeof req.body.display !== 'undefined'){
					display = req.body.display;//.replace(/[^\w\s ,]/gi, '');
					dataAnimalGenderStatus.display = display;
				}

				if(typeof req.body.definition !== 'undefined'){
					definition = req.body.definition.replace(/[^\w\s ,]/gi, '');
					dataAnimalGenderStatus.definition = definition;
				}


				if(_id == "" || typeof _id == 'undefined'){
					res.json({"err_code": 5, "err_msg": "Id is required."});	
				}else{
					if(validator.isInt(_id)){
						checkApikey(apikey, ipAddres, function(result){
							if(result.err_code == 0){
								checkId(apikey, _id, 'ANIMAL_GENDER_STATUS', function(resultCheckId){
									if(resultCheckId.err_code == 0){
										if(typeof req.body.code !== 'undefined'){
											checkCode(apikey, code, 'ANIMAL_GENDER_STATUS', function(resultCode){
												if(resultCode.err_code == 0){
													//method, endpoint, params, options, callback
													ApiFHIR.put('animalGenderStatus', {"apikey": apikey, "_id": _id}, {body: dataAnimalGenderStatus, json: true}, function(error, response, body){
														if(error){
														  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateAnimalGenderStatus"});
														  }else{
														  	//cek apakah ada error atau tidak
														  	var animalGenderStatus = body; 
														  	
														  	//cek apakah ada error atau tidak
														  	if(animalGenderStatus.err_code == 0){
															  	res.json({"err_code": 0, "err_msg": "Animal Gender Status has been update.","data":animalGenderStatus.data});
														  	}else{
														  		res.json({"err_code": 3, "err_msg": animalGenderStatus.error, "application": "Api FHIR", "function": "updateAnimalGenderStatus"});
														  	}
														  }
													})
												}else{
													res.json(resultCode);
												}
											})
										}else{
											//method, endpoint, params, options, callback
											ApiFHIR.put('animalGenderStatus', {"apikey": apikey, "_id": _id}, {body: dataAnimalGenderStatus, json: true}, function(error, response, body){
												if(error){
												  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateAnimalGenderStatus"});
												  }else{
												  	//cek apakah ada error atau tidak
												  	var animalGenderStatus = body; 
												  	
												  	//cek apakah ada error atau tidak
												  	if(animalGenderStatus.err_code == 0){
													  	res.json({"err_code": 0, "err_msg": "Animal Breeds has been update.","data":animalGenderStatus.data});
												  	}else{
												  		res.json({"err_code": 3, "err_msg": animalGenderStatus.error, "application": "Api FHIR", "function": "updateAnimalGenderStatus"});
												  	}
												  }
											})
										}
									}else{
										res.json(resultCheckId);
									}
								})
							}else{
								result.err_code = 500;
								res.json(result);
							}	
						});
					}else{
						res.json({"err_code": 4, "err_msg": "Id must be a number."});	
					}
				}
			},
			languages: function updateLanguage(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				var dataLanguages = {};

				if(typeof req.body.code !== 'undefined'){
					var code = req.body.code.trim();
					dataLanguages.code = code;
				}

				if(typeof req.body.display !== 'undefined'){
					display = req.body.display.replace(/[^\w\s ,]/gi, '');
					dataLanguages.display = display;
				}

				if(_id == "" || typeof _id == 'undefined'){
					res.json({"err_code": 5, "err_msg": "Id is required."});	
				}else{
					if(validator.isInt(_id)){
						checkApikey(apikey, ipAddres, function(result){
							if(result.err_code == 0){
								checkId(apikey, _id, 'LANGUAGES', function(resultCheckId){
									if(resultCheckId.err_code == 0){
										if(typeof req.body.code !== 'undefined'){
											checkCode(apikey, code, 'LANGUAGES', function(resultCode){
												if(resultCode.err_code == 0){
													//method, endpoint, params, options, callback
													ApiFHIR.put('languages', {"apikey": apikey, "_id": _id}, {body: dataLanguages, json: true}, function(error, response, body){
														if(error){
														  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateLanguage"});
														  }else{
														  	//cek apakah ada error atau tidak
														  	var languages = body; 
														  	
														  	//cek apakah ada error atau tidak
														  	if(languages.err_code == 0){
															  	res.json({"err_code": 0, "err_msg": "Language has been update.","data":languages.data});
														  	}else{
														  		res.json({"err_code": 3, "err_msg": languages.error, "application": "Api FHIR", "function": "updateLanguage"});
														  	}
														  }
													})
												}else{
													res.json(resultCode);
												}
											})
										}else{
											//method, endpoint, params, options, callback
											ApiFHIR.put('languages', {"apikey": apikey, "_id": _id}, {body: dataLanguages, json: true}, function(error, response, body){
												if(error){
												  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateLanguage"});
												  }else{
												  	//cek apakah ada error atau tidak
												  	var languages = body; 
												  	
												  	//cek apakah ada error atau tidak
												  	if(languages.err_code == 0){
													  	res.json({"err_code": 0, "err_msg": "Languages has been update.","data":languages.data});
												  	}else{
												  		res.json({"err_code": 3, "err_msg": languages.error, "application": "Api FHIR", "function": "updateLanguage"});
												  	}
												  }
											})
										}
									}else{
										res.json(resultCheckId);
									}
								})
							}else{
								result.err_code = 500;
								res.json(result);
							}	
						});
					}else{
						res.json({"err_code": 4, "err_msg": "Id must be a number."});	
					}
				}
			},
			linkType: function updateLinkType(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				var dataLinkType = {};

				if(typeof req.body.code !== 'undefined'){
					var code = req.body.code.trim().toLowerCase();
					dataLinkType.code = code;
				}

				if(typeof req.body.display !== 'undefined'){
					display = req.body.display.replace(/[^\w\s ,]/gi, '');
					dataLinkType.display = display;
				}

				if(typeof req.body.definition !== 'undefined'){
					definition = req.body.definition.replace(/[^\w\s ,]/gi, '');
					dataLinkType.definition = definition;
				}

				if(_id == "" || typeof _id == 'undefined'){
					res.json({"err_code": 5, "err_msg": "Id is required."});	
				}else{
					if(validator.isInt(_id)){
						checkApikey(apikey, ipAddres, function(result){
							if(result.err_code == 0){
								checkId(apikey, _id, 'LINK_TYPE', function(resultCheckId){
									if(resultCheckId.err_code == 0){
										if(typeof req.body.code !== 'undefined'){
											checkCode(apikey, code, 'LINK_TYPE', function(resultCode){
												if(resultCode.err_code == 0){
													//method, endpoint, params, options, callback
													ApiFHIR.put('linkType', {"apikey": apikey, "_id": _id}, {body: dataLinkType, json: true}, function(error, response, body){
														if(error){
														  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateLinkType"});
														  }else{
														  	//cek apakah ada error atau tidak
														  	var linkType = body; 
														  	
														  	//cek apakah ada error atau tidak
														  	if(linkType.err_code == 0){
															  	res.json({"err_code": 0, "err_msg": "Link Type has been update.","data":linkType.data});
														  	}else{
														  		res.json({"err_code": 3, "err_msg": linkType.error, "application": "Api FHIR", "function": "updateLinkType"});
														  	}
														  }
													})
												}else{
													res.json(resultCode);
												}
											})
										}else{
											//method, endpoint, params, options, callback
											ApiFHIR.put('linkType', {"apikey": apikey, "_id": _id}, {body: dataLinkType, json: true}, function(error, response, body){
												if(error){
												  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateLinkType"});
												  }else{
												  	//cek apakah ada error atau tidak
												  	var linkType = body; 
												  	
												  	//cek apakah ada error atau tidak
												  	if(linkType.err_code == 0){
													  	res.json({"err_code": 0, "err_msg": "Link Type has been update.","data":linkType.data});
												  	}else{
												  		res.json({"err_code": 3, "err_msg": linkType.error, "application": "Api FHIR", "function": "updateLinkType"});
												  	}
												  }
											})
										}
									}else{
										res.json(resultCheckId);
									}
								})
							}else{
								result.err_code = 500;
								res.json(result);
							}	
						});
					}else{
						res.json({"err_code": 4, "err_msg": "Id must be a number."});	
					}
				}
			},
			relatedPersonRelationshipType: function updateRelatedPersonRelationshipType(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				var dataRelatedPersonRelationshipType = {};

				if(typeof req.body.code !== 'undefined'){
					var code = req.body.code.trim().toUpperCase();
					dataRelatedPersonRelationshipType.code = code;
				}

				if(typeof req.body.system !== 'undefined'){
					system = req.body.system.replace(/[^\w\s ,]/gi, '');
					dataRelatedPersonRelationshipType.system = system;
				}

				if(typeof req.body.display !== 'undefined'){
					display = req.body.display.replace(/[^\w\s ,]/gi, '');
					dataRelatedPersonRelationshipType.display = display;
				}

				if(typeof req.body.definition !== 'undefined'){
					definition = req.body.definition.replace(/[^\w\s , ( )]/gi, '');
					dataRelatedPersonRelationshipType.definition = definition;
				}

				if(_id == "" || typeof _id == 'undefined'){
					res.json({"err_code": 5, "err_msg": "Id is required."});	
				}else{
					if(validator.isInt(_id)){
						checkApikey(apikey, ipAddres, function(result){
							if(result.err_code == 0){
								checkId(apikey, _id, 'RELATEDPERSON_RELATIONSHIPTYPE', function(resultCheckId){
									if(resultCheckId.err_code == 0){
										if(typeof req.body.code !== 'undefined'){
											checkCode(apikey, code, 'RELATEDPERSON_RELATIONSHIPTYPE', function(resultCode){
												if(resultCode.err_code == 0){
													//method, endpoint, params, options, callback
													ApiFHIR.put('relatedPersonRelationshipType', {"apikey": apikey, "_id": _id}, {body: dataRelatedPersonRelationshipType, json: true}, function(error, response, body){
														if(error){
														  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateRelatedPersonRelationshipType"});
														  }else{
														  	//cek apakah ada error atau tidak
														  	var relatedPersonRelationshipType = body; 
														  	
														  	//cek apakah ada error atau tidak
														  	if(relatedPersonRelationshipType.err_code == 0){
															  	res.json({"err_code": 0, "err_msg": "Related Person Relationship Type has been update.","data":relatedPersonRelationshipType.data});
														  	}else{
														  		res.json({"err_code": 3, "err_msg": relatedPersonRelationshipType.error, "application": "Api FHIR", "function": "updateRelatedPersonRelationshipType"});
														  	}
														  }
													})
												}else{
													res.json(resultCode);
												}
											})
										}else{
											//method, endpoint, params, options, callback
											ApiFHIR.put('relatedPersonRelationshipType', {"apikey": apikey, "_id": _id}, {body: dataRelatedPersonRelationshipType, json: true}, function(error, response, body){
												if(error){
												  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateRelatedPersonRelationshipType"});
												  }else{
												  	//cek apakah ada error atau tidak
												  	var relatedPersonRelationshipType = body; 
												  	
												  	//cek apakah ada error atau tidak
												  	if(relatedPersonRelationshipType.err_code == 0){
													  	res.json({"err_code": 0, "err_msg": "Related Person Relationship Type has been update.","data":relatedPersonRelationshipType.data});
												  	}else{
												  		res.json({"err_code": 3, "err_msg": relatedPersonRelationshipType.error, "application": "Api FHIR", "function": "updateRelatedPersonRelationshipType"});
												  	}
												  }
											})
										}
									}else{
										res.json(resultCheckId);
									}
								})
							}else{
								result.err_code = 500;
								res.json(result);
							}	
						});
					}else{
						res.json({"err_code": 4, "err_msg": "Id must be a number."});	
					}
				}
			},
			groupType: function updateGroupType(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				var dataGroupType = {};

				if(typeof req.body.code !== 'undefined'){
					var code = req.body.code.trim().toLowerCase();
					dataGroupType.code = code;
				}

				if(typeof req.body.display !== 'undefined'){
					display = req.body.display.replace(/[^\w\s ,]/gi, '');
					dataGroupType.display = display;
				}

				if(typeof req.body.definition !== 'undefined'){
					definition = req.body.definition.replace(/[^\w\s , ( )]/gi, '');
					dataGroupType.definition = definition;
				}

				if(_id == "" || typeof _id == 'undefined'){
					res.json({"err_code": 5, "err_msg": "Id is required."});	
				}else{
					if(validator.isInt(_id)){
						checkApikey(apikey, ipAddres, function(result){
							if(result.err_code == 0){
								checkId(apikey, _id, 'GROUP_TYPE', function(resultCheckId){
									if(resultCheckId.err_code == 0){
										if(typeof req.body.code !== 'undefined'){
											checkCode(apikey, code, 'GROUP_TYPE', function(resultCode){
												if(resultCode.err_code == 0){
													//method, endpoint, params, options, callback
													ApiFHIR.put('groupType', {"apikey": apikey, "_id": _id}, {body: dataGroupType, json: true}, function(error, response, body){
														if(error){
														  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateGroupType"});
														  }else{
														  	//cek apakah ada error atau tidak
														  	var groupType = body; 
														  	
														  	//cek apakah ada error atau tidak
														  	if(groupType.err_code == 0){
															  	res.json({"err_code": 0, "err_msg": "Group Type has been update.","data":groupType.data});
														  	}else{
														  		res.json({"err_code": 3, "err_msg": groupType.error, "application": "Api FHIR", "function": "updateGroupType"});
														  	}
														  }
													})
												}else{
													res.json(resultCode);
												}
											})
										}else{
											//method, endpoint, params, options, callback
											ApiFHIR.put('groupType', {"apikey": apikey, "_id": _id}, {body: dataGroupType, json: true}, function(error, response, body){
												if(error){
												  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateGroupType"});
												  }else{
												  	//cek apakah ada error atau tidak
												  	var groupType = body; 
												  	
												  	//cek apakah ada error atau tidak
												  	if(groupType.err_code == 0){
													  	res.json({"err_code": 0, "err_msg": "Group Type has been update.","data":groupType.data});
												  	}else{
												  		res.json({"err_code": 3, "err_msg": groupType.error, "application": "Api FHIR", "function": "updateGroupType"});
												  	}
												  }
											})
										}
									}else{
										res.json(resultCheckId);
									}
								})
							}else{
								result.err_code = 500;
								res.json(result);
							}	
						});
					}else{
						res.json({"err_code": 4, "err_msg": "Id must be a number."});	
					}
				}
			},
			identifierUse: function updateIdentifierUse(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				var dataIdentifierUse = {};

				if(typeof req.body.code !== 'undefined'){
					var code = req.body.code.trim().toLowerCase();
					dataIdentifierUse.code = code;
				}

				if(typeof req.body.display !== 'undefined'){
					display = req.body.display.replace(/[^\w\s ,]/gi, '');
					dataIdentifierUse.display = display;
				}

				if(typeof req.body.definition !== 'undefined'){
					definition = req.body.definition.replace(/[^\w\s , ( )]/gi, '');
					dataIdentifierUse.definition = definition;
				}

				if(_id == "" || typeof _id == 'undefined'){
					res.json({"err_code": 5, "err_msg": "Id is required."});	
				}else{
					if(validator.isInt(_id)){
						checkApikey(apikey, ipAddres, function(result){
							if(result.err_code == 0){
								checkId(apikey, _id, 'IDENTIFIER_USE', function(resultCheckId){
									if(resultCheckId.err_code == 0){
										if(typeof req.body.code !== 'undefined'){
											checkCode(apikey, code, 'IDENTIFIER_USE', function(resultCode){
												if(resultCode.err_code == 0){
													//method, endpoint, params, options, callback
													ApiFHIR.put('identifierUse', {"apikey": apikey, "_id": _id}, {body: dataIdentifierUse, json: true}, function(error, response, body){
														if(error){
														  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateIdentifierUse"});
														  }else{
														  	//cek apakah ada error atau tidak
														  	var identifierUse = body; 
														  	
														  	//cek apakah ada error atau tidak
														  	if(identifierUse.err_code == 0){
															  	res.json({"err_code": 0, "err_msg": "Identifier Use has been update.","data":identifierUse.data});
														  	}else{
														  		res.json({"err_code": 3, "err_msg": identifierUse.error, "application": "Api FHIR", "function": "updateIdentifierUse"});
														  	}
														  }
													})
												}else{
													res.json(resultCode);
												}
											})
										}else{
											//method, endpoint, params, options, callback
											ApiFHIR.put('identifierUse', {"apikey": apikey, "_id": _id}, {body: dataIdentifierUse, json: true}, function(error, response, body){
												if(error){
												  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateIdentifierUse"});
												  }else{
												  	//cek apakah ada error atau tidak
												  	var identifierUse = body; 
												  	
												  	//cek apakah ada error atau tidak
												  	if(identifierUse.err_code == 0){
													  	res.json({"err_code": 0, "err_msg": "Identifier use has been update.","data":identifierUse.data});
												  	}else{
												  		res.json({"err_code": 3, "err_msg": identifierUse.error, "application": "Api FHIR", "function": "updateIdentifierUse"});
												  	}
												  }
											})
										}
									}else{
										res.json(resultCheckId);
									}
								})
							}else{
								result.err_code = 500;
								res.json(result);
							}	
						});
					}else{
						res.json({"err_code": 4, "err_msg": "Id must be a number."});	
					}
				}
			},
			identifierType: function updateIdentifierType(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				var dataIdentifierType = {};

				if(typeof req.body.code !== 'undefined'){
					var code = req.body.code.trim().toUpperCase();
					dataIdentifierType.code = code;
				}

				if(typeof req.body.display !== 'undefined'){
					var display = req.body.definition.replace(/[^\w\s , ( ) /]/gi, '');
					dataIdentifierType.display = display;
				}

				if(_id == "" || typeof _id == 'undefined'){
					res.json({"err_code": 5, "err_msg": "Id is required."});	
				}else{
					if(validator.isInt(_id)){
						checkApikey(apikey, ipAddres, function(result){
							if(result.err_code == 0){
								checkId(apikey, _id, 'IDENTIFIER_TYPE', function(resultCheckId){
									if(resultCheckId.err_code == 0){
										if(typeof req.body.code !== 'undefined'){
											checkCode(apikey, code, 'IDENTIFIER_TYPE', function(resultCode){
												if(resultCode.err_code == 0){
													//method, endpoint, params, options, callback
													ApiFHIR.put('identifierType', {"apikey": apikey, "_id": _id}, {body: dataIdentifierType, json: true}, function(error, response, body){
														if(error){
														  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateIdentifierType"});
														  }else{
														  	//cek apakah ada error atau tidak
														  	var identifierType = body; 
														  	
														  	//cek apakah ada error atau tidak
														  	if(identifierType.err_code == 0){
															  	res.json({"err_code": 0, "err_msg": "Identifier Type has been update.","data":identifierType.data});
														  	}else{
														  		res.json({"err_code": 3, "err_msg": identifierType.error, "application": "Api FHIR", "function": "updateIdentifierType"});
														  	}
														  }
													})
												}else{
													res.json(resultCode);
												}
											})
										}else{
											//method, endpoint, params, options, callback
											ApiFHIR.put('identifierType', {"apikey": apikey, "_id": _id}, {body: dataIdentifierType, json: true}, function(error, response, body){
												if(error){
												  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateIdentifierType"});
												  }else{
												  	//cek apakah ada error atau tidak
												  	var identifierType = body; 
												  	
												  	//cek apakah ada error atau tidak
												  	if(identifierType.err_code == 0){
													  	res.json({"err_code": 0, "err_msg": "Identifier Type has been update.","data":identifierType.data});
												  	}else{
												  		res.json({"err_code": 3, "err_msg": identifierType.error, "application": "Api FHIR", "function": "updateIdentifierType"});
												  	}
												  }
											})
										}
									}else{
										res.json(resultCheckId);
									}
								})
							}else{
								result.err_code = 500;
								res.json(result);
							}	
						});
					}else{
						res.json({"err_code": 4, "err_msg": "Id must be a number."});	
					}
				}
			},
			nameUse: function updateNameUse(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				var dataNameUse = {};

				if(typeof req.body.code !== 'undefined'){
					var code = req.body.code.trim();
					dataNameUse.code = code;
				}

				if(typeof req.body.display !== 'undefined'){
					display = req.body.display;
					dataNameUse.display = display;
				}

				if(typeof req.body.definition !== 'undefined'){
					var definition = req.body.definition.replace(/[^\w\s , ( ) /]/gi, '');
					dataNameUse.definition = definition;
				}

				if(_id == "" || typeof _id == 'undefined'){
					res.json({"err_code": 5, "err_msg": "Id is required."});	
				}else{
					if(validator.isInt(_id)){
						checkApikey(apikey, ipAddres, function(result){
							if(result.err_code == 0){
								checkId(apikey, _id, 'NAME_USE', function(resultCheckId){
									if(resultCheckId.err_code == 0){
										if(typeof req.body.code !== 'undefined'){
											checkCode(apikey, code, 'NAME_USE', function(resultCode){
												if(resultCode.err_code == 0){
													//method, endpoint, params, options, callback
													ApiFHIR.put('nameUse', {"apikey": apikey, "_id": _id}, {body: dataNameUse, json: true}, function(error, response, body){
														if(error){
														  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateNameUse"});
														  }else{
														  	//cek apakah ada error atau tidak
														  	var nameUse = body; 
														  	
														  	//cek apakah ada error atau tidak
														  	if(nameUse.err_code == 0){
															  	res.json({"err_code": 0, "err_msg": "Name Use has been update.","data":nameUse.data});
														  	}else{
														  		res.json({"err_code": 3, "err_msg": nameUse.error, "application": "Api FHIR", "function": "updateNameUse"});
														  	}
														  }
													})
												}else{
													res.json(resultCode);
												}
											})
										}else{
											//method, endpoint, params, options, callback
											ApiFHIR.put('nameUse', {"apikey": apikey, "_id": _id}, {body: dataNameUse, json: true}, function(error, response, body){
												if(error){
												  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateNameUse"});
												  }else{
												  	//cek apakah ada error atau tidak
												  	var nameUse = body; 
												  	
												  	//cek apakah ada error atau tidak
												  	if(nameUse.err_code == 0){
													  	res.json({"err_code": 0, "err_msg": "Name Use has been update.","data":nameUse.data});
												  	}else{
												  		res.json({"err_code": 3, "err_msg": nameUse.error, "application": "Api FHIR", "function": "updateNameUse"});
												  	}
												  }
											})
										}
									}else{
										res.json(resultCheckId);
									}
								})
							}else{
								result.err_code = 500;
								res.json(result);
							}	
						});
					}else{
						res.json({"err_code": 4, "err_msg": "Id must be a number."});	
					}
				}
			},
			contactPointSystem: function updateContactPointSystem(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				var dataContactPointSystem = {};

				if(typeof req.body.code !== 'undefined'){
					var code = req.body.code.trim().toLowerCase();
					dataContactPointSystem.code = code;
				}

				if(typeof req.body.display !== 'undefined'){
					display = req.body.display;
					dataContactPointSystem.display = display;
				}

				if(typeof req.body.definition !== 'undefined'){
					var definition = req.body.definition.replace(/[^\w\s , ( ) /]/gi, '');
					dataContactPointSystem.definition = definition;
				}

				if(_id == "" || typeof _id == 'undefined'){
					res.json({"err_code": 5, "err_msg": "Id is required."});	
				}else{
					if(validator.isInt(_id)){
						checkApikey(apikey, ipAddres, function(result){
							if(result.err_code == 0){
								checkId(apikey, _id, 'CONTACT_POINT_SYSTEM', function(resultCheckId){
									if(resultCheckId.err_code == 0){
										if(typeof req.body.code !== 'undefined'){
											checkCode(apikey, code, 'CONTACT_POINT_SYSTEM', function(resultCode){
												if(resultCode.err_code == 0){
													//method, endpoint, params, options, callback
													ApiFHIR.put('contactPointSystem', {"apikey": apikey, "_id": _id}, {body: dataContactPointSystem, json: true}, function(error, response, body){
														if(error){
														  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateContactPointSystem"});
														  }else{
														  	//cek apakah ada error atau tidak
														  	var contactPointSystem = body; 
														  	
														  	//cek apakah ada error atau tidak
														  	if(contactPointSystem.err_code == 0){
															  	res.json({"err_code": 0, "err_msg": "Contact Point System has been update.","data":contactPointSystem.data});
														  	}else{
														  		res.json({"err_code": 3, "err_msg": contactPointSystem.error, "application": "Api FHIR", "function": "updateContactPointSystem"});
														  	}
														  }
													})
												}else{
													res.json(resultCode);
												}
											})
										}else{
											//method, endpoint, params, options, callback
											ApiFHIR.put('contactPointSystem', {"apikey": apikey, "_id": _id}, {body: dataContactPointSystem, json: true}, function(error, response, body){
												if(error){
												  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateContactPointSystem"});
												  }else{
												  	//cek apakah ada error atau tidak
												  	var contactPointSystem = body; 
												  	
												  	//cek apakah ada error atau tidak
												  	if(contactPointSystem.err_code == 0){
													  	res.json({"err_code": 0, "err_msg": "Contact Point System has been update.","data":contactPointSystem.data});
												  	}else{
												  		res.json({"err_code": 3, "err_msg": contactPointSystem.error, "application": "Api FHIR", "function": "updateContactPointSystem"});
												  	}
												  }
											})
										}
									}else{
										res.json(resultCheckId);
									}
								})
							}else{
								result.err_code = 500;
								res.json(result);
							}	
						});
					}else{
						res.json({"err_code": 4, "err_msg": "Id must be a number."});	
					}
				}
			},
			contactPointUse: function updateContactPointUse(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				var dataContactPointUse = {};

				if(typeof req.body.code !== 'undefined'){
					var code = req.body.code.trim().toLowerCase();
					dataContactPointUse.code = code;
				}

				if(typeof req.body.display !== 'undefined'){
					display = req.body.display;
					dataContactPointUse.display = display;
				}

				if(typeof req.body.definition !== 'undefined'){
					var definition = req.body.definition.replace(/[^\w\s , ( ) /]/gi, '');
					dataContactPointUse.definition = definition;
				}

				if(_id == "" || typeof _id == 'undefined'){
					res.json({"err_code": 5, "err_msg": "Id is required."});	
				}else{
					if(validator.isInt(_id)){
						checkApikey(apikey, ipAddres, function(result){
							if(result.err_code == 0){
								checkId(apikey, _id, 'CONTACT_POINT_USE', function(resultCheckId){
									if(resultCheckId.err_code == 0){
										if(typeof req.body.code !== 'undefined'){
											checkCode(apikey, code, 'CONTACT_POINT_USE', function(resultCode){
												if(resultCode.err_code == 0){
													//method, endpoint, params, options, callback
													ApiFHIR.put('contactPointUse', {"apikey": apikey, "_id": _id}, {body: dataContactPointUse, json: true}, function(error, response, body){
														if(error){
														  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateContactPointUse"});
														  }else{
														  	//cek apakah ada error atau tidak
														  	var contactPointUse = body; 
														  	
														  	//cek apakah ada error atau tidak
														  	if(contactPointUse.err_code == 0){
															  	res.json({"err_code": 0, "err_msg": "Contact Point Use has been update.","data":contactPointUse.data});
														  	}else{
														  		res.json({"err_code": 3, "err_msg": contactPointUse.error, "application": "Api FHIR", "function": "updateContactPointUse"});
														  	}
														  }
													})
												}else{
													res.json(resultCode);
												}
											})
										}else{
											//method, endpoint, params, options, callback
											ApiFHIR.put('contactPointUse', {"apikey": apikey, "_id": _id}, {body: dataContactPointUse, json: true}, function(error, response, body){
												if(error){
												  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateContactPointUse"});
												  }else{
												  	//cek apakah ada error atau tidak
												  	var contactPointUse = body; 
												  	
												  	//cek apakah ada error atau tidak
												  	if(contactPointUse.err_code == 0){
													  	res.json({"err_code": 0, "err_msg": "Contact Point Use has been update.","data":contactPointSystem.data});
												  	}else{
												  		res.json({"err_code": 3, "err_msg": contactPointUse.error, "application": "Api FHIR", "function": "updateContactPointUse"});
												  	}
												  }
											})
										}
									}else{
										res.json(resultCheckId);
									}
								})
							}else{
								result.err_code = 500;
								res.json(result);
							}	
						});
					}else{
						res.json({"err_code": 4, "err_msg": "Id must be a number."});	
					}
				}
			},
			addressUse: function updateAddressUse(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				var dataAddressUse = {};

				if(typeof req.body.code !== 'undefined'){
					var code = req.body.code.trim().toLowerCase();
					dataAddressUse.code = code;
				}

				if(typeof req.body.display !== 'undefined'){
					display = req.body.display;
					dataAddressUse.display = display;
				}

				if(typeof req.body.definition !== 'undefined'){
					var definition = req.body.definition.replace(/[^\w\s , ( ) / .]/gi, '');
					dataAddressUse.definition = definition;
				}

				if(_id == "" || typeof _id == 'undefined'){
					res.json({"err_code": 5, "err_msg": "Id is required."});	
				}else{
					if(validator.isInt(_id)){
						checkApikey(apikey, ipAddres, function(result){
							if(result.err_code == 0){
								checkId(apikey, _id, 'ADDRESS_USE', function(resultCheckId){
									if(resultCheckId.err_code == 0){
										if(typeof req.body.code !== 'undefined'){
											checkCode(apikey, code, 'ADDRESS_USE', function(resultCode){
												if(resultCode.err_code == 0){
													//method, endpoint, params, options, callback
													ApiFHIR.put('addressUse', {"apikey": apikey, "_id": _id}, {body: dataAddressUse, json: true}, function(error, response, body){
														if(error){
														  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateAddressUse"});
														  }else{
														  	//cek apakah ada error atau tidak
														  	var addressUse = body; 
														  	
														  	//cek apakah ada error atau tidak
														  	if(addressUse.err_code == 0){
															  	res.json({"err_code": 0, "err_msg": "Address Use has been update.","data":addressUse.data});
														  	}else{
														  		res.json({"err_code": 3, "err_msg": addressUse.error, "application": "Api FHIR", "function": "updateAddressUse"});
														  	}
														  }
													})
												}else{
													res.json(resultCode);
												}
											})
										}else{
											//method, endpoint, params, options, callback
											ApiFHIR.put('addressUse', {"apikey": apikey, "_id": _id}, {body: dataAddressUse, json: true}, function(error, response, body){
												if(error){
												  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateAddressUse"});
												  }else{
												  	//cek apakah ada error atau tidak
												  	var addressUse = body; 
												  	
												  	//cek apakah ada error atau tidak
												  	if(addressUse.err_code == 0){
													  	res.json({"err_code": 0, "err_msg": "Address Use has been update.","data":addressUse.data});
												  	}else{
												  		res.json({"err_code": 3, "err_msg": addressUse.error, "application": "Api FHIR", "function": "updateAddressUse"});
												  	}
												  }
											})
										}
									}else{
										res.json(resultCheckId);
									}
								})
							}else{
								result.err_code = 500;
								res.json(result);
							}	
						});
					}else{
						res.json({"err_code": 4, "err_msg": "Id must be a number."});	
					}
				}
			},
			addressType: function updateAddressType(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				var dataAddressType = {};

				if(typeof req.body.code !== 'undefined'){
					var code = req.body.code.trim().toLowerCase();
					dataAddressType.code = code;
				}

				if(typeof req.body.display !== 'undefined'){
					display = req.body.display;
					dataAddressType.display = display;
				}

				if(typeof req.body.definition !== 'undefined'){
					var definition = req.body.definition.replace(/[^\w\s , ( ) / .]/gi, '');
					dataAddressType.definition = definition;
				}

				if(_id == "" || typeof _id == 'undefined'){
					res.json({"err_code": 5, "err_msg": "Id is required."});	
				}else{
					if(validator.isInt(_id)){
						checkApikey(apikey, ipAddres, function(result){
							if(result.err_code == 0){
								checkId(apikey, _id, 'ADDRESS_TYPE', function(resultCheckId){
									if(resultCheckId.err_code == 0){
										if(typeof req.body.code !== 'undefined'){
											checkCode(apikey, code, 'ADDRESS_TYPE', function(resultCode){
												if(resultCode.err_code == 0){
													//method, endpoint, params, options, callback
													ApiFHIR.put('addressType', {"apikey": apikey, "_id": _id}, {body: dataAddressType, json: true}, function(error, response, body){
														if(error){
														  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateAddressType"});
														  }else{
														  	//cek apakah ada error atau tidak
														  	var addressType = body; 
														  	
														  	//cek apakah ada error atau tidak
														  	if(addressType.err_code == 0){
															  	res.json({"err_code": 0, "err_msg": "Address Type has been update.","data":addressType.data});
														  	}else{
														  		res.json({"err_code": 3, "err_msg": addressType.error, "application": "Api FHIR", "function": "updateAddressType"});
														  	}
														  }
													})
												}else{
													res.json(resultCode);
												}
											})
										}else{
											//method, endpoint, params, options, callback
											ApiFHIR.put('addressType', {"apikey": apikey, "_id": _id}, {body: dataAddressType, json: true}, function(error, response, body){
												if(error){
												  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateAddressType"});
												  }else{
												  	//cek apakah ada error atau tidak
												  	var addressType = body; 
												  	
												  	//cek apakah ada error atau tidak
												  	if(addressType.err_code == 0){
													  	res.json({"err_code": 0, "err_msg": "Address Type has been update.","data":addressType.data});
												  	}else{
												  		res.json({"err_code": 3, "err_msg": addressType.error, "application": "Api FHIR", "function": "updateAddressType"});
												  	}
												  }
											})
										}
									}else{
										res.json(resultCheckId);
									}
								})
							}else{
								result.err_code = 500;
								res.json(result);
							}	
						});
					}else{
						res.json({"err_code": 4, "err_msg": "Id must be a number."});	
					}
				}
			},
			// put hcs start
			organizationType: function updateOrganizationType(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				var dataOrganizationType = {};

				if(typeof req.body.code !== 'undefined'){
					var code = req.body.code.trim().toLowerCase();
					dataOrganizationType.code = code;
				}
				if(typeof req.body.display !== 'undefined'){
					var display = req.body.display;
					dataOrganizationType.display = display;
				}
				if(typeof req.body.definition !== 'undefined'){
					var definition = req.body.definition.replace(/[^\w\s ,]/gi, '');
					dataOrganizationType.definition = definition;
				}

				if(_id == "" || typeof _id == 'undefined'){
					res.json({"err_code": 5, "err_msg": "Id is required."});	
				}else{
					if(validator.isInt(_id)){
						checkApikey(apikey, ipAddres, function(result){
							if(result.err_code == 0){
								checkId(apikey, _id, 'ORGANIZATION_TYPE', function(resultCheckId){
									if(resultCheckId.err_code == 0){
										if(typeof req.body.code !== 'undefined'){
											checkCode(apikey, code, 'ORGANIZATION_TYPE', function(resultCode){
												if(resultCode.err_code == 0){
													//method, endpoint, params, options, callback
													ApiFHIR.put('organizationType', {"apikey": apikey, "_id": _id}, {body: dataOrganizationType, json: true}, function(error, response, body){
														if(error){
														  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateOrganizationType"});
														  }else{
														  	//cek apakah ada error atau tidak
														  	var organizationType = body; 
														  	
														  	//cek apakah ada error atau tidak
														  	if(organizationType.err_code == 0){
															  	res.json({"err_code": 0, "err_msg": "Organization Type has been update.","data":organizationType.data});
														  	}else{
														  		res.json({"err_code": 3, "err_msg": organizationType.error, "application": "Api FHIR", "function": "updateOrganizationType"});
														  	}
														  }
													})
												}else{
													res.json(resultCode);
												}
											})
										}else{
											//method, endpoint, params, options, callback
											ApiFHIR.put('organizationType', {"apikey": apikey, "_id": _id}, {body: dataOrganizationType, json: true}, function(error, response, body){
												if(error){
												  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateOrganizationType"});
												  }else{
												  	//cek apakah ada error atau tidak
												  	var organizationType = body; 
												  	
												  	//cek apakah ada error atau tidak
												  	if(organizationType.err_code == 0){
													  	res.json({"err_code": 0, "err_msg": "Organization Type has been update.","data":organizationType.data});
												  	}else{
												  		res.json({"err_code": 3, "err_msg": organizationType.error, "application": "Api FHIR", "function": "updateOrganizationType"});
												  	}
												  }
											})
										}
									}else{
										res.json(resultCheckId);
									}
								})
							}else{
								result.err_code = 500;
								res.json(result);
							}	
						});
					}else{
						res.json({"err_code": 4, "err_msg": "Id must be a number."});	
					}
				}
			},
			contactentityType: function updateContactentityType(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				var dataContactentityType = {};

				if(typeof req.body.code !== 'undefined'){
					var code = req.body.code.trim().toLowerCase();
					dataContactentityType.code = code;
				}
				if(typeof req.body.display !== 'undefined'){
					var display = req.body.display;
					dataContactentityType.display = display;
				}
				if(typeof req.body.definition !== 'undefined'){
					var definition = req.body.definition.replace(/[^\w\s ,]/gi, '');
					dataContactentityType.definition = definition;
				}

				if(_id == "" || typeof _id == 'undefined'){
					res.json({"err_code": 5, "err_msg": "Id is required."});	
				}else{
					if(validator.isInt(_id)){
						checkApikey(apikey, ipAddres, function(result){
							if(result.err_code == 0){
								checkId(apikey, _id, 'CONTACT_ENTITY_TYPE', function(resultCheckId){
									if(resultCheckId.err_code == 0){
										if(typeof req.body.code !== 'undefined'){
											checkCode(apikey, code, 'CONTACT_ENTITY_TYPE', function(resultCode){
												if(resultCode.err_code == 0){
													//method, endpoint, params, options, callback
													ApiFHIR.put('contactentityType', {"apikey": apikey, "_id": _id}, {body: dataContactentityType, json: true}, function(error, response, body){
														if(error){
														  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateContactentityType"});
														  }else{
														  	//cek apakah ada error atau tidak
														  	var contactentityType = body; 
														  	
														  	//cek apakah ada error atau tidak
														  	if(contactentityType.err_code == 0){
															  	res.json({"err_code": 0, "err_msg": "Contactentity Type has been update.","data":contactentityType.data});
														  	}else{
														  		res.json({"err_code": 3, "err_msg": contactentityType.error, "application": "Api FHIR", "function": "updateContactentityType"});
														  	}
														  }
													})
												}else{
													res.json(resultCode);
												}
											})
										}else{
											//method, endpoint, params, options, callback
											ApiFHIR.put('contactentityType', {"apikey": apikey, "_id": _id}, {body: dataContactentityType, json: true}, function(error, response, body){
												if(error){
												  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateContactentityType"});
												  }else{
												  	//cek apakah ada error atau tidak
												  	var contactentityType = body; 
												  	
												  	//cek apakah ada error atau tidak
												  	if(contactentityType.err_code == 0){
													  	res.json({"err_code": 0, "err_msg": "Contactentity Type has been update.","data":contactentityType.data});
												  	}else{
												  		res.json({"err_code": 3, "err_msg": contactentityType.error, "application": "Api FHIR", "function": "updateContactentityType"});
												  	}
												  }
											})
										}
									}else{
										res.json(resultCheckId);
									}
								})
							}else{
								result.err_code = 500;
								res.json(result);
							}	
						});
					}else{
						res.json({"err_code": 4, "err_msg": "Id must be a number."});	
					}
				}
			},
			locationStatus: function updateLocationStatus(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				var dataLocationStatus = {};

				if(typeof req.body.code !== 'undefined'){
					var code = req.body.code.trim().toLowerCase();
					dataLocationStatus.code = code;
				}
				if(typeof req.body.display !== 'undefined'){
					var display = req.body.display;
					dataLocationStatus.display = display;
				}
				if(typeof req.body.definition !== 'undefined'){
					var definition = req.body.definition.replace(/[^\w\s ,]/gi, '');
					dataLocationStatus.definition = definition;
				}

				if(_id == "" || typeof _id == 'undefined'){
					res.json({"err_code": 5, "err_msg": "Id is required."});	
				}else{
					if(validator.isInt(_id)){
						checkApikey(apikey, ipAddres, function(result){
							if(result.err_code == 0){
								checkId(apikey, _id, 'LOCATION_STATUS', function(resultCheckId){
									if(resultCheckId.err_code == 0){
										if(typeof req.body.code !== 'undefined'){
											checkCode(apikey, code, 'LOCATION_STATUS', function(resultCode){
												if(resultCode.err_code == 0){
													//method, endpoint, params, options, callback
													ApiFHIR.put('locationStatus', {"apikey": apikey, "_id": _id}, {body: dataLocationStatus, json: true}, function(error, response, body){
														if(error){
														  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateLocationStatus"});
														  }else{
														  	//cek apakah ada error atau tidak
														  	var locationStatus = body; 
														  	
														  	//cek apakah ada error atau tidak
														  	if(locationStatus.err_code == 0){
															  	res.json({"err_code": 0, "err_msg": "Location Status has been update.","data":locationStatus.data});
														  	}else{
														  		res.json({"err_code": 3, "err_msg": locationStatus.error, "application": "Api FHIR", "function": "updateLocationStatus"});
														  	}
														  }
													})
												}else{
													res.json(resultCode);
												}
											})
										}else{
											//method, endpoint, params, options, callback
											ApiFHIR.put('locationStatus', {"apikey": apikey, "_id": _id}, {body: dataLocationStatus, json: true}, function(error, response, body){
												if(error){
												  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateLocationStatus"});
												  }else{
												  	//cek apakah ada error atau tidak
												  	var locationStatus = body; 
												  	
												  	//cek apakah ada error atau tidak
												  	if(locationStatus.err_code == 0){
													  	res.json({"err_code": 0, "err_msg": "Location Status has been update.","data":locationStatus.data});
												  	}else{
												  		res.json({"err_code": 3, "err_msg": locationStatus.error, "application": "Api FHIR", "function": "updateLocationStatus"});
												  	}
												  }
											})
										}
									}else{
										res.json(resultCheckId);
									}
								})
							}else{
								result.err_code = 500;
								res.json(result);
							}	
						});
					}else{
						res.json({"err_code": 4, "err_msg": "Id must be a number."});	
					}
				}
			},
			bedStatus: function updateBedStatus(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				var dataBedStatus = {};

				if(typeof req.body.code !== 'undefined'){
					var code = req.body.code.trim().toUpperCase();
					dataBedStatus.code = code;
				}

				if(typeof req.body.description !== 'undefined'){
					description = req.body.description.replace(/[^\w\s ,]/gi, '');
					dataBedStatus.description = description;
				}


				if(_id == "" || typeof _id == 'undefined'){
					res.json({"err_code": 5, "err_msg": "Id is required."});	
				}else{
					if(validator.isInt(_id)){
						checkApikey(apikey, ipAddres, function(result){
							if(result.err_code == 0){
								checkId(apikey, _id, 'BED_STATUS', function(resultCheckId){
									if(resultCheckId.err_code == 0){
										if(typeof req.body.code !== 'undefined'){
											checkCode(apikey, code, 'BED_STATUS', function(resultCode){
												if(resultCode.err_code == 0){
													//method, endpoint, params, options, callback
													ApiFHIR.put('bedStatus', {"apikey": apikey, "_id": _id}, {body: dataBedStatus, json: true}, function(error, response, body){
														if(error){
														  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateBedStatus"});
														  }else{
														  	//cek apakah ada error atau tidak
														  	var bedStatus = body; 
														  	
														  	//cek apakah ada error atau tidak
														  	if(bedStatus.err_code == 0){
															  	res.json({"err_code": 0, "err_msg": "Bed Status has been update.","data":bedStatus.data});
														  	}else{
														  		res.json({"err_code": 3, "err_msg": bedStatus.error, "application": "Api FHIR", "function": "updateBedStatus"});
														  	}
														  }
													})
												}else{
													res.json(resultCode);
												}
											})
										}else{
											//method, endpoint, params, options, callback
											ApiFHIR.put('bedStatus', {"apikey": apikey, "_id": _id}, {body: dataBedStatus, json: true}, function(error, response, body){
												if(error){
												  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateBedStatus"});
												  }else{
												  	//cek apakah ada error atau tidak
												  	var bedStatus = body; 
												  	
												  	//cek apakah ada error atau tidak
												  	if(bedStatus.err_code == 0){
													  	res.json({"err_code": 0, "err_msg": "Bed Status has been update.","data":bedStatus.data});
												  	}else{
												  		res.json({"err_code": 3, "err_msg": bedStatus.error, "application": "Api FHIR", "function": "updateBedStatus"});
												  	}
												  }
											})
										}
									}else{
										res.json(resultCheckId);
									}
								})
							}else{
								result.err_code = 500;
								res.json(result);
							}	
						});
					}else{
						res.json({"err_code": 4, "err_msg": "Id must be a number."});	
					}
				}
			},
			locationMode: function updateLocationMode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				var dataLocationMode = {};

				if(typeof req.body.code !== 'undefined'){
					var code = req.body.code.trim().toLowerCase();
					dataLocationMode.code = code;
				}
				if(typeof req.body.display !== 'undefined'){
					var display = req.body.display;
					dataLocationMode.display = display;
				}
				if(typeof req.body.definition !== 'undefined'){
					var definition = req.body.definition.replace(/[^\w\s ,]/gi, '');
					dataLocationMode.definition = definition;
				}

				if(_id == "" || typeof _id == 'undefined'){
					res.json({"err_code": 5, "err_msg": "Id is required."});	
				}else{
					if(validator.isInt(_id)){
						checkApikey(apikey, ipAddres, function(result){
							if(result.err_code == 0){
								checkId(apikey, _id, 'LOCATION_MODE', function(resultCheckId){
									if(resultCheckId.err_code == 0){
										if(typeof req.body.code !== 'undefined'){
											checkCode(apikey, code, 'LOCATION_MODE', function(resultCode){
												if(resultCode.err_code == 0){
													//method, endpoint, params, options, callback
													ApiFHIR.put('locationMode', {"apikey": apikey, "_id": _id}, {body: dataLocationMode, json: true}, function(error, response, body){
														if(error){
														  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateLocationMode"});
														  }else{
														  	//cek apakah ada error atau tidak
														  	var locationMode = body; 
														  	
														  	//cek apakah ada error atau tidak
														  	if(locationMode.err_code == 0){
															  	res.json({"err_code": 0, "err_msg": "Location Mode has been update.","data":locationMode.data});
														  	}else{
														  		res.json({"err_code": 3, "err_msg": locationMode.error, "application": "Api FHIR", "function": "updateLocationMode"});
														  	}
														  }
													})
												}else{
													res.json(resultCode);
												}
											})
										}else{
											//method, endpoint, params, options, callback
											ApiFHIR.put('locationMode', {"apikey": apikey, "_id": _id}, {body: dataLocationMode, json: true}, function(error, response, body){
												if(error){
												  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateLocationMode"});
												  }else{
												  	//cek apakah ada error atau tidak
												  	var locationMode = body; 
												  	
												  	//cek apakah ada error atau tidak
												  	if(locationMode.err_code == 0){
													  	res.json({"err_code": 0, "err_msg": "Location Mode has been update.","data":locationMode.data});
												  	}else{
												  		res.json({"err_code": 3, "err_msg": locationMode.error, "application": "Api FHIR", "function": "updateLocationMode"});
												  	}
												  }
											})
										}
									}else{
										res.json(resultCheckId);
									}
								})
							}else{
								result.err_code = 500;
								res.json(result);
							}	
						});
					}else{
						res.json({"err_code": 4, "err_msg": "Id must be a number."});	
					}
				}
			},
			serviceDeliveryLocationRoleType: function updateServiceDeliveryLocationRoleType(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				var data = {};

				if(typeof req.body.code !== 'undefined'){
					var code = req.body.code.trim().toLowerCase();
					data.code = code;
				}
				if(typeof req.body.display !== 'undefined'){
					var display = req.body.display;
					data.display = display;
				}
				if(typeof req.body.definition !== 'undefined'){
					var definition = req.body.definition.replace(/[^\w\s ,]/gi, '');
					data.definition = definition;
				}

				if(_id == "" || typeof _id == 'undefined'){
					res.json({"err_code": 5, "err_msg": "Id is required."});	
				}else{
					if(validator.isInt(_id)){
						checkApikey(apikey, ipAddres, function(result){
							if(result.err_code == 0){
								checkId(apikey, _id, 'SERVICE_DELIVERY_LOCATION_ROLE_TYPE', function(resultCheckId){
									if(resultCheckId.err_code == 0){
										if(typeof req.body.code !== 'undefined'){
											checkCode(apikey, code, 'SERVICE_DELIVERY_LOCATION_ROLE_TYPE', function(resultCode){
												if(resultCode.err_code == 0){
													//method, endpoint, params, options, callback
													ApiFHIR.put('serviceDeliveryLocationRoleType', {"apikey": apikey, "_id": _id}, {body: data, json: true}, function(error, response, body){
														if(error){
														  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateServiceDeliveryLocationRoleType"});
														  }else{
														  	//cek apakah ada error atau tidak
														  	var serviceDeliveryLocationRoleType = body; 
														  	
														  	//cek apakah ada error atau tidak
														  	if(serviceDeliveryLocationRoleType.err_code == 0){
															  	res.json({"err_code": 0, "err_msg": "Update Service Delivery Location Role Type Code has been update.","data":serviceDeliveryLocationRoleType.data});
														  	}else{
														  		res.json({"err_code": 3, "err_msg": serviceDeliveryLocationRoleType.error, "application": "Api FHIR", "function": "updateServiceDeliveryLocationRoleType"});
														  	}
														  }
													})
												}else{
													res.json(resultCode);
												}
											})
										}else{
											//method, endpoint, params, options, callback
											ApiFHIR.put('serviceDeliveryLocationRoleType', {"apikey": apikey, "_id": _id}, {body: data, json: true}, function(error, response, body){
												if(error){
												  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateServiceDeliveryLocationRoleType"});
												  }else{
												  	//cek apakah ada error atau tidak
												  	var serviceDeliveryLocationRoleType = body; 
												  	
												  	//cek apakah ada error atau tidak
												  	if(serviceDeliveryLocationRoleType.err_code == 0){
													  	res.json({"err_code": 0, "err_msg": "Update Service Delivery Location Role Type Code has been update.","data":serviceDeliveryLocationRoleType.data});
												  	}else{
												  		res.json({"err_code": 3, "err_msg": serviceDeliveryLocationRoleType.error, "application": "Api FHIR", "function": "updateServiceDeliveryLocationRoleTypeCode"});
												  	}
												  }
											})
										}
									}else{
										res.json(resultCheckId);
									}
								})
							}else{
								result.err_code = 500;
								res.json(result);
							}	
						});
					}else{
						res.json({"err_code": 4, "err_msg": "Id must be a number."});	
					}
				}
			},
			locationPhysicalType: function updateLocationPhysicalType(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				var dataLocationPhysicalType = {};

				if(typeof req.body.code !== 'undefined'){
					var code = req.body.code.trim().toLowerCase();
					dataLocationPhysicalType.code = code;
				}
				if(typeof req.body.display !== 'undefined'){
					var display = req.body.display;
					dataLocationPhysicalType.display = display;
				}
				if(typeof req.body.definition !== 'undefined'){
					var definition = req.body.definition.replace(/[^\w\s ,]/gi, '');
					dataLocationPhysicalType.definition = definition;
				}

				if(_id == "" || typeof _id == 'undefined'){
					res.json({"err_code": 5, "err_msg": "Id is required."});	
				}else{
					if(validator.isInt(_id)){
						checkApikey(apikey, ipAddres, function(result){
							if(result.err_code == 0){
								checkId(apikey, _id, 'LOCATION_PHYSICAL_TYPE', function(resultCheckId){
									if(resultCheckId.err_code == 0){
										if(typeof req.body.code !== 'undefined'){
											checkCode(apikey, code, 'LOCATION_PHYSICAL_TYPE', function(resultCode){
												if(resultCode.err_code == 0){
													//method, endpoint, params, options, callback
													ApiFHIR.put('locationPhysicalType', {"apikey": apikey, "_id": _id}, {body: dataLocationPhysicalType, json: true}, function(error, response, body){
														if(error){
														  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateLocationPhysicalType"});
														  }else{
														  	//cek apakah ada error atau tidak
														  	var locationPhysicalType = body; 
														  	
														  	//cek apakah ada error atau tidak
														  	if(locationPhysicalType.err_code == 0){
															  	res.json({"err_code": 0, "err_msg": "Location Mode has been update.","data":locationPhysicalType.data});
														  	}else{
														  		res.json({"err_code": 3, "err_msg": locationPhysicalType.error, "application": "Api FHIR", "function": "updateLocationPhysicalType"});
														  	}
														  }
													})
												}else{
													res.json(resultCode);
												}
											})
										}else{
											//method, endpoint, params, options, callback
											ApiFHIR.put('locationPhysicalType', {"apikey": apikey, "_id": _id}, {body: dataLocationPhysicalType, json: true}, function(error, response, body){
												if(error){
												  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateLocationPhysicalType"});
												  }else{
												  	//cek apakah ada error atau tidak
												  	var locationPhysicalType = body; 
												  	
												  	//cek apakah ada error atau tidak
												  	if(locationPhysicalType.err_code == 0){
													  	res.json({"err_code": 0, "err_msg": "Location Mode has been update.","data":locationPhysicalType.data});
												  	}else{
												  		res.json({"err_code": 3, "err_msg": locationPhysicalType.error, "application": "Api FHIR", "function": "updateLocationPhysicalType"});
												  	}
												  }
											})
										}
									}else{
										res.json(resultCheckId);
									}
								})
							}else{
								result.err_code = 500;
								res.json(result);
							}	
						});
					}else{
						res.json({"err_code": 4, "err_msg": "Id must be a number."});	
					}
				}
			},
			qualificationCode: function updateQualificationCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				var data = {};

				if(typeof req.body.code !== 'undefined'){
					var code = req.body.code.trim().toUpperCase();
					data.code = code;
				}

				if(typeof req.body.description !== 'undefined'){
					description = req.body.description.replace(/[^\w\s ,]/gi, '');
					data.description = description;
				}


				if(_id == "" || typeof _id == 'undefined'){
					res.json({"err_code": 5, "err_msg": "Id is required."});	
				}else{
					if(validator.isInt(_id)){
						checkApikey(apikey, ipAddres, function(result){
							if(result.err_code == 0){
								checkId(apikey, _id, 'QUALIFICATION_CODE', function(resultCheckId){
									if(resultCheckId.err_code == 0){
										if(typeof req.body.code !== 'undefined'){
											checkCode(apikey, code, 'QUALIFICATION_CODE', function(resultCode){
												if(resultCode.err_code == 0){
													//method, endpoint, params, options, callback
													ApiFHIR.put('qualificationCode', {"apikey": apikey, "_id": _id}, {body: data, json: true}, function(error, response, body){
														if(error){
														  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updatequalificationCode"});
														  }else{
														  	//cek apakah ada error atau tidak
														  	var qualificationCode = body; 
														  	
														  	//cek apakah ada error atau tidak
														  	if(qualificationCode.err_code == 0){
															  	res.json({"err_code": 0, "err_msg": "Qualification Code has been update.","data":qualificationCode.data});
														  	}else{
														  		res.json({"err_code": 3, "err_msg": qualificationCode.error, "application": "Api FHIR", "function": "updateQualificationCode"});
														  	}
														  }
													})
												}else{
													res.json(resultCode);
												}
											})
										}else{
											//method, endpoint, params, options, callback
											ApiFHIR.put('qualificationCode', {"apikey": apikey, "_id": _id}, {body: data, json: true}, function(error, response, body){
												if(error){
												  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateQualificationCode"});
												  }else{
												  	//cek apakah ada error atau tidak
												  	var qualificationCode = body; 
												  	
												  	//cek apakah ada error atau tidak
												  	if(qualificationCode.err_code == 0){
													  	res.json({"err_code": 0, "err_msg": "Qualification Code has been update.","data":qualificationCode.data});
												  	}else{
												  		res.json({"err_code": 3, "err_msg": qualificationCode.error, "application": "Api FHIR", "function": "updateQualificationCode"});
												  	}
												  }
											})
										}
									}else{
										res.json(resultCheckId);
									}
								})
							}else{
								result.err_code = 500;
								res.json(result);
							}	
						});
					}else{
						res.json({"err_code": 4, "err_msg": "Id must be a number."});	
					}
				}
			},
			practitionerRoleCode: function updatePractitionerRoleCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				var data = {};

				if(typeof req.body.code !== 'undefined'){
					var code = req.body.code.trim().toLowerCase();
					data.code = code;
				}
				if(typeof req.body.display !== 'undefined'){
					var display = req.body.display;
					data.display = display;
				}
				if(typeof req.body.definition !== 'undefined'){
					var definition = req.body.definition.replace(/[^\w\s ,]/gi, '');
					data.definition = definition;
				}

				if(_id == "" || typeof _id == 'undefined'){
					res.json({"err_code": 5, "err_msg": "Id is required."});	
				}else{
					if(validator.isInt(_id)){
						checkApikey(apikey, ipAddres, function(result){
							if(result.err_code == 0){
								checkId(apikey, _id, 'PRACTITIONER_ROLE_CODE', function(resultCheckId){
									if(resultCheckId.err_code == 0){
										if(typeof req.body.code !== 'undefined'){
											checkCode(apikey, code, 'PRACTITIONER_ROLE_CODE', function(resultCode){
												if(resultCode.err_code == 0){
													//method, endpoint, params, options, callback
													ApiFHIR.put('practitionerRoleCode', {"apikey": apikey, "_id": _id}, {body: data, json: true}, function(error, response, body){
														if(error){
														  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updatePractitionerRoleCode"});
														  }else{
														  	//cek apakah ada error atau tidak
														  	var practitionerRoleCode = body; 
														  	
														  	//cek apakah ada error atau tidak
														  	if(practitionerRoleCode.err_code == 0){
															  	res.json({"err_code": 0, "err_msg": "Practitioner Role Code has been update.","data":practitionerRoleCode.data});
														  	}else{
														  		res.json({"err_code": 3, "err_msg": practitionerRoleCode.error, "application": "Api FHIR", "function": "updatePractitionerRoleCode"});
														  	}
														  }
													})
												}else{
													res.json(resultCode);
												}
											})
										}else{
											//method, endpoint, params, options, callback
											ApiFHIR.put('practitionerRoleCode', {"apikey": apikey, "_id": _id}, {body: data, json: true}, function(error, response, body){
												if(error){
												  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updatePractitionerRoleCode"});
												  }else{
												  	//cek apakah ada error atau tidak
												  	var practitionerRoleCode = body; 
												  	
												  	//cek apakah ada error atau tidak
												  	if(practitionerRoleCode.err_code == 0){
													  	res.json({"err_code": 0, "err_msg": "Practitioner Role Code has been update.","data":practitionerRoleCode.data});
												  	}else{
												  		res.json({"err_code": 3, "err_msg": practitionerRoleCode.error, "application": "Api FHIR", "function": "updatePractitionerRoleCode"});
												  	}
												  }
											})
										}
									}else{
										res.json(resultCheckId);
									}
								})
							}else{
								result.err_code = 500;
								res.json(result);
							}	
						});
					}else{
						res.json({"err_code": 4, "err_msg": "Id must be a number."});	
					}
				}
			},
			practiceCode: function updatePracticeCode(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				var data = {};

				if(typeof req.body.code !== 'undefined'){
					var code = req.body.code.trim().toLowerCase();
					data.code = code;
				}
				if(typeof req.body.display !== 'undefined'){
					var display = req.body.display;
					data.display = display;
				}

				if(_id == "" || typeof _id == 'undefined'){
					res.json({"err_code": 5, "err_msg": "Id is required."});	
				}else{
					if(validator.isInt(_id)){
						checkApikey(apikey, ipAddres, function(result){
							if(result.err_code == 0){
								checkId(apikey, _id, 'PRACTICE_CODE', function(resultCheckId){
									if(resultCheckId.err_code == 0){
										if(typeof req.body.code !== 'undefined'){
											checkCode(apikey, code, 'PRACTICE_CODE', function(resultCode){
												if(resultCode.err_code == 0){
													//method, endpoint, params, options, callback
													ApiFHIR.put('practiceCode', {"apikey": apikey, "_id": _id}, {body: data, json: true}, function(error, response, body){
														if(error){
														  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updatePracticeCode"});
														  }else{
														  	//cek apakah ada error atau tidak
														  	var practiceCode = body; 
														  	
														  	//cek apakah ada error atau tidak
														  	if(practiceCode.err_code == 0){
															  	res.json({"err_code": 0, "err_msg": "Practice Code has been update.","data":practiceCode.data});
														  	}else{
														  		res.json({"err_code": 3, "err_msg": practiceCode.error, "application": "Api FHIR", "function": "updatePracticeCode"});
														  	}
														  }
													})
												}else{
													res.json(resultCode);
												}
											})
										}else{
											//method, endpoint, params, options, callback
											ApiFHIR.put('practiceCode', {"apikey": apikey, "_id": _id}, {body: data, json: true}, function(error, response, body){
												if(error){
												  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updatePracticeCode"});
												  }else{
												  	//cek apakah ada error atau tidak
												  	var practiceCode = body; 
												  	
												  	//cek apakah ada error atau tidak
												  	if(practiceCode.err_code == 0){
													  	res.json({"err_code": 0, "err_msg": "Practice Code has been update.","data":practiceCode.data});
												  	}else{
												  		res.json({"err_code": 3, "err_msg": practiceCode.error, "application": "Api FHIR", "function": "updatePracticeCode"});
												  	}
												  }
											})
										}
									}else{
										res.json(resultCheckId);
									}
								})
							}else{
								result.err_code = 500;
								res.json(result);
							}	
						});
					}else{
						res.json({"err_code": 4, "err_msg": "Id must be a number."});	
					}
				}
			},
			daysOfWeek: function updateDaysOfWeek(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				var data = {};

				if(typeof req.body.code !== 'undefined'){
					var code = req.body.code.trim().toLowerCase();
					data.code = code;
				}
				if(typeof req.body.display !== 'undefined'){
					var display = req.body.display;
					data.display = display;
				}
				if(typeof req.body.definition !== 'undefined'){
					var definition = req.body.definition.replace(/[^\w\s ,]/gi, '');
					data.definition = definition;
				}

				if(_id == "" || typeof _id == 'undefined'){
					res.json({"err_code": 5, "err_msg": "Id is required."});	
				}else{
					if(validator.isInt(_id)){
						checkApikey(apikey, ipAddres, function(result){
							if(result.err_code == 0){
								checkId(apikey, _id, 'DAYS_OF_WEEK', function(resultCheckId){
									if(resultCheckId.err_code == 0){
										if(typeof req.body.code !== 'undefined'){
											checkCode(apikey, code, 'DAYS_OF_WEEK', function(resultCode){
												if(resultCode.err_code == 0){
													//method, endpoint, params, options, callback
													ApiFHIR.put('daysOfWeek', {"apikey": apikey, "_id": _id}, {body: data, json: true}, function(error, response, body){
														if(error){
														  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateDaysOfWeek"});
														  }else{
														  	//cek apakah ada error atau tidak
														  	var daysOfWeek = body; 
														  	
														  	//cek apakah ada error atau tidak
														  	if(daysOfWeek.err_code == 0){
															  	res.json({"err_code": 0, "err_msg": "Days Of Week has been update.","data":daysOfWeek.data});
														  	}else{
														  		res.json({"err_code": 3, "err_msg": daysOfWeek.error, "application": "Api FHIR", "function": "updateDaysOfWeek"});
														  	}
														  }
													})
												}else{
													res.json(resultCode);
												}
											})
										}else{
											//method, endpoint, params, options, callback
											ApiFHIR.put('daysOfWeek', {"apikey": apikey, "_id": _id}, {body: data, json: true}, function(error, response, body){
												if(error){
												  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateDaysOfWeek"});
												  }else{
												  	//cek apakah ada error atau tidak
												  	var daysOfWeek = body; 
												  	
												  	//cek apakah ada error atau tidak
												  	if(daysOfWeek.err_code == 0){
													  	res.json({"err_code": 0, "err_msg": "Days Of Week has been update.","data":daysOfWeek.data});
												  	}else{
												  		res.json({"err_code": 3, "err_msg": daysOfWeek.error, "application": "Api FHIR", "function": "updateDaysOfWeek"});
												  	}
												  }
											})
										}
									}else{
										res.json(resultCheckId);
									}
								})
							}else{
								result.err_code = 500;
								res.json(result);
							}	
						});
					}else{
						res.json({"err_code": 4, "err_msg": "Id must be a number."});	
					}
				}
			},
			serviceCategory: function updateServiceCategory(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				var data = {};

				if(typeof req.body.code !== 'undefined'){
					var code = req.body.code.trim().toLowerCase();
					data.code = code;
				}
				if(typeof req.body.display !== 'undefined'){
					var display = req.body.display;
					data.display = display;
				}
				if(typeof req.body.definition !== 'undefined'){
					var definition = req.body.definition.replace(/[^\w\s ,]/gi, '');
					data.definition = definition;
				}

				if(_id == "" || typeof _id == 'undefined'){
					res.json({"err_code": 5, "err_msg": "Id is required."});	
				}else{
					if(validator.isInt(_id)){
						checkApikey(apikey, ipAddres, function(result){
							if(result.err_code == 0){
								checkId(apikey, _id, 'SERVICE_CATEGORY', function(resultCheckId){
									if(resultCheckId.err_code == 0){
										if(typeof req.body.code !== 'undefined'){
											checkCode(apikey, code, 'SERVICE_CATEGORY', function(resultCode){
												if(resultCode.err_code == 0){
													//method, endpoint, params, options, callback
													ApiFHIR.put('serviceCategory', {"apikey": apikey, "_id": _id}, {body: data, json: true}, function(error, response, body){
														if(error){
														  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateServiceCategory"});
														  }else{
														  	//cek apakah ada error atau tidak
														  	var serviceCategory = body; 
														  	
														  	//cek apakah ada error atau tidak
														  	if(serviceCategory.err_code == 0){
															  	res.json({"err_code": 0, "err_msg": "Service Category has been update.","data":serviceCategory.data});
														  	}else{
														  		res.json({"err_code": 3, "err_msg": serviceCategory.error, "application": "Api FHIR", "function": "updateServiceCategory"});
														  	}
														  }
													})
												}else{
													res.json(resultCode);
												}
											})
										}else{
											//method, endpoint, params, options, callback
											ApiFHIR.put('serviceCategory', {"apikey": apikey, "_id": _id}, {body: data, json: true}, function(error, response, body){
												if(error){
												  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateServiceCategory"});
												  }else{
												  	//cek apakah ada error atau tidak
												  	var serviceCategory = body; 
												  	
												  	//cek apakah ada error atau tidak
												  	if(serviceCategory.err_code == 0){
													  	res.json({"err_code": 0, "err_msg": "Service Category has been update.","data":serviceCategory.data});
												  	}else{
												  		res.json({"err_code": 3, "err_msg": serviceCategory.error, "application": "Api FHIR", "function": "updateServiceCategory"});
												  	}
												  }
											})
										}
									}else{
										res.json(resultCheckId);
									}
								})
							}else{
								result.err_code = 500;
								res.json(result);
							}	
						});
					}else{
						res.json({"err_code": 4, "err_msg": "Id must be a number."});	
					}
				}
			},
			serviceType: function updateServiceType(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				var data = {};

				if(typeof req.body.code !== 'undefined'){
					var code = req.body.code.trim().toLowerCase();
					data.code = code;
				}
				if(typeof req.body.display !== 'undefined'){
					var display = req.body.display;
					data.display = display;
				}
				if(typeof req.body.definition !== 'undefined'){
					var definition = req.body.definition.replace(/[^\w\s ,]/gi, '');
					data.definition = definition;
				}

				if(_id == "" || typeof _id == 'undefined'){
					res.json({"err_code": 5, "err_msg": "Id is required."});	
				}else{
					if(validator.isInt(_id)){
						checkApikey(apikey, ipAddres, function(result){
							if(result.err_code == 0){
								checkId(apikey, _id, 'SERVICE_TYPE', function(resultCheckId){
									if(resultCheckId.err_code == 0){
										if(typeof req.body.code !== 'undefined'){
											checkCode(apikey, code, 'SERVICE_TYPE', function(resultCode){
												if(resultCode.err_code == 0){
													//method, endpoint, params, options, callback
													ApiFHIR.put('serviceType', {"apikey": apikey, "_id": _id}, {body: data, json: true}, function(error, response, body){
														if(error){
														  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateServiceType"});
														  }else{
														  	//cek apakah ada error atau tidak
														  	var serviceType = body; 
														  	
														  	//cek apakah ada error atau tidak
														  	if(serviceType.err_code == 0){
															  	res.json({"err_code": 0, "err_msg": "Service Type has been update.","data":serviceType.data});
														  	}else{
														  		res.json({"err_code": 3, "err_msg": serviceType.error, "application": "Api FHIR", "function": "updateServiceType"});
														  	}
														  }
													})
												}else{
													res.json(resultCode);
												}
											})
										}else{
											//method, endpoint, params, options, callback
											ApiFHIR.put('serviceType', {"apikey": apikey, "_id": _id}, {body: data, json: true}, function(error, response, body){
												if(error){
												  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateServiceType"});
												  }else{
												  	//cek apakah ada error atau tidak
												  	var serviceType = body; 
												  	
												  	//cek apakah ada error atau tidak
												  	if(serviceType.err_code == 0){
													  	res.json({"err_code": 0, "err_msg": "Service Type has been update.","data":serviceType.data});
												  	}else{
												  		res.json({"err_code": 3, "err_msg": serviceType.error, "application": "Api FHIR", "function": "updateServiceType"});
												  	}
												  }
											})
										}
									}else{
										res.json(resultCheckId);
									}
								})
							}else{
								result.err_code = 500;
								res.json(result);
							}	
						});
					}else{
						res.json({"err_code": 4, "err_msg": "Id must be a number."});	
					}
				}
			},
			serviceProvisionConditions: function updateServiceProvisionConditions(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				var data = {};

				if(typeof req.body.code !== 'undefined'){
					var code = req.body.code.trim().toLowerCase();
					data.code = code;
				}
				if(typeof req.body.display !== 'undefined'){
					var display = req.body.display;
					data.display = display;
				}
				if(typeof req.body.definition !== 'undefined'){
					var definition = req.body.definition.replace(/[^\w\s ,]/gi, '');
					data.definition = definition;
				}

				if(_id == "" || typeof _id == 'undefined'){
					res.json({"err_code": 5, "err_msg": "Id is required."});	
				}else{
					if(validator.isInt(_id)){
						checkApikey(apikey, ipAddres, function(result){
							if(result.err_code == 0){
								checkId(apikey, _id, 'SERVICE_PROVISION_CONDITIONS', function(resultCheckId){
									if(resultCheckId.err_code == 0){
										if(typeof req.body.code !== 'undefined'){
											checkCode(apikey, code, 'SERVICE_PROVISION_CONDITIONS', function(resultCode){
												if(resultCode.err_code == 0){
													//method, endpoint, params, options, callback
													ApiFHIR.put('serviceProvisionConditions', {"apikey": apikey, "_id": _id}, {body: data, json: true}, function(error, response, body){
														if(error){
														  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateServiceProvisionConditions"});
														  }else{
														  	//cek apakah ada error atau tidak
														  	var serviceProvisionConditions = body; 
														  	
														  	//cek apakah ada error atau tidak
														  	if(serviceProvisionConditions.err_code == 0){
															  	res.json({"err_code": 0, "err_msg": "Service Provision Conditions has been update.","data":serviceProvisionConditions.data});
														  	}else{
														  		res.json({"err_code": 3, "err_msg": serviceProvisionConditions.error, "application": "Api FHIR", "function": "updateServiceProvisionConditions"});
														  	}
														  }
													})
												}else{
													res.json(resultCode);
												}
											})
										}else{
											//method, endpoint, params, options, callback
											ApiFHIR.put('serviceProvisionConditions', {"apikey": apikey, "_id": _id}, {body: data, json: true}, function(error, response, body){
												if(error){
												  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateServiceProvisionConditions"});
												  }else{
												  	//cek apakah ada error atau tidak
												  	var serviceProvisionConditions = body; 
												  	
												  	//cek apakah ada error atau tidak
												  	if(serviceProvisionConditions.err_code == 0){
													  	res.json({"err_code": 0, "err_msg": "Service Provision Conditions has been update.","data":serviceProvisionConditions.data});
												  	}else{
												  		res.json({"err_code": 3, "err_msg": serviceProvisionConditions.error, "application": "Api FHIR", "function": "updateServiceProvisionConditions"});
												  	}
												  }
											})
										}
									}else{
										res.json(resultCheckId);
									}
								})
							}else{
								result.err_code = 500;
								res.json(result);
							}	
						});
					}else{
						res.json({"err_code": 4, "err_msg": "Id must be a number."});	
					}
				}
			},
			serviceReferralMethod: function updateServiceReferralMethod(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				var data = {};

				if(typeof req.body.code !== 'undefined'){
					var code = req.body.code.trim().toLowerCase();
					data.code = code;
				}
				if(typeof req.body.display !== 'undefined'){
					var display = req.body.display;
					data.display = display;
				}
				if(typeof req.body.definition !== 'undefined'){
					var definition = req.body.definition.replace(/[^\w\s ,]/gi, '');
					data.definition = definition;
				}

				if(_id == "" || typeof _id == 'undefined'){
					res.json({"err_code": 5, "err_msg": "Id is required."});	
				}else{
					if(validator.isInt(_id)){
						checkApikey(apikey, ipAddres, function(result){
							if(result.err_code == 0){
								checkId(apikey, _id, 'SERVICE_REFERRAL_METHOD', function(resultCheckId){
									if(resultCheckId.err_code == 0){
										if(typeof req.body.code !== 'undefined'){
											checkCode(apikey, code, 'SERVICE_REFERRAL_METHOD', function(resultCode){
												if(resultCode.err_code == 0){
													//method, endpoint, params, options, callback
													ApiFHIR.put('serviceReferralMethod', {"apikey": apikey, "_id": _id}, {body: data, json: true}, function(error, response, body){
														if(error){
														  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateServiceReferralMethod"});
														  }else{
														  	//cek apakah ada error atau tidak
														  	var serviceReferralMethod = body; 
														  	
														  	//cek apakah ada error atau tidak
														  	if(serviceReferralMethod.err_code == 0){
															  	res.json({"err_code": 0, "err_msg": "Service Referral Method has been update.","data":serviceReferralMethod.data});
														  	}else{
														  		res.json({"err_code": 3, "err_msg": serviceReferralMethod.error, "application": "Api FHIR", "function": "updateServiceReferralMethod"});
														  	}
														  }
													})
												}else{
													res.json(resultCode);
												}
											})
										}else{
											//method, endpoint, params, options, callback
											ApiFHIR.put('serviceReferralMethod', {"apikey": apikey, "_id": _id}, {body: data, json: true}, function(error, response, body){
												if(error){
												  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateServiceReferralMethod"});
												  }else{
												  	//cek apakah ada error atau tidak
												  	var serviceReferralMethod = body; 
												  	
												  	//cek apakah ada error atau tidak
												  	if(serviceReferralMethod.err_code == 0){
													  	res.json({"err_code": 0, "err_msg": "Service Referral Method has been update.","data":serviceReferralMethod.data});
												  	}else{
												  		res.json({"err_code": 3, "err_msg": serviceReferralMethod.error, "application": "Api FHIR", "function": "updateServiceReferralMethod"});
												  	}
												  }
											})
										}
									}else{
										res.json(resultCheckId);
									}
								})
							}else{
								result.err_code = 500;
								res.json(result);
							}	
						});
					}else{
						res.json({"err_code": 4, "err_msg": "Id must be a number."});	
					}
				}
			},
			endpointStatus: function updateEndpointStatus(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				var data = {};

				if(typeof req.body.code !== 'undefined'){
					var code = req.body.code.trim().toLowerCase();
					data.code = code;
				}
				if(typeof req.body.display !== 'undefined'){
					var display = req.body.display;
					data.display = display;
				}
				if(typeof req.body.definition !== 'undefined'){
					var definition = req.body.definition.replace(/[^\w\s ,]/gi, '');
					data.definition = definition;
				}

				if(_id == "" || typeof _id == 'undefined'){
					res.json({"err_code": 5, "err_msg": "Id is required."});	
				}else{
					if(validator.isInt(_id)){
						checkApikey(apikey, ipAddres, function(result){
							if(result.err_code == 0){
								checkId(apikey, _id, 'ENDPOINT_STATUS', function(resultCheckId){
									if(resultCheckId.err_code == 0){
										if(typeof req.body.code !== 'undefined'){
											checkCode(apikey, code, 'ENDPOINT_STATUS', function(resultCode){
												if(resultCode.err_code == 0){
													//method, endpoint, params, options, callback
													ApiFHIR.put('endpointStatus', {"apikey": apikey, "_id": _id}, {body: data, json: true}, function(error, response, body){
														if(error){
														  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateEndpointStatus"});
														  }else{
														  	//cek apakah ada error atau tidak
														  	var endpointStatus = body; 
														  	
														  	//cek apakah ada error atau tidak
														  	if(endpointStatus.err_code == 0){
															  	res.json({"err_code": 0, "err_msg": "Endpoint Status has been update.","data":endpointStatus.data});
														  	}else{
														  		res.json({"err_code": 3, "err_msg": endpointStatus.error, "application": "Api FHIR", "function": "updateEndpointStatus"});
														  	}
														  }
													})
												}else{
													res.json(resultCode);
												}
											})
										}else{
											//method, endpoint, params, options, callback
											ApiFHIR.put('endpointStatus', {"apikey": apikey, "_id": _id}, {body: data, json: true}, function(error, response, body){
												if(error){
												  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateEndpointStatus"});
												  }else{
												  	//cek apakah ada error atau tidak
												  	var endpointStatus = body; 
												  	
												  	//cek apakah ada error atau tidak
												  	if(endpointStatus.err_code == 0){
													  	res.json({"err_code": 0, "err_msg": "Endpoint Status has been update.","data":endpointStatus.data});
												  	}else{
												  		res.json({"err_code": 3, "err_msg": endpointStatus.error, "application": "Api FHIR", "function": "updateEndpointStatus"});
												  	}
												  }
											})
										}
									}else{
										res.json(resultCheckId);
									}
								})
							}else{
								result.err_code = 500;
								res.json(result);
							}	
						});
					}else{
						res.json({"err_code": 4, "err_msg": "Id must be a number."});	
					}
				}
			},
			endpointConnectionType: function updateEndpointConnectionType(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				var data = {};

				if(typeof req.body.code !== 'undefined'){
					var code = req.body.code.trim().toLowerCase();
					data.code = code;
				}
				if(typeof req.body.display !== 'undefined'){
					var display = req.body.display;
					data.display = display;
				}
				if(typeof req.body.definition !== 'undefined'){
					var definition = req.body.definition.replace(/[^\w\s ,]/gi, '');
					data.definition = definition;
				}

				if(_id == "" || typeof _id == 'undefined'){
					res.json({"err_code": 5, "err_msg": "Id is required."});	
				}else{
					if(validator.isInt(_id)){
						checkApikey(apikey, ipAddres, function(result){
							if(result.err_code == 0){
								checkId(apikey, _id, 'ENDPOINT_CONNECTION_TYPE', function(resultCheckId){
									if(resultCheckId.err_code == 0){
										if(typeof req.body.code !== 'undefined'){
											checkCode(apikey, code, 'ENDPOINT_CONNECTION_TYPE', function(resultCode){
												if(resultCode.err_code == 0){
													//method, endpoint, params, options, callback
													ApiFHIR.put('endpointConnectionType', {"apikey": apikey, "_id": _id}, {body: data, json: true}, function(error, response, body){
														if(error){
														  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateEndpointConnectionType"});
														  }else{
														  	//cek apakah ada error atau tidak
														  	var endpointConnectionType = body; 
														  	
														  	//cek apakah ada error atau tidak
														  	if(endpointConnectionType.err_code == 0){
															  	res.json({"err_code": 0, "err_msg": "Endpoint Connection Type has been update.","data":endpointConnectionType.data});
														  	}else{
														  		res.json({"err_code": 3, "err_msg": endpointConnectionType.error, "application": "Api FHIR", "function": "updateEndpointConnectionType"});
														  	}
														  }
													})
												}else{
													res.json(resultCode);
												}
											})
										}else{
											//method, endpoint, params, options, callback
											ApiFHIR.put('endpointConnectionType', {"apikey": apikey, "_id": _id}, {body: data, json: true}, function(error, response, body){
												if(error){
												  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateEndpointConnectionType"});
												  }else{
												  	//cek apakah ada error atau tidak
												  	var endpointConnectionType = body; 
												  	
												  	//cek apakah ada error atau tidak
												  	if(endpointConnectionType.err_code == 0){
													  	res.json({"err_code": 0, "err_msg": "Endpoint Connection Type has been update.","data":endpointConnectionType.data});
												  	}else{
												  		res.json({"err_code": 3, "err_msg": endpointConnectionType.error, "application": "Api FHIR", "function": "updateEndpointConnectionType"});
												  	}
												  }
											})
										}
									}else{
										res.json(resultCheckId);
									}
								})
							}else{
								result.err_code = 500;
								res.json(result);
							}	
						});
					}else{
						res.json({"err_code": 4, "err_msg": "Id must be a number."});	
					}
				}
			},
			endpointPayloadType: function updateEndpointPayloadType(req, res){
				var ipAddres = req.connection.remoteAddress;
				var apikey = req.params.apikey;
				var _id = req.params._id;

				var data = {};

				if(typeof req.body.code !== 'undefined'){
					var code = req.body.code.trim().toLowerCase();
					data.code = code;
				}
				if(typeof req.body.display !== 'undefined'){
					var display = req.body.display;
					data.display = display;
				}

				if(_id == "" || typeof _id == 'undefined'){
					res.json({"err_code": 5, "err_msg": "Id is required."});	
				}else{
					if(validator.isInt(_id)){
						checkApikey(apikey, ipAddres, function(result){
							if(result.err_code == 0){
								checkId(apikey, _id, 'ENDPOINT_PAYLOAD_TYPE', function(resultCheckId){
									if(resultCheckId.err_code == 0){
										if(typeof req.body.code !== 'undefined'){
											checkCode(apikey, code, 'ENDPOINT_PAYLOAD_TYPE', function(resultCode){
												if(resultCode.err_code == 0){
													//method, endpoint, params, options, callback
													ApiFHIR.put('endpointPayloadType', {"apikey": apikey, "_id": _id}, {body: data, json: true}, function(error, response, body){
														if(error){
														  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateEndpointPayloadType"});
														  }else{
														  	//cek apakah ada error atau tidak
														  	var endpointPayloadType = body; 
														  	
														  	//cek apakah ada error atau tidak
														  	if(endpointPayloadType.err_code == 0){
															  	res.json({"err_code": 0, "err_msg": "Endpoint Payload Type has been update.","data":endpointPayloadType.data});
														  	}else{
														  		res.json({"err_code": 3, "err_msg": endpointPayloadType.error, "application": "Api FHIR", "function": "updateEndpointPayloadType"});
														  	}
														  }
													})
												}else{
													res.json(resultCode);
												}
											})
										}else{
											//method, endpoint, params, options, callback
											ApiFHIR.put('endpointPayloadType', {"apikey": apikey, "_id": _id}, {body: data, json: true}, function(error, response, body){
												if(error){
												  	res.json({"err_code": 1, "err_msg": error, "application": "Api FHIR", "function": "updateEndpointPayloadType"});
												  }else{
												  	//cek apakah ada error atau tidak
												  	var endpointPayloadType = body; 
												  	
												  	//cek apakah ada error atau tidak
												  	if(endpointPayloadType.err_code == 0){
													  	res.json({"err_code": 0, "err_msg": "Endpoint Payload Type has been update.","data":endpointPayloadType.data});
												  	}else{
												  		res.json({"err_code": 3, "err_msg": endpointPayloadType.error, "application": "Api FHIR", "function": "updateEndpointPayloadType"});
												  	}
												  }
											})
										}
									}else{
										res.json(resultCheckId);
									}
								})
							}else{
								result.err_code = 500;
								res.json(result);
							}	
						});
					}else{
						res.json({"err_code": 4, "err_msg": "Id must be a number."});	
					}
				}
			}
			//put hcs end
		}
	}

function checkApikey(apikey, ipAddress, callback){
	//method, endpoint, params, options, callback
	Api.get('check_apikey', {"apikey": apikey}, {}, function (error, response, body) {
	  if(error){
	  	x(error);
	  }else{
	  	user = JSON.parse(body);
	  	//cek apakah ada error atau tidak
	  	if(user.err_code == 0){
		  	//cek jumdata dulu
		  	if(user.data.length > 0){
		  		//check user_role_id == 1 <-- admin/root
		  		if(user.data[0].user_role_id == 1){
		  			x({"err_code": 0, "status": "root", "user_role_id": user.data[0].user_role_id, "user_id": user.data[0].user_id});	
		  		}else{
			  		//cek apikey
				  	if(apikey == user.data[0].user_apikey){
				  		//ipaddress
					  	dataIpAddress = user.data[0].user_ip_address;
					  	if(dataIpAddress.indexOf(ipAddress) >= 0){
					  		//user is active
					  		if(user.data[0].user_is_active){
					  			//cek data user terpenuhi
					  			x({"err_code": 0, "status": "active", "user_role_id": user.data[0].user_role_id, "user_id": user.data[0].user_id});	
					  		}else{
					  			x({"err_code": 5, "err_msg": "User is not active"});	
					  		}
					  	}else{
					  		x({"err_code": 4, "err_msg": "Ip Address not registered"});
					  	}
				  	}else{
				  		x({"err_code": 3, "err_msg": "Wrong apikey"});
				  	}
		  		}
		  		
		  	}else{
		  			x({"err_code": 2, "err_msg": "Wrong apikey"});	
		  	}
	  	}else{
	  		x({"err_code": 1, "err_msg": user.error, "application": "Api User Management", "function": "checkApikey"});
	  	}
	  }
	});
	
	function x(result){
		callback(result)
	}
}

function checkId(apikey, tableId, tableName, callback){
	ApiFHIR.get('checkId', {"apikey": apikey, "id": tableId, "name": tableName}, {}, function (error, response, body) {
	  if(error){
	  	x(error);
	  }else{
	  	dataId = JSON.parse(body);
			console.log(dataId);
	  	//cek apakah ada error atau tidak
	  	if(dataId.err_code == 0){
		  	//cek jumdata dulu
		  	if(dataId.data.length > 0){
		  			x({"err_code": 0, "err_msg": "Id is valid."})
		  	}else{
		  			x({"err_code": 2, "err_msg": "Id is not found."});	
		  	}
	  	}else{
	  		x({"err_code": 1, "err_msg": dataId.error, "application": "API FHIR", "function": "checkId"});
	  	}
	  }
	});

	function x(result){
		callback(result)
	}
}

function checkCode(apikey, code, tableName, callback){
	ApiFHIR.get('checkCode', {"apikey": apikey, "code": code, "name": tableName}, {}, function (error, response, body) {
	  if(error){
	  	x(error);
	  }else{
	  	dataId = JSON.parse(body);
			console.log(dataId);
	  	//cek apakah ada error atau tidak
	  	if(dataId.err_code == 0){
		  	//cek jumdata dulu
		  	if(dataId.data.length > 0){
		  			x({"err_code": 2, "err_msg": "Code is already exist."})
		  	}else{
		  			x({"err_code": 0, "err_msg": "Code is available to used."});	
		  	}
	  	}else{
	  		x({"err_code": 1, "err_msg": dataId.error, "application": "API FHIR", "function": "checkCode"});
	  	}
	  }
	});

	function x(result){
		callback(result)
	}
}

function checkUniqeValue(apikey, fdValue, tableName, callback){
	ApiFHIR.get('checkUniqeValue', {"apikey": apikey, "fdvalue": fdValue, "tbname": tableName}, {}, function (error, response, body) {
	  if(error){
	  	x(error);
	  }else{
	  	dataId = JSON.parse(body);
	  	//cek apakah ada error atau tidak
	  	if(dataId.err_code == 0){
		  	//cek jumdata dulu
		  	if(dataId.data.length > 0){
		  			x({"err_code": 2, "err_msg": "The value is already exist."})
		  	}else{
		  			x({"err_code": 0, "err_msg": "The value is available to insert."});	
		  	}
	  	}else{
	  		x({"err_code": 1, "err_msg": dataId.error, "application": "API FHIR", "function": "checkCode"});
	  	}
	  }
	});

	function x(result){
		callback(result)
	}
}

function checkGroupQouta(apikey, groupId, callback){
	ApiFHIR.get('checkGroupQouta', {"apikey": apikey, "group_id": groupId}, {}, function (error, response, body) {
	  if(error){
	  	x(error);
	  }else{
	  	quota = JSON.parse(body);
	  	//cek apakah ada error atau tidak
	  	if(quota.err_code == 0){
		  	//cek jumdata dulu
		  	if(quota.data.length > 0){
		  		groupQuota = parseInt(quota.data[0].quantity);
		  		memberCount = parseInt(quota.data[0].total_member);

		  		if(memberCount <= groupQuota){
		  			x({"err_code": 0, "err_msg": "Group quota is ready"});	
		  		}else{
		  			x({"err_code": 1, "err_msg": "Group quota is full, total member "+ groupQuota});	
		  		}
		  	}else{
		  			x({"err_code": 0, "err_msg": "Group quota is ready"});	
		  	}
	  	}else{
	  		x({"err_code": 1, "err_msg": quota, "application": "API FHIR", "function": "checkGroupQouta"});
	  	}
	  }
	});

	function x(result){
		callback(result)
	}
}

function checkMemberEntityGroup(apikey, entityId, groupId, callback){
	ApiFHIR.get('checkMemberEntityGroup', {"apikey": apikey, "entity_id": entityId ,"group_id": groupId}, {}, function (error, response, body) {
	  if(error){
	  	x(error);
	  }else{
	  	entity = JSON.parse(body);
	  	//cek apakah ada error atau tidak
	  	if(entity.err_code == 0){
		  	if(parseInt(entity.data.length) > 0){
		  		x({"err_code": 2, "err_msg": "Member entity already exist in this group."});	
		  	}else{
	  			x({"err_code": 0, "err_msg": "Member not found in this group."});	
		  	}
	  	}else{
	  		x({"err_code": 1, "err_msg": entity, "application": "API FHIR", "function": "checkMemberEntityGroup"});
	  	}
	  }
	});

	function x(result){
		callback(result)
	}
}

function getFormattedDate() {
  var date = new Date();
  var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  return str;
}

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

function removeDuplicates(myArr, prop) {
  return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
}

module.exports = controller;