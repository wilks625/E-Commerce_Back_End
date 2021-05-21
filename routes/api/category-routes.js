const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try { 
    const categoryData = await Category.findAll({
      // be sure to include its associated Products
      include: [{ model: Product }]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: [{ model: Product }]
    })
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id"' })
    } else {
      res.status(200).json(categoryData);
    }
  }catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const catagoryData = await Category.update(
      { category_name: req.body.category_name },
      { returning: true, where: {id: req.params.id} }
    )
    res.status(200).json(catagoryData);
  } catch (err) {
    res.status(400).json(err);
  }

});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {id: req.params.id}
    })
    if (!catagoryData) {
      res.status(404).json({ message: 'No category found with this id' })
      return;
    } else {
      console.log( `\n Deleting category with id: ${req.params.id} \n` )
    }
    res.status(200).json(catagoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
