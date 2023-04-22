

// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const {connection}=require("../index")

// const register= async (req, res) => {
//     try {
//         const { name, email, device_token, password } = req.body;
  
//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);
      
//         // Insert the user into the database
//         connection.query(
//           'INSERT INTO users (name, email, device_token, password) VALUES (?, ?, ?, ?)',
//           [name, email, device_token, hashedPassword],
//           (err, results) => {
//             if (err) {
//               console.error('Error inserting user into database:', err);
//               res.status(500).json({ message: 'Internal server error' });
//             } else {
//               const userId = results.insertId;
//               const token = jwt.sign({ userId }, JWT_SECRET);
//               res.json({ token });
//             }
//           }
//         );
//     } catch (error) {
//         res.send(error)
//     }
   
//   }

//   module.exports.register=register