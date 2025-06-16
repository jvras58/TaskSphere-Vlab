export default function swaggerOptions(port: number) {
  return {
    mode: 'dynamic',
    openapi: {
      info: {
        title: 'TaskSphere API',
        description: 'API documentation for TaskSphere',
        version: '0.0.1',
      },
      servers: [{ url: `http://localhost:${port}` }],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
  };
}