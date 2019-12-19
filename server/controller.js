const Model = require('./model.js');

module.exports = {
  getgraph: (req, res) => {
    Model.getgraph((error, data) => {
      if (error) {
        res.status(400).send(error);
      } else {
        res.status(200).send(data);
      }
    }, req.params);
  },
  getrecentsales: (req, res) => {
    Model.getrecentsales((error, data) => {
      if (error) {
        res.status(400).send(error);
      } else {
        res.status(200).send(data);
      }
    }, req.params);
  },
  getzip: (req, res) => {
    Model.getzip((error, data) => {
      if (error) {
        res.status(400).send(error);
      } else {
        res.status(200).send(data);
      }
    }, req.params);
  },
  gethouseinfo: (req, res) => {
    Model.gethouseinfo((error, data) => {
      if (error) {
        res.status(400).send(error);
      } else {
        res.status(200).send(data);
      }
    }, req.params);
  },
  postgraph: (req, res) => {
    Model.postgraph((error, data) => {
      if (error) {
        res.status(400).send(error);
      } else {
        res.status(200).send(data);
      }
    }, req.params);
  },
  putgraph: (req, res) => {
    Model.putgraph((error, data) => {
      if (error) {
        res.status(400).send(error);
      } else {
        res.status(200).send(data);
      }
    }, req.params);
  },
  deletegraph: (req, res) => {
    Model.deletegraph((error, data) => {
      if (error) {
        res.status(400).send(error);
      } else {
        res.status(200).send(data);
      }
    }, req.params);
  },
};
