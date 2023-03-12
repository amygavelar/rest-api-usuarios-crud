import express from 'express';
const router = express.Router();

import { Usuarios} from '@libs/usuarios/Usuarios';
import { IUsuarios } from '@dao/models/Usuarios/IUsuarios';
import { UsuariosDao } from '@dao/models/Usuarios/UsuariosDao';
import { MongoDBConn } from '@dao/MongoDBConn';
const usuariosDao = new UsuariosDao(MongoDBConn)
let usuariosModel:Usuarios;
usuariosDao.init().then(()=>{
    usuariosModel = new Usuarios(usuariosDao);
});



router.get('/', (_req, res)=>{
    const jsonUrls = {
        "getAll": {"method":"get", "url": "usuarios/all"},
        "getById": {"method":"get", "url": "usuarios/byid/:id"},
        "new": {"method":"post", "url": "usuarios/new"},
        "update": {"method":"put", "url": "usuarios/upd/:id"},
        "delete": {"method":"delete", "url": "usuarios/del/:id"},
    };
    res.status(200).json(jsonUrls);
    });


router.get('/all', async (_req, res) => {
    res.status(200).json(await usuariosModel.getAll());
});

router.get('/byid/:id', async (req, res)=>{
    const {id: codigo} = req.params;
    const usuario = await usuariosModel.getById(codigo);
    if(usuario){
        return res.status(200).json(usuario);
    }
    return res.status(404).json({"error":"No se encontró Usuario"});
});


router.post('/new', async (req, res) => {
    console.log("Usuarios /new request body:", req.body);
    const {
        correo = '---- NOT SPECIFIED',
        nombre = '---- NOT SPECIFIED',
        password ='---- NOT SPECIFIED',
        roles = ["RolNoAsignado"]
    } = req.body;

    if ((correo === "---- NOT SPECIFIED") || (nombre === "---- NOT SPECIFIED") || (password === "---- NOT SPECIFIED") ){
        return res.status(403).json({"error": "Faltan datos para guardar Usuario"});
    }

    const newUsuario: IUsuarios = {
        codigo : "",
        correo,
        nombre,
        password,
        roles
        
    };
    if (await usuariosModel.add(newUsuario)) {
        return res.status(200).json({"created": true});
    }
    return res.status(404).json(
        {"error": "Error al agregar un nuevo usuario"}
    );
});

router.put('/upd/:id', async (req, res) => {
    const { id } = req.params;

    const {
        correo = "---- NOT SPECIFIED",
        nombre = "---- NOT SPECIFIED",
        password = "---- NOT SPECIFIED",
        roles = ["---- NOT SPECIFIED"],
        observacion = "Registro Modificado en algun momento"
    } = req.body;

if ((correo === "---- NOT SPECIFIED") || (nombre === "---- NOT SPECIFIED") || (password === "---- NOT SPECIFIED") || (roles[0] === "---- NOT SPECIFIED")) {
    return res.status(403).json({"error": "Error al actualizar Usuario"});
}

    const UpdateUsuario : IUsuarios = {
        codigo: id,
        correo,
        nombre,
        password,
        roles,
        observacion,
    };
        
    if (await usuariosModel.update(id, UpdateUsuario)) {
        return res
        .status(200)
        .json({"updated": true});
    }
    return res
        .status(404)
        .json(
        {
        "error": "Error al actualizar Usuario"
    }
        );
    });

router.delete('/del/:id', async (req, res)=>{  
        const {id : codigo} = req.params;
        if(await usuariosModel.delete(codigo)){
    return res.status(200).json({"deleted": true});
}
return res.status(404).json({"error":"No se pudo eliminar el usuario"});
});

    export default router;