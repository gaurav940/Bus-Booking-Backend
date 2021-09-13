const db = require("../models/index.js");

exports.create = (createValues, model) => {
  const Model = db[model];
  return Model.create(createValues);

 };

 exports.bulkcreate = ( createValues, model) => {
   const Model =db[model];
   return Model.bulkCreate(createValues);
 };

exports.findOne = (values, model) => {
  const Model = db[model];
  return Model.findOne(values);

};

  exports.findAll = ( values, model) => {
    const Model = db[model];
    return Model.findAll(values);
    
  };

exports.findByPk = ( values, model) => {
  const Model = db[model];
  return Model.findByPk(values);
};

exports.update = (values, model) => {
  const id = values.id;
  const Model = db[model];

  Model.update(values, {
    where: {id: id}
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Brand was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update brand with id = ${id}. Maybe brand was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating brand with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Brand.destroy({
    where: { id: id}
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Brand was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete data with id = ${id}. Maybe brand was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete brand with id=" + id
      });
    });
};

exports.deleteAll = (createValues, model) => {
const Model = db[model];
  return Model.deleteAll(createValues);
};
