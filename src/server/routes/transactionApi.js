const express = require('express');
const router = express.Router();
const transactionService = require('../services/transaction.services');

router.post('/transactions', (req, res) => {
    transactionService.addTransactions(req, res);
});

module.exports = router;