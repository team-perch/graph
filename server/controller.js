const Model = require('./model.js');

module.exports = {
  getgraph: (req, res) => {
    Model.getgraph((error, data)=>{
      if(error){
        res.status(400).send(error)
      } else {
        res.status(200).send(data)
      }
    }, req.params)
  }
}