import { Router } from "express";
import { Usuarios } from "../../libs/entidades/usuarios";

const usersRouter = Router();

const usersDB = new Usuarios();

usersRouter
  .route("/")
  .get((req, res) => {
    const users = usersDB.getAll();

    return res.json({ users });
  })
  .post((req, res) => {
    const userCreated = usersDB.add(req.body);

    return res.json({ userCreated });
  });

usersRouter
  .route("/:codigo")
  .get((req, res) => {
    const codigo = parseInt(req.params.codigo);

    const existe = usersDB.usuarioExiste(codigo);

    if (existe === false) {
      return res.status(404).send("El usuario no existe");
    }

    const userFind = usersDB.getById(codigo);

    return res.send({ userFind });
  })
  .put((req, res) => {
    const codigo = parseInt(req.params.codigo);

    const existe = usersDB.usuarioExiste(codigo);

    if (existe === false) {
      return res.status(404).send("El usuario no existe");
    }

    usersDB.update(codigo, req.body);

    return res.send("El usuario fue actualizado");
  })
  .delete((req, res) => {
    const codigo = parseInt(req.params.codigo);

    const existe = usersDB.usuarioExiste(codigo);

    if (existe === false) {
      return res.status(404).send("El usuario no existe");
    }

    usersDB.delete(codigo);

    return res.send("El usuario fue eliminado");
  });

export default usersRouter;
