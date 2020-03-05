const mongoose = require('mongoose');

const megaSchema = mongoose.Schema({
    concurso:String,
    umdezena:Number,
    doisdezena:Number,
    tresdezena:Number,
    quatrodezena:Number,
    cincodezena:Number,
    seisdezena:Number,
});

module.exports = megaSchema;