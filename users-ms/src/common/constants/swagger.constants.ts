
export const postResponseProperties = {
  _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
  title: { type: 'string', example: 'Sample Post Title' },
  content: { type: 'string', example: 'This is the content of the post' },
  userId: { type: 'string', example: '507f1f77bcf86cd799439012' },
  createdAt: { type: 'string', example: '2024-12-25T11:00:00.000Z' },
  updatedAt: { type: 'string', example: '2024-12-25T11:00:00.000Z' }
};

export const unauthorizedResponseSchema = {
  type: 'object',
  properties: {
    success: { type: 'boolean', example: false },
    statusCode: { type: 'number', example: 401 },
    message: { type: 'string', example: 'You are not authorized to access this resource' },
    path: { type: 'string', example: '/posts' },
    timestamp: { type: 'string', example: '2024-12-25T11:00:00.000Z' }
  }
};

export const notFoundResponseSchema = {
  type: 'object',
  properties: {
    success: { type: 'boolean', example: false },
    statusCode: { type: 'number', example: 404 },
    message: { type: 'string', example: 'Post not found.' },
    path: { type: 'string', example: '/posts/:id' },
    timestamp: { type: 'string', example: '2024-12-25T11:00:00.000Z' }
  }
};