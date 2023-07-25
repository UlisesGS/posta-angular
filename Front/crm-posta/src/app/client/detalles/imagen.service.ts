import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Process } from 'src/app/procesos/Process';


@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  //private baseUrl:string="http://ec2-3-141-31-192.us-east-2.compute.amazonaws.com:8080"
  private baseUrl = 'http://localhost:8080'; // Reemplaza con la URL base de tu backend

  constructor(private http: HttpClient) { }

  uploadImage(file: File, proceso:Process): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<string>(`${this.baseUrl}/uploadCompromiso/${proceso.id}`, formData);
  }

  getImageBlob(proceso:Process): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/imagenCompromiso/${proceso.id}`, { responseType: 'blob' });
  }
  
  uploadImageEncuesta(file: File, proceso:Process): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<string>(`${this.baseUrl}/uploadEncuesta/${proceso.id}`, formData);
  }

  getImageBlobEncuesta(proceso:Process): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/imagenEncuesta/${proceso.id}`, { responseType: 'blob' });
  }
  uploadImageCierre(file: File, proceso:Process): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<string>(`${this.baseUrl}/uploadCierre/${proceso.id}`, formData);
  }

  getImageBlobCierre(proceso:Process): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/imagenCierre/${proceso.id}`, { responseType: 'blob' });
  }
}
