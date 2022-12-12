const { Router } = require('express');
const addressController = require('../controllers/address.controller');

const router = Router();

router.get('/', addressController.get_all_addresses_GET);
router.get('/:id', addressController.get_one_address_GET);
router.post('/', addressController.save_address_POST);
router.delete('/:id', addressController.delete_address_DELETE);
router.patch('/:id', addressController.update_address_PATCH);

module.exports = app => app.use('/address', router);
