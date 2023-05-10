const express = require('express');
const axios = require('axios');
const app = express();
const fileUpload = require('express-fileupload');
const port =  process.env.PORT || 8080;



app.set('view engine', 'ejs');
app.set('views','./views');


app.use(express.urlencoded());
app.use(express.static('assets')); 
app.use(fileUpload());



app.get('/', (req, res) => {
    res.render('home');
});




app.post('/upload', async(req, res) => {
    // Get the file that was set to our field named "image"
    // console.log(req.files);
    const { image } = req.files;

    // // If no image submitted, exit
    // if (!image) return res.sendStatus(400);

  
    // // Move the uploaded image to our upload folder
  
    
    await image.mv('./upload/' + image.name);
 
    const fs = require('fs');
    
    
    const imageBuffer = await fs.readFileSync('./upload/' + image.name);

    const response = await  axios.post('https://flasktester-c7gr.onrender.com/predict', imageBuffer, {
        headers: {
          'Content-Type': 'image/jpeg'
        }
      })


      
     
    //   console.log(response);
      res.send(response.data);


      

//    console.log(response);
});

// console.log(process.env.PORT);
app.listen(port,()=>
{
  console.log('listening on port ' +port )

});