const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!categoryData) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.put('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const [updatedRows] = await Category.update(req.body, {
      where: {
        id: categoryId
      }
    });
    if (updatedRows > 0) {
      const updatedCategory = await Category.findByPk(categoryId);
      res.status(200).json(updatedCategory);
    } else {
      res.status(404).json({ message: `Category with id ${categoryId} not found.` });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
