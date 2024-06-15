// https://github.com/alexfernandez/loadtest/blob/main/doc/api.md
import {loadTest} from 'loadtest'

const options = {
	url: 'https://beauty-service-app.onrender.com/services',
  // url: 'https://localhost:3001/services',
  // maxSeconds: 5,
	maxRequests: 5000,
  concurrency: 200,
  clients: 200,
  insecure: true
  // secureProtocol: 'TLSv1_method' // for compatibility for https://localhost
};

loadTest(options, function(error, result) {
	if (error) {
		console.error('Got an error: %s', error)
	}
  // console.log("results: ", result)
	result.show()
	console.log('Tests run successfully')
});