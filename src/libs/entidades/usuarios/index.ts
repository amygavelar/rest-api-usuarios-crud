interface Usuario {
  codigo: number;
  correo: string;
  nombre: string;
  password: string;
  roles: string[];
  creado: Date;
  ultimoAcceso: Date;
}

export class Usuarios {
  private usuarios: Usuario[];

  constructor() {
    this.usuarios = [];
  }

  getAll() {
    return this.usuarios;
  }

  getById(codigo: number) {
    const usuario = this.usuarios.find((usuario) => usuario.codigo === codigo);

    return usuario;
  }

  add(usuario: Usuario) {
    let codigoMayor = 0;

    this.usuarios.forEach((usuario) => {
      if (usuario.codigo > codigoMayor) {
        codigoMayor = usuario.codigo;
      }
    });

    usuario.codigo = codigoMayor + 1;
    usuario.creado = new Date();

    this.usuarios.push(usuario);

    return usuario;
  }

  update(codigo: number, newusuario: Usuario) {
    this.usuarios = this.usuarios.map((usuario) => {
      if (usuario.codigo === codigo) {
        return { ...usuario, ...newusuario };
      }

      return usuario;
    });
  }

  delete(codigo: number) {
    this.usuarios = this.usuarios.filter(
      (usuario) => usuario.codigo !== codigo
    );
  }

  usuarioExiste(codigo: number) {
    const usuario = this.usuarios.find((usuario) => usuario.codigo === codigo);

    if (usuario === undefined) return false;
    else return true;
  }
}
