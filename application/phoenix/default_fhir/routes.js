var routesDefaultFHIR = function(app, DefaultFHIR){
	//get
	app.get('/:apikey/Identifier', DefaultFHIR.get.Identifier);
	app.get('/:apikey/HumanName', DefaultFHIR.get.HumanName);
	app.get('/:apikey/ContactPoint', DefaultFHIR.get.ContactPoint);
	app.get('/:apikey/Address', DefaultFHIR.get.Address);
	app.get('/:apikey/Attachment', DefaultFHIR.get.Attachment);

	app.get('/:apikey/identity-AssuranceLevel/:_id?', DefaultFHIR.get.identityAssuranceLevel);
	app.get('/:apikey/identity-AssuranceLevel/code/:code?', DefaultFHIR.get.identityAssuranceLevelCode);
	app.get('/:apikey/administrative-gender/:_id?', DefaultFHIR.get.administrativeGender);
	app.get('/:apikey/administrative-gender/code/:code?', DefaultFHIR.get.administrativeGenderCode);
	app.get('/:apikey/marital-status/:_id?', DefaultFHIR.get.maritalStatus);
	app.get('/:apikey/marital-status/code/:code', DefaultFHIR.get.maritalStatusCode);
	app.get('/:apikey/contact-role/:_id?', DefaultFHIR.get.contactRole);
	app.get('/:apikey/contact-role/code/:code', DefaultFHIR.get.contactRoleCode);
	app.get('/:apikey/animal-species/:_id', DefaultFHIR.get.animalSpecies);
	app.get('/:apikey/animal-species/code/:code', DefaultFHIR.get.animalSpeciesCode);
	app.get('/:apikey/animal-breeds/:_id', DefaultFHIR.get.animalBreeds);
	app.get('/:apikey/animal-breeds/code/:code', DefaultFHIR.get.animalBreedsCode);
	app.get('/:apikey/animal-genderstatus/:_id', DefaultFHIR.get.animalGenderStatus);
	app.get('/:apikey/animal-genderstatus/code/:code', DefaultFHIR.get.animalGenderStatusCode);
	app.get('/:apikey/languages/:_id', DefaultFHIR.get.languages);
	app.get('/:apikey/languages/code/:code', DefaultFHIR.get.languagesCode);
	app.get('/:apikey/link-type/:_id', DefaultFHIR.get.linkType);
	app.get('/:apikey/link-type/code/:code', DefaultFHIR.get.linkTypeCode);
	app.get('/:apikey/relatedperson-relationshiptype/:_id', DefaultFHIR.get.relatedPersonRelationshipType);
	app.get('/:apikey/relatedperson-relationshiptype/code/:code', DefaultFHIR.get.relatedPersonRelationshipTypeCode);
	app.get('/:apikey/group-type/:_id', DefaultFHIR.get.groupType);
	app.get('/:apikey/group-type/code/:code', DefaultFHIR.get.groupTypeCode);
	app.get('/:apikey/identifier-use/:_id', DefaultFHIR.get.identifierUse);
	app.get('/:apikey/identifier-use/code/:code', DefaultFHIR.get.identifierUseCode);
	app.get('/:apikey/identifier-type/:_id', DefaultFHIR.get.identifierType);
	app.get('/:apikey/identifier-type/code/:code', DefaultFHIR.get.identifierTypeCode);
	app.get('/:apikey/name-use/:_id', DefaultFHIR.get.nameUse);
	app.get('/:apikey/name-use/code/:code', DefaultFHIR.get.nameUseCode);
	app.get('/:apikey/contact-point-system/:_id', DefaultFHIR.get.contactPointSystem);
	app.get('/:apikey/contact-point-system/code/:code', DefaultFHIR.get.contactPointSystemCode);
	app.get('/:apikey/contact-point-use/:_id', DefaultFHIR.get.contactPointUse);
	app.get('/:apikey/contact-point-use/code/:code', DefaultFHIR.get.contactPointUseCode);
	app.get('/:apikey/address-use/:_id', DefaultFHIR.get.addressUse);
	app.get('/:apikey/address-use/code/:code', DefaultFHIR.get.addressUseCode);
	app.get('/:apikey/address-type/:_id', DefaultFHIR.get.addressType);
	app.get('/:apikey/address-type/code/:code', DefaultFHIR.get.addressTypeCode);

	app.get('/:apikey/check-id/:id/:name', DefaultFHIR.get.checkId);
	app.get('/:apikey/check-code/:code/:name', DefaultFHIR.get.checkCode);
	app.get('/:apikey/check-uniqevalue/:fdvalue/:tbname', DefaultFHIR.get.checkUniqeValue);
	app.get('/:apikey/check-groupqouta/:group_id', DefaultFHIR.get.checkGroupQuota);
	app.get('/:apikey/check-memberentitygroup/:entity_id/:group_id', DefaultFHIR.get.checkMemberEntityGroup);
	
	// Service Provider Directory Resources, by : hardika cs(start)
	app.get('/:apikey/organization-type/:_id', DefaultFHIR.get.organizationType);
	app.get('/:apikey/organization-type/code/:code', DefaultFHIR.get.organizationTypeCode);
	app.get('/:apikey/contactentity-type/:_id', DefaultFHIR.get.contactentityType);
	app.get('/:apikey/contactentity-type/code/:code', DefaultFHIR.get.contactentityTypeCode);
	app.get('/:apikey/location-status/:_id', DefaultFHIR.get.locationStatus);
	app.get('/:apikey/location-status/code/:code', DefaultFHIR.get.locationStatusCode);
	app.get('/:apikey/bed-status/:_id', DefaultFHIR.get.bedStatus);
	app.get('/:apikey/bed-status/code/:code', DefaultFHIR.get.bedStatusCode);
	app.get('/:apikey/location-mode/:_id', DefaultFHIR.get.locationMode);
	app.get('/:apikey/location-mode/code/:code', DefaultFHIR.get.locationModeCode);
	app.get('/:apikey/service-delivery-location-role-type/:_id', DefaultFHIR.get.serviceDeliveryLocationRoleType);
	app.get('/:apikey/service-delivery-location-role-type/code/:code', DefaultFHIR.get.serviceDeliveryLocationRoleTypeCode);
	app.get('/:apikey/location-physical-type/:_id', DefaultFHIR.get.locationPhysicalType);
	app.get('/:apikey/location-physical-type/code/:code', DefaultFHIR.get.locationPhysicalTypeCode);
	app.get('/:apikey/qualification-code/:_id', DefaultFHIR.get.qualificationCode);
	app.get('/:apikey/qualification-code/code/:code', DefaultFHIR.get.qualificationCodeCode);
	app.get('/:apikey/practitioner-role-code/:_id', DefaultFHIR.get.practitionerRoleCode);
	app.get('/:apikey/practitioner-role-code/code/:code', DefaultFHIR.get.practitionerRoleCodeCode);
	app.get('/:apikey/practice-code/:_id', DefaultFHIR.get.practiceCode);
	app.get('/:apikey/practice-code/code/:code', DefaultFHIR.get.practiceCodeCode);
	app.get('/:apikey/days-of-week/:_id', DefaultFHIR.get.daysOfWeek);
	app.get('/:apikey/days-of-week/code/:code', DefaultFHIR.get.daysOfWeekCode);
	app.get('/:apikey/service-category/:_id', DefaultFHIR.get.serviceCategory);
	app.get('/:apikey/service-category/code/:code', DefaultFHIR.get.serviceCategoryCode);
	app.get('/:apikey/service-type/:_id', DefaultFHIR.get.serviceType);
	app.get('/:apikey/service-type/code/:code', DefaultFHIR.get.serviceTypeCode);
	app.get('/:apikey/service-provision-conditions/:_id', DefaultFHIR.get.serviceProvisionConditions);
	app.get('/:apikey/service-provision-conditions/code/:code', DefaultFHIR.get.serviceProvisionConditionsCode);
	app.get('/:apikey/service-referral-method/:_id', DefaultFHIR.get.serviceReferralMethod);
	app.get('/:apikey/service-referral-method/code/:code', DefaultFHIR.get.serviceReferralMethodCode);
	app.get('/:apikey/endpoint-status/:_id', DefaultFHIR.get.endpointStatus);
	app.get('/:apikey/endpoint-status/code/:code', DefaultFHIR.get.endpointStatusCode);
	app.get('/:apikey/endpoint-connection-type/:_id', DefaultFHIR.get.endpointConnectionType);
	app.get('/:apikey/endpoint-connection-type/code/:code', DefaultFHIR.get.endpointConnectionTypeCode);
	app.get('/:apikey/endpoint-payload-type/:_id', DefaultFHIR.get.endpointPayloadType);
	app.get('/:apikey/endpoint-payload-type/code/:code', DefaultFHIR.get.endpointPayloadTypeCode);
	
	app.get('/:apikey/AvailableTime', DefaultFHIR.get.availableTime);
	app.get('/:apikey/NotAvailable', DefaultFHIR.get.notAvailable);
	
	//app.get('/:apikey/organization/:_id', DefaultFHIR.get.organization);
	//app.get('/:apikey/organization/code/:code?', DefaultFHIR.get.organizationCode);
	//app.get('/:apikey/location/:_id', DefaultFHIR.get.location);
	//app.get('/:apikey/location/code/:code?', DefaultFHIR.get.locationCode);	
	//app.get('/:apikey/practitioner/:_id', DefaultFHIR.get.practitioner);
	//app.get('/:apikey/practitioner/code/:code?', DefaultFHIR.get.practitionerCode);
	//app.get('/:apikey/practitioner-role/:_id', DefaultFHIR.get.practitionerRole);
	//app.get('/:apikey/practitioner-role/code/:code?', DefaultFHIR.get.practitionerRoleCode);
	//app.get('/:apikey/healthcare-service/:_id', DefaultFHIR.get.healthcareService);
	//app.get('/:apikey/healthcare-service/code/:code?', DefaultFHIR.get.healthcareServiceCode);
	//app.get('/:apikey/endpoint/:_id', DefaultFHIR.get.endpoint);
	//app.get('/:apikey/endpoint/code/:code?', DefaultFHIR.get.endpoint);
	// Service Provider Directory Resources, by : hardika cs(end)
	
	//post
	app.post('/:apikey/identity-AssuranceLevel', DefaultFHIR.post.identityAssuranceLevel);
	app.post('/:apikey/administrative-gender', DefaultFHIR.post.administrativeGender);
	app.post('/:apikey/marital-status', DefaultFHIR.post.maritalStatus);
	app.post('/:apikey/contact-role', DefaultFHIR.post.contactRole);
	app.post('/:apikey/animal-species', DefaultFHIR.post.animalSpecies);
	app.post('/:apikey/animal-breeds', DefaultFHIR.post.animalBreeds);
	app.post('/:apikey/animal-genderstatus', DefaultFHIR.post.animalGenderStatus);
	app.post('/:apikey/languages', DefaultFHIR.post.languages);
	app.post('/:apikey/link-type', DefaultFHIR.post.linkType);
	app.post('/:apikey/relatedperson-relationshiptype', DefaultFHIR.post.relatedPersonRelationshipType);
	app.post('/:apikey/group-type', DefaultFHIR.post.groupType);
	app.post('/:apikey/identifier-use', DefaultFHIR.post.identifierUse);
	app.post('/:apikey/identifier-type', DefaultFHIR.post.identifierType);
	app.post('/:apikey/name-use', DefaultFHIR.post.nameUse);
	app.post('/:apikey/contact-point-system', DefaultFHIR.post.contactPointSystem);
	app.post('/:apikey/contact-point-use', DefaultFHIR.post.contactPointUse);
	app.post('/:apikey/address-use', DefaultFHIR.post.addressUse);
	app.post('/:apikey/address-type', DefaultFHIR.post.addressType);
	app.post('/:apikey/attachment', DefaultFHIR.post.attachment);
	app.post('/:apikey/identifier', DefaultFHIR.post.identifier);
	app.post('/:apikey/human-name', DefaultFHIR.post.humanName);
	app.post('/:apikey/contact-point', DefaultFHIR.post.contactPoint);
	app.post('/:apikey/address', DefaultFHIR.post.address);
	
	// Service Provider Directory Resources, by : hardika cs(start)
	app.post('/:apikey/organization-type', DefaultFHIR.post.organizationType);
	app.post('/:apikey/contactentity-type', DefaultFHIR.post.contactentityType);
	app.post('/:apikey/location-status', DefaultFHIR.post.locationStatus);
	app.post('/:apikey/bed-status', DefaultFHIR.post.bedStatus);
	app.post('/:apikey/location-mode', DefaultFHIR.post.locationMode);
	app.post('/:apikey/service-delivery-location-role-type', DefaultFHIR.post.serviceDeliveryLocationRoleType);
	app.post('/:apikey/location-physical-type', DefaultFHIR.post.locationPhysicalType);
	app.post('/:apikey/qualification-code', DefaultFHIR.post.qualificationCode);
	app.post('/:apikey/practitioner-role-code', DefaultFHIR.post.practitionerRoleCode);
	app.post('/:apikey/practice-code', DefaultFHIR.post.practiceCode);
	app.post('/:apikey/days-of-week', DefaultFHIR.post.daysOfWeek);
	app.post('/:apikey/service-category', DefaultFHIR.post.serviceCategory);
	app.post('/:apikey/service-type', DefaultFHIR.post.serviceType);
	app.post('/:apikey/service-provision-conditions', DefaultFHIR.post.serviceProvisionConditions);
	app.post('/:apikey/service-referral-method', DefaultFHIR.post.serviceReferralMethod);
	app.post('/:apikey/endpoint-status', DefaultFHIR.post.endpointStatus);
	app.post('/:apikey/endpoint-connection-type', DefaultFHIR.post.endpointConnectionType);
	app.post('/:apikey/endpoint-payload-type', DefaultFHIR.post.endpointPayloadType);
	
	app.post('/:apikey/AvailableTime', DefaultFHIR.post.availableTime);
	app.post('/:apikey/NotAvailable', DefaultFHIR.post.notAvailable);
	// Service Provider Directory Resources, by : hardika cs(end)

	//put
	app.put('/:apikey/identity-AssuranceLevel/:_id', DefaultFHIR.put.identityAssuranceLevel);
	app.put('/:apikey/administrative-gender/:_id', DefaultFHIR.put.administrativeGender);
	app.put('/:apikey/marital-status/:_id', DefaultFHIR.put.maritalStatus);
	app.put('/:apikey/contact-role/:_id', DefaultFHIR.put.contactRole);
	app.put('/:apikey/animal-species/:_id', DefaultFHIR.put.animalSpecies);
	app.put('/:apikey/animal-breeds/:_id', DefaultFHIR.put.animalBreeds);
	app.put('/:apikey/animal-genderstatus/:_id', DefaultFHIR.put.animalGenderStatus);
	app.put('/:apikey/languages/:_id', DefaultFHIR.put.languages);
	app.put('/:apikey/link-type/:_id', DefaultFHIR.put.linkType);
	app.put('/:apikey/relatedperson-relationshiptype/:_id', DefaultFHIR.put.relatedPersonRelationshipType);
	app.put('/:apikey/group-type/:_id', DefaultFHIR.put.groupType);
	app.put('/:apikey/identifier-use/:_id', DefaultFHIR.put.identifierUse);
	app.put('/:apikey/identifier-type/:_id', DefaultFHIR.put.identifierType);
	app.put('/:apikey/name-use/:_id', DefaultFHIR.put.nameUse);
	app.put('/:apikey/contact-point-system/:_id', DefaultFHIR.put.contactPointSystem);
	app.put('/:apikey/contact-point-use/:_id', DefaultFHIR.put.contactPointUse);
	app.put('/:apikey/address-use/:_id', DefaultFHIR.put.addressUse);
	app.put('/:apikey/address-type/:_id', DefaultFHIR.put.addressType);
	app.put('/:apikey/attachment/:_id', DefaultFHIR.put.attachment);
	
	// Service Provider Directory Resources, by : hardika cs(start)
	app.put('/:apikey/organization-type/:_id', DefaultFHIR.put.organizationType);
	app.put('/:apikey/contactentity-type/:_id', DefaultFHIR.put.contactentityType);
	app.put('/:apikey/location-status/:_id', DefaultFHIR.put.locationStatus);
	app.put('/:apikey/bed-status/:_id', DefaultFHIR.put.bedStatus);
	app.put('/:apikey/location-mode/:_id', DefaultFHIR.put.locationMode);
	app.put('/:apikey/service-delivery-location-role-type/:_id', DefaultFHIR.put.serviceDeliveryLocationRoleType);
	app.put('/:apikey/location-physical-type/:_id', DefaultFHIR.put.locationPhysicalType);
	app.put('/:apikey/qualification-code/:_id', DefaultFHIR.put.qualificationCode);
	app.put('/:apikey/practitioner-role-code/:_id', DefaultFHIR.put.practitionerRoleCode);
	app.put('/:apikey/practice-code/:_id', DefaultFHIR.put.practiceCode);
	app.put('/:apikey/days-of-week/:_id', DefaultFHIR.put.daysOfWeek);
	app.put('/:apikey/service-category/:_id', DefaultFHIR.put.serviceCategory);
	app.put('/:apikey/service-type/:_id', DefaultFHIR.put.serviceType);
	app.put('/:apikey/service-provision-conditions/:_id', DefaultFHIR.put.serviceProvisionConditions);
	app.put('/:apikey/service-referral-method/:_id', DefaultFHIR.put.serviceReferralMethod);
	app.put('/:apikey/endpoint-status/:_id', DefaultFHIR.put.endpointStatus);
	app.put('/:apikey/endpoint-connection-type/:_id', DefaultFHIR.put.endpointConnectionType);
	app.put('/:apikey/endpoint-payload-type/:_id', DefaultFHIR.put.endpointPayloadType);
	// Service Provider Directory Resources, by : hardika cs(end)

}
module.exports = routesDefaultFHIR;