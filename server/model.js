const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yourpassword',
  database: 'fec_estimate'
})

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

module.exports = {
  getgraph: (callback, id) => {
    // Price.findAll({where: {property_id: 1}}).then((data)=>{
    //   console.log('MODEL' + data)
    //   callback(null, data)
    // })
    let info = id.houseId;
    connection.query(`select * from prices where prices.property_id = ${info}`, function(error, data){
      if (error) {
        callback(error, null)
      } else {
        callback(null, data)
      }
    })
  },
  getrecentsales: (callback, id) =>{
    let info = id.houseId
    connection.query(`select group_id from houses where houses.property_id = ${info}`, function(error, data){
      if(error){
        callback(error, null)
      } else {
        let groupid = data[0].group_id
        connection.query(`select * from houses where houses.group_id = ${groupid}`, function(error, data){
          if(error){
            callback(error, null)
          } else {
            callback(null, data)
          }
        })
      }
    })
  },
  getzip: (callback, id) => {
    let info = id.houseId
    connection.query(`select zipcode from groups where groups.group_id = ${info}`, function(error, data){
      if(error){
        callback(error, null)
      } else {
        console.log('ZIP SUCCESS')
        console.log(data);
        callback(null, data)
      }
    });
  },
  gethouseinfo: (callback, id) =>{
    let info = id.houseId
    connection.query(`select * from houses where houses.property_id = ${info}`, function(error, data) {
      if(error) {
        callback(error, null);
      } else {
        callback(null, data);
      }
    })
  }
}