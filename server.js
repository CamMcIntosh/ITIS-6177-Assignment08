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
        pool.getConnection().then(connection => {
            var id = req.params.id;
            connection.query('INSERT INTO company VALUES ("20", "My Hero Academia", "Tokyo\r");').then(rows => {
                res.send({success: true});
                console.log('Data received: ', rows);
                }).then(anything => {
                connection.release();
          });
        });
    });

    app.patch('/company/', (req, res) => {
        pool.getConnection().then(connection => {
            var id = req.params.id;
            connection.query('INSERT INTO company VALUES ("20", "My Hero Academia", "Tokyo\r");').then(rows => {
              res.json(rows);
                console.log('Data received: ', rows);
                }).then(anything => {
                connection.release();
          });
        });
    });

app.listen(port, () => {
        console.log('Example app listening at http://localhost:3000')
});
