const express = require('express');
const router = express.Router();

router.get('/test', (request,response)=>{
    response.json({ms:'posts'})
});

module.exports = router;