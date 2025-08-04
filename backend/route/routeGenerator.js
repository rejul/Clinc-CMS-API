const express = require('express');

// Route generator for common CRUD operations
class RouteGenerator {
  constructor(controller, validations = {}) {
    this.controller = controller;
    this.validations = validations;
  }

  // Generate standard CRUD routes
  generateCRUDRoutes(router, basePath = '') {
    // Create
    if (this.validations.create) {
      router.post(basePath, this.validations.create, this.controller.create);
    } else {
      router.post(basePath, this.controller.create);
    }

    // Get all
    router.get(basePath, this.controller.getAll);

    // Get by ID
    if (this.validations.getById) {
      router.get(`${basePath}/:id`, this.validations.getById, this.controller.getById);
    } else {
      router.get(`${basePath}/:id`, this.controller.getById);
    }

    // Update
    if (this.validations.update) {
      router.put(`${basePath}/:id`, this.validations.update, this.controller.update);
    } else {
      router.put(`${basePath}/:id`, this.controller.update);
    }

    // Delete
    if (this.validations.delete) {
      router.delete(`${basePath}/:id`, this.validations.delete, this.controller.delete);
    } else {
      router.delete(`${basePath}/:id`, this.controller.delete);
    }

    // Deactivate (soft delete)
    if (this.validations.deactivate) {
      router.patch(`${basePath}/:id/deactivate`, this.validations.deactivate, this.controller.deactivate);
    } else {
      router.patch(`${basePath}/:id/deactivate`, this.controller.deactivate);
    }

    return router;
  }

  // Generate custom routes
  generateCustomRoutes(router, routes = []) {
    routes.forEach(route => {
      const { method, path, validation, handler } = route;
      if (validation) {
        router[method](path, validation, handler);
      } else {
        router[method](path, handler);
      }
    });
    return router;
  }
}

// Helper function to create router with common middleware
const createRouter = (middleware = []) => {
  const router = express.Router();
  middleware.forEach(mw => router.use(mw));
  return router;
};

module.exports = {
  RouteGenerator,
  createRouter
}; 