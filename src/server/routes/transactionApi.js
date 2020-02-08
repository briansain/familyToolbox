const express = require('express');
const router = express.Router();
const transactionService = require('../services/transaction.services');

router.post('/transactions', async (req, res) => {
    await transactionService.addTransactions(req, res);
});

router.get('/transactions', async (req, res) => {
    if (req.query && req.query.dateRange) {
        const dateRange = new Date(req.query.dateRange);
        dateRange.setUTCHours(0, 0, 0, 0);
        var result = await transactionService.getTransactions(dateRange);
        res.status(200).json(result);
    }
    else {
        res.status(400).json({message: 'invalid query'});
    }
})
module.exports = router;