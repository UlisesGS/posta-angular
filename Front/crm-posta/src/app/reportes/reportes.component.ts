import { Component, OnInit } from '@angular/core';

import Chart from 'chart.js/auto';
import { ProcesoService } from 'src/app/procesos/proceso.service';
import { ClientService } from 'src/app/client/client.service';
import { Client } from '../client/client';
import { Process } from '../procesos/Process';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  mostrarClientes:boolean=false;
  mostrarPlanDeNegocio:boolean=false;
  mostrarProcesosActivos:boolean=false;
  emprendedor:number=0;
  empresario:number=0;
  planNegocio:number=0
  finalizado:number=0;
  activo:number=0;
  clientes:Client[]=[];
  procesos:Process[]=[];
  constructor(private procesoService:ProcesoService, private clientService:ClientService){}
  ngOnInit(): void {



  }

// mostrar todos los clientes
    createBarAndPieCharts() {
      const ctxBar = document.getElementById('barChart') as HTMLCanvasElement;
      const ctxPie = document.getElementById('pieChart') as HTMLCanvasElement;

      const barChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
          labels: ['Emprendedor', 'Empresario'],
          datasets: [{
            label: 'Clientes Creados',
            data: [this.emprendedor, this.empresario],
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              suggestedMin: 1,
              suggestedMax: 3
            }
          }
        }
      });

      const pieChart = new Chart(ctxPie, {
        type: 'pie',
        data: {
          labels:['Emprendedor', 'Empresario'],
          datasets: [{
            label: 'Clientes Creados',
            data:  [this.emprendedor, this.empresario],
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
            borderWidth: 1
          }]
        }
      });
    }
    totalDeClientes(){
      this.emprendedor=0;
      this.empresario=0;
      this.mostrarClientes=true;
      this.mostrarPlanDeNegocio=false;
      this.mostrarProcesosActivos=false;
      this.clientService.clienteListarTodos().subscribe(data=>{
        this.clientes=data;
        this.clientes.forEach(c=>{
          if(c.type =='entrepreneur'){
            this.emprendedor+=1;
          }else{
            this.empresario+=1;
          }
        })
        this.createBarAndPieCharts()
      })
    }
planDeNegocio(){
  this.planNegocio=0;
  this.mostrarClientes=false;
  this.mostrarPlanDeNegocio=true;
  this.mostrarProcesosActivos=false;
  this.procesoService.procesosFindAll().subscribe(p=>{
    this.procesos=p;
    this.procesos.forEach(proceso=>{
      // poner la logica para plan de negocio
      if(proceso.businessPlanFinancial){
        this.planNegocio+=1
      }
    })
    this.createPlanDeAccion()

  })
}
//para el plan de negocio
createPlanDeAccion() {
  const ctxBar = document.getElementById('barChart1') as HTMLCanvasElement;
  const ctxPie = document.getElementById('pieChart1') as HTMLCanvasElement;

  const barChart = new Chart(ctxBar, {
    type: 'bar',
    data: {
      labels: ['Plan de Negocio'],
      datasets: [{
        label: 'Plan de Negocio',
        data: [this.planNegocio],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          suggestedMin: 1,
          suggestedMax: 3
        }
      }
    }
  });

  const pieChart = new Chart(ctxPie, {
    type: 'pie',
    data: {
      labels: ['Plan de Negocio'],
      datasets: [{
        label: 'Plan de Negocio',
        data: [this.planNegocio],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1
      }]
    }
  });
}
procesoActivo(){
  this.activo=0;
  this.finalizado=0;
  this.mostrarClientes=false;
  this.mostrarPlanDeNegocio=false;
  this.mostrarProcesosActivos=true;
  this.procesoService.procesosFindAll().subscribe(data=>{
this.procesos=data;
this.procesos.forEach(pro=>{
  if(pro.estado){
    this.activo+=1;
  }else{
    this.finalizado+=1;
  }

})
this.createProcesoActivo();
  })
}
// procesos finalizados
createProcesoActivo() {
  const ctxBar = document.getElementById('barChart2') as HTMLCanvasElement;
  const ctxPie = document.getElementById('pieChart2') as HTMLCanvasElement;

  const barChart = new Chart(ctxBar, {
    type: 'bar',
    data: {
      labels: ['Activos', 'Finalizados'],
      datasets: [{
        label: 'Estado del Proceso',
        data: [this.activo,this.finalizado],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          suggestedMin: 1,
          suggestedMax: 3
        }
      }
    }
  });

  const pieChart = new Chart(ctxPie, {
    type: 'pie',
    data: {
     labels: ['Activos', 'Finalizados'],
      datasets: [{
        label: 'Estado del Proceso',
        data: [this.activo,this.finalizado],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1
      }]
    }
  });
}

}