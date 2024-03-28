import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Process } from 'src/app/procesos/Process';
import { URL } from 'src/app/URL';


@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  //baseUrl=URL


  //private baseUrl:string="http://ec2-3-141-31-192.us-east-2.compute.amazonaws.com:8080/image"
  //private baseUrl:string="http://ec2-3-80-138-228.compute-1.amazonaws.com:8080/image"
  private baseUrl='http://ec2-18-231-154-207.sa-east-1.compute.amazonaws.com:8080/image' 

  //private baseUrl = 'http://localhost:8080/image'; 


  constructor(private http: HttpClient) { }

  uploadImage(file: File, id:number): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<string>(`${this.baseUrl}/uploadCompromiso/${id}`, formData);
  }

  getImageBlob(id:number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/downloadCompromiso/${id}`, { responseType: 'blob' });
  }

  uploadImageEncuesta(file: File, id:number): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<string>(`${this.baseUrl}/uploadEncuesta/${id}`, formData);
  }

  getImageBlobEncuesta(id:number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/imagenEncuesta/${id}`, { responseType: 'blob' });
  }
  uploadImageCierre(file: File, id:number): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<string>(`${this.baseUrl}/uploadCierre/${id}`, formData);
  }
  getImageBlobCierre(id:number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/imagenCierre/${id}`, { responseType: 'blob' });
  }
  uploadImageImpacto(file: File, id:number): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<string>(`${this.baseUrl}/uploadImpacto/${id}`, formData);
  }
  getImageBlobImpacto(id:number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/imagenImpacto/${id}`, { responseType: 'blob' });
  }
}
