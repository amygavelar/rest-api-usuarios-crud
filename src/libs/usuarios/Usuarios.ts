import { IUsuarios } from "@dao/models/Usuarios/IUsuarios";
import { IDataAccessObject } from "@dao/IDataAccessObject";

export class Usuarios {
private dao: IDataAccessObject;
private usuarios : IUsuarios[];
    constructor(dao: IDataAccessObject){
    this.dao = dao;
    }
    getAll(){
    return this.dao.findAll();
    }
    getById(codigo: string){
        return this.dao.findByID(codigo);
    }

    add(nuevoUsuario : IUsuarios) {
    const date = new Date();
    const nueva: IUsuarios = {
        ...nuevoUsuario,
        codigo: (Math.random()* 1000).toString()+new Date().getTime().toString(),
        created: date,
        ultimoAcceso: date,
        
    }
    return this.dao.create(nueva);
    }

    update(codigo: string, updateUsuario: IUsuarios){
        const updateObject = { ...updateUsuario, updated: new Date() };
        return this.dao.update(codigo, updateObject);
    }


    delete(codigo: string){
        return this.dao.delete(codigo);
    }
}