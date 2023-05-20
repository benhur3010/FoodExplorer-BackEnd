const knex = require("../database/knex");

class CategoryController {
  create = async (request, response) => {
    const { name } = request.body;

    await knex("category").insert({ name });

    response.json();
  };

  delete = async (request, response) => {
    const { id } = request.params;

    await knex("category").where({ id }).delete();

    response.json();
  };
}

module.exports = new CategoryController();
