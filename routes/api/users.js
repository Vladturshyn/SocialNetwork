const express = require('express');
const router = express.Router();

router.get('/test', (request,response)=>{
    response.json({ms:'user'})
});

module.exports = router;