const { Router } = require('express');
const { getAllTypes } = require('../Controllers/getAllTypes');
const router = Router();

router.get('/', async (req, res) => {
  try {
    const typeList = await getAllTypes();
    return res.status(200).json(typeList);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;