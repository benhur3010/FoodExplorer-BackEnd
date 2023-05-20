const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class FavoritesController {
  create = async (request, response) => {
    const user_id = request.user.id;
    const { dish_id } = request.body;

    const verifyUser = await knex("users").where({ id: user_id }).first();

    if (!verifyUser) {
      throw new AppError("Usuário não encontrado.");
    }

    const [dish] = await knex("dishes").where({ id: dish_id });

    if (!dish) {
      throw new AppError("Este prato não existe.");
    }

    await knex("favorites").insert({
      dish_id: dish.id,
      user_id
    });

    response.status(200).json();
  };

  index = async (request, response) => {
    const user_id = request.user.id;

    const favorites = await knex("favorites")
      .innerJoin("dishes", "favorites.dish_id", "dishes.id")
      .where("favorites.user_id", user_id)
      .select("dishes.*")
      .groupBy("dish_id");

    response.json(favorites);
  };

  show = async (request, response) => {
    const user_id = request.user.id;

    const favorites = await knex("favorites")
      .innerJoin("dishes", "favorites.dish_id", "dishes.id")
      .where("favorites.user_id", user_id)
      .select("dishes.*")
      .groupBy("dish_id");

    response.json(favorites);
  };

  delete = async (request, response) => {
    const { id } = request.params;

    await knex("favorites").where({ dish_id: id }).delete();

    response.json();
  };
}

module.exports = new FavoritesController();
