import Fastify from 'fastify'
import cors from '@fastify/cors'

const app = Fastify({
    logger: false
})

app.register(cors)

app.register(import('../functions/index.js'), {
    prefix: '/'
})

export default async (req, res) => {
    await app.ready();
    app.server.emit('request', req, res);
}
