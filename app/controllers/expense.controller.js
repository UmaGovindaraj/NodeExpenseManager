const Expense = require('../models/expense.model.js');

// Create and Save a new Expense
exports.create = (req, res) => {
    // Validate request
    if(!req.body.title) {
        return res.status(400).send({
            message: "Expense title can not be empty"
        });
    }

    // Create a Expense
    const expense = new Expense({
        title: req.body.title || "Untitled Expense", 
        description: req.body.description,
        spentBy: req.body.spentBy,
        amount: req.body.amount
    });

    // Save Expense in the database
    expense.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Expense."
        });
    });
};

// Retrieve and return all expenses from the database.
exports.findAll = (req, res) => {
    Expense.find()
    .then(expenses => {
        res.status(200).send(expenses);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving expenses."
        });
    });
};
// Find a single Expense with a expenseId
exports.findOne = (req, res) => {
    Expense.findById(req.params.expenseId)
    .then(Expense => {
        if(!Expense) {
            return res.status(404).send({
                message: "Expense not found with id " + req.params.expenseId
            });            
        }
        res.send(Expense);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Expense not found with id " + req.params.expenseId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Expense with id " + req.params.expenseId
        });
    });
};

// Update a Expense identified by the expenseId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.title) {
        return res.status(400).send({
            message: "Expense title can not be empty"
        });
    }

// Find Expense and update it with the request body
    Expense.findByIdAndUpdate(req.params.expenseId, {
        title: req.body.title || "Untitled Expense", 
        description: req.body.description,
        spentBy: req.body.spentBy,
        amount: req.body.amount
    }, {new: true})
    .then(Expense => {
        if(!Expense) {
            return res.status(404).send({
                message: "Expense not found with id " + req.params.expenseId
            });
        }
        res.send(Expense);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Expense not found with id " + req.params.expenseId
            });                
        }
        return res.status(500).send({
            message: "Error updating Expense with id " + req.params.expenseId
        });
    });
};


// Delete a Expense with the specified expenseId in the request
exports.delete = (req, res) => {
    Expense.findByIdAndRemove(req.params.expenseId)
    .then(Expense => {
        if(!Expense) {
            return res.status(404).send({
                message: "Expense not found with id " + req.params.expenseId
            });
        }
        res.send({message: "Expense deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Expense not found with id " + req.params.expenseId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Expense with id " + req.params.expenseId
        });
    });
};