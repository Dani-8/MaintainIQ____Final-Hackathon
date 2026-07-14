import app from './app.js';
import { env } from './config/env.js';

const PORT = env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 MaintainIQ Backend Server running on port ${PORT}`);
});
