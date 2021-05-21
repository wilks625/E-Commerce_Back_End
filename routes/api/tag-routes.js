const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      // be sure to include its associated Product data
      include:
      { model: Product, through: ProductTag, as: 'associated_product' }
    })
    console.log(tagData);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      // be sure to include its associated Product data
      include:
      { model: Product, through: ProductTag, as: 'associated_product' }
    })
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id' })
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.json(500).json(err);
  }
  });

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(
      { tag_name: req.body.tag_name},
      { returning: true, where: { id: req.params.id }}
    )
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: { id: req.params.id }
    })
    if (!tagData) {
      res.status(404).json ({ message: 'No tag found with this id' })
      return;
    } else {
      console.log( `\n Deleting tag with id: ${req.params.id} \n` )
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
