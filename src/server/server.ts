const fastify = require('fastify')({ logger: false })
const fastifyStatic = require('fastify-static')
const port = 8080

// Set up generic fastify typedefs
interface fRequest {
  url:string
}
interface fReply {
  send(text:string): void,
  sendFile(path:string): void,
  type(filetype:string): void
}

// register static server (allowing to serve files). dist/js/ui folder is served at root
fastify.register(fastifyStatic, {
  root: require('path').join(__dirname, '../ui')
})

// reply with a generic html file which loads ui.js statically
fastify.get('/', (req:fRequest, reply:fReply) => {
  reply.type('text/html')
  return reply.send(`
    <html>
      <head>
      <title>Hordes.io UI Testbed</title>
      </head>
      <body>
        <script src='./ui.js'></script>
      </body>
    </html> 
  `)
})

// run the server
export const start = async () : Promise<void> => {
  try {
    await fastify.listen(port, '0.0.0.0')
    console.log(`Web server listening on ${port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()