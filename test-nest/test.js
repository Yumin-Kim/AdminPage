const app = require('express')();

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(8081, () => {
  console.log('Hello');
});
