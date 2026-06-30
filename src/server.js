const app = require('../src/app');
const PORT = process.env.PORT || 3000;
const db = require("./config/db");

db(); 


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});