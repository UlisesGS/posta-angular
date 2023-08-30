import { Component, OnInit } from '@angular/core';
// import { Entrepreneur } from '../entrepreneur';
import { ClientService } from '../client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Municipio } from 'src/app/municipio/municipio';
import Swal from 'sweetalert2';
import { ModalService } from '../modal.service';
import { Client } from '../client';
import { AuthService } from 'src/app/auth/auth.service';
import { ProcesoService } from 'src/app/procesos/proceso.service';
import { Process } from 'src/app/procesos/Process';


@Component({
  selector: 'app-form-entrepreneur',
  templateUrl: './form-entrepreneur.component.html',
  styleUrls: ['./form-entrepreneur.component.css']
})
export class FormEntrepreneurComponent implements OnInit {
  constructor(private clientService:ClientService
    ,private router:Router
    , public modalservice:ModalService
    , private rutaParametro:ActivatedRoute,
    private authService: AuthService,
    private procesoService:ProcesoService
    ){}
  emprendedor:Client= new Client();
  municipios:Municipio[]=[];
  errores:any;
  idEditar:number
  proceso:Process=new Process();
  procesos:Process[]=[];
  clientes:Client[];


  ngOnInit(): void {
    this.clientService.getClientsMunicipios().subscribe(data=>{
      this.municipios=data;
      console.log(data);

    })
    this.clientService.clienteListarTodos().subscribe(list=>{
      this.clientes=list;
    })
    this.rutaParametro.paramMap.subscribe(parametro=>{
      let id = +parametro.get('id');
      if(id){
        this.clientService.getClient(id).subscribe(data=>{
          this.emprendedor=data;
          this.procesoService.procesosFindAll().subscribe(pr=>{
            this.procesos=pr
            this.procesos.forEach(pro=>{
              if(pro?.selfAssessment?.client?.id==this.emprendedor?.id || pro?.processEmpresario?.client?.id==this.emprendedor?.id){
                this.proceso=pro
              }
            })
          })
        })
         this.idEditar = +parametro.get('idEditar');
      }
    })

  }
public registrar(){
  this.emprendedor.type="entrepreneur";
  this.emprendedor.user=this.authService.devolverUsuario();
  let cond:boolean=false;
  let condNit:boolean=false;
  let condPhone:boolean=false;
  
  this.clientes.forEach(c=>{
    if(c.email==this.emprendedor.email){
      cond=true;
    }
    if(c.nit==this.emprendedor.nit){
      condNit=true;
    }
    if(c.phone==this.emprendedor.phone){
      condPhone=true;
    }
   
    
  })
  if(cond){
    Swal.fire('ERROR:', 'Correo Electrónico Duplicado', 'error');
  }else if(condNit){
    Swal.fire('ERROR:', 'Documento/NIT Duplicado', 'error');
  }else if(condPhone){
    Swal.fire('ERROR:', 'Número de Teléfono Duplicado', 'error');
  }
  else{
    this.clientService.saveEntrepreneur(this.emprendedor).subscribe(data=>{
      Swal.fire(`ÉXITO`, `Emprendedor ${data.name} fue creado con exito`, `success`)
  
      this.cerrarModal();
      this.router.navigate(['/municipios'])
    },e=>{
      if(e.status==404){
        this.errores=e.error;
        Swal.fire('ERROR:', 'Datos Incompletos', 'error');
       console.log(this.errores);
      }
      if(e.status==500 || e.status==400){
        console.log(e);
        Swal.fire("ERROR: ", `Error en la carga del formulario`, 'error');
      }
    })
  }
  
}
cerrarModal(){
  this.modalservice.cerrarModal();
}
public editar(){
  this.emprendedor.type="entrepreneur";
  this.clientService.updateEntrepreneur(this.emprendedor).subscribe(data=>{
    this.router.navigate(['/clients'])

    if(this.idEditar){

      if(this.proceso?.selfAssessment){
        this.proceso.estado=this.proceso.estadoAnteriorEmprendedor
        this.proceso.cambio=true;
        this.procesoService.procesosUpdate(this.proceso).subscribe()


      }else{
        this.proceso.estado='iniciando';
        this.proceso.cambio=false;
        this.procesoService.procesosUpdate(this.proceso).subscribe()



      }



  }


    Swal.fire(`Editado`, `Emprendedor ${data.name} fue editado con exito`, `success`)

  },e=>{

    Swal.fire("Error: ", `Error en la carga del formulario`, 'error');
  })

}
compararMunicipio(o1: Municipio, o2: Municipio):boolean{

  if(o1 === undefined && o2 === undefined){
    return true;
  }

   return o1 && o2 ? o1.id === o2.id : o1 === o2;
}

}
