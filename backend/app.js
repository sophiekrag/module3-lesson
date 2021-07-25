require("dotenv").config();
const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const bcryptjs = require("bcryptjs");

const saltRounds = 10;

const Complaint = require("./models/Complaint.model")
const User = require ("./models/User.model")

const app = express();

require("./config/db.config")

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('hallo');
})

app.post('/api/users', async (req, res) => {
    const {formData: {
        title,
        copy,
        description,
        prio,
        user,
        }
    } = req.body
    console.log(req.body)

    try {
        await Complaint.create({
            title,
            copy,
            description,
            prio,
            user,   
        })
        console.log(Complaint)
    }
    catch (err) {
        console.log(err)
    }
})

app.get('/api/users', async (req, res) => {
    try {
        const complaintData = await Complaint.find()
        res.status(200).json(complaintData)
    }
    catch(error){
        console.log(error)
    }
})

//---------Signup-----------

app.post('/api/signup', (req, res) => {
    const {signupData: {
        email,
        username,
        password,
        }
    } = req.body
    console.log(req.body)

    if (!username || !email || !password) {
        console.log('All field required')
    }

    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if (!regex.test(password)) {
            res.status(500).send("Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.")
            console.log("Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.")
        };

    bcryptjs
        .genSalt(saltRounds)
        .then((salt) => bcryptjs.hash(password, salt))
        .then((hashedPassword) => {
            return User.create({
                username,
                email,
                passwordHash: hashedPassword,
            });
    })
        .then((user) => console.log(user))
        .catch((err) => console.log(err))
})

app.get('/api/signup', (req, res) => {
    
})

// //---------Login---------



app.listen(
    process.env.PORT,
    console.log(`Server running on ${process.env.PORT}`)
);


//----------Without mongoDB-------------

// app.post('/api/users', (req, res) => {
//     const { formData } = req.body;
//     console.log(req.body)

//     // Create a new object with the form data
//     // And add a unique id to it
//     const newComplaint = {
//         id: uuidv4(),
//         ...formData
//     }

//     fs.readFile('savedUsers.json', 'utf8', (err, data) => {
//         if (err) {
//             console.error('readFile error: ',err)
//         }
//         // Check if the file is empty. If not, use JSON.parse()
//         const currentData = data ? JSON.parse(data) : data;

//         // Grab the old data and the new data and safe it in the variabel
//         // which will be stored in the JSON file
//         const savedComplaints = [...currentData, newComplaint]

//         // Write the data to the JSON file
//         fs.writeFile(
//             'savedUsers.json',
//             JSON.stringify(savedComplaints),
//             (err) => {
//                 if (err) {
//                     console.error('writeFile error: ',err)
//                 };
//                 console.log('the file has been save');
//             }
//         )
//     })

//     res.status(201).json({})
// })