import { Component, Input } from '@angular/core';
import { ModalService } from '../modal.service';
import { Client } from '../client';
import { Router } from '@angular/router';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';
import { ClientService } from '../client.service';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/usuario/usuario';
import { HttpHeaders, HttpClient } from '@angular/common/http';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-accion',
  templateUrl: './accion.component.html',
  styleUrls: ['./accion.component.css']
})
export class AccionComponent {


  @Input()cliente:Client = new Client();
  errores:any;
  usuario:Usuario=new Usuario();
  imageUrl ="/assets/camaraHD.jpg"
  constructor(private modalService:ModalService,
    private ruta:Router,
    private service:ClientService,
    private http:HttpClient
    ){}


  cerrarModalAction(): void {
    this.modalService.cerrarModalAction();
  }
  public tipoCliente() {
    if (this.cliente.type == 'entrepreneur') {
      this.ruta.navigate([`clients/form/editar/entrepreneur/${this.cliente.id}`]);

    } else {
      this.ruta.navigate([`clients/form/editar/businessman/${this.cliente.id}`]);
    }
  }

  public devolverUsuario():Usuario{

    if(localStorage.getItem('usuario')){
     this.usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
      return this.usuario;
    }
    return null;
  }

  public cambiarTipo() {
    this.ruta.navigate([`clients/form/editar/businessman/${this.cliente.id}`]);
    /*this.cliente.type="businessman";
    this.cliente.businessIdea="";
    this.cliente.product="";
    console.log(this.cliente);
    
    this.service.updateBusinessman(this.cliente).subscribe(data => {
      console.log(data);
      console.log(this.cliente);
      this.cerrarModalAction();
      Swal.fire('Editado', `Empresario ${data.name} fue editado con exito`, 'success')


      


},e=>{
  this.cerrarModalAction();
  Swal.fire("Error: ", `Error al editar el contacto`, 'error');
})*/
  }




convertImageToBase64(imageUrl: string): Promise<string> {
  return this.http.get(imageUrl, { responseType: 'blob' })
    .toPromise()
    .then((blob: Blob) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    });
}


createPdf() {
  
  this.convertImageToBase64(this.imageUrl).then(base64 => {
  const documentDefinition = {
    content: [
      {
        image: base64,
        width: 129, // Ancho de la imagen en el PDF
        height: 106, // Alto de la imagen en el PDF
        margin: [0, 0, 0, 10] // Margen inferior de 10 unidades
        // Márgenes de la imagen en el PDF
      },
  
    // ... Estilos y otras configuraciones ...
  
      { text: 'FECHA: ' + this.cliente.regdate, style: 'header' },
      { text: 'MUNICIPIO/DEPARTAMENTO: ' + this.cliente.municipio.country, style: 'header' },
      { text: 'ASESOR: ' + this.usuario.name + ' ' + this.usuario.lastName, style: 'header' },
      { text: 'DURACIÓN ASESORÍA: _______________________', style: 'header' },
      
      { canvas: [{ type: 'line', x1: 0, y1: 10, x2: 595 - 2 * 40, y2: 10 }] },
      
      '\n',
      
      {
        columns: [
          { text: 'CLASIFICACIÓN DE CLIENTE:', style: 'fieldHeader', margin: [5, 0]},
          { text:this.cliente.type == 'entrepreneur' ? 'TIPO DE CLIENTE: EMPRENDEDOR' : 'TIPO DE CLIENTE: EMPRESARIO', style: 'fieldHeader', margin: [30, 0] }
        ]
      },
      
      { canvas: [{ type: 'line', x1: 0, y1: 10, x2: 595 - 2 * 40, y2: 10 }] },
      
      '\n',
      
      {
        columns: [
          { text: 'NOMBRES Y APELLIDOS: ' + this.cliente.name + ' ' + this.cliente.lastName, style: 'fieldHeader', margin: [5, 0] },
          { text: 'No. DOCUMENTO/NIT: ' + this.cliente.nit, style: 'fieldHeader', margin: [30, 0] }
        ]
      },
      
      { canvas: [{ type: 'line', x1: 0, y1: 10, x2: 595 - 2 * 40, y2: 10 }] },
      
      '\n',
      
      {
        columns: [
          { text: this.cliente.gender.includes('FEMALE') ? 'GÉNERO: FEMENINO':this.cliente.gender.includes('LGBTQ')?'GÉNERO: LGBTQ+':'GÉNERO: MASCULINO', style: 'fieldHeader', margin: [5, 0] },
          
        ]
      },
      
      { canvas: [{ type: 'line', x1: 0, y1: 10, x2: 595 - 2 * 40, y2: 10 }] },
      
      '\n',
      
      {
        columns: [
          { text: this.cliente.type == 'entrepreneur'  ? 'IDEA DE NEGOCIO: '+this.cliente.businessIdea : 'NOMBRE DE LA EMPRESA: '+this.cliente.companyName, style: 'fieldHeader', margin: [5, 0]}
        ]
      },
      
      { canvas: [{ type: 'line', x1: 0, y1: 10, x2: 595 - 2 * 40, y2: 10 }] },
      
      '\n',
      
      {
        columns: [
          { text: this.cliente.type == 'entrepreneur' ?  'PRODUCTO: '+this.cliente.product:'NUMERO DE CIIU: '+this.cliente.ciiu, style: 'fieldHeader', margin: [5, 0] }
        ]
      },
      
      { canvas: [{ type: 'line', x1: 0, y1: 10, x2: 595 - 2 * 40, y2: 10 }] },
      
      '\n',
      
      {
        columns: [
          { text: 'No. CELULAR: '+this.cliente.phone, style: 'fieldHeader', margin: [5, 0] },
          { text: 'CORREO ELECTRÓNICO: '+this.cliente.email, style: 'fieldHeader', margin: [30, 0] }
        ]
      },
      
      { canvas: [{ type: 'line', x1: 0, y1: 10, x2: 595 - 2 * 40, y2: 10 }] },
      
      '\n',
      
      {
        columns: [
          { text: 'DIRECCIÓN: '+this.cliente.address, style: 'fieldHeader', margin: [5, 0] }
        ]
      },
      
      { canvas: [{ type: 'line', x1: 0, y1: 10, x2: 595 - 2 * 40, y2: 10 }] },
      
      
      
      {
        text: 'Autorizo de manera expresa, libre y voluntaria a la CÁMARA DE COMERCIO DE VILLAVICENCIO (la “CCV”) para realizar el tratamiento de mis datos personales, especialmente los relativos a identificación personal, nombres y apellidos, números de teléfono y celular, correo electrónico, país de origen y en general toda la información solicitada para información de contacto emprendedor, las finalidades dispuestas en la Política de Tratamiento de Datos Personales a la que puede accederse en el siguiente link:',
        style: 'p'
      },
      {
        text: 'https://s3.pagegear.co/415/78/politica_de_tratamiento_de_datos_personales_2021_ccv.pdf',
        link: 'https://s3.pagegear.co/415/78/politica_de_tratamiento_de_datos_personales_2021_ccv.pdf',
        style: 'link'
      },
      {
        text: 'así como para el desarrollo de las funciones públicas que le han sido asignadas y demás actividades complementarias y ser informado de nuevas jornadas, eventos y/o espacios de formación que adelanta la Cámara, divulgación de la oferta académica y evaluación de los servicios de la Cámara. Reconozco y acepto que la CCV me informó que en caso de que se soliciten datos personales sensibles, la entrega de estos es meramente facultativa y no estoy obligado a entregarlos.',
        style: 'p'
      },
      {
        text: 'Reconozco que se me fue informado que, como titular de mis datos personales, tengo derecho a conocer, actualizar y rectificar mis datos personales, solicitar prueba de la autorización otorgada para su tratamiento, ser informado sobre el uso que se ha dado a los mismos, presentar quejas ante la Superintendencia de Industria y Comercio por infracción a la ley, revocar la autorización y/o solicitar la supresión de mis datos en los casos que sea procedente y acceder en forma gratuita a los mismos. De igual manera, se me indicó que puedo ejercer mis derechos como titular de mis datos personales a través de los canales dispuestos en la Política de Tratamiento de Datos Personales o a través del correo electrónico datospersonales@ccv.org.co.',
        style: 'p'
      }
    ],
    styles: {
      header: {
        bold: true,
        fontSize: 12
      },
      p: {
        fontSize: 10,
        margin: [0, 10]
      },
      link: {
        fontSize: 10,
        color: 'blue',
        margin: [0, 10],
        decoration: 'underline'
      },
      fieldHeader: {
        fontSize: 10,
        bold: true,
        margin: [0, 5]
      },
      fieldValue: {
        fontSize: 10,
        margin: [0, 5]
      }
    }
  };

  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  pdfMake.createPdf(documentDefinition).open();
   
  })}

}
