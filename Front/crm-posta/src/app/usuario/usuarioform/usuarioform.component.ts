import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../usuario';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarioform',
  templateUrl: './usuarioform.component.html',
  styleUrls: ['./usuarioform.component.css']
})
export class UsuarioformComponent implements OnInit {
  usuario: Usuario = new Usuario();
  public titulo: string = 'Formulario Usuario'
  ngOnInit(): void {

  }
  constructor(private usuarioService: UsuarioService, private ruta: Router) {

  }
  public registrar() {
    console.log(this.usuario);
    this.usuarioService.usuarioSave(this.usuario).subscribe(data => {
      Swal.fire('Creado', `El usuario ${data.name} fue creado con exito`, 'success');
      this.ruta.navigate[('/usuarios')]

    }, e => {
      Swal.fire('Error: ', 'Ingrese bien los datos', 'error');
    })

  }


}
