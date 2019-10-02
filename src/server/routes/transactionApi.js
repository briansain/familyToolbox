const express = require('express');
const router = express.Router();
const transactionService = require('../services/transaction.services');

router.get('/transaction', (req, res) => {
    transactionService.saveTransactions(req, res);
});

module.exports = router;