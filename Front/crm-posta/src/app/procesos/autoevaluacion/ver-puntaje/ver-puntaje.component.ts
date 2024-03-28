import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/client/client';
import { Process } from '../../Process';
import { ClientService } from 'src/app/client/client.service';
import { ProcesoService } from '../../proceso.service';
import { ActivatedRoute } from '@angular/router';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { PdfServiceService } from 'src/app/client/detalles/pdf-service.service';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-ver-puntaje',
  templateUrl: './ver-puntaje.component.html',
  styleUrls: ['./ver-puntaje.component.css']
})
export class VerPuntajeComponent implements OnInit {
  cliente: Client = new Client();
  proceso: Process = new Process();
  procesos: Process [];
  idVer:number;
  imageUrl ="/assets/camaraHD.jpg";

  constructor(private clientService:ClientService,
    private procesoService:ProcesoService,
    private activatedRoute:ActivatedRoute,
    private http:HttpClient,
    private pdfServ:PdfServiceService){}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(parametro=>{
      let id=+parametro.get('id')
      this.idVer=+parametro.get('idVer') 
      if(this.idVer){
        this.clientService.getClient(this.idVer).subscribe(data=>{
          this.cliente=data;
          this.procesoService.procesosFindAll().subscribe(procesos=>{
            this.procesos=procesos; 
            this.procesos.forEach(p=>{
              if(p.selfAssessment?.client?.id==this.cliente?.id){
                this.proceso=p;
                
              }
              
            })
          })
        })
      }
      if(id){
        this.clientService.getClient(id).subscribe(data=>{
          this.cliente=data;
          this.procesoService.procesosFindAll().subscribe(procesos=>{
            this.procesos=procesos;
            this.procesos.forEach(p=>{
              if(p.selfAssessment?.client?.id==this.cliente?.id){
                this.proceso=p;
                
              }
              
            })
          })
        })
      }
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
  


  generarPDF(id: number) {
    this.pdfServ.generarAutoevaluacion(id).subscribe(
      (data: Blob) => {
        // Maneja la respuesta del servicio
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url); // Abre el PDF en una nueva ventana o pestaña
      },
      (error) => {
        // Maneja errores, si los hay
        console.error('Error al generar el informe:', error);
      }
    );
  }

}
