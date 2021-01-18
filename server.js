const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

app.use(cors());

let number = 1;

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/lib', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.umd.js'));
});

app.get('/api/v2/requests/:uuid', function (req, res) {
  const { uuid } = req.params;
  res.status(200).send({
    results: [
      {
        uuid,
        error: {
          code: 0,
          description: 'Ошибок нет',
        },
        status: 'inProgress', //ready
      },
    ],
  });
});

app.post('/api/v2/requests', function (req, res) {
  res.status(201).send({
    number: number++,
    uuid: '24efab70-4502-11eb-a6c8-1f6f568dbd0e',
    isBlocked: false,
    blockedUUID: '',
  });
});

app.listen(16732);
