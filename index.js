const port = 3000

const express = require('express');
const path = require('path')
const fs = require('fs');
const cookieParser = require('cookie-parser')
const { json } = require('body-parser');

const app = express()

app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
    try {
        const userData = await JSON.parse(fs.readFileSync('dataAPI.json', 'utf-8'))
        
        
        res.cookie('name','vivek')
        // Step 4: Send the top fifteen users to the view
        res.render('index', { userdata: userData, error: null });
    } catch (error) {
        console.log(error);
        res.render('index', { userdata: null, error: error })
    }
})
app.get('/influencers',async(req,res)=>{
    
    try {
        const userData = await JSON.parse(fs.readFileSync('dataAPI.json', 'utf-8'))
        
        

        // Step 4: Send the top fifteen users to the view
        res.render('influencers', { userdata: userData, error: null });
    } catch (error) {
        console.log(error);
        res.render('influencers', { userdata: null, error: error })
    }
})
app.get('/:category', async (req, res) => {
    try {
        const userData = JSON.parse(fs.readFileSync('dataAPI.json', 'utf-8'));
        let filterData = [];
        userData.forEach(data => {
            if (data.category.toLowerCase() === req.params.category.toLowerCase()) {
                filterData.push(data);
            }
        });
        
        
        res.render('influencers', { userdata: filterData.length > 0 ? filterData : [], error: null });
    } catch (error) {
        res.render('influencers', { userdata: [], error: error.message });
    }
});
app.get('/read/one',(req,res)=>{
    console.log(req.cookies);
    res.send('cooki')
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
