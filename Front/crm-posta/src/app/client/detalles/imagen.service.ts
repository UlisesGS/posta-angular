import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Process } from 'src/app/procesos/Process';
import { URL } from 'src/app/URL';


@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  

  //private baseUrl = 'http://ec2-54-167-238-108.compute-1.amazonaws.com:8080/image'

private baseUrl = 'http://localhost:8080/image'; 


  constructor(private http: HttpClient) { }

  uploadImage(file: File, id:number): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<string>(`${this.baseUrl}/uploadCompromiso/${id}`, formData);
  }

  downloadFile(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/downloadCompromiso/${id}`, { responseType: 'blob' });
  }
 



  // getImageUrl(id: number): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/downloadCompromiso/${id}`)
  // }

  uploadImageEncuesta(file: File, id:number): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<string>(`${this.baseUrl}/uploadEncuesta/${id}`, formData);
  }

  downloadEncuesta(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/imagenEncuesta/${id}`, { responseType: 'blob' });
  }
  uploadImageCierre(file: File, id:number): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<string>(`${this.baseUrl}/uploadCierre/${id}`, formData);
  }
  downloadCierre(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/imagenCierre/${id}`, { responseType: 'blob' });
  }
  uploadImageImpacto(file: File, id:number): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<string>(`${this.baseUrl}/uploadImpacto/${id}`, formData);
  }
  downloadImpacto(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/imagenImpacto/${id}`, { responseType: 'blob' });
  }
}
