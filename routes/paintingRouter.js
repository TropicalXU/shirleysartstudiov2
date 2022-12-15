const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const Paintings = require('../models/Painting');

const paintingRouter = express.Router();

paintingRouter.use(bodyParser.json());

paintingRouter.route('/')
.options(cors, (req, res) => { res.sendStatus(200)})
.get((req,res,next) => {
    Paintings.find(req.query)
    .then((paintings) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(paintings);
    }, (err) => next(err))
    .catch((err) => next(err));
});

paintingRouter.route('/:id')
.options(cors, (req, res) => { res.sendStatus(200)})
.get( (req,res,next) => {
    Paintings.findById(req.params.id)
    .then((painting) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(painting);
    }, (err) = next(err))
    .catch((err) => next(err));
});

module.exports = paintingRouter;