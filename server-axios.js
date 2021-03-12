onst express = require('express');
const app = express();
const port = 3001;

const axios = require('axios');


app.get('/say/:keyword', (req, res) => {
key = req.params.keyword;
axios.get('https://6275ciiha3.execute-api.us-east-2.amazonaws.com/default/myFunction?keyword=' + key)
  .then(function (response) {
    res.send(response.data);
    console.log(response.data);
  })

})

app.listen(port, () => {
        console.log('Example app listening at http://localhost:3001')
});
