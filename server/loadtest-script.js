// https://github.com/alexfernandez/loadtest/blob/main/doc/api.md
import {loadTest} from 'loadtest'

const options = {
	// url: 'https://beauty-service-app.onrender.com/',
  url: 'https://localhost:3001/services',
  maxSeconds: 5,
	maxRequests: 1000,
  concurrency: 200,
  clients: 200,
  insecure: true
  // secureProtocol: 'TLSv1_method'
}
loadTest(options, function(error, result) {
	if (error) {
		return console.error('Got an error: %s', error)
	}
	result.show()
	console.log('Tests run successfully')
})