import { Component, Input } from '@angular/core';
import { Process } from 'src/app/procesos/Process';
import { ModalService } from '../../modal.service';
import {  Router } from '@angular/router';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';
import { HttpHeaders, HttpClient } from '@angular/common/http';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-modal-detalles',
  templateUrl: './modal-detalles.component.html',
  styleUrls: ['./modal-detalles.component.css']
})
export class ModalDetallesComponent {

  @Input()proceso:Process = new Process();
  @Input()autoB:string;
  @Input()canvasB:string;
  @Input()negociosB:string;
  @Input()financieroB:string;
  @Input()tipoVer:string;

  imageUrl ="/assets/camaraHD.jpg";

  constructor(
    public modalService: ModalService,
    private ruta:Router,
    private http:HttpClient,
  ) { }


  public cerrarTest() {
    this.modalService.cerrarTestAuto();
  }




  public verProceso(){
  
    switch(this.tipoVer){
      case 'autoEvaluacion':
        this.ruta.navigate([`puntajeAutoevaluacion/ver/${this.proceso.selfAssessment.client.id}`]); 
        break;
      case 'canvas':
      this.ruta.navigate([`procesos/verLienzo/${this.proceso.id}`]);
      break;
      case 'negocio':

        this.ruta.navigate([`clients/${this.proceso.selfAssessment.client.id}/verBasico/${this.proceso.id}`]);

      ;
      break;
      case 'financiero':
        this.ruta.navigate([`planFinancieroVer/${this.proceso.selfAssessment.client.id}/ver/${this.proceso.id}`]);
       ;
       break;

      /* VER QUE CARAJOS HACEN ESTAS RUTAS */
      case 'Propuesta de Valor':
        this.ruta.navigate([`canales/cliente/${this.proceso.canvasModel.client.id}`]);
       ;
       break;
       case 'diagnostico':
        // 'diagnostico/empresario/:id/editar/:idEditar'
        this.ruta.navigate([`empresarioVer/${this.proceso.processEmpresario.client.id}/ver/${this.proceso.id}`]);
       ;
       break;
       case 'planAccion':
        this.ruta.navigate([`empresario/accion/cliente/${this.proceso.processEmpresario.client.id}/ver/${this.proceso.id}`]);
       ;
       break;
       
    }
    this.modalService.cerrarTestAuto();
  }



  public continuarProceso(){
    console.log();
    
 
     switch(this.proceso.estado){
       case 'iniciando':
         this.ruta.navigate([`autoevaluacion/cliente/${this.proceso.canvasModel.client.id}`]);
         break;
       case 'AutoEvaluación':
       this.ruta.navigate([`segmento/cliente/${this.proceso.canvasModel.client.id}`]);
       break;
       case 'Segmento de Clientes':
         this.ruta.navigate([`propuestaDeValor/cliente/${this.proceso.canvasModel.client.id}`]);
       ;
       break;
       case 'Propuesta de Valor':
         this.ruta.navigate([`canales/cliente/${this.proceso.canvasModel.client.id}`]);
       ;
       break;
       case 'Canales':
         this.ruta.navigate([`relaciones/cliente/${this.proceso.canvasModel.client.id}`]);
       ;
       break;
       case 'Relación con los Clientes':
         this.ruta.navigate([`recursosClaves/cliente/${this.proceso.canvasModel.client.id}`]);
       ;
       break;
       case 'Recursos Claves':
         this.ruta.navigate([`actividadesClaves/cliente/${this.proceso.canvasModel.client.id}`]);
       ;
       break;
       case 'Actividades Claves':
         this.ruta.navigate([`sociosClaves/cliente/${this.proceso.canvasModel.client.id}`]);
       ;
       break;
       case 'Socios Claves':
         this.ruta.navigate([`ingresos/cliente/${this.proceso.canvasModel.client.id}`]);
       ;
       break;
       case 'Ingresos':
         this.ruta.navigate([`estructuraCostos/cliente/${this.proceso.canvasModel.client.id}`]);
       ;
       break;
       case 'Estructura Costos':
         this.ruta.navigate([`informacion/cliente/${this.proceso.canvasModel.client.id}`]);
       ;
       break;
       case 'Informacion Proyecto':
         this.ruta.navigate([`interno/cliente/${this.proceso.canvasModel.client.id}`]);
       ;
       break;
       case 'Analisis Interno/Externo':
         this.ruta.navigate([`dofa/cliente/${this.proceso.canvasModel.client.id}`]);
       ;
       break;
       case 'Analisis Dofa':
         this.ruta.navigate([`conclusion/cliente/${this.proceso.canvasModel.client.id}`]);
       ;
       break;
       case 'Conclusiones':
        this.ruta.navigate([`ventas/cliente/${this.proceso.canvasModel.client.id}`]);
       //this.ruta.navigate(['/procesos']);
       ;
       break;
       case 'Presupuesto Venta':
         this.ruta.navigate([`compras/cliente/${this.proceso.canvasModel.client.id}`]);
        //this.ruta.navigate(['/procesos']);
        ;
        break;
        case 'Presupuesto Compra':
         this.ruta.navigate([`gastos/cliente/${this.proceso.canvasModel.client.id}`]);
        //this.ruta.navigate(['/procesos']);
        ;
        break;
        case 'Presupuesto Gastos/Costos':
         this.ruta.navigate([`inversion/cliente/${this.proceso.canvasModel.client.id}`]);
        ;
        break;
        case 'Plan Financiero finalizado':
         this.ruta.navigate([`/empresario/diagnostico/cliente/${this.proceso.processEmpresario.client.id}`])
        break;
 
 
        case 'iniciando2':
         this.ruta.navigate([`/empresario/diagnostico/cliente/${this.proceso.processEmpresario.client.id}`])
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
     this.modalService.cerrarModalProceso();
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

  imprimirCanvas() {

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

          /*     SEGMENTO DE CLIENTES     */
          {
            table: {
              layout: 'noBorders', // <-- Eliminar los bordes de la tabla
              widths: ['auto', '*'],
              body: [
                [
                  { text: '#',  },
                  { text: 'SEGMENTO DE CLIENTES', style: ['thisText', 'header'] }
                ]
              ]
            }
          },
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
                  { text: 'DEMOGRAFICAS:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.customerSegments.demograficas , style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'GEOGRAFICAS:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.customerSegments.geograficas , style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'PSICOGRAFICAS:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.customerSegments.psicograficas , style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'COMPORTAMIENTO:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.customerSegments.comportanmiento , style: ['thisText', 'fieldHeader'] }
                ],
              ]
            }
          },

          { canvas: [{ type: 'line', x1: 0, y1: 10, x2: 595 - 2 * 40, y2: 10 }] },

          '\n',


          /*     PROPUESTA DE VALOR       */ 

          {
            table: {
              layout: 'noBorders', // <-- Eliminar los bordes de la tabla
              widths: ['auto', '*'],
              body: [
                [
                  { text: '#',  },
                  { text: 'PROPUESTA DE VALOR', style: ['thisText', 'header'] }
                ]
              ]
            }
          },

          {
            table: {
              layout: 'noBorders', // <-- Eliminar los bordes de la tabla
              widths: ['auto', '*'],
              body: [
                [
                  { text: 'PORPUESTA DE VALOR:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.valuePropositions.proposition, style: ['thisText', 'fieldHeader'] }
                ],
              ]
            }
          },

          { canvas: [{ type: 'line', x1: 0, y1: 10, x2: 595 - 2 * 40, y2: 10 }] },

          '\n',


          /*   CANALES    */

          {
            table: {
              layout: 'noBorders', // <-- Eliminar los bordes de la tabla
              widths: ['auto', '*'],
              body: [
                [
                  { text: '#',  },
                  { text: 'CANALES', style: ['thisText', 'header'] }
                ]
              ]
            }
          },
          {
            table: {
              layout: 'noBorders', // <-- Eliminar los bordes de la tabla
              widths: ['auto', '*'],
              body: [
                [
                  { text: 'INFORMACION:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.channels.informacion , style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'EVALUACION:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.channels.evaluacion , style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'COMPRA:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.channels.compra, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'ENTREGA:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.channels.entrega , style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'POSTVENTA:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.channels.postVenta , style: ['thisText', 'fieldHeader'] }
                ],
              ]
            }
          },
          { canvas: [{ type: 'line', x1: 0, y1: 10, x2: 595 - 2 * 40, y2: 10 }] },

          '\n',


          /*   RELACION CON CLIENTES    */

          {
            table: {
              layout: 'noBorders', // <-- Eliminar los bordes de la tabla
              widths: ['auto', '*'],
              body: [
                [
                  { text: '#',  },
                  { text: 'RELACION CON CLIENTES', style: ['thisText', 'header'] }
                ]
              ]
            }
          },
          {
            table: {
              layout: 'noBorders', // <-- Eliminar los bordes de la tabla
              widths: ['auto', '*'],
              body: [
                [
                  { text: 'CAPTACION:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.customerRelationships.captacion, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'FIDELIZACION:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.customerRelationships.fidelizacion, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'ESTIMULACION:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.customerRelationships.estimulacion, style: ['thisText', 'fieldHeader'] }
                ],
              ]
            }
          },

          { canvas: [{ type: 'line', x1: 0, y1: 10, x2: 595 - 2 * 40, y2: 10 }] },


          '\n',
          '\n',
          '\n',
          '\n',

          /*   RECURSOS CLAVES    */
          {
            image: base64,
            width: 129, // Ancho de la imagen en el PDF
            height: 106, // Alto de la imagen en el PDF
            margin: [0, 0, 0, 10] // Margen inferior de 10 unidades
            // Márgenes de la imagen en el PDF
          },
          {
            table: {
              layout: 'noBorders', // <-- Eliminar los bordes de la tabla
              widths: ['auto', '*'],
              body: [
                [
                  { text: '#',  },
                  { text: 'RECURSOS CLAVES', style: ['thisText', 'header'] }
                ]
              ]
            }
          },
          {
            table: {
              layout: 'noBorders', // <-- Eliminar los bordes de la tabla
              widths: ['auto', '*'],
              body: [
                [
                  { text: 'RECURSOS HUMANOS:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.keyRecources.recursosHumanos, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'RECURSOS FISICOS:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.keyRecources.recursosFisicos, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'RECURSOS INTELECTUALES:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.keyRecources.recursosIntelectuales, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'RECURSOS TECNOLOGICOS:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.keyRecources.recursosTecnologicos, style: ['thisText', 'fieldHeader'] }
                ],
              ]
            }
          },


          { canvas: [{ type: 'line', x1: 0, y1: 10, x2: 595 - 2 * 40, y2: 10 }] },
          '\n',

          /*   ACTIVIDADES CLAVES    */

          {
            table: {
              layout: 'noBorders', // <-- Eliminar los bordes de la tabla
              widths: ['auto', '*'],
              body: [
                [
                  { text: '#',  },
                  { text: 'ACTIVIDADES CLAVES', style: ['thisText', 'header'] }
                ]
              ]
            }
          },
          {
            table: {
              layout: 'noBorders', // <-- Eliminar los bordes de la tabla
              widths: ['auto', '*'],
              body: [
                [
                  { text: 'ACTIVIDAD PRINCIPAL:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.keyActivities.actividadPrincipal, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'PRESTACION SERVICIO:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.keyRecources.recursosFisicos, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'COMUNICACION MARKETING:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.keyRecources.recursosIntelectuales, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'POSTVENTA:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.keyRecources.recursosTecnologicos, style: ['thisText', 'fieldHeader'] }
                ],
              ]
            }
          },


          { canvas: [{ type: 'line', x1: 0, y1: 10, x2: 595 - 2 * 40, y2: 10 }] },
          '\n',

          /*   SOCIOS CLAVES    */

          {
            table: {
              layout: 'noBorders', // <-- Eliminar los bordes de la tabla
              widths: ['auto', '*'],
              body: [
                [
                  { text: '#',  },
                  { text: 'SOCIOS CLAVES', style: ['thisText', 'header'] }
                ]
              ]
            }
          },
          {
            table: {
              layout: 'noBorders', // <-- Eliminar los bordes de la tabla
              widths: ['auto', '*'],
              body: [
                [
                  { text: 'PROVEEDORES:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.keyPartners.proveedores, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'ENTIDADES PUBLICAS:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.keyPartners.entidadesPublicas, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'ENTIDADES PRIVADAS:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.keyPartners.entidadesPrivadas, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'ACADEMIA:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.keyPartners.academia, style: ['thisText', 'fieldHeader'] }
                ],
              ]
            }
          },



          { canvas: [{ type: 'line', x1: 0, y1: 10, x2: 595 - 2 * 40, y2: 10 }] },
          '\n',

          /*   INGRESOS    */

          {
            table: {
              layout: 'noBorders', // <-- Eliminar los bordes de la tabla
              widths: ['auto', '*'],
              body: [
                [
                  { text: '#',  },
                  { text: 'INGRESOS', style: ['thisText', 'header'] }
                ]
              ]
            }
          },
          {
            table: {
              layout: 'noBorders', // <-- Eliminar los bordes de la tabla
              widths: ['auto', '*'],
              body: [
                [
                  { text: 'CAPITAL PROPIO:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.revenueStreams.capitalPorpio, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'CAPITAL PRESTAMO:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.revenueStreams.capitalPrestamo, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'CANALES PAGO:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.revenueStreams.canalesPago, style: ['thisText', 'fieldHeader'] }
                ],
              ]
            }
          },
          { canvas: [{ type: 'line', x1: 0, y1: 10, x2: 595 - 2 * 40, y2: 10 }] },
          '\n',
          '\n',
          '\n',
          '\n',
          '\n',

          /*   ESTRUCTURA COSTOS    */
          {
            image: base64,
            width: 129, // Ancho de la imagen en el PDF
            height: 106, // Alto de la imagen en el PDF
            margin: [0, 0, 0, 10] // Margen inferior de 10 unidades
            // Márgenes de la imagen en el PDF
          },
          {
            table: {
              layout: 'noBorders', // <-- Eliminar los bordes de la tabla
              widths: ['auto', '*'],
              body: [
                [
                  { text: '#', style: '' },
                  { text: 'ESTRUCTURA COSTOS // COSTOS VARIABLES', style:['thisText', 'header'] },
                ]
              ]
            }
          },
          {
          table: {
            headerRows: 1,
            widths: ['*', '*'],
            body: [
              // Encabezado de la tabla de frutas
              [
                { text: 'NOMBRE', style: '' },
                { text: 'MONTO', style: 'tableHeader' },
              ],
              // Contenido de la tabla de frutas (iteración sobre la lista de frutas)
              ...this.proceso.canvasModel.costStructure.costosVariables.map(fruta => [
                fruta.nameComponent,
                fruta.amount.toLocaleString('en-US', {
                  style: 'currency', currency: 'USD' })
              ])
            ]
          }
        },


        {
          table: {
            layout: 'noBorders', // <-- Eliminar los bordes de la tabla
            widths: ['auto', '*'],
            body: [
              [
                { text: '#', style: '' },
                { text: 'ESTRUCTURA COSTOS // COSTOS FIJOS', style:['thisText', 'header'] },
              ]
            ]
          }
        },
        {
        table: {
          headerRows: 1,
          widths: ['*', '*'],
          body: [
            // Encabezado de la tabla de frutas
            [
              { text: 'NOMBRE', style: '' },
              { text: 'MONTO', style: 'tableHeader' },
            ],
            // Contenido de la tabla de frutas (iteración sobre la lista de frutas)
            ...this.proceso.canvasModel.costStructure.costosFijos.map(fruta => [
              fruta.nameComponent,
              fruta.amount.toLocaleString('en-US', {
                style: 'currency', currency: 'USD' })
            ])
          ]
        }
      },
      {
        table: {
          layout: 'noBorders', // <-- Eliminar los bordes de la tabla
          widths: ['auto', '*'],
          body: [
            [
              { text: '#',  },
              { text: 'ESTRUCTURA COSTOS // TOTALES', style: ['thisText', 'header'] }
            ]
          ]
        }
      },
      {
        table: {
          layout: 'noBorders', // <-- Eliminar los bordes de la tabla
          widths: ['auto', '*'],
          body: [
            [
              { text: 'TOTAL COSTOS VARIABLES:', style: 'fieldHeader' },
              { text: this.proceso.canvasModel.costStructure.totalCostosVariables.toLocaleString('en-US', {
                style: 'currency', currency: 'USD' }), style: ['thisText', 'fieldHeader'] }
            ],
            [
              { text: 'TOTAL COSTOS FIJOS:', style: 'fieldHeader' },
              { text: this.proceso.canvasModel.costStructure.totalCostosFijos.toLocaleString('en-US', {
                style: 'currency', currency: 'USD' }), style: ['thisText', 'fieldHeader'] }
            ],
            [
              { text: 'TOTAL DE COSTOS:', style: 'fieldHeader' },
              { text: this.proceso.canvasModel.costStructure.totalCostos.toLocaleString('en-US', {
                style: 'currency', currency: 'USD' }), style: ['thisText', 'fieldHeader'] }
            ],
          ]
        }
      },
          
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
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      pdfMake.createPdf(documentDefinition).open();

    })
  }






  



  imprimirNegocio() {

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

          /*     INFORMACION DEL PROYECTO     */
          {
            table: {
              layout: 'noBorders', // <-- Eliminar los bordes de la tabla
              widths: ['auto', '*'],
              body: [
                [
                  { text: '#',  },
                  { text: 'INFORMACION DEL PROYECTO', style: ['thisText', 'header'] }
                ]
              ]
            }
          },
          {
            table: {
              layout: 'noBorders', // <-- Eliminar los bordes de la tabla
              widths: ['auto', '*'],
              body: [
                [
                  { text: 'RESUMEN EJECUTIVO:', style: 'fieldHeader' },
                  { text: this.proceso.businessPlan.proyectInformation.resumen , style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'PROBLEMA IDENTIFICADOR:', style: 'fieldHeader' },
                  { text: this.proceso.businessPlan.proyectInformation.problemas, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'OBJETIVOS:', style: 'fieldHeader' },
                  { text: this.proceso.businessPlan.proyectInformation.objetivos , style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'MISION:', style: 'fieldHeader' },
                  { text: this.proceso.businessPlan.proyectInformation.mision , style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'VISION:', style: 'fieldHeader' },
                  { text: this.proceso.businessPlan.proyectInformation.vision, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'VALORES CORPORATIVOS:', style: 'fieldHeader' },
                  { text: this.proceso.businessPlan.proyectInformation.valoresCorporativos, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'IMPACTO AMBIENTAL:', style: 'fieldHeader' },
                  { text: this.proceso.businessPlan.proyectInformation.impactoAmbiental, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'IMPACTOM SOCIAL:', style: 'fieldHeader' },
                  { text: this.proceso.businessPlan.proyectInformation.impactoSocial, style: ['thisText', 'fieldHeader'] }
                ],
              ]
            }
          },

          { canvas: [{ type: 'line', x1: 0, y1: 10, x2: 595 - 2 * 40, y2: 10 }] },

          '\n',

          /*   ANALISIS INTERNO Y EXTERNO   */


          {
            table: {
              layout: 'noBorders', // <-- Eliminar los bordes de la tabla
              widths: ['auto', '*'],
              body: [
                [
                  { text: '#',  },
                  { text: 'ANALISIS INTERNO Y EXTERNO', style: ['thisText', 'header'] }
                ]
              ]
            }
          },
          {
            table: {
              layout: 'noBorders', // <-- Eliminar los bordes de la tabla
              widths: ['auto', '*'],
              body: [
                [
                  { text: 'PUBLICO OBJETIVO:', style: 'fieldHeader' },
                  { text: this.proceso.businessPlan.analisis.publicoObjetivo, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'ACTIVIDAD PRINCIPAL DE LA EMPRESA:', style: 'fieldHeader' },
                  { text: this.proceso.businessPlan.analisis.actividadPrincipal, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'PROPUESTA DE VALOR:', style: 'fieldHeader' },
                  { text: this.proceso.businessPlan.analisis.propuestaValor , style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'COMERCIALIZACION:', style: 'fieldHeader' },
                  { text: this.proceso.businessPlan.analisis.comercializacion , style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'OPERACION:', style: 'fieldHeader' },
                  { text: this.proceso.businessPlan.analisis.operacion, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'EQUIPO DE TRABAJO:', style: 'fieldHeader' },
                  { text: this.proceso.businessPlan.analisis.equipoTrabajo, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'COMPETENCIAS:', style: 'fieldHeader' },
                  { text: this.proceso.businessPlan.analisis.competencias, style: ['thisText', 'fieldHeader'] }
                ],
                // [
                //   { text: 'MEDIO DIGITALES:', style: 'fieldHeader' },
                //   { text: this.proceso.businessPlan.analisis.mediosDigitales, style: ['thisText', 'fieldHeader'] }
                // ],
                [
                  { text: 'RECURSOS NECESARIOS:', style: 'fieldHeader' },
                  { text: this.proceso.businessPlan.analisis.recursosNecesarios, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'LEGAL:', style: 'fieldHeader' },
                  { text: this.proceso.businessPlan.analisis.legal, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'FUENTES DE FINANCIACION:', style: 'fieldHeader' },
                  { text: this.proceso.businessPlan.analisis.fuenteFinanciacion, style: ['thisText', 'fieldHeader'] }
                ],
              ]
            }
          },

          { canvas: [{ type: 'line', x1: 0, y1: 10, x2: 595 - 2 * 40, y2: 10 }] },

          '\n',



          /*   ANALISIS dofa   */

          {
            image: base64,
            width: 129, // Ancho de la imagen en el PDF
            height: 106, // Alto de la imagen en el PDF
            margin: [0, 0, 0, 10] // Margen inferior de 10 unidades
            // Márgenes de la imagen en el PDF
          },
          {
            table: {
              layout: 'noBorders', // <-- Eliminar los bordes de la tabla
              widths: ['auto', '*'],
              body: [
                [
                  { text: '#',  },
                  { text: 'ANALISIS DOFA', style: ['thisText', 'header'] }
                ]
              ]
            }
          },
          {
            table: {
              layout: 'noBorders', // <-- Eliminar los bordes de la tabla
              widths: ['auto', '*'],
              body: [
                [
                  { text: 'DEBILIDADES:', style: 'fieldHeader' },
                  { text: this.proceso.businessPlan.dofaAnalisis.debilidades, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'OPORTUNIDADES:', style: 'fieldHeader' },
                  { text: this.proceso.businessPlan.dofaAnalisis.oportunidades, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'FORTALEZAS:', style: 'fieldHeader' },
                  { text: this.proceso.businessPlan.dofaAnalisis.fotalezas, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'AMENAZAS:', style: 'fieldHeader' },
                  { text: this.proceso.businessPlan.dofaAnalisis.amenazas , style: ['thisText', 'fieldHeader'] }
                ],
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
                  { text: '#',  },
                  { text: 'CONCLUSIONES', style: ['thisText', 'header'] }
                ]
              ]
            }
          },
          {
            table: {
              layout: 'noBorders', // <-- Eliminar los bordes de la tabla
              widths: ['auto', '*'],
              body: [
                [
                  { text: 'CONCLUSION:', style: 'fieldHeader' },
                  { text: this.proceso.businessPlan.conclusion, style: ['thisText', 'fieldHeader'] }
                ],
              ]
            }
          },
          
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
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      pdfMake.createPdf(documentDefinition).open();

    })
  }
}
