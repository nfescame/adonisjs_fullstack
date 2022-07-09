import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    const { name, user_name, password, email } = request.only([
      "name",
      "user_name",
      "password",
      "email",
    ]);

    const user = await User.create({
      name,
      user_name,
      password,
      email,
    });

    return response
      .status(201)
      .json({ user, msg: "A new resource has been created!" });
  }

  public async index({ response }: HttpContextContract) {
    const users = await User.query();

    if (users.length <= 0) {
      return response.status(404).json({ msg: "User not found!" });
    }

    return response.status(200).json({ users });
  }

  public async show({ response, params }: HttpContextContract) {
    const { id } = params;

    const user = await User.query().where("id", id).first();

    if (!user) {
      return response.status(400).json({ msg: "User not found!" });
    }

    return response.status(200).json(user);
  }

  public async update({ request, response, params }: HttpContextContract) {
    const { id } = params;
    const { name, user_name, password, email } = request.only([
      "name",
      "user_name",
      "password",
      "email",
    ]);

    const user = await User.query().where("id", id).first();

    if (!user) {
      return response.status(400).json({ msg: "User not found!" });
    }

    await user
      ?.merge({
        name,
        password,
        user_name,
        email,
      })
      .save();

    return response.status(200).json(user);
  }

  public async destroy({ response, params }: HttpContextContract) {
    const { id } = params;

    const user = await User.findOrFail(id);

    if (!user) {
      return response.status(400).json({ msg: "User not found!" });
    }

    await user.delete();

    return response.status(204).json({
      msg: "The resource was successfully deleted, no response body!",
    });
  }
}
