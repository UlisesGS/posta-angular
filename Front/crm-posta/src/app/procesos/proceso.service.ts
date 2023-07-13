import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Canvas } from './canvas';
import { Process } from './Process';
import { CustomerSegments } from './CustomerSegments';
import { ValuePropositions } from './ValuePropositions';
import { Channels } from './Channels';
import { CustomerRelationships } from './CustomerRelationships';
import { KeyRecources } from './KeyRecources';
import { KeyPartners } from './KeyPartners';
import { RevenueStreams } from './RevenueStreams';
import { CostStructure } from './CostStructure';
import { KeyActivities } from './KeyActivities';



@Injectable({
  providedIn: 'root'
})
export class ProcesoService {

 // private urlEndPoint:string="http://ec2-3-141-31-192.us-east-2.compute.amazonaws.com:8080/canvas"

  private urlEndPoint:string="http://localhost:8080/canvas";
  // private urlProcesos:string="http://ec2-3-141-31-192.us-east-2.compute.amazonaws.com:8080/process"
  private urlProcesos:string="http://localhost:8080/process";
  constructor(private http:HttpClient) { }
// procesos
public procesosFindAllUltimo():Observable<any>{
  return this.http.get<any>(`${this.urlProcesos}/ultimo`);
}
  public procesosPaginacion(page:number):Observable<any>{
    return this.http.get<any>(`${this.urlProcesos}/paginar/${page}`);
  }
  public procesosFindAll():Observable<any>{
    return this.http.get<any>(`${this.urlProcesos}`);
  }
  //metodos para buscar
  public procesoFindByNombre(termino:string):Observable<any>{
    return this.http.get<any>(`${this.urlProcesos}/buscarPorNombre/${termino}`);
  }
  public procesoFindByType(type:string):Observable<any>{
    return this.http.get<any>(`${this.urlProcesos}/buscarPorType/${type}`);
  }
  public procesoFindByTermiando(terminado:boolean):Observable<any>{
    return this.http.get<any>(`${this.urlProcesos}/buscarPorTerminado/${terminado}`);
  }
  public procesoFindByEstado(estado:string):Observable<any>{
    return this.http.get<any>(`${this.urlProcesos}/buscarPorEstado/${estado}`);
  }
  public procesosFindById(id:number):Observable<any>{
    return this.http.get<any>(`${this.urlProcesos}/${id}`);
  }
  public procesosSave(proceso:Process):Observable<any>{
    return this.http.post<any>(`${this.urlProcesos}`,proceso);
  }
  public procesosUpdate(proceso:Process):Observable<any>{
    return this.http.put<any>(`${this.urlProcesos}/${proceso.id}`,proceso);
  }

   // canvas model
  public canvasFindById(id:number):Observable<any>{
    return this.http.get<any>(`${this.urlEndPoint}/buscar/${id}`);
  }
  public canvasSave(canvas:Canvas):Observable<any>{
    console.log("desde el canvasSave"+canvas);

    return this.http.post<any>(`${this.urlEndPoint}/save`,canvas);
  }
  public canvasUpdate(canvas:Canvas):Observable<any>{


    return this.http.put<any>(`${this.urlEndPoint}/model/${canvas.id}`,canvas);
  }
  public costosTodos():Observable<any[]>{
    return this.http.get<any[]>(`${this.urlEndPoint}/listaCostos`);
  }
  // modelo canvas todos los save de los diferentes sectores
public segmentoSave(customerSegments:CustomerSegments):Observable<any>{
  return this.http.post<any>(`${this.urlEndPoint}/segmetento`,customerSegments);
}
public propuestaValorSave(valuePropositions:ValuePropositions):Observable<any>{
  return this.http.post<any>(`${this.urlEndPoint}/propuestaValor`,valuePropositions);
}
public canalesSave(channels:Channels):Observable<any>{
  return this.http.post<any>(`${this.urlEndPoint}/canales`,channels);
}
public relacionesSave(customerRelationships:CustomerRelationships):Observable<any>{
  return this.http.post<any>(`${this.urlEndPoint}/relaciones`,customerRelationships);
}
public recursosClavesSave(keyRecources:KeyRecources):Observable<any>{
  return this.http.post<any>(`${this.urlEndPoint}/recursosClaves`,keyRecources);
}
public actividadesClavesSave(keyActivities:KeyActivities):Observable<any>{
  return this.http.post<any>(`${this.urlEndPoint}/actividadesClaves`,keyActivities);
}
public sociosClavesSave(keyPartners:KeyPartners):Observable<any>{
  return this.http.post<any>(`${this.urlEndPoint}/sociosClaves`,keyPartners);
}
public ingresosSave(revenueStreams:RevenueStreams):Observable<any>{
  return this.http.post<any>(`${this.urlEndPoint}/ingresos`,revenueStreams);
}
public estructuraCostoSave(costStructure:CostStructure):Observable<any>{
  return this.http.post<any>(`${this.urlEndPoint}/estructuraCostos`,costStructure);
}


  // modelo canvas todos los put de los diferentes sectores
  public segmentoPut(customerSegments:CustomerSegments):Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/segmentoPut/${customerSegments.id}`,customerSegments);
  }

  public propuestaValorPut(valuePropositions:ValuePropositions):Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/propuestaValorPut/${valuePropositions.id}`,valuePropositions);
  }

  public canalesPut(channels:Channels):Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/canalesPut/${channels.id}`,channels);
  }

  public relacionesPut(customerRelationships:CustomerRelationships):Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/relacionesPut/${customerRelationships.id}`,customerRelationships);
  }

  public recursosClavesPut(keyRecources:KeyRecources):Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/recursosClavesPut/${keyRecources.id}`,keyRecources);
  }

  public actividadesClavesPut(keyActivities:KeyActivities):Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/actividadesClavesPut/${keyActivities.id}`,keyActivities);
  }

  public sociosClavesPut(keyPartners:KeyPartners):Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/sociosClavesPut/${keyPartners.id}`,keyPartners);
  }

  public ingresosPut(revenueStreams:RevenueStreams):Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/ingresosPut/${revenueStreams.id}`,revenueStreams);
  }

  public estructuraCostoPut(costStructure:CostStructure):Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/estructuraCostoPut/${costStructure.id}`,costStructure);
  }
  }
