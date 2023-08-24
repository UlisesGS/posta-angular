
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from 'src/app/client/modal.service';


import { Asesoria } from 'src/app/usuario/asesoria';
import { Usuario } from 'src/app/usuario/usuario';
import { UsuarioService } from 'src/app/usuario/usuario.service';

 
@Component({
  selector: 'app-asesoriaList',
  templateUrl: './asesoriaList.component.html',
  styleUrls: ['./asesoriaList.component.css']
})
export class AsesoriaListComponent implements OnInit {
  asesorias:Asesoria[]=[];
  datos:any[];
  usuario: Usuario = new Usuario();
  constructor(private usuarioService: UsuarioService,
    public modalservice: ModalService,
    private activateRoute:ActivatedRoute) { }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
this.todos()

  }
  public todos(){
    this.usuarioService.usuarioGetAsesorias(this.usuario).subscribe(data=>{
    this.asesorias=data['content']
 
    
     })
  }
}










