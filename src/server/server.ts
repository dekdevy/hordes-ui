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
  root: require('path').join(__dirname, '../tests')
})

// the test pages
const tests  = ['mock', 'list']

// generate root page with list of tests
fastify.get('/', (req:fRequest, reply:fReply) => {
  reply.type('text/html')
  return reply.send(`
    <html>
      <head>
      <title>Hordes.io UI Testbed</title>
      </head>
      <body>
        <h3>Test pages:</h3>
        <ul>
        ${tests.map(t=>`<li><a href='/${t}'>${t}</a></li>`).join('')}
        <ul>
      </body>
    </html> 
  `)
})

// generate end points for test targets
tests.forEach( test => {
  fastify.get('/'+test, (req:fRequest, reply:fReply) => {
    reply.type('text/html')
    return reply.send(`
    <html>
      <head>
      <title>Hordes.io UI Testbed - ${test}</title>
      </head>
      <body>
        <script src='./${test}.js'></script>
      </body>
    </html> 
  `)
  })
})

// run the server
export const start = async () : Promise<void> => {
  try {
    await fastify.listen(port)
    console.log(`Web server listening on ${port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()