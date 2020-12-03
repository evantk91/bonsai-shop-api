const express = require('express');
const { utimes } = require('fs');
const { get } = require('http');
const app = express();

const plants = {
   1: {
      type: "bougainvillea",
      price: 60,
      age: 1
   },
   2: {
      type: "portulacaria",
      price: 40,
      age: 5
   },
   3: {
      type: "bougainvillea",
      price: 80,
      age: 2
   },
   4: {
      type: "rhododendron",
      price: 45,
      age: 3
   }
};

const PORT = 3000;

app.get('/plants', (req, res, next) => {
    res.send(plants);
})

app.get('/plants/:id', (req, res, next) => {
    const plant = plants[req.params.id];
    if (plant) {
        res.send(plant);
    } else {
        res.status(404).send('plant not found');
    }; 
});

app.put('/plants/:id', (req, res, next) => {
    const plantUpdate = req.query;
    if(plants[req.params.id]) {
        plants[req.params.id] = plantUpdate;
        res.send(plants[req.params.id]);
    } else {
        res.status(404).send();
    };
});

app.post('/plants', (req, res, next) => {
    const newPlant = req.query;
    const numKeys = Object.keys(plants).length;
    console.log(newPlant);
    console.log(numKeys);
    plants[numKeys + 1] = newPlant;
    res.send(newPlant);
})

app.delete('/plants/:id', (req, res, next) => {
    const deletedIdx = req.params.id;
    if(deletedIdx) {
       delete plants[deletedIdx];
       res.status(204).send(plants[deletedIdx]);
    } else {
       res.status(404).send(); 
    }
})

app.listen(PORT, () => {
   console.log(`Server is listening on port ${PORT}`);
});