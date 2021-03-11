const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {unique: true, type: String},
    email: String,
    password: String,
})
const user = mongoose.model('user', userSchema);

// userSchema.pre("save", function (next) {
//     const user = this

//     if (this.isModified("password") || this.isNew) {
//         bcrypt.genSalt(10, function (saltError, salt) {
//         if (saltError) {
//             return next(saltError)
//         } else {
//             bcrypt.hash(user.password, salt, function(hashError, hash) {
//             if (hashError) {
//                 return next(hashError)
//             }
//             console.log("Hash: "+hash);
//             user.password = hash
//             next()
//             })
//         }
//         })
//     } else {
//         return next()
//     }
// })

module.exports = user;