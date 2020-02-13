const express = require('express');
const router = express.Router();
const transactionService = require('../services/transaction.services');

router.post('/transactions', async (req, res) => {
    await transactionService.addTransactions(req, res);
});

router.get('/transactions', async (req, res) => {
    if (req.query && req.query.startDate && req.query.endDate) {
        const startDate = new Date(req.query.startDate);
        const endDate = new Date(req.query.endDate);
        var result = await transactionService.getTransactions(startDate, endDate);
        res.status(200).json(result);
    }
    else {
        res.status(400).json({message: 'invalid query'});
    }
})
module.exports = router;