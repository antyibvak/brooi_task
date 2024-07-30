const express = require("express");
const app = express();
const PORT = 4004;
const house = require("./controllers/HousesController");
const unit = require("./controllers/UnitController");
const apartment = require("./controllers/ApartmentController");
const bodyParser = require("body-parser")
const { body, param, validationResult } = require("express-validator")


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

function ValidationErrors(req, res, next) {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    next();
}


app.get('/', (req, res) => {  
    res.send('Home Page')
})

app.get('/viewhouses', async(req, res) => {  
    try {
        const result = await house.getHouses();
        res.status(200).json({ result });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error retrieving data' });
    }
})

app.get('/viewapartments', async(req, res) => {  
    try {
        const result = await apartment.getApartments();
        res.status(200).json({ result });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error retrieving data' });
    }
})

app.get('/viewhousesbylocation/:id', [param('id').isInt()], ValidationErrors, async(req, res) => {
    try {
        const result = await house.getHousebyLocation(req.params.id);
        res.status(200).json({ result });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error retrieving data' });
    }
})

app.get('/viewapartmentsbylocation/:id', [param('id').isInt()], ValidationErrors, async(req, res) => {
    try {
        const result = await apartment.getApartmentbyLocation(req.params.id);
        res.status(200).json({ result });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error retrieving data' });
    }
})

app.get('/viewunitsbyapartment/:id', [param('id').isInt()], ValidationErrors, async(req, res) => {   
    try {
        const result = await unit.getUnitsForApartment(req.params.id);
        res.status(200).json({ result });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error retrieving data' });
    }
})

app.post('/addhouse', [
    body('no_of_bedrooms').isInt(),
    body('no_of_floors').isInt(),
    body('price').isFloat(),
    body('location').isInt(),
    body('size_in_sqFt').isFloat(),
    body('furnished').isInt().custom(value => [0, 1].includes(value))
], ValidationErrors, async(req, res) => {  
    try {
        const result = await house.createHouses(req.body);
        res.status(201).json({
            no_of_bedrooms: result[0],
            no_of_floors: result[1],
            price: result[2],
            location: result[3],
            size_in_sqFt: result[4],
            furnished: result[5]
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error posting data' });
    }
})

app.post('/addunit', [
    body('price').isFloat(),
    body('no_of_bedrooms').isInt(),
    body('size_in_sqFt').isFloat(),
    body('apartment').isInt(),
    body('furnished').isInt().custom(value => [0, 1].includes(value))
], ValidationErrors, async(req, res) => {   
    try {
        const result = await unit.createUnit(req.body);
        res.status(201).json({
            price: result[0],
            no_of_bedrooms: result[1],
            size_in_sqFt: result[2],
            apartment: result[3],
            furnished: result[4]
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error posting data' });
    }
})

app.post('/addapartment', [
    body('no_of_units').isInt(),
    body('location').isInt(),
    body('size_in_sqFt').isFloat()
], ValidationErrors, async(req, res) => {  
    try {
        console.log('Received data:', req.body);
        const result = await apartment.createApartments(req.body);
        res.status(201).json({
            no_of_units: result[0],
            location: result[1],
            size_in_sqFt: result[2],
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error posting data' });
    }
})

app.patch('/edithouse/:id', [
    param('id').isInt(),
    body('no_of_bedrooms').optional().isInt(),
    body('no_of_floors').optional().isInt(),
    body('price').optional().isFloat(),
    body('location').optional().isInt(),
    body('size_in_sqFt').optional().isFloat(),
    body('furnished').optional().isInt().custom(value => [0, 1].includes(value))
], ValidationErrors, async(req, res) => {  
    try {
        const id = await house.editHouses(req.params.id, req.body);
        res.status(200).json({ id });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error updating data' });
    }
})

app.patch('/editunit/:id', [
    param('id').isInt(),
    body('price').optional().isFloat(),
    body('no_of_bedrooms').optional().isInt(),
    body('size_in_sqFt').optional().isFloat(),
    body('apartment').optional().isInt(),
    body('furnished').optional().isInt().custom(value => [0, 1].includes(value))
], ValidationErrors, async(req, res) => { 
    try {
        const id = await unit.editUnit(req.params.id, req.body);
        res.status(200).json({ id });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error updating data' });
    }
})

app.patch('/editapartment/:id', [
    param('id').isInt(),
    body('no_of_units').optional().isInt(),
    body('location').optional().isInt(),
    body('size_in_sqFt').optional().isFloat(),
], ValidationErrors, async(req, res) => {   
    try {
        const id = await apartment.editApartments(req.params.id, req.body);
        res.status(200).json({ id });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error updating data' });
    }
})

app.delete('/deletehouse/:id', [param('id').isInt()], ValidationErrors, async(req, res) => {
    try {
        await house.deleteHouses(req.params.id);
        res.status(200).json({ success: true });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error deleting data' });
    }
})

app.delete('/deleteapartment/:id', [param('id').isInt()], ValidationErrors, async(req, res) => { 
    try {
        await apartment.deleteApartments(req.params.id);
        res.status(200).json({ success: true });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error deleting data' });
    }
})

app.delete('/deleteunit/:id', [param('id').isInt()], ValidationErrors, async(req, res) => {   
    try {
        await unit.deleteUnit(req.params.id);
        res.status(200).json({ success: true });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error deleting data' });
    }
})


app.listen(PORT, (err) => {
    if (err) {
        console.log('err')
    }
    else{
        console.log(`Listening on PORT ${PORT} ...`)
    }
})





