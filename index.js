const express = require('express');
const axios = require('axios');
const app = express();



const fileUpload = require('express-fileupload');


app.use(fileUpload());

// Add this line to serve our index.html page
app.use(express.static('public'));

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

app.post('/upload', async(req, res) => {
    // Get the file that was set to our field named "image"
    // console.log(req.files);
    const { image } = req.files;

    // // If no image submitted, exit
    // if (!image) return res.sendStatus(400);

  
    // // Move the uploaded image to our upload folder
    image.mv(__dirname + '/upload/' + image.name);

    const fs = require('fs');
    const imageBuffer = fs.readFileSync('image');

    const response = await  axios.post('http://localhost:5000/predict', imageBuffer, {
        headers: {
          'Content-Type': 'image/jpeg'
        }
      })
     
      console.log(response);
      res.send(response.data);


      

//    console.log(response);
});


app.listen(3000, () => console.log('Server started on port 3000'));