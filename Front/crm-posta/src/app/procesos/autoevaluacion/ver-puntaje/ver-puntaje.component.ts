import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/client/client';
import { Process } from '../../Process';
import { ClientService } from 'src/app/client/client.service';
import { ProcesoService } from '../../proceso.service';
import { ActivatedRoute } from '@angular/router';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { HttpHeaders, HttpClient } from '@angular/common/http';

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
    private http:HttpClient){}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(parametro=>{
      let id=+parametro.get('id')
      this.idVer=+parametro.get('idVer') 
      if(this.idVer){
        this.clientService.getClient(this.idVer).subscribe(data=>{
          this.cliente=data;
          console.log(this.cliente);
          this.procesoService.procesosFindAll().subscribe(procesos=>{
            this.procesos=procesos; 
            this.procesos.forEach(p=>{
              if(p.selfAssessment?.client?.id==this.cliente?.id){
                this.proceso=p;
                console.log(this.proceso);
                
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
                console.log(this.proceso);
                
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
  


  generarPDF() {
    this.convertImageToBase64(this.imageUrl).then(base64 => {
    const docDefinition = {
      content: [
        {
          image: base64,
          width: 129, // Ancho de la imagen en el PDF
          height: 106, // Alto de la imagen en el PDF
          margin: [0, 0, 0, 10] // Margen inferior de 10 unidades
          // Márgenes de la imagen en el PDF
        },
        { text: `PUNTAJE: `+this.proceso.selfAssessment.score, style: 'header', alignment: 'center' },
        { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1, lineColor: '#000000' }] },
        { text: 'CALIFIQUE CADA RESPUESTA DE LA SIGUIENTE MANERA', style: 'subheader', alignment: 'center' },
        { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1, lineColor: '#000000' }] },
        { text: '3 puntos por cada "SI". 2 puntos por cada "QUIZÁS". 0 puntos por cada "NO".', style: 'subheader' },
        { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1, lineColor: '#000000' }] }, // Línea separadora usando el canvas
        { text: 'SI USTED OBTUVO UNA PUNTUACION ENTRE:', style: 'subheader', alignment: 'center' }, // Centrar el texto
        { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1, lineColor: '#000000' }] },
        { text: '90 y 72. Comience su negocio y programe una cita con un asesor del Centro. Usted tiene las condiciones para ser un buen emprendedor.', style: 'subheader', alignment: 'center' }, // Centrar el texto
        { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1, lineColor: '#000000' }] },
        { text: '71 y 58. Usted tiene potencial, pero necesita mayor esfuerzo y dedicación para sacar adelante sus proyectos.', style: 'subheader', alignment: 'center' }, // Centrar el texto
        { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1, lineColor: '#000000' }] },
      ],
      styles: {
        header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
        subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
        message: { fontSize: 12 }
      }
    };

    pdfMake.createPdf(docDefinition).open();
  })}

}
