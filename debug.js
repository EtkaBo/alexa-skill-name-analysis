const index2 = require('./index2');
const nameAnalysisTexts = require('./nameAnalysisTexts');
const analysis = require('./analysis');

function handleGender() {
debugger;
    let textNum = analysis.hash('yea', 'female');

    let speechOutput = nameAnalysisTexts.Phrases[textNum[0]] + nameAnalysisTexts.Phrases2[textNum[1]];
    console.log(textNum);
    console.log(speechOutput);

}

handleGender();
 

let json = `{
	"version": "1.0",
	"session": {
		"new": false,
		"sessionId": "amzn1.echo-api.session.82773c5c-8f36-4b2a-b3ca-752aa07a8de2",
		"application": {
			"applicationId": "amzn1.ask.skill.ee56c7a1-0338-4941-8956-06de9092e774"
		},
		"attributes": {
			"firstName": "anan",
			"step": "step2"
		},
		"user": {
			"userId": "amzn1.ask.account.AHFDURVBIN2AI5Q24INVF5IA4TOSYYSA7TSZ5XI2IGHTFNUZOGFSW4JAMRJHRX3QEBBR5QOJ4CJCAMXEAAHD7DINXJZ4GOLLURYC6ZEWBIYEHHAW6DSCPLCJ3VG5XHFPZPE4Z33WQACAE2TQLQ3QT2GKX6TXGMNOE2RPT4JW5HS6NJABQPCRUEIA6SPBT25YWQ6WG2NOWNXM5VI"
		}
	},
	"context": {
		"AudioPlayer": {
			"playerActivity": "IDLE"
		},
		"System": {
			"application": {
				"applicationId": "amzn1.ask.skill.ee56c7a1-0338-4941-8956-06de9092e774"
			},
			"user": {
				"userId": "amzn1.ask.account.AHFDURVBIN2AI5Q24INVF5IA4TOSYYSA7TSZ5XI2IGHTFNUZOGFSW4JAMRJHRX3QEBBR5QOJ4CJCAMXEAAHD7DINXJZ4GOLLURYC6ZEWBIYEHHAW6DSCPLCJ3VG5XHFPZPE4Z33WQACAE2TQLQ3QT2GKX6TXGMNOE2RPT4JW5HS6NJABQPCRUEIA6SPBT25YWQ6WG2NOWNXM5VI"
			},
			"device": {
				"deviceId": "amzn1.ask.device.AFG4YTPVYJ7P3QQ6CCSXIQGM7WZN3OURGUXSXJUQDY7U5UO3W5PHZIEX3WQKSOHA7WDJ3P2M5C4HO7BJP2PYBZENCX3WK7AJHIBSVUNHEKJYMDWKIFPPQFOJJ32W46LIYXYF6SW74L34AAJNMCAXDRCLLDHWNVGZC4K7SPH6GWK4ANUHU6PIG",
				"supportedInterfaces": {
					"AudioPlayer": {}
				}
			},
			"apiEndpoint": "https://api.amazonalexa.com",
			"apiAccessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjEifQ.eyJhdWQiOiJodHRwczovL2FwaS5hbWF6b25hbGV4YS5jb20iLCJpc3MiOiJBbGV4YVNraWxsS2l0Iiwic3ViIjoiYW16bjEuYXNrLnNraWxsLmVlNTZjN2ExLTAzMzgtNDk0MS04OTU2LTA2ZGU5MDkyZTc3NCIsImV4cCI6MTU1MTY1MDA0NywiaWF0IjoxNTUxNjQ5NzQ3LCJuYmYiOjE1NTE2NDk3NDcsInByaXZhdGVDbGFpbXMiOnsiY29uc2VudFRva2VuIjpudWxsLCJkZXZpY2VJZCI6ImFtem4xLmFzay5kZXZpY2UuQUZHNFlUUFZZSjdQM1FRNkNDU1hJUUdNN1daTjNPVVJHVVhTWEpVUURZN1U1VU8zVzVQSFpJRVgzV1FLU09IQTdXREozUDJNNUM0SE83QkpQMlBZQlpFTkNYM1dLN0FKSElCU1ZVTkhFS0pZTURXS0lGUFBRRk9KSjMyVzQ2TElZWFlGNlNXNzRMMzRBQUpOTUNBWERSQ0xMREhXTlZHWkM0SzdTUEg2R1dLNEFOVUhVNlBJRyIsInVzZXJJZCI6ImFtem4xLmFzay5hY2NvdW50LkFIRkRVUlZCSU4yQUk1UTI0SU5WRjVJQTRUT1NZWVNBN1RTWjVYSTJJR0hURk5VWk9HRlNXNEpBTVJKSFJYM1FFQkJSNVFPSjRDSkNBTVhFQUFIRDdESU5YSlo0R09MTFVSWUM2WkVXQklZRUhIQVc2RFNDUExDSjNWRzVYSEZQWlBFNFozM1dRQUNBRTJUUUxRM1FUMkdLWDZUWEdNTk9FMlJQVDRKVzVIUzZOSkFCUVBDUlVFSUE2U1BCVDI1WVdRNldHMk5PV05YTTVWSSJ9fQ.iLRosoUU5-KCe57EDgnAFvqqku186ShUsVZujzF0xmvt7Rz9HBDOGtn6A2kpdVUiT_XpI9oE9ldoTI88Gfn21NpAx1ViAPzD9i4i87dW6uarrg9hmB5T_llRvqe7_5a9xFKr1DBZSqe2ZChvAzwmQjbEcl_SnDmGR3jpFy_oszUyJrEQKmFSN293LhEJF1U1dN8aSGrbWeMdgBwK6cbtMp15cdEL21ifn-IIofW_-ac0XoojWicguuw_KTbcZ1YrouTaDzrvg91KsH_fXok0aTMgSIh65HEFINODGhsH3_1s5EJpfWO67hQzWAdFcy0PvbYbpPsc8vKNbCj9OMUU7w"
		},
		"Viewport": {
			"experiences": [
				{
					"arcMinuteWidth": 246,
					"arcMinuteHeight": 144,
					"canRotate": false,
					"canResize": false
				}
			],
			"shape": "RECTANGLE",
			"pixelWidth": 1024,
			"pixelHeight": 600,
			"dpi": 160,
			"currentPixelWidth": 1024,
			"currentPixelHeight": 600,
			"touch": [
				"SINGLE"
			]
		}
	},
	"request": {
		"type": "IntentRequest",
		"requestId": "amzn1.echo-api.request.b138c85d-650e-40f1-a1f8-5e404495a77c",
		"timestamp": "2019-03-03T21:49:07Z",
		"locale": "en-US",
		"intent": {
			"name": "ResponseToGenderIntent",
			"confirmationStatus": "NONE",
			"slots": {
				"gender": {
					"name": "gender",
					"value": "male",
					"resolutions": {
						"resolutionsPerAuthority": [
							{
								"authority": "amzn1.er-authority.echo-sdk.amzn1.ask.skill.ee56c7a1-0338-4941-8956-06de9092e774.Gender",
								"status": {
									"code": "ER_SUCCESS_MATCH"
								},
								"values": [
									{
										"value": {
											"name": "male",
											"id": "07cf4f8f5d8b76282917320715dda2ad"
										}
									}
								]
							}
						]
					},
					"confirmationStatus": "NONE",
					"source": "USER"
				}
			}
		},
		"dialogState": "COMPLETED"
	}
}`

