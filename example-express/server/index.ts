import './common/env';
import Server from './common/server';
import routes from './routes';

const server = new Server().router(routes);
export const app = server.app();

const port = parseInt(process.env.PORT ?? '3000');
export default server.listen(port);
