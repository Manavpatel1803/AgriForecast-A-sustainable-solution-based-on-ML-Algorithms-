const axios = require('axios');

axios.post('http://localhost:5000/predict', {
    
})
.then(response => {
    console.log(response.data.prediction);
    // Handle prediction response
})
.catch(error => {
    console.error('Error:', error);
    // Handle error
});
