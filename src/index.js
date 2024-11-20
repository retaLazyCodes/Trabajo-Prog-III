import { app } from './app.js';
import { config } from './config/index.js';

const PORT = config.server.PORT;

app.listen(PORT, () => {
    console.log(`Express server listening on PORT: ${PORT}`);
});
