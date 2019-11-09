import path from 'path'
import express from 'express'

export default app => {
  app.use('/test', (req, res, next) => {
    console.log('Time:', Date.now());
    next();
  });
}
