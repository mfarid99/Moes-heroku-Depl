
const mongoose = require ('mongoose');

const metallicaSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    color: {type: String, required: true},
    readyToEat: Boolean
});

const Metallica = mongoose.model('Metallica', metallicaSchema);

module.exports = Metallica;