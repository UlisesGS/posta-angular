import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';
import { Client } from '../client';
import { Router } from '@angular/router';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';
import { ClientService } from '../client.service';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/usuario/usuario';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ProcesoService } from 'src/app/procesos/proceso.service';
import { Process } from 'src/app/procesos/Process';
import { LoginComponent } from 'src/app/auth/login/login.component';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-accion',
  templateUrl: './accion.component.html',
  styleUrls: ['./accion.component.css']
})
export class AccionComponent implements OnInit {


  @Input() cliente: Client = new Client();

  @Input() procesos: Process[]

  errores: any;
  condicion: boolean = false;
  condicion2: boolean = false;
  usuario: Usuario = new Usuario();
  imageUrl = "/assets/camaraHD.jpg";
  // procesos:Process[]=[];
  proceso: Process = new Process();
  constructor(private modalService: ModalService,
    private ruta: Router,
    private service: ClientService,
    private http: HttpClient,
    private procesoService: ProcesoService,
  ) { }
  ngOnInit(): void {
    // this.condicion=false;
    this.condicion = false;
  this.condicion2= false;
    this.procesoService.procesosFindAll().subscribe(lista => {
      this.procesos = lista;
      console.log(this.procesos);
      
      this.procesos.forEach(p => {
        if (p?.selfAssessment?.client?.id == this.cliente.id || p?.processEmpresario?.client?.id == this.cliente.id) {
          
          this.proceso = p;
          console.log(this.proceso);

        }


      })
    })

  }

  iniciarProceso() {
      if (this.proceso?.selfAssessment?.client?.id == this.cliente.id) {
        this.condicion = true;
      }

      if (this.proceso?.processEmpresario?.client?.id == this.cliente.id) {
        this.condicion2 = true;
      }
    

    console.log(this.proceso);
    console.log(this.condicion);
    console.log(this.condicion2);
    console.log(this.cliente?.type);
    console.log(this.cliente?.type);




    if (this.condicion && this.condicion2) {
      Swal.fire('Error:', 'El cliente ya contiene un proceso asignado1', 'error');

    } else if (!this.condicion && this.cliente?.type == 'entrepreneur') {
      console.log("entro 1");

      if (this.condicion2) {
        this.proceso.estado=this.proceso.estadoAnteriorEmprendedor
        this.procesoService.procesosUpdate(this.proceso).subscribe()
        this.ruta.navigate([`autoevaluacion/cliente/${this.cliente.id}`]);
      } else {
        this.ruta.navigate([`autoevaluacion/cliente/${this.cliente.id}`]);
      }


    } else if (!this.condicion2 && this.cliente?.type == 'businessman') {
      console.log("entro 2");
      if (this.condicion) {
        this.proceso.estado=this.proceso.estadoAnteriorEmpresario
        this.procesoService.procesosUpdate(this.proceso).subscribe()
        this.ruta.navigate([`empresario/diagnostico/cliente/${this.cliente.id}`]);
      } else {
        this.ruta.navigate([`empresario/diagnostico/cliente/${this.cliente.id}`]);
      }


    } else {
      console.log("entro 3");
      Swal.fire('Error:', 'El cliente ya contiene un proceso asignado2', 'error');
    }
  }

  continuarProceso() {
    this.procesos.forEach(p => {
      if (p.selfAssessment?.client?.id == this.cliente.id) {
        this.condicion = true;
        this.proceso = p;
      }
      if (p.processEmpresario?.client?.id == this.cliente.id) {
        this.condicion2 = true;
        this.proceso = p;
      }
    })
    //console.log(this.procesos);


    if (this.condicion == false && this.cliente.type== 'entrepreneur') {
      this.ruta.navigate([`autoevaluacion/cliente/${this.cliente.id}`]);

    } else if (this.condicion2 == false && this.cliente.type== 'businessman') {
      console.log('1111111111111111111111111');
      
      this.ruta.navigate([`empresario/diagnostico/cliente/${this.cliente.id}`]);

    } else if (this.condicion2 == true && this.condicion == true && this.cliente.type== 'entrepreneur') {
      this.proceso.estado=this.proceso.estadoAnteriorEmprendedor
      this.procesoService.procesosUpdate(this.proceso).subscribe()

    } else if (this.condicion2 == true && this.condicion == true && this.cliente.type== 'businessman') {
      console.log('2223222222222222222222');
      
      this.proceso.estado=this.proceso.estadoAnteriorEmpresario
      this.procesoService.procesosUpdate(this.proceso).subscribe()

    }
      switch (this.proceso.estado) {
        case 'iniciando':
          this.ruta.navigate([`autoevaluacion/cliente/${this.cliente.id}`]);
          break;
        case 'AutoEvaluación':
          this.ruta.navigate([`segmento/cliente/${this.cliente.id}`]);
          break;
        case 'Segmento de Clientes':
          this.ruta.navigate([`propuestaDeValor/cliente/${this.cliente.id}`]);
          ;
          break;
        case 'Propuesta de Valor':
          this.ruta.navigate([`canales/cliente/${this.cliente.id}`]);
          ;
          break;
        case 'Canales':
          this.ruta.navigate([`relaciones/cliente/${this.cliente.id}`]);
          ;
          break;
        case 'Relación con los Clientes':
          this.ruta.navigate([`recursosClaves/cliente/${this.cliente.id}`]);
          ;
          break;
        case 'Recursos Claves':
          this.ruta.navigate([`actividadesClaves/cliente/${this.cliente.id}`]);
          ;
          break;
        case 'Actividades Claves':
          this.ruta.navigate([`sociosClaves/cliente/${this.cliente.id}`]);
          ;
          break;
        case 'Socios Claves':
          this.ruta.navigate([`ingresos/cliente/${this.cliente.id}`]);
          ;
          break;
        case 'Ingresos':
          this.ruta.navigate([`estructuraCostos/cliente/${this.cliente.id}`]);
          ;
          break;
        case 'Estructura Costos':
          this.ruta.navigate([`informacion/cliente/${this.cliente.id}`]);
          ;
          break;
        case 'Informacion Proyecto':
          this.ruta.navigate([`interno/cliente/${this.cliente.id}`]);
          ;
          break;
        case 'Analisis Interno/Externo':
          this.ruta.navigate([`dofa/cliente/${this.cliente.id}`]);
          ;
          break;
        case 'Analisis Dofa':
          this.ruta.navigate([`conclusion/cliente/${this.cliente.id}`]);
          ;
          break;
        case 'Conclusiones':
          this.ruta.navigate([`ventas/cliente/${this.cliente.id}`]);
          //this.ruta.navigate(['/procesos']);
          ;
          break;
        case 'Presupuesto Venta':
          this.ruta.navigate([`compras/cliente/${this.cliente.id}`]);
          //this.ruta.navigate(['/procesos']);
          ;
          break;
        case 'Presupuesto Compra':
          this.ruta.navigate([`gastos/cliente/${this.cliente.id}`]);
          //this.ruta.navigate(['/procesos']);
          ;
          break;
        case 'Presupuesto Gastos/Costos':
          this.ruta.navigate([`inversion/cliente/${this.cliente.id}/editar/${this.proceso.id}`]);

          ;
          break;
        case 'Plan Financiero finalizado':
          this.ruta.navigate([`inversion/cliente/${this.proceso.canvasModel.client.id}`]);
          break;
        case 'Diagnostico':
          this.ruta.navigate([`/empresario/resultados/cliente/${this.proceso.processEmpresario.client.id}`])
          break;
        case 'Resultados':
          this.ruta.navigate([`/empresario/economico/cliente/${this.proceso.processEmpresario.client.id}`])
          break;
        case 'Economico':
          this.ruta.navigate([`/empresario/accion/cliente/${this.proceso.processEmpresario.client.id}`])
          break;
        // MODIFICAR
        case 'Plan Accion':
          this.ruta.navigate([`/accion/empresario/${this.proceso.processEmpresario.client.id}/editar/${this.proceso.id}`])
          break;
      }
    

    this.modalService.cerrarModalAction();
  }

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

  public devolverUsuario(): Usuario {

    if (localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
      return this.usuario;
    }
    return null;
  }

  public cambiarTipo() {
    if (this.cliente.type == 'entrepreneur') {
      
      this.ruta.navigate([`clients/form/editar/businessman/${this.cliente.id}/${1}`]);

    } else {
      
      this.ruta.navigate([`clients/form/editar/entrepreneur/${this.cliente.id}/${1}`]);
    }
    //  this.ruta.navigate([`clients/form/editar/businessman/${this.cliente.id}`]);
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

          {
            table: {
              layout: 'noBorders', // <-- Eliminar los bordes de la tabla
              widths: ['auto', '*'],
              body: [
                [
                  { text: 'FECHA:', style: 'header' },
                  { text: this.cliente.regdate, style: ['thisText', 'header'] }
                ],
                [
                  { text: 'MUNICIPIO/DEPARTAMENTO:', style: 'header' },
                  { text: this.cliente.municipio.country, style: ['thisText', 'header'] }
                ],
                [
                  { text: 'ASESOR:', style: 'header' },
                  { text: this.usuario.name + ' ' + this.usuario.lastName, style: ['thisText', 'header'] }
                ],
                [
                  { text: 'DURACIÓN ASESORÍA:', style: 'header' },
                  { text: '_______________________', style: ['thisText', 'header'] }
                ]
              ]
            }
          },

          { canvas: [{ type: 'line', x1: 0, y1: 10, x2: 595 - 2 * 40, y2: 10 }] },

          '\n',

          {
            table: {
              layout: 'noBorders', // <-- Eliminar los bordes de la tabla
              widths: ['auto', '*'],
              body: [
                [
                  { text: 'CLASIFICACIÓN DE CLIENTE:', style: 'fieldHeader' },
                  { text: 'hola', style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'TIPO DE CLIENTE:', style: 'fieldHeader' },
                  { text: this.cliente.type == 'entrepreneur' ? ' EMPRENDEDOR' : ' EMPRESARIO', style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'NOMBRES Y APELLIDOS:', style: 'fieldHeader' },
                  { text: this.cliente.name + ' ' + this.cliente.lastName, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'No. DOCUMENTO/NIT:', style: 'fieldHeader' },
                  { text: this.cliente.nit, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'GÉNERO:', style: 'fieldHeader' },
                  { text: this.cliente.gender.includes('FEMALE') ? 'FEMENINO' : this.cliente.gender.includes('LGBTQ') ? 'LGBTQ+' : 'MASCULINO', style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: this.cliente.type == 'entrepreneur' ? 'IDEA DE NEGOCIO:' : 'NOMBRE DE LA EMPRESA:', style: 'fieldHeader' },
                  { text: this.cliente.type == 'entrepreneur' ? this.cliente.businessIdea : this.cliente.companyName, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: this.cliente.type == 'entrepreneur' ? 'PRODUCTO:' : 'NUMERO DE CIIU:', style: 'fieldHeader' },
                  { text: this.cliente.type == 'entrepreneur' ? this.cliente.product : this.cliente.ciiu, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'No. CELULAR:', style: 'fieldHeader' },
                  { text: this.cliente.phone, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'CORREO ELECTRÓNICO:', style: 'fieldHeader' },
                  { text: this.cliente.email, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'DIRECCIÓN:', style: 'fieldHeader' },
                  { text: this.cliente.address, style: ['thisText', 'fieldHeader'] }
                ]
              ]
            }
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
            text: 'así como para el desarrollo de las funciones públicas que le han sido asignadas y demás actividades complementarias y ser informado de nuevas jornadas, eventos y/o espacios de formación que adelanta la Cámara, divulgación de la oferta académica y evaluación de los servicios de la Cámara. Reconozco y acepto que la CCV me informó que en caso de que se soliciten datos personales sensibles, la entrega de estos es meramente facultativa y no estoy obligado a entregarlos. Reconozco que se me fue informado que, como titular de mis datos personales, tengo derecho a conocer, actualizar y rectificar mis datos personales, solicitar prueba de la autorización otorgada para su tratamiento, ser informado sobre el uso que se ha dado a los mismos, presentar quejas ante la Superintendencia de Industria y Comercio por infracción a la ley, revocar la autorización y/o solicitar la supresión de mis datos en los casos que sea procedente y acceder en forma gratuita a los mismos. De igual manera, se me indicó que puedo ejercer mis derechos como titular de mis datos personales a través de los canales dispuestos en la Política de Tratamiento de Datos Personales o a través del correo electrónico datospersonales@ccv.org.co.',
            style: 'p'
          }
        ],
        styles: {
          header: {
            bold: true,
            fontSize: 12,
          },
          thisText: {
            bold: true,
            color: 'dark'
          },
          fieldValue: {
            fontSize: 10,
            margin: [5, 0]
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
          }
        }
      };






      /*
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
                { text:  'NOMBRES Y APELLIDOS: ' + this.cliente.name + ' ' + this.cliente.lastName, style: 'fieldHeader', margin: [5, 0] },
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
                { text: 'DIRECCIÓN: ' +this.cliente.address, style: 'fieldHeader', margin: [5, 0] }
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
              layout: 'noBorders',
              table: {
                widths: ['auto', '*'],
                body: [
                  [
      
                    { text: 'MUNICIPIO/DEPARTAMENTO: ', style: 'header' },
                    { text: this.cliente.municipio.country, style: ['thisText', 'header'] }
                  ],
                  [
                    { text: 'FECHA: ' , style: 'header' },
                    { text: this.cliente.regdate, style: ['thisText', 'header']},
                  ]
                ]
              }
            },
      
            // Resto del contenido del documento...
      
          ],
          styles: {
            header: {
              bold: true,
              fontSize: 12
            },
            thisText: {
              bold: true,
              color: 'darkgrey'
            }
          }
        };
      
      */
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      pdfMake.createPdf(documentDefinition).open();

    })
  }

}
