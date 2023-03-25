import Fastify from 'fastify'

const app = Fastify({
    logger: false
})

app.register(import('../functions/index'), {
    prefix: '/'
})

export default async (req, res) => {
    await app.ready();
    app.server.emit('request', req, res);
}
