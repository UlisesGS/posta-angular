import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/client/client';
import { ClientService } from 'src/app/client/client.service';
import { ModalService } from 'src/app/client/modal.service';
import { Process } from 'src/app/procesos/Process';
import { ProcesoService } from 'src/app/procesos/proceso.service';
import { BusinessPlan } from './../../BusinessPlan';
import { InternalExternalAnalysis } from '../../InternalExternalAnalysis';
import { ModeloBasicoService } from './../../modelo-basico.service';
import Swal from 'sweetalert2';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';
import { HttpHeaders, HttpClient } from '@angular/common/http';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-interno',
  templateUrl: './interno.component.html',
  styleUrls: ['./interno.component.css']
})
export class InternoComponent {
  businessPlan:BusinessPlan= new BusinessPlan();
  internalExternalAnalysis:InternalExternalAnalysis= new InternalExternalAnalysis()
  cliente: Client = new Client();
  value:boolean;
  procesos:Process[]=[];
  proceso:Process= new Process();
  idVer1: number;
  imageUrl ="/assets/camaraHD.jpg";

  constructor(private modalService: ModalService,
    private clienteService: ClientService,
    private rutaParametro: ActivatedRoute,
    private procesoService:ProcesoService,
    private modeloBasicoService: ModeloBasicoService,
    private router:Router,
    private http:HttpClient) { }
    ngOnInit(): void {
      this.rutaParametro.paramMap.subscribe(parametro => {
        let id = +parametro.get('id');
        this.idVer1 = +parametro.get('idVer1');
        if (id) {
          this.clienteService.getClient(id).subscribe(data => {
            this.cliente = data;
            //console.log(data);
            this.procesoService.procesosFindAll().subscribe(pro => {
              this.procesos=pro;

              this.procesos.forEach(proceso=>{
                if(proceso?.canvasModel?.client?.id==this.cliente.id){
                  this.proceso=proceso;
                  this.proceso.businessPlan=proceso.businessPlan;
                  
                  
                  // para editar
                let idEditar = +parametro.get('idEditar');
                console.log('no entro al if');
                
                if(idEditar){
                  this.procesoService.procesosFindById(idEditar).subscribe(data=>{
                    this.proceso=data;
                    this.businessPlan=this.proceso.businessPlan;
                    this.internalExternalAnalysis=this.proceso.businessPlan.analisis;
                    console.log(this.internalExternalAnalysis);
                    
                  })
                }


                     //para ver
                if (this.idVer1) {
                  this.procesoService.procesosFindById(this.idVer1).subscribe(data => {
                    this.proceso = data;
                    this.internalExternalAnalysis = this.proceso.businessPlan.analisis;
                    console.log(this.internalExternalAnalysis);

                  })
                }
                }
              })
            })

          })
        }
      })

    }

    cerrarModalAsesoria(): void {
      this.modalService.cerrarModalAsesoria();
    }


    guardar(){
      this.modeloBasicoService.planSaveAnalisis(this.internalExternalAnalysis).subscribe(data=>{
        this.businessPlan.analisis=data;
        this.proceso.businessPlan.analisis=data;
        this.proceso.estado='Analisis Interno/Externo';
        console.log(this.proceso);

        // en el proximo cambiar a put hdp
        console.log(this.businessPlan);

        this.modeloBasicoService.planUpdateBusinessPlan(this.proceso.businessPlan).subscribe(plan=>{
          this.businessPlan=plan;
          this.proceso.businessPlan=this.businessPlan;
          this.procesoService.procesosUpdate(this.proceso).subscribe(pro=>{
            this.proceso=pro;
            this.router.navigate([`dofa/cliente/${this.proceso.canvasModel.client.id}`]);
          })
        })
      })

        }
        guardarYsalir(){

          this.modeloBasicoService.planSaveAnalisis(this.internalExternalAnalysis).subscribe(data=>{
            this.businessPlan.analisis=data;
            this.proceso.businessPlan.analisis=data;
            this.proceso.estado='Analisis Interno/Externo';
            console.log(this.proceso);
            // en el proximo cambiar a put hdp
          //  console.log(this.businessPlan);

            this.modeloBasicoService.planUpdateBusinessPlan(this.proceso.businessPlan).subscribe(plan=>{
              this.businessPlan=plan;
              this.proceso.businessPlan=this.businessPlan;
              this.procesoService.procesosUpdate(this.proceso).subscribe(pro=>{
                this.proceso=pro;
                this.router.navigate(['/procesos']);
                Swal.fire('Exito', 'Analisis interno y externo creada con exito', 'success');
              //  this.router.navigate([`dofa/cliente/${this.proceso.canvasModel.client.id}`]);
              })
            })
          })

        }




        editar(){
          this.modeloBasicoService.planUpdateAnalisis(this.internalExternalAnalysis).subscribe(data=>{
            this.businessPlan.analisis=data;
            this.proceso.businessPlan.analisis=data;
            console.log(this.proceso);
    
            // en el proximo cambiar a put hdp
            console.log(this.businessPlan);
    
            this.modeloBasicoService.planUpdateBusinessPlan(this.proceso.businessPlan).subscribe(plan=>{
              this.businessPlan=plan;
              this.proceso.businessPlan=this.businessPlan;
              this.procesoService.procesosUpdate(this.proceso).subscribe(pro=>{
                this.proceso=pro;
                if(this.proceso?.businessPlan?.dofaAnalisis){
                  this.router.navigate([`/dofa/cliente/${this.cliente.id}/editar/${this.proceso.id}`])
                }else{
                  this.router.navigate(['/dofa/cliente/', this.cliente.id]);
                }
              })
            })
          })
    
            }
            editarYsalir(){
    
              this.modeloBasicoService.planUpdateAnalisis(this.internalExternalAnalysis).subscribe(data=>{
                this.businessPlan.analisis=data;
                this.proceso.businessPlan.analisis=data;
                console.log(this.proceso);
                // en el proximo cambiar a put hdp
              //  console.log(this.businessPlan);
    
                this.modeloBasicoService.planUpdateBusinessPlan(this.proceso.businessPlan).subscribe(plan=>{
                  this.businessPlan=plan;
                  this.proceso.businessPlan=this.businessPlan;
                  this.procesoService.procesosUpdate(this.proceso).subscribe(pro=>{
                    this.proceso=pro;
                    this.router.navigate(['/procesos']);
                    Swal.fire('Exito', 'Analisis interno y externo editada con exito', 'success');
                  })
                })
              })
    
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
      
      
      
            imprimirInterno() {
      
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
                        [
                          { text: 'MEDIO DIGITALES:', style: 'fieldHeader' },
                          { text: this.proceso.businessPlan.analisis.mediosDigitales, style: ['thisText', 'fieldHeader'] }
                        ],
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
