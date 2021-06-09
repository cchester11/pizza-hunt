const { Pizza } = require('../models');

const pizzaController = {
  //we are creating methods that will be used by routes in the controllers folder 
  getAllPizza(req, res) {
    Pizza.find({})
    .then(results => res.json(results))
    .catch(err => {
      console.log(err);
      res.status(400).json(err)
    })
  },

  getPizzaById({ params }, res) {
    //recall that we send data as an object to destructure it 
    Pizza.findOne({ _id: params.id })
    .then(result => {
      if(!result) {
        res.status(404).json({ message: "None found" })
        return;
      }
      res.json(result)
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    })
  },

  createPizza({ body }, res) {
    Pizza.create(body)
    .then(result => res.json(result))
    .catch(err => res.status(400).json(err))
  },

  updatePizza({ params, body }, res) {
    //must send { new: true } to the database to allow it to update 
    Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
    .then(result => {
      if (!result) {
        res.status(404).json({ message: "None found" })
        return;
      }
      res.json(result)
    })
    .catch(err => res.status(400).json(err))
  },

  deletePizza({ params }, res) {
    Pizza.findOneAndDelete({ _id: params.id })
    .then(result => {
      if(!result) {
        res.status(404).json({ message: "None found" })
        return
      }
    })
    .catch(err => res.status(400).json(err))
  }
}

module.exports = pizzaController;