// Base controller with common CRUD operations
class BaseController {
  constructor(model, idField = '_id') {
    this.model = model;
    this.idField = idField;
  }

  // Create new record
  async create(req, res) {
    try {
      const record = new this.model(req.body);
      await record.save();
      res.status(201).json(record);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // Get all records
  async getAll(req, res) {
    try {
      const records = await this.model.find();
      res.json(records);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Get record by ID
  async getById(req, res) {
    try {
      const query = {};
      query[this.idField] = req.params.id;
      
      const record = await this.model.findOne(query);
      if (!record) {
        return res.status(404).json({ error: 'Record not found' });
      }
      res.json(record);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Update record by ID
  async update(req, res) {
    try {
      const query = {};
      query[this.idField] = req.params.id;
      
      const record = await this.model.findOneAndUpdate(
        query,
        req.body,
        { new: true }
      );
      if (!record) {
        return res.status(404).json({ error: 'Record not found' });
      }
      res.json(record);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // Delete record by ID
  async delete(req, res) {
    try {
      const query = {};
      query[this.idField] = req.params.id;
      
      const record = await this.model.findOneAndDelete(query);
      if (!record) {
        return res.status(404).json({ error: 'Record not found' });
      }
      res.json({ message: 'Record deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Deactivate record (soft delete)
  async deactivate(req, res) {
    try {
      const query = {};
      query[this.idField] = req.params.id;
      
      const record = await this.model.findOneAndUpdate(
        query,
        { isActive: false },
        { new: true }
      );
      if (!record) {
        return res.status(404).json({ error: 'Record not found' });
      }
      res.json(record);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Generic error handler
  handleError(res, error, statusCode = 500) {
    console.error('Controller error:', error);
    res.status(statusCode).json({ 
      error: error.message || 'Internal server error' 
    });
  }

  // Generic success response
  sendSuccess(res, data, statusCode = 200) {
    res.status(statusCode).json(data);
  }
}

module.exports = BaseController; 