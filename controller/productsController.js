const { db, query } = require("../database");

module.exports = {
  postNewProduct: async (req, res) => {
    console.log(req.file);
    console.log(typeof req.body.data);
    const { file } = req;
    const filepath = file ? "/" + file.filename : null;
    console.log(filepath);
    const postImageQuery = `insert into products (product_name, product_image) values (${db.escape(
      product_name
    )}, ${db.escape(filepath)})`;
    try {
      const addProductResult = await query(postImageQuery);
      return res.status(200).send(addProductResult);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
