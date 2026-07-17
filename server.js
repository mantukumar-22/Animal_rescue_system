
const app = require('./src/app.js');
require('dotenv').config();
const port = process.env.PORT;
const connectDB = require('./src/config/db.js')
// connectDB();

app.get('/', (req, res) => {
    res.send('Animal Rescue application is running')
})



connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
.catch((err) => {
    console.log('Error connecting to MongoDB:', err);
});