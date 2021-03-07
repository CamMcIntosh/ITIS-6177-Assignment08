const express = require('express');
const app = express();
const port = 3000;

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

const options = {
	swaggerDefinition: {
		info: {
		  title: 'Personal Budget API',
		  version: '1.0.0', 
		  description: 'Personal Budget API generated'
		},
		host: '159.89.89.76:3000',
		basepath: '/',
	},
	apis: ['./server.js'],
};
const specs = swaggerJsdoc(options);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(cors());

const mariadb = require('mariadb');
const pool = mariadb.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'sample',
        port: 3306,
        connectionLimit: 5
});

app.get('/', (req, res) => {
        res.send('Hello World');
})

const prices = {
    food: [
        {
            name: "apple",
            price: 1
        },
        {
            name: "banana",
            price: 2
        },
        {
            name: "orange",
            price: 3
        }
    ]
}

/**
 * @swagger
 * /prices:
 *      get:
 *        description: Return all prices
 *        produces:
 *               - application/json
 *        responses:
 *              200:
 *                description: Object found containing array of prices
 * /agents:
 *      get:
 *        description: Return all agents
 *        produces:
 *               - application/json
 *        responses:
 *              200:
 *                description: Object found containing array of agents
 * /foods:
 *      get:
 *        description: Return all food
 *        produces:
 *               - application/json
 *        responses:
 *              200:
 *                description: Object found containing array of food
 * /orders:
 *      get:
 *        description: Return all orders
 *        produces:
 *               - application/json
 *        responses:
 *              200:
 *                description: Object found containing array of orders
 * /company:
 *      post:
 *        description: Insert a new company
 *        consumes:
 *               - application/json
 *        parameters:
 *              - in: body
 *                schema:
 *                  type: object
 *                  properties:
 *                      COMPANY_ID:
 *                          type: string
 *                      COMPANY_NAME:
 *                          type: string
 *                      COMPANY_CITY:
 *                          type: string
 *        responses:
 *              201:
 *                description: Object found containing array of companies
 * /studentreport/:id:
 *      patch:
 *        description: Update a Student Report grade
 *        consumes:
 *               - application/json
 *        parameters:
 *              - in: param
 *                schema:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: string
 *        responses:
 *              201:
 *                description: Object found containing array of student reports
 * /student/:id:
 *      put:
 *        description: Update a Student record
 *        consumes:
 *               - application/json
 *        parameters:
 *              - in: param
 *                schema:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: string
 *        responses:
 *              201:
 *                description: Object found containing array of students
 * /foods/:id:
 *      delete:
 *        description: Delete a food
 *        consumes:
 *               - application/json
 *        parameters:
 *              - in: param
 *                schema:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: string
 *        responses:
 *              201:
 *                description: Object found containing array of foods
 */
app.get('/prices', (req, res) => {
    res.json(prices);
});

app.get('/agents', (req, res) => {
  pool.getConnection().then(connection => {
    connection.query('SELECT * from agents;').then(rows => {
      res.json(rows);
        console.log('Data received: ', rows);
        }).then(anything => {
        connection.release();
  });
});
});

app.get('/foods', (req, res) => {
  pool.getConnection().then(connection => {
    connection.query('SELECT * from foods;').then(rows => {
      res.json(rows);
        console.log('Data received: ', rows);
        }).then(anything => {
        connection.release();
  });
});
});

app.get('/orders', (req, res) => {
  pool.getConnection().then(connection => {
    connection.query('SELECT * from orders;').then(rows => {
      res.json(rows);
        console.log('Data received: ', rows);
        }).then(anything => {
        connection.release();
  });
});
});

app.post('/company/', (req, res) => {
        console.log('Request Body: ', req.body);
        pool.getConnection().then(connection => {
            var companyID = req.body.COMPANY_ID;
            var companyName = req.body.COMPANY_NAME;
            var companyCity = req.body.COMPANY_CITY;
            connection.query('INSERT INTO company VALUES (?, ?, ?)', [companyID, companyName, companyCity]).then(rows => {
                res.send({success: true});
                console.log('Data posted: ', rows);
                }).then(anything => {
                connection.release();
          });
        });
    });

    app.patch('/studentreport/:id', (req, res) => {
        console.log('Request Params: ', req.params.id);
        pool.getConnection().then(connection => {
            var id = req.params.id;
            connection.query('UPDATE studentreport SET GRADE = ? WHERE ROLLID = ', id, ';').then(rows => {
              res.json(rows);
                console.log('Data updated: ', rows);
                }).then(anything => {
                connection.release();
          });
        });
    });

    app.put('/student/:id', (req, res) => {
        console.log('Request Params: ', req.params.id);
        pool.getConnection().then(connection => {
            var id = req.params.id;
            connection.query('UPDATE student SET NAME = ?, TITLE = ?, CLASS = ?, SECTION = ?, ROLLID = ? WHERE ROLLID = ', id, ';').then(rows => {
              res.json(rows);
                console.log('Data updated: ', rows);
                }).then(anything => {
                connection.release();
          });
        });
    });

    app.delete('/foods/:id', (req, res) => {
        console.log('Request Params: ', req.params.id);
        pool.getConnection().then(connection => {
            var id = req.params.id;
            connection.query('DELETE FROM foods WHERE ITEM_ID = ', id, ';').then(rows => {
              res.json(rows);
                console.log('Data deleted: ', rows);
                }).then(anything => {
                connection.release();
          });
        });
    });

app.listen(port, () => {
        console.log('Example app listening at http://localhost:3000')
});
