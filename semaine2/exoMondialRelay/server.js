const express = require('express');
const relaySearchRoutes = require('./routes/relaySearchRoutes');

const app = express();
app.use(express.json());
app.use('/relaysearch', relaySearchRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
