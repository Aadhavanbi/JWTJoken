const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const Mycontroller = require('../controllers/jwt_controller');








/**
 * @swagger
 * /addMacValue:
 *   post:
 *     summary: Create a new Business
 *     description: Create a new user with the specified details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *                 example: 'NGYB6784HUUSDJ'
 *               mail:
 *                 type: string
 *                 example: 'ss@gmail.com'
 *               company_name:
 *                 type: string
 *                 example: 'ASD'
 *               mac_id:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:    
 *                     address:
 *                       type: string
 *                       example: '192.168.1.108'
 *                     netmask:
 *                       type: string
 *                       example: '255.255.255.0'
 *                     family:
 *                       type: string
 *                       example: 'IPv4'
 *                     mac:
 *                       type: string
 *                       example: '01:02:03:0a:0b:0c'
 *                     internal:
 *                       type: boolean
 *                       example: false
 *                     cidr:
 *                       type: string
 *                       example: '192.168.1.108/24'
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request. Invalid input or validation error.
 */


router.post('/addMacValue', Mycontroller.addMacValue)




module.exports = router