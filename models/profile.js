const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    name: String,
    username: {unique: true, type: String},
    email: String,
    major: String,
    year: String,
    bio: String,
    skills: [String],
})
const profile = mongoose.model('profile', profileSchema);

module.exports = profile;