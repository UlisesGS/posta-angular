import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/client/client';
import { ClientService } from 'src/app/client/client.service';
import { ModalService } from 'src/app/client/modal.service';
import { Process } from 'src/app/procesos/Process';
import { ProcesoService } from 'src/app/procesos/proceso.service';
import { BusinessPlan } from './../../BusinessPlan';
import { ModeloBasicoService } from '../../modelo-basico.service';
import Swal from 'sweetalert2';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';
import { HttpHeaders, HttpClient } from '@angular/common/http';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-conclusion',
  templateUrl: './conclusion.component.html',
  styleUrls: ['./conclusion.component.css']
})
export class ConclusionComponent {
  businessPlan:BusinessPlan= new BusinessPlan
  cliente: Client = new Client();
  value:boolean;
  procesos:Process[]=[];
  proceso:Process= new Process();
  idVer1:number;
  imageUrl ="/assets/camaraHD.jpg";

  constructor(private modalService: ModalService,
    private clienteService: ClientService,
    private rutaParametro: ActivatedRoute,
    private procesoService:ProcesoService,
    private modeloBasicoService:ModeloBasicoService,
    private http:HttpClient,
    private router:Router) { }
    ngOnInit(): void {
      this.rutaParametro.paramMap.subscribe(parametro => {
        let id = +parametro.get('id');
        this.idVer1 = +parametro.get('idVer1');
        if (id) {
          this.clienteService.getClient(id).subscribe(data => {
            this.cliente = data;
            console.log(data);
            this.procesoService.procesosFindAll().subscribe(pro => {
              this.procesos=pro;

              this.procesos.forEach(proceso=>{
                if(proceso.canvasModel.client.id==this.cliente.id){
                  this.proceso=proceso;
                  console.log(this.proceso);


                    //para ver
                if (this.idVer1) {
                  this.procesoService.procesosFindById(this.idVer1).subscribe(data => {
                    this.proceso = data;
                    this.businessPlan.conclusion = this.proceso?.businessPlan?.conclusion;
                    console.log(this.businessPlan?.conclusion);

                  })
                }


                    // para editar
                let idEditar = +parametro.get('idEditar');
                console.log('no entro al if');
                
                if(idEditar){
                  this.procesoService.procesosFindById(idEditar).subscribe(data=>{
                    this.proceso=data;
                    this.businessPlan=this.proceso.businessPlan;
                    this.businessPlan.conclusion=this.proceso.businessPlan.conclusion;
                    
                  })
                }


                }
              })
            })

          })
        }
      })
    }
    guardar(){

      //  this.proceso.businessPlan.conclusion
        this.proceso.estado='Conclusiones';
        console.log(this.proceso);

        // en el proximo cambiar a put hdp
        //console.log(this.businessPlan);

        this.modeloBasicoService.planUpdateBusinessPlan(this.proceso.businessPlan).subscribe(plan=>{
          this.businessPlan=plan;
          this.proceso.businessPlan=this.businessPlan;
          this.procesoService.procesosUpdate(this.proceso).subscribe(pro=>{
            this.proceso=pro;
           this.router.navigate([`ventas/cliente/${this.proceso.canvasModel.client.id}`]);
           //this.router.navigate(['/procesos'])
          })
        })


        }
        guardarYsalir(){


            this.proceso.estado='Conclusiones';
            console.log(this.proceso);
            // en el proximo cambiar a put hdp
          //  console.log(this.businessPlan);

            this.modeloBasicoService.planUpdateBusinessPlan(this.proceso.businessPlan).subscribe(plan=>{
              this.businessPlan=plan;
              this.proceso.businessPlan=this.businessPlan;
              this.procesoService.procesosUpdate(this.proceso).subscribe(pro=>{
                this.proceso=pro;
                this.router.navigate(['/procesos']);
                Swal.fire('Exito', 'Conclusiones creada con exito', 'success');
              //  this.router.navigate([`dofa/cliente/${this.proceso.canvasModel.client.id}`]);
              })
            })


        }




        editar(){
    
            this.modeloBasicoService.planUpdateBusinessPlan(this.proceso.businessPlan).subscribe(plan=>{
              this.businessPlan=plan;
              this.proceso.businessPlan=this.businessPlan;
              this.procesoService.procesosUpdate(this.proceso).subscribe(pro=>{
                this.proceso=pro;
                if(this.proceso?.businessPlanFinancial?.presupuestoVenta){
                  this.router.navigate([`/ventas/cliente/${this.cliente.id}/editar/${this.proceso.id}`])
                }else{
                  this.router.navigate(['/ventas/cliente/', this.cliente.id]);
                }
              })
            })
    
    
            }
            editarYsalir(){
    
    
                this.modeloBasicoService.planUpdateBusinessPlan(this.proceso.businessPlan).subscribe(plan=>{
                  this.businessPlan=plan;
                  this.proceso.businessPlan=this.businessPlan;
                  this.procesoService.procesosUpdate(this.proceso).subscribe(pro=>{
                    this.proceso=pro;
                    this.router.navigate(['/procesos']);
                    Swal.fire('Exito', 'Conclusiones editada con exito', 'success');
                  //  this.router.navigate([`dofa/cliente/${this.proceso.canvasModel.client.id}`]);
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



            imprimirConclusion() {
      
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
