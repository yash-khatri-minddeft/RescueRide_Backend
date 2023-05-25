const express = require('express');
const router = express.Router();

router.post('/admin-signup',(req,res) => {
  res.status(200).json({msg: 'hello'})
})

module.exports = router;