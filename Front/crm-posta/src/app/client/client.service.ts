import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Client } from './client';
import { Entrepreneur } from './entrepreneur';
import { Businessman } from './businessman';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
 // private urlEndPoint:string="http://ec2-3-141-31-192.us-east-2.compute.amazonaws.com:8080/v3/api-docs/clients"
  private urlEndPoint:string="http://localhost:8080/clients";
  private httpHeader=new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http:HttpClient, private router:Router) { }



  /* TODOS LOS GET NORMALES */
  public getClient(id:number): Observable<any>{
    return this.http.get<any>(`${this.urlEndPoint}/${id}`);
  }

  public getClientsMunicipios(): Observable<any>{
    return this.http.get<any>(`${this.urlEndPoint}/municipios`);
  }

  /* TODAS LAS PAGINACIONES */
  public getClientType(page:number, variableType:string): Observable<any>{    / AGREGAR PAGINACION /
    return this.http.get<any>(`${this.urlEndPoint}/type/${0}?type=${variableType}`)
  }

  public getClientState(page:number, variableState:boolean): Observable<any>{    / AGREGAR PAGINACION /
    return this.http.get<any>(`${this.urlEndPoint}/state/${0}?active=${variableState}`)
  }

  public getClientsPaginar(page:number):Observable<any>{     / AGREGAR PAGINACION /
    return this.http.get<any>(`${this.urlEndPoint}/paginar/${0}`, {headers:this.httpHeader})
  }

  public getClientsMunicipiosPage(page:number, variableIdmunicipio:number): Observable<any>{      / AGREGAR PAGINACION /
    return this.http.get<any>(`${this.urlEndPoint}/municipios/${0}?idMunicipio=${variableIdmunicipio}`);
  }

  public getClientsGender(page:number, variableGender:string): Observable<any>{      / AGREGAR PAGINACION /
    return this.http.get<any>(`${this.urlEndPoint}/gender/${0}?gender=${variableGender}`);
  }

  public getClientsByTime(page:number): Observable<any>{      / AGREGAR PAGINACION /
    return this.http.get<any>(`${this.urlEndPoint}/byTime/${0}`);
  }



  /* TODOS LOS PUT */
  public updateEntrepreneur(entrepreneur:Entrepreneur):Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/entrepreneur/${entrepreneur.id}`, entrepreneur,{headers:this.httpHeader})
  }

  public updateBusinessman(businessman:Businessman):Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/businessman/${businessman.id}`,businessman, {headers:this.httpHeader})
  }
/* TODOS LOS DELETE */
  public ClientsDelete(id:void):Observable<void>{
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`)
  }




  /*public saveSelfAssessment():Observable<any>{
    return this.http.post<any>(${this.http}/selfAssessment)/*/

  public saveEntrepreneur(entrepreneur:Entrepreneur):Observable<any>{
      return this.http.post<any>(`${this.urlEndPoint}/entrepreneur`,entrepreneur)
    }

    public saveBusinessman(businessman:Businessman):Observable<any>{
      return this.http.post<any>(`${this.urlEndPoint}/businessman`,businessman)
    }
    public traerCiu(){
   //   return this.http.get<any>('https://github.com/Startup-Colombia/CIIU/blob/master/CIIU.json')
   return this.ciu;

    }
    public ciu={
      "A": {
        "titulo": "Agricultura, Ganadería, Caza, Silvicultura y Pesca",
        "divisiones": {
          "01": {
            "titulo": "Agricultura, ganadería, caza y actividades de servicios conexas.",
            "subdivisiones": {
              "011": {
                "titulo": "Cultivos agrícolas transitorios.",
                "actividades": {
                  "0111": "Cultivo de cereales (excepto arroz), legumbres y semillas oleaginosas.",
                  "0112": "Cultivo de arroz.",
                  "0113": "Cultivo de hortalizas, raíces y tubérculos.",
                  "0114": "Cultivo de tabaco.",
                  "0115": "Cultivo de plantas textiles.",
                  "0119": "Otros cultivos transitorios n.c.p."
                }
              },
              "012": {
                "titulo": "Cultivos agrícolas permanentes.",
                "actividades": {
                  "0121": "Cultivo de frutas tropicales y subtropicales.",
                  "0122": "Cultivo de plátano y banano.",
                  "0123": "Cultivo de café.",
                  "0124": "Cultivo de caña de azúcar.",
                  "0125": "Cultivo de flor de corte.",
                  "0126": "Cultivo de palma para aceite (palma africana) y otros frutos oleaginosos.",
                  "0127": "Cultivo de plantas con las que se preparan bebidas.",
                  "0128": "Cultivo de especias y de plantas aromáticas y medicinales.",
                  "0129": "Otros cultivos permanentes n.c.p."
                }
              },
              "013": {
                "titulo": "Propagación de plantas (actividades de los viveros, excepto viveros forestales).",
                "actividades": {
                  "0130": "Propagación de plantas (actividades de los viveros, excepto viveros forestales)."
                }
              },
              "014": {
                "titulo": "Ganadería.",
                "actividades": {
                  "0141": "Cría de ganado bovino y bufalino.",
                  "0142": "Cría de caballos y otros equinos.",
                  "0143": "Cría de ovejas y cabras.",
                  "0144": "Cría de ganado porcino.",
                  "0145": "Cría de aves de corral.",
                  "0149": "Cría de otros animales n.c.p."
                }
              },
              "015": {
                "titulo": "Explotación mixta (agrícola y pecuaria).",
                "actividades": {
                  "0150": "Explotación mixta (agrícola y pecuaria)."
                }
              },
              "016": {
                "titulo": "Actividades de apoyo a la agricultura y la ganadería, y actividades posteriores a la cosecha.",
                "actividades": {
                  "0161": "Actividades de apoyo a la agricultura.",
                  "0162": "Actividades de apoyo a la ganadería.",
                  "0163": "Actividades posteriores a la cosecha.",
                  "0164": "Tratamiento de semillas para propagación."
                }
              },
              "017": {
                "titulo": "Caza ordinaria y mediante trampas y actividades de servicios conexas.",
                "actividades": {
                  "0170": "Caza ordinaria y mediante trampas y actividades de servicios conexas."
                }
              }
            }
          },
          "02": {
            "titulo": "Silvicultura y extracción de madera.",
            "subdivisiones": {
              "021": {
                "titulo": "Silvicultura y otras actividades forestales.",
                "actividades": {
                  "0210": "Silvicultura y otras actividades forestales."
                }
              },
              "022": {
                "titulo": "Extracción de madera.",
                "actividades": {
                  "0220": "Extracción de madera."
                }
              },
              "023": {
                "titulo": "Recolección de productos forestales diferentes a la madera.",
                "actividades": {
                  "0230": "Recolección de productos forestales diferentes a la madera."
                }
              },
              "024": {
                "titulo": "Servicios de apoyo a la silvicultura.",
                "actividades": {
                  "0240": "Servicios de apoyo a la silvicultura."
                }
              }
            }
          },
          "03": {
            "titulo": "Pesca y acuicultura.",
            "subdivisiones": {
              "031": {
                "titulo": "Pesca.",
                "actividades": {
                  "0311": "Pesca marítima.",
                  "0312": "Pesca de agua dulce."
                }
              },
              "032": {
                "titulo": "Acuicultura.",
                "actividades": {
                  "0321": "Acuicultura marítima.",
                  "0322": "Acuicultura de agua dulce."
                }
              }
            }
          }
        }
      },
      "B": {
        "titulo": "Explotación de Minas y Canteras",
        "divisiones": {
          "05": {
            "titulo": "Extracción de carbón de piedra y lignito.",
            "subdivisiones": {
              "051": {
                "titulo": "Extracción de hulla (carbón de piedra).",
                "actividades": {
                  "0510": "Extracción de hulla (carbón de piedra)."
                }
              },
              "052": {
                "titulo": "Extracción de carbón lignito.",
                "actividades": {
                  "0520": "Extracción de carbón lignito."
                }
              }
            }
          },
          "06": {
            "titulo": "Extracción de petróleo crudo y gas natural.",
            "subdivisiones": {
              "061": {
                "titulo": "Extracción de petróleo crudo.",
                "actividades": {
                  "0610": "Extracción de petróleo crudo."
                }
              },
              "062": {
                "titulo": "Extracción de gas natural.",
                "actividades": {
                  "0620": "Extracción de gas natural."
                }
              }
            }
          },
          "07": {
            "titulo": "Extracción de minerales metalíferos.",
            "subdivisiones": {
              "071": {
                "titulo": "Extracción de minerales de hierro.",
                "actividades": {
                  "0710": "Extracción de minerales de hierro."
                }
              },
              "072": {
                "titulo": "Extracción de minerales metalíferos no ferrosos.",
                "actividades": {
                  "0721": "Extracción de minerales de uranio y de torio.",
                  "0722": "Extracción de oro y otros metales preciosos.",
                  "0723": "Extracción de minerales de níquel.",
                  "0729": "Extracción de otros minerales metalíferos no ferrosos n.c.p."
                }
              }
            }
          },
          "08": {
            "titulo": "Extracción de otras minas y canteras.",
            "subdivisiones": {
              "081": {
                "titulo": "Extracción de piedra, arena, arcillas, cal, yeso, caolín, bentonitas y similares.",
                "actividades": {
                  "0811": "Extracción de piedra, arena, arcillas comunes, yeso y anhidrita.",
                  "0812": "Extracción de arcillas de uso industrial, caliza, caolín y bentonitas."
                }
              },
              "082": {
                "titulo": "Extracción de esmeraldas, piedras preciosas y semipreciosas.",
                "actividades": {
                  "0820": "Extracción de esmeraldas, piedras preciosas y semipreciosas."
                }
              },
              "089": {
                "titulo": "Extracción de otros minerales no metálicos n.c.p.",
                "actividades": {
                  "0891": "Extracción de minerales para la fabricación de abonos y productos químicos.",
                  "0892": "Extracción de halita (sal).",
                  "0899": "Extracción de otros minerales no metálicos n.c.p."
                }
              }
            }
          },
          "09": {
            "titulo": "Actividades de servicios de apoyo para la explotación de minas y canteras.",
            "subdivisiones": {
              "091": {
                "titulo": "Actividades de apoyo para la extracción de petróleo y de gas natural.",
                "actividades": {
                  "0910": "Actividades de apoyo para la extracción de petróleo y de gas natural."
                }
              },
              "099": {
                "titulo": "Actividades de apoyo para otras actividades de explotación de minas y canteras.",
                "actividades": {
                  "0990": "Actividades de apoyo para otras actividades de explotación de minas y canteras."
                }
              }
            }
          }
        }
      },
      "C": {
        "titulo": "Industrias Manufactureras",
        "divisiones": {
          "10": {
            "titulo": "Elaboración de productos alimenticios.",
            "subdivisiones": {
              "101": {
                "titulo": "Procesamiento y conservación de carne, pescado, crustáceos y moluscos.",
                "actividades": {
                  "1011": "Procesamiento y conservación de carne y productos cárnicos.",
                  "1012": "Procesamiento y conservación de pescados, crustáceos y moluscos."
                }
              },
              "102": {
                "titulo": "Procesamiento y conservación de frutas, legumbres, hortalizas y tubérculos.",
                "actividades": {
                  "1020": "Procesamiento y conservación de frutas, legumbres, hortalizas y tubérculos."
                }
              },
              "103": {
                "titulo": "Elaboración de aceites y grasas de origen vegetal y animal.",
                "actividades": {
                  "1030": "Elaboración de aceites y grasas de origen vegetal y animal."
                }
              },
              "104": {
                "titulo": "Elaboración de productos lácteos.",
                "actividades": {
                  "1040": "Elaboración de productos lácteos."
                }
              },
              "105": {
                "titulo": "Elaboración de productos de molinería, almidones y productos derivados del almidón.",
                "actividades": {
                  "1051": "Elaboración de productos de molinería.",
                  "1052": "Elaboración de almidones y productos derivados del almidón."
                }
              },
              "106": {
                "titulo": "Elaboración de productos de café.",
                "actividades": {
                  "1061": "Trilla de café.",
                  "1062": "Descafeinado, tostión y molienda del café.",
                  "1063": "Otros derivados del café."
                }
              },
              "107": {
                "titulo": "Elaboración de azúcar y panela.",
                "actividades": {
                  "1071": "Elaboración y refinación de azúcar.",
                  "1072": "Elaboración de panela."
                }
              },
              "108": {
                "titulo": "Elaboración de otros productos alimenticios.",
                "actividades": {
                  "1081": "Elaboración de productos de panadería.",
                  "1082": "Elaboración de cacao, chocolate y productos de confitería.",
                  "1083": "Elaboración de macarrones, fideos, alcuzcuz y productos farináceos similares.",
                  "1084": "Elaboración de comidas y platos preparados.",
                  "1089": "Elaboración de otros productos alimenticios n.c.p."
                }
              },
              "109": {
                "titulo": "Elaboración de alimentos preparados para animales.",
                "actividades": {
                  "1090": "Elaboración de alimentos preparados para animales."
                }
              }
            }
          },
          "11": {
            "titulo": "Elaboración de bebidas.",
            "subdivisiones": {
              "110": {
                "titulo": "Elaboración de bebidas.",
                "actividades": {
                  "1101": "Destilación, rectificación y mezcla de bebidas alcohólicas.",
                  "1102": "Elaboración de bebidas fermentadas no destiladas.",
                  "1103": "Producción de malta, elaboración de cervezas y otras bebidas malteadas.",
                  "1104": "Elaboración de bebidas no alcohólicas, producción de aguas minerales y de otras aguas embotelladas."
                }
              }
            }
          },
          "12": {
            "titulo": "Elaboración de productos de tabaco.",
            "subdivisiones": {
              "120": {
                "titulo": "Elaboración de productos de tabaco.",
                "actividades": {
                  "1200": "Elaboración de productos de tabaco."
                }
              }
            }
          },
          "13": {
            "titulo": "Fabricación de productos textiles.",
            "subdivisiones": {
              "131": {
                "titulo": "Preparación, hilatura, tejeduría y acabado de productos textiles.",
                "actividades": {
                  "1311": "Preparación e hilatura de fibras textiles.",
                  "1312": "Tejeduría de productos textiles.",
                  "1313": "Acabado de productos textiles."
                }
              },
              "139": {
                "titulo": "Fabricación de otros productos textiles.",
                "actividades": {
                  "1391": "Fabricación de tejidos de punto y ganchillo.",
                  "1392": "Confección de artículos con materiales textiles, excepto prendas de vestir.",
                  "1393": "Fabricación de tapetes y alfombras para pisos.",
                  "1394": "Fabricación de cuerdas, cordeles, cables, bramantes y redes.",
                  "1399": "Fabricación de otros artículos textiles n.c.p."
                }
              }
            }
          },
          "14": {
            "titulo": "Confección de prendas de vestir.",
            "subdivisiones": {
              "141": {
                "titulo": "Confección de prendas de vestir, excepto prendas de piel.",
                "actividades": {
                  "1410": "Confección de prendas de vestir, excepto prendas de piel."
                }
              },
              "142": {
                "titulo": "Fabricación de artículos de piel.",
                "actividades": {
                  "1420": "Fabricación de artículos de piel."
                }
              },
              "143": {
                "titulo": "Fabricación de artículos de punto y ganchillo.",
                "actividades": {
                  "1430": "Fabricación de artículos de punto y ganchillo."
                }
              }
            }
          },
          "15": {
            "titulo": "Curtido y recurtido de cueros; fabricación de calzado; fabricación de artículos de viaje, maletas, bolsos de mano y artículos similares, y fabricación de artículos de talabartería y guarnicionería; adobo y teñido de pieles.",
            "subdivisiones": {
              "151": {
                "titulo": "Curtido y recurtido de cueros; fabricación de artículos de viaje, bolsos de mano y artículos similares, y fabricación de artículos de talabartería y guarnicionería, adobo y teñido de pieles.",
                "actividades": {
                  "1511": "Curtido y recurtido de cueros; recurtido y teñido de pieles.",
                  "1512": "Fabricación de artículos de viaje, bolsos de mano y artículos similares elaborados en cuero, y fabricación de artículos de talabartería y guarnicionería.",
                  "1513": "Fabricación de artículos de viaje, bolsos de mano y artículos similares; artículos de talabartería y guarnicionería elaborados en otros materiales."
                }
              },
              "152": {
                "titulo": "Fabricación de calzado.",
                "actividades": {
                  "1521": "Fabricación de calzado de cuero y piel, con cualquier tipo de suela.",
                  "1522": "Fabricación de otros tipos de calzado, excepto calzado de cuero y piel.",
                  "1523": "Fabricación de partes del calzado."
                }
              }
            }
          },
          "16": {
            "titulo": "Transformación de la madera y fabricación de productos de madera y de corcho, excepto muebles; fabricación de artículos de cestería y espartería.",
            "subdivisiones": {
              "161": {
                "titulo": "Aserrado, acepillado e impregnación de la madera.",
                "actividades": {
                  "1610": "Aserrado, acepillado e impregnación de la madera."
                }
              },
              "162": {
                "titulo": "Fabricación de hojas de madera para enchapado; fabricación de tableros contrachapados, tableros laminados, tableros de partículas y otros tableros y paneles.",
                "actividades": {
                  "1620": "Fabricación de hojas de madera para enchapado; fabricación de tableros contra­chapados, tableros laminados, tableros de partículas y otros tableros y paneles."
                }
              },
              "163": {
                "titulo": "Fabricación de partes y piezas de madera, de carpintería y ebanistería para la construcción.",
                "actividades": {
                  "1630": "Fabricación de partes y piezas de madera, de carpintería y ebanistería para la construcción."
                }
              },
              "164": {
                "titulo": "Fabricación de recipientes de madera.",
                "actividades": {
                  "1640": "Fabricación de recipientes de madera."
                }
              },
              "169": {
                "titulo": "Fabricación de otros productos de madera; fabricación de artículos de corcho, cestería y espartería.",
                "actividades": {
                  "1690": "Fabricación de otros productos de madera; fabricación de artículos de corcho, cestería y espartería."
                }
              }
            }
          },
          "17": {
            "titulo": "Fabricación de papel, cartón y productos de papel y cartón.",
            "subdivisiones": {
              "170": {
                "titulo": "Fabricación de papel, cartón y productos de papel y cartón.",
                "actividades": {
                  "1701": "Fabricación de pulpas (pastas) celulósicas; papel y cartón.",
                  "1702": "Fabricación de papel y cartón ondulado (corrugado); fabricación de envases, empaques y de embalajes de papel y cartón.",
                  "1709": "Fabricación de otros artículos de papel y cartón."
                }
              }
            }
          },
          "18": {
            "titulo": "Actividades de impresión y de producción de copias a partir de gra­baciones originales.",
            "subdivisiones": {
              "181": {
                "titulo": "Actividades de impresión y actividades de servicios relacionados con la impresión.",
                "actividades": {
                  "1811": "Actividades de impresión.",
                  "1812": "Actividades de servicios relacionados con la impresión."
                }
              },
              "182": {
                "titulo": "Producción de copias a partir de grabaciones originales.",
                "actividades": {
                  "1820": "Producción de copias a partir de grabaciones originales."
                }
              }
            }
          },
          "19": {
            "titulo": "Coquización, fabricación de productos de la refinación del petróleo y actividad de mezcla de combustibles.",
            "subdivisiones": {
              "191": {
                "titulo": "Fabricación de productos de hornos de coque.",
                "actividades": {
                  "1910": "Fabricación de productos de hornos de coque."
                }
              },
              "192": {
                "titulo": "Fabricación de productos de la refinación del petróleo.",
                "actividades": {
                  "1921": "Fabricación de productos de la refinación del petróleo.",
                  "1922": "Actividad de mezcla de combustibles."
                }
              }
            }
          },
          "20": {
            "titulo": "Fabricación de sustancias y productos químicos.",
            "subdivisiones": {
              "201": {
                "titulo": "Fabricación de sustancias químicas básicas, abonos y compuestos inorgánicos nitrogenados, plásticos y caucho sintético en formas primarias.",
                "actividades": {
                  "2011": "Fabricación de sustancias y productos químicos básicos.",
                  "2012": "Fabricación de abonos y compuestos inorgánicos nitrogenados.",
                  "2013": "Fabricación de plásticos en formas primarias.",
                  "2014": "Fabricación de caucho sintético en formas primarias."
                }
              },
              "202": {
                "titulo": "Fabricación de otros productos químicos.",
                "actividades": {
                  "2021": "Fabricación de plaguicidas y otros productos químicos de uso agropecuario.",
                  "2022": "Fabricación de pinturas, barnices y revestimientos similares, tintas para impresión y masillas.",
                  "2023": "Fabricación de jabones y detergentes, preparados para limpiar y pulir; perfumes y preparados de tocador.",
                  "2029": "Fabricación de otros productos químicos n.c.p."
                }
              },
              "203": {
                "titulo": "Fabricación de fibras sintéticas y artificiales.",
                "actividades": {
                  "2030": "Fabricación de fibras sintéticas y artificiales."
                }
              }
            }
          },
          "21": {
            "titulo": "Fabricación de productos farmacéuticos, sustancias químicas medi­cinales y productos botánicos de uso farmacéutico.",
            "subdivisiones": {
              "210": {
                "titulo": "Fabricación de productos farmacéuticos, sustancias químicas medicinales y productos botánicos de uso farmacéutico.",
                "actividades": {
                  "2100": "Fabricación de productos farmacéuticos, sustancias químicas medicinales y pro­ductos botánicos de uso farmacéutico."
                }
              }
            }
          },
          "22": {
            "titulo": "Fabricación de productos de caucho y de plástico.",
            "subdivisiones": {
              "221": {
                "titulo": "Fabricación de productos de caucho.",
                "actividades": {
                  "2211": "Fabricación de llantas y neumáticos de caucho",
                  "2212": "Reencauche de llantas usadas",
                  "2219": "Fabricación de formas básicas de caucho y otros productos de caucho n.c.p."
                }
              },
              "222": {
                "titulo": "Fabricación de productos de plástico.",
                "actividades": {
                  "2221": "Fabricación de formas básicas de plástico.",
                  "2229": "Fabricación de artículos de plástico n.c.p."
                }
              }
            }
          },
          "23": {
            "titulo": "Fabricación de otros productos minerales no metálicos.",
            "subdivisiones": {
              "231": {
                "titulo": "Fabricación de vidrio y productos de vidrio.",
                "actividades": {
                  "2310": "Fabricación de vidrio y productos de vidrio."
                }
              },
              "239": {
                "titulo": "Fabricación de productos minerales no metálicos n.c.p.",
                "actividades": {
                  "2391": "Fabricación de productos refractarios.",
                  "2392": "Fabricación de materiales de arcilla para la construcción.",
                  "2393": "Fabricación de otros productos de cerámica y porcelana.",
                  "2394": "Fabricación de cemento, cal y yeso.",
                  "2395": "Fabricación de artículos de hormigón, cemento y yeso.",
                  "2396": "Corte, tallado y acabado de la piedra.",
                  "2399": "Fabricación de otros productos minerales no metálicos n.c.p."
                }
              }
            }
          },
          "24": {
            "titulo": "Fabricación de productos metalúrgicos básicos.",
            "subdivisiones": {
              "241": {
                "titulo": "Industrias básicas de hierro y de acero.",
                "actividades": {
                  "2410": "Industrias básicas de hierro y de acero."
                }
              },
              "242": {
                "titulo": "Industrias básicas de metales preciosos y de metales no ferrosos.",
                "actividades": {
                  "2421": "Industrias básicas de metales preciosos.",
                  "2429": "Industrias básicas de otros metales no ferrosos."
                }
              },
              "243": {
                "titulo": "Fundición de metales.",
                "actividades": {
                  "2431": "Fundición de hierro y de acero.",
                  "2432": "Fundición de metales no ferrosos."
                }
              }
            }
          },
          "25": {
            "titulo": "Fabricación de productos elaborados de metal, excepto maquinaria y equipo.",
            "subdivisiones": {
              "251": {
                "titulo": "Fabricación de productos metálicos para uso estructural, tanques, depósitos y generadores de vapor.",
                "actividades": {
                  "2511": "Fabricación de productos metálicos para uso estructural.",
                  "2512": "Fabricación de tanques, depósitos y recipientes de metal, excepto los utilizados para el envase o transporte de mercancías.",
                  "2513": "Fabricación de generadores de vapor, excepto calderas de agua caliente para calefacción central."
                }
              },
              "252": {
                "titulo": "Fabricación de armas y municiones.",
                "actividades": {
                  "2520": "Fabricación de armas y municiones."
                }
              },
              "259": {
                "titulo": "Fabricación de otros productos elaborados de metal y actividades de servicios relacionadas con el trabajo de metales.",
                "actividades": {
                  "2591": "Forja, prensado, estampado y laminado de metal; pulvimetalurgia.",
                  "2592": "Tratamiento y revestimiento de metales; mecanizado.",
                  "2593": "Fabricación de artículos de cuchillería, herramientas de mano y artículos de ferretería.",
                  "2599": "Fabricación de otros productos elaborados de metal n.c.p."
                }
              }
            }
          },
          "26": {
            "titulo": "Fabricación de productos informáticos, electrónicos y ópticos.",
            "subdivisiones": {
              "261": {
                "titulo": "Fabricación de componentes y tableros electrónicos.",
                "actividades": {
                  "2610": "Fabricación de componentes y tableros electrónicos."
                }
              },
              "262": {
                "titulo": "Fabricación de computadoras y de equipo periférico.",
                "actividades": {
                  "2620": "Fabricación de computadoras y de equipo periférico."
                }
              },
              "263": {
                "titulo": "Fabricación de equipos de comunicación.",
                "actividades": {
                  "2630": "Fabricación de equipos de comunicación."
                }
              },
              "264": {
                "titulo": "Fabricación de aparatos electrónicos de consumo.",
                "actividades": {
                  "2640": "Fabricación de aparatos electrónicos de consumo."
                }
              },
              "265": {
                "titulo": "Fabricación de equipo de medición, prueba, navegación y control; fabricación de relojes.",
                "actividades": {
                  "2651": "Fabricación de equipo de medición, prueba, navegación y control.",
                  "2652": "Fabricación de relojes."
                }
              },
              "266": {
                "titulo": "Fabricación de equipo de irradiación y equipo electrónico de uso médico y terapéutico.",
                "actividades": {
                  "2660": "Fabricación de equipo de irradiación y equipo electrónico de uso médico y tera­péutico."
                }
              },
              "267": {
                "titulo": "Fabricación de instrumentos ópticos y equipo fotográfico.",
                "actividades": {
                  "2670": "Fabricación de instrumentos ópticos y equipo fotográfico."
                }
              },
              "268": {
                "titulo": "Fabricación de medios magnéticos y ópticos para almacenamiento de datos.",
                "actividades": {
                  "2680": "Fabricación de medios magnéticos y ópticos para almacenamiento de datos."
                }
              }
            }
          },
          "27": {
            "titulo": "Fabricación de aparatos y equipo eléctrico.",
            "subdivisiones": {
              "271": {
                "titulo": "Fabricación de motores, generadores y transformadores eléctricos y de aparatos de distribución y control de la energía eléctrica.",
                "actividades": {
                  "2711": "Fabricación de motores, generadores y transformadores eléctricos.",
                  "2712": "Fabricación de aparatos de distribución y control de la energía eléctrica."
                }
              },
              "272": {
                "titulo": "Fabricación de pilas, baterías y acumuladores eléctricos.",
                "actividades": {
                  "2720": "Fabricación de pilas, baterías y acumuladores eléctricos."
                }
              },
              "273": {
                "titulo": "Fabricación de hilos y cables aislados y sus dispositivos.",
                "actividades": {
                  "2731": "Fabricación de hilos y cables eléctricos y de fibra óptica.",
                  "2732": "Fabricación de dispositivos de cableado."
                }
              },
              "274": {
                "titulo": "Fabricación de equipos eléctricos de iluminación.",
                "actividades": {
                  "2740": "Fabricación de equipos eléctricos de iluminación."
                }
              },
              "275": {
                "titulo": "Fabricación de aparatos de uso doméstico.",
                "actividades": {
                  "2750": "Fabricación de aparatos de uso doméstico."
                }
              },
              "279": {
                "titulo": "Fabricación de otros tipos de equipo eléctrico n.c.p.",
                "actividades": {
                  "2790": "Fabricación de otros tipos de equipo eléctrico n.c.p."
                }
              }
            }
          },
          "28": {
            "titulo": "Fabricación de maquinaria y equipo n.c.p.",
            "subdivisiones": {
              "281": {
                "titulo": "Fabricación de maquinaria y equipo de uso general.",
                "actividades": {
                  "2811": "Fabricación de motores, turbinas, y partes para motores de combustión interna.",
                  "2812": "Fabricación de equipos de potencia hidráulica y neumática.",
                  "2813": "Fabricación de otras bombas, compresores, grifos y válvulas.",
                  "2814": "Fabricación de cojinetes, engranajes, trenes de engranajes y piezas de transmisión.",
                  "2815": "Fabricación de hornos, hogares y quemadores industriales.",
                  "2816": "Fabricación de equipo de elevación y manipulación.",
                  "2817": "Fabricación de maquinaria y equipo de oficina (excepto computadoras y equipo periférico).",
                  "2818": "Fabricación de herramientas manuales con motor.",
                  "2819": "Fabricación de otros tipos de maquinaria y equipo de uso general n.c.p."
                }
              },
              "282": {
                "titulo": "Fabricación de maquinaria y equipo de uso especial.",
                "actividades": {
                  "2821": "Fabricación de maquinaria agropecuaria y forestal.",
                  "2822": "Fabricación de máquinas formadoras de metal y de máquinas herramienta.",
                  "2823": "Fabricación de maquinaria para la metalurgia.",
                  "2824": "Fabricación de maquinaria para explotación de minas y canteras y para obras de construcción.",
                  "2825": "Fabricación de maquinaria para la elaboración de alimentos, bebidas y tabaco.",
                  "2826": "Fabricación de maquinaria para la elaboración de productos textiles, prendas de vestir y cueros.",
                  "2829": "Fabricación de otros tipos de maquinaria y equipo de uso especial n.c.p."
                }
              }
            }
          },
          "29": {
            "titulo": "Fabricación de vehículos automotores, remolques y semirremolques.",
            "subdivisiones": {
              "291": {
                "titulo": "Fabricación de vehículos automotores y sus motores.",
                "actividades": {
                  "2910": "Fabricación de vehículos automotores y sus motores."
                }
              },
              "292": {
                "titulo": "Fabricación de carrocerías para vehículos automotores; fabricación de remol­ques y semirremolques.",
                "actividades": {
                  "2920": "Fabricación de carrocerías para vehículos automotores; fabricación de remolques y semirremolques."
                }
              },
              "293": {
                "titulo": "Fabricación de partes, piezas (autopartes) y accesorios (lujos) para vehículos automotores.",
                "actividades": {
                  "2930": "Fabricación de partes, piezas (autopartes) y accesorios (lujos) para vehículos automotores."
                }
              }
            }
          },
          "30": {
            "titulo": "Fabricación de otros tipos de equipo de transporte.",
            "subdivisiones": {
              "301": {
                "titulo": "Construcción de barcos y otras embarcaciones.",
                "actividades": {
                  "3011": "Construcción de barcos y de estructuras flotantes.",
                  "3012": "Construcción de embarcaciones de recreo y deporte."
                }
              },
              "302": {
                "titulo": "Fabricación de locomotoras y de material rodante para ferrocarriles.",
                "actividades": {
                  "3020": "Fabricación de locomotoras y de material rodante para ferrocarriles."
                }
              },
              "303": {
                "titulo": "Fabricación de aeronaves, naves espaciales y de maquinaria conexa.",
                "actividades": {
                  "3030": "Fabricación de aeronaves, naves espaciales y de maquinaria conexa."
                }
              },
              "304": {
                "titulo": "Fabricación de vehículos militares de combate.",
                "actividades": {
                  "3040": "Fabricación de vehículos militares de combate."
                }
              },
              "309": {
                "titulo": "Fabricación de otros tipos de equipo de transporte n.c.p.",
                "actividades": {
                  "3091": "Fabricación de motocicletas.",
                  "3092": "Fabricación de bicicletas y de sillas de ruedas para personas con discapacidad.",
                  "3099": "Fabricación de otros tipos de equipo de transporte n.c.p."
                }
              }
            }
          },
          "31": {
            "titulo": "Fabricación de muebles, colchones y somieres.",
            "subdivisiones": {
              "311": {
                "titulo": "Fabricación de muebles.",
                "actividades": {
                  "3110": "Fabricación de muebles."
                }
              },
              "312": {
                "titulo": "Fabricación de colchones y somieres.",
                "actividades": {
                  "3120": "Fabricación de colchones y somieres."
                }
              }
            }
          },
          "32": {
            "titulo": "Otras industrias manufactureras.",
            "subdivisiones": {
              "321": {
                "titulo": "Fabricación de joyas, bisutería y artículos conexos.",
                "actividades": {
                  "3210": "Fabricación de joyas, bisutería y artículos conexos."
                }
              },
              "322": {
                "titulo": "Fabricación de instrumentos musicales.",
                "actividades": {
                  "3220": "Fabricación de instrumentos musicales."
                }
              },
              "323": {
                "titulo": "Fabricación de artículos y equipo para la práctica del deporte.",
                "actividades": {
                  "3230": "Fabricación de artículos y equipo para la práctica del deporte."
                }
              },
              "324": {
                "titulo": "Fabricación de juegos, juguetes y rompecabezas.",
                "actividades": {
                  "3240": "Fabricación de juegos, juguetes y rompecabezas."
                }
              },
              "325": {
                "titulo": "Fabricación de instrumentos, aparatos y materiales médicos y odontológicos (incluido mobiliario).",
                "actividades": {
                  "3250": "Fabricación de instrumentos, aparatos y materiales médicos y odontológicos (incluido mobiliario)."
                }
              },
              "329": {
                "titulo": "Otras industrias manufactureras n.c.p.",
                "actividades": {
                  "3290": "Otras industrias manufactureras n.c.p."
                }
              }
            }
          },
          "33": {
            "titulo": "Instalación, mantenimiento y reparación especializada de maquinaria y equipo.",
            "subdivisiones": {
              "331": {
                "titulo": "Mantenimiento y reparación especializado de productos elaborados en metal y de maquinaria y equipo.",
                "actividades": {
                  "3311": "Mantenimiento y reparación especializado de productos elaborados en metal.",
                  "3312": "Mantenimiento y reparación especializado de maquinaria y equipo.",
                  "3313": "Mantenimiento y reparación especializado de equipo electrónico y óptico.",
                  "3314": "Mantenimiento y reparación especializado de equipo eléctrico.",
                  "3315": "Mantenimiento y reparación especializado de equipo de transporte, excepto los vehículos automotores, motocicletas y bicicletas.",
                  "3319": "Mantenimiento y reparación de otros tipos de equipos y sus componentes n.c.p."
                }
              },
              "332": {
                "titulo": "Instalación especializada de maquinaria y equipo industrial.",
                "actividades": {
                  "3320": "Instalación especializada de maquinaria y equipo industrial."
                }
              }
            }
          }
        }
      },
      "D": {
        "titulo": "Suministro de Electricidad, Gas, Vapor y Aire acondicionado",
        "divisiones": {
          "35": {
            "titulo": "Suministro de electricidad, gas, vapor y aire acondicionado.",
            "subdivisiones": {
              "351": {
                "titulo": "Generación, transmisión, distribución y comercialización de energía eléctrica.",
                "actividades": {
                  "3511": "Generación de energía eléctrica.",
                  "3512": "Transmisión de energía eléctrica.",
                  "3513": "Distribución de energía eléctrica.",
                  "3514": "Comercialización de energía eléctrica."
                }
              },
              "352": {
                "titulo": "Producción de gas; distribución de combustibles gaseosos por tuberías.",
                "actividades": {
                  "3520": "Producción de gas; distribución de combustibles gaseosos por tuberías."
                }
              },
              "353": {
                "titulo": "Suministro de vapor y aire acondicionado.",
                "actividades": {
                  "3530": "Suministro de vapor y aire acondicionado."
                }
              }
            }
          }
        }
      },
      "E": {
        "titulo": "Distribución de Agua; Evacuación y Tratamiento de Aguas Residuales, Gestión de Desechos y Actividades de Saneamiento Ambiental",
        "divisiones": {
          "36": {
            "titulo": "Captación, tratamiento y distribución de agua.",
            "subdivisiones": {
              "360": {
                "titulo": "Captación, tratamiento y distribución de agua.",
                "actividades": {
                  "3600": "Captación, tratamiento y distribución de agua."
                }
              }
            }
          },
          "37": {
            "titulo": "Evacuación y tratamiento de aguas residuales.",
            "subdivisiones": {
              "370": {
                "titulo": "Evacuación y tratamiento de aguas residuales.",
                "actividades": {
                  "3700": "Evacuación y tratamiento de aguas residuales."
                }
              }
            }
          },
          "38": {
            "titulo": "Recolección, tratamiento y disposición de desechos, recuperación de materiales.",
            "subdivisiones": {
              "381": {
                "titulo": "Recolección de desechos.",
                "actividades": {
                  "3811": "Recolección de desechos no peligrosos.",
                  "3812": "Recolección de desechos peligrosos."
                }
              },
              "382": {
                "titulo": "Tratamiento y disposición de desechos.",
                "actividades": {
                  "3821": "Tratamiento y disposición de desechos no peligrosos.",
                  "3822": "Tratamiento y disposición de desechos peligrosos."
                }
              },
              "383": {
                "titulo": "Recuperación de materiales.",
                "actividades": {
                  "3830": "Recuperación de materiales."
                }
              }
            }
          },
          "39": {
            "titulo": "Actividades de saneamiento ambiental y otros servicios de gestión de desechos.",
            "subdivisiones": {
              "390": {
                "titulo": "Actividades de saneamiento ambiental y otros servicios de gestión de desechos.",
                "actividades": {
                  "3900": "Actividades de saneamiento ambiental y otros servicios de gestión de desechos."
                }
              }
            }
          }
        }
      },
      "F": {
        "titulo": "Construcción",
        "divisiones": {
          "41": {
            "titulo": "Construcción de edificios.",
            "subdivisiones": {
              "411": {
                "titulo": "Construcción de edificios.",
                "actividades": {
                  "4111": "Construcción de edificios residenciales.",
                  "4112": "Construcción de edificios no residenciales."
                }
              }
            }
          },
          "42": {
            "titulo": "Obras de ingeniería civil.",
            "subdivisiones": {
              "421": {
                "titulo": "Construcción de carreteras y vías de ferrocarril.",
                "actividades": {
                  "4210": "Construcción de carreteras y vías de ferrocarril."
                }
              },
              "422": {
                "titulo": "Construcción de proyectos de servicio público.",
                "actividades": {
                  "4220": "Construcción de proyectos de servicio público."
                }
              },
              "429": {
                "titulo": "Construcción de otras obras de ingeniería civil.",
                "actividades": {
                  "4290": "Construcción de otras obras de ingeniería civil."
                }
              }
            }
          },
          "43": {
            "titulo": "Actividades especializadas para la construcción de edificios y obras de ingeniería civil.",
            "subdivisiones": {
              "431": {
                "titulo": "Demolición y preparación del terreno.",
                "actividades": {
                  "4311": "Demolición.",
                  "4312": "Preparación del terreno."
                }
              },
              "432": {
                "titulo": "Instalaciones eléctricas, de fontanería y otras instalaciones especializadas.",
                "actividades": {
                  "4321": "Instalaciones eléctricas.",
                  "4322": "Instalaciones de fontanería, calefacción y aire acondicionado.",
                  "4329": "Otras instalaciones especializadas."
                }
              },
              "433": {
                "titulo": "Terminación y acabado de edificios y obras de ingeniería civil.",
                "actividades": {
                  "4330": "Terminación y acabado de edificios y obras de ingeniería civil."
                }
              },
              "439": {
                "titulo": "Otras actividades especializadas para la construcción de edificios y obras de ingeniería civil.",
                "actividades": {
                  "4390": "Otras actividades especializadas para la construcción de edificios y obras de ingeniería civil."
                }
              }
            }
          }
        }
      },
      "G": {
        "titulo": "Comercio al por mayor y al por menor; Reparación de vehículos Automotores y Motocicletas",
        "divisiones": {
          "45": {
            "titulo": "Comercio, mantenimiento y reparación de vehículos automotores y motocicletas, sus partes, piezas y accesorios.",
            "subdivisiones": {
              "451": {
                "titulo": "Comercio de vehículos automotores.",
                "actividades": {
                  "4511": "Comercio de vehículos automotores nuevos.",
                  "4512": "Comercio de vehículos automotores usados."
                }
              },
              "452": {
                "titulo": "Mantenimiento y reparación de vehículos automotores.",
                "actividades": {
                  "4520": "Mantenimiento y reparación de vehículos automotores."
                }
              },
              "453": {
                "titulo": "Comercio de partes, piezas (autopartes) y accesorios (lujos) para vehículos automotores.",
                "actividades": {
                  "4530": "Comercio de partes, piezas (autopartes) y accesorios (lujos) para vehículos automotores."
                }
              },
              "454": {
                "titulo": "Comercio, mantenimiento y reparación de motocicletas y de sus partes, piezas y accesorios.",
                "actividades": {
                  "46": "Comercio al por mayor y en comisión o por contrata, excepto el comercio de vehículos automotores y motocicletas.",
                  "4541": "Comercio de motocicletas y de sus partes, piezas y accesorios.",
                  "4542": "Mantenimiento y reparación de motocicletas y de sus partes y piezas."
                }
              },
              "461": {
                "titulo": "Comercio al por mayor a cambio de una retribución o por contrata.",
                "actividades": {
                  "4610": "Comercio al por mayor a cambio de una retribución o por contrata."
                }
              },
              "462": {
                "titulo": "Comercio al por mayor de materias primas agropecuarias; animales vivos.",
                "actividades": {
                  "4620": "Comercio al por mayor de materias primas agropecuarias; animales vivos."
                }
              },
              "463": {
                "titulo": "Comercio al por mayor de alimentos, bebidas y tabaco.",
                "actividades": {
                  "4631": "Comercio al por mayor de productos alimenticios.",
                  "4632": "Comercio al por mayor de bebidas y tabaco."
                }
              },
              "464": {
                "titulo": "Comercio al por mayor de artículos y enseres domésticos (incluidas prendas de vestir).",
                "actividades": {
                  "4641": "Comercio al por mayor de productos textiles, productos confeccionados para uso doméstico.",
                  "4642": "Comercio al por mayor de prendas de vestir.",
                  "4643": "Comercio al por mayor de calzado.",
                  "4644": "Comercio al por mayor de aparatos y equipo de uso doméstico.",
                  "4645": "Comercio al por mayor de productos farmacéuticos, medicinales, cosméticos y de tocador.",
                  "4649": "Comercio al por mayor de otros utensilios domésticos n.c.p."
                }
              },
              "465": {
                "titulo": "Comercio al por mayor de maquinaria y equipo.",
                "actividades": {
                  "4651": "Comercio al por mayor de computadores, equipo periférico y programas de informática.",
                  "4652": "Comercio al por mayor de equipo, partes y piezas electrónicos y de telecomuni­caciones.",
                  "4653": "Comercio al por mayor de maquinaria y equipo agropecuarios.",
                  "4659": "Comercio al por mayor de otros tipos de maquinaria y equipo n.c.p."
                }
              },
              "466": {
                "titulo": "Comercio al por mayor especializado de otros productos.",
                "actividades": {
                  "4661": "Comercio al por mayor de combustibles sólidos, líquidos, gaseosos y productos conexos.",
                  "4662": "Comercio al por mayor de metales y productos metalíferos.",
                  "4663": "Comercio al por mayor de materiales de construcción, artículos de ferretería, pinturas, productos de vidrio, equipo y materiales de fontanería y calefacción.",
                  "4664": "Comercio al por mayor de productos químicos básicos, cauchos y plásticos en formas primarias y productos químicos de uso agropecuario.",
                  "4665": "Comercio al por mayor de desperdicios, desechos y chatarra.",
                  "4669": "Comercio al por mayor de otros productos n.c.p."
                }
              },
              "469": {
                "titulo": "Comercio al por mayor no especializado.",
                "actividades": {
                  "4690": "Comercio al por mayor no especializado."
                }
              }
            }
          },
          "47": {
            "titulo": "Comercio al por menor (incluso el comercio al por menor de combus­tibles), excepto el de vehículos automotores y motocicletas.",
            "subdivisiones": {
              "471": {
                "titulo": "Comercio al por menor en establecimientos no especializados.",
                "actividades": {
                  "4711": "Comercio al por menor en establecimientos no especializados con surtido com­puesto principalmente por alimentos, bebidas o tabaco.",
                  "4719": "Comercio al por menor en establecimientos no especializados, con surtido compuesto principalmente por productos diferentes de alimentos (víveres en general), bebidas y tabaco."
                }
              },
              "472": {
                "titulo": "Comercio al por menor de alimentos (víveres en general), bebidas y tabaco, en establecimientos especializados.",
                "actividades": {
                  "4721": "Comercio al por menor de productos agrícolas para el consumo en establecimientos especializados.",
                  "4722": "Comercio al por menor de leche, productos lácteos y huevos, en establecimientos especializados.",
                  "4723": "Comercio al por menor de carnes (incluye aves de corral), productos cárnicos, pescados y productos de mar, en establecimientos especializados.",
                  "4724": "Comercio al por menor de bebidas y productos del tabaco, en establecimientos especializados.",
                  "4729": "Comercio al por menor de otros productos alimenticios n.c.p., en establecimientos especializados."
                }
              },
              "473": {
                "titulo": "Comercio al por menor de combustible, lubricantes, aditivos y productos de limpieza para automotores, en establecimientos especializados.",
                "actividades": {
                  "4731": "Comercio al por menor de combustible para automotores.",
                  "4732": "Comercio al por menor de lubricantes (aceites, grasas), aditivos y productos de limpieza para vehículos automotores."
                }
              },
              "474": {
                "titulo": "Comercio al por menor de equipos de informática y de comunicaciones, en establecimientos especializados.",
                "actividades": {
                  "4741": "Comercio al por menor de computadores, equipos periféricos, programas de informática y equipos de telecomunicaciones en establecimientos especializados.",
                  "4742": "Comercio al por menor de equipos y aparatos de sonido y de video, en establecimientos especializados."
                }
              },
              "475": {
                "titulo": "Comercio al por menor de otros enseres domésticos en establecimientos especializados.",
                "actividades": {
                  "4751": "Comercio al por menor de productos textiles en establecimientos especializados.",
                  "4752": "Comercio al por menor de artículos de ferretería, pinturas y productos de vidrio en establecimientos especializados.",
                  "4753": "Comercio al por menor de tapices, alfombras y cubrimientos para paredes y pisos en establecimientos especializados.",
                  "4754": "Comercio al por menor de electrodomésticos y gasodomésticos de uso doméstico, muebles y equipos de iluminación.",
                  "4755": "Comercio al por menor de artículos y utensilios de uso doméstico.",
                  "4759": "Comercio al por menor de otros artículos domésticos en establecimientos especializados."
                }
              },
              "476": {
                "titulo": "Comercio al por menor de artículos culturales y de entretenimiento, en establecimientos especializados.",
                "actividades": {
                  "4761": "Comercio al por menor de libros, periódicos, materiales y artículos de papelería y escritorio, en establecimientos especializados.",
                  "4762": "Comercio al por menor de artículos deportivos, en establecimientos especializados.",
                  "4769": "Comercio al por menor de otros artículos culturales y de entretenimiento n.c.p. en establecimientos especializados."
                }
              },
              "477": {
                "titulo": "Comercio al por menor de otros productos en establecimientos especializados.",
                "actividades": {
                  "4771": "Comercio al por menor de prendas de vestir y sus accesorios (incluye artículos de piel) en establecimientos especializados.",
                  "4772": "Comercio al por menor de todo tipo de calzado y artículos de cuero y sucedáneos del cuero en establecimientos especializados.",
                  "4773": "Comercio al por menor de productos farmacéuticos y medicinales, cosméticos y artículos de tocador en establecimientos especializados.",
                  "4774": "Comercio al por menor de otros productos nuevos en establecimientos especializados.",
                  "4775": "Comercio al por menor de artículos de segunda mano."
                }
              },
              "478": {
                "titulo": "Comercio al por menor en puestos de venta móviles.",
                "actividades": {
                  "4781": "Comercio al por menor de alimentos, bebidas y tabaco, en puestos de venta móviles.",
                  "4782": "Comercio al por menor de productos textiles, prendas de vestir y calzado, en puestos de venta móviles.",
                  "4789": "Comercio al por menor de otros productos en puestos de venta móviles."
                }
              },
              "479": {
                "titulo": "Comercio al por menor no realizado en establecimientos, puestos de venta o mercados.",
                "actividades": {
                  "4791": "Comercio al por menor realizado a través de internet.",
                  "4792": "Comercio al por menor realizado a través de casas de venta o por correo.",
                  "4799": "Otros tipos de comercio al por menor no realizado en establecimientos, puestos de venta o mercados."
                }
              }
            }
          }
        }
      },
      "H": {
        "titulo": "Transporte y Almacenamiento",
        "divisiones": {
          "49": {
            "titulo": "Transporte terrestre; transporte por tuberías.",
            "subdivisiones": {
              "491": {
                "titulo": "Transporte férreo.",
                "actividades": {
                  "4911": "Transporte férreo de pasajeros.",
                  "4912": "Transporte férreo de carga."
                }
              },
              "492": {
                "titulo": "Transporte terrestre público automotor.",
                "actividades": {
                  "4921": "Transporte de pasajeros.",
                  "4922": "Transporte mixto.",
                  "4923": "Transporte de carga por carretera."
                }
              },
              "493": {
                "titulo": "Transporte por tuberías.",
                "actividades": {
                  "4930": "Transporte por tuberías."
                }
              }
            }
          },
          "50": {
            "titulo": "Transporte acuático.",
            "subdivisiones": {
              "501": {
                "titulo": "Transporte marítimo y de cabotaje.",
                "actividades": {
                  "5011": "Transporte de pasajeros marítimo y de cabotaje.",
                  "5012": "Transporte de carga marítimo y de cabotaje."
                }
              },
              "502": {
                "titulo": "Transporte fluvial.",
                "actividades": {
                  "5021": "Transporte fluvial de pasajeros.",
                  "5022": "Transporte fluvial de carga."
                }
              }
            }
          },
          "51": {
            "titulo": "Transporte aéreo.",
            "subdivisiones": {
              "511": {
                "titulo": "Transporte aéreo de pasajeros.",
                "actividades": {
                  "5111": "Transporte aéreo nacional de pasajeros.",
                  "5112": "Transporte aéreo internacional de pasajeros."
                }
              },
              "512": {
                "titulo": "Transporte aéreo de carga.",
                "actividades": {
                  "5121": "Transporte aéreo nacional de carga.",
                  "5122": "Transporte aéreo internacional de carga."
                }
              }
            }
          },
          "52": {
            "titulo": "Almacenamiento y actividades complementarias al transporte.",
            "subdivisiones": {
              "521": {
                "titulo": "Almacenamiento y depósito.",
                "actividades": {
                  "5210": "Almacenamiento y depósito."
                }
              },
              "522": {
                "titulo": "Actividades de las estaciones, vías y servicios complementarios para el transporte.",
                "actividades": {
                  "5221": "Actividades de estaciones, vías y servicios complementarios para el transporte terrestre.",
                  "5222": "Actividades de puertos y servicios complementarios para el transporte acuático.",
                  "5223": "Actividades de aeropuertos, servicios de navegación aérea y demás actividades conexas al transporte aéreo.",
                  "5224": "Manipulación de carga.",
                  "5229": "Otras actividades complementarias al transporte."
                }
              }
            }
          },
          "53": {
            "titulo": "Correo y servicios de mensajería.",
            "subdivisiones": {
              "531": {
                "titulo": "Actividades postales nacionales.",
                "actividades": {
                  "5310": "Actividades postales nacionales."
                }
              },
              "532": {
                "titulo": "Actividades de mensajería.",
                "actividades": {
                  "5320": "Actividades de mensajería."
                }
              }
            }
          }
        }
      },
      "I": {
        "titulo": "Alojamiento y servicios de comida.",
        "divisiones": {
          "55": {
            "titulo": "Alojamiento.",
            "subdivisiones": {
              "551": {
                "titulo": "Actividades de alojamiento de estancias cortas.",
                "actividades": {
                  "5511": "Alojamiento en hoteles.",
                  "5512": "Alojamiento en apartahoteles.",
                  "5513": "Alojamiento en centros vacacionales.",
                  "5514": "Alojamiento rural.",
                  "5519": "Otros tipos de alojamientos para visitantes."
                }
              },
              "552": {
                "titulo": "Actividades de zonas de camping y parques para vehículos recreacionales.",
                "actividades": {
                  "5520": "Actividades de zonas de camping y parques para vehículos recreacionales."
                }
              },
              "553": {
                "titulo": "Servicio por horas.",
                "actividades": {
                  "5530": "Servicio por horas"
                }
              },
              "559": {
                "titulo": "Otros tipos de alojamiento n.c.p.",
                "actividades": {
                  "5590": "Otros tipos de alojamiento n.c.p."
                }
              }
            }
          },
          "56": {
            "titulo": "Actividades de servicios de comidas y bebidas.",
            "subdivisiones": {
              "561": {
                "titulo": "Actividades de restaurantes, cafeterías y servicio móvil de comidas.",
                "actividades": {
                  "5611": "Expendio a la mesa de comidas preparadas.",
                  "5612": "Expendio por autoservicio de comidas preparadas.",
                  "5613": "Expendio de comidas preparadas en cafeterías.",
                  "5619": "Otros tipos de expendio de comidas preparadas n.c.p."
                }
              },
              "562": {
                "titulo": "Actividades de catering para eventos y otros servicios de comidas.",
                "actividades": {
                  "5621": "Catering para eventos.",
                  "5629": "Actividades de otros servicios de comidas."
                }
              },
              "563": {
                "titulo": "Expendio de bebidas alcohólicas para el consumo dentro del establecimiento.",
                "actividades": {
                  "5630": "Expendio de bebidas alcohólicas para el consumo dentro del establecimiento."
                }
              }
            }
          }
        }
      },
      "J": {
        "titulo": "Información Y Comunicaciones",
        "divisiones": {
          "58": {
            "titulo": "Actividades de edición.",
            "subdivisiones": {
              "581": {
                "titulo": "Edición de libros, publicaciones periódicas y otras actividades de edición.",
                "actividades": {
                  "5811": "Edición de libros.",
                  "5812": "Edición de directorios y listas de correo.",
                  "5813": "Edición de periódicos, revistas y otras publicaciones periódicas.",
                  "5819": "Otros trabajos de edición."
                }
              },
              "582": {
                "titulo": "Edición de programas de informática (software).",
                "actividades": {
                  "5820": "Edición de programas de informática (software)."
                }
              }
            }
          },
          "59": {
            "titulo": "Actividades cinematográficas, de video y producción de programas de televisión, grabación de sonido y edición de música.",
            "subdivisiones": {
              "591": {
                "titulo": "Actividades de producción de películas cinematográficas, video y producción de programas, anuncios y comerciales de televisión.",
                "actividades": {
                  "5911": "Actividades de producción de películas cinematográficas, videos, programas, anuncios y comerciales de televisión.",
                  "5912": "Actividades de posproducción de películas cinematográficas, videos, programas, anuncios y comerciales de televisión.",
                  "5913": "Actividades de distribución de películas cinematográficas, videos, programas, anuncios y comerciales de televisión.",
                  "5914": "Actividades de exhibición de películas cinematográficas y videos."
                }
              },
              "592": {
                "titulo": "Actividades de grabación de sonido y edición de música.",
                "actividades": {
                  "5920": "Actividades de grabación de sonido y edición de música."
                }
              }
            }
          },
          "60": {
            "titulo": "Actividades de programación, transmisión y/o difusión.",
            "subdivisiones": {
              "601": {
                "titulo": "Actividades de programación y transmisión en el servicio de radiodifusión sonora.",
                "actividades": {
                  "6010": "Actividades de programación y transmisión en el servicio de radiodifusión sonora."
                }
              },
              "602": {
                "titulo": "Actividades de programación y transmisión de televisión.",
                "actividades": {
                  "6020": "Actividades de programación y transmisión de televisión."
                }
              }
            }
          },
          "61": {
            "titulo": "Telecomunicaciones.",
            "subdivisiones": {
              "611": {
                "titulo": "Actividades de telecomunicaciones alámbricas.",
                "actividades": {
                  "6110": "Actividades de telecomunicaciones alámbricas."
                }
              },
              "612": {
                "titulo": "Actividades de telecomunicaciones inalámbricas.",
                "actividades": {
                  "6120": "Actividades de telecomunicaciones inalámbricas."
                }
              },
              "613": {
                "titulo": "Actividades de telecomunicación satelital.",
                "actividades": {
                  "6130": "Actividades de telecomunicación satelital."
                }
              },
              "619": {
                "titulo": "Otras actividades de telecomunicaciones.",
                "actividades": {
                  "6190": "Otras actividades de telecomunicaciones."
                }
              }
            }
          },
          "62": {
            "titulo": "Desarrollo de sistemas informáticos (planificación, análisis, diseño, programación, pruebas), consultoría informática y actividades relacionadas.",
            "subdivisiones": {
              "620": {
                "titulo": "Desarrollo de sistemas informáticos (planificación, análisis, diseño, programa­ción, pruebas), consultoría informática y actividades relacionadas.",
                "actividades": {
                  "6201": "Actividades de desarrollo de sistemas informáticos (planificación, análisis, diseño, programación, pruebas).",
                  "6202": "Actividades de consultoría informática y actividades de administración de instalaciones informáticas.",
                  "6209": "Otras actividades de tecnologías de información y actividades de servicios informáticos."
                }
              }
            }
          },
          "63": {
            "titulo": "Actividades de servicios de información.",
            "subdivisiones": {
              "631": {
                "titulo": "Procesamiento de datos, alojamiento (hosting) y actividades relacionadas; portales web.",
                "actividades": {
                  "6311": "Procesamiento de datos, alojamiento (hosting) y actividades relacionadas.",
                  "6312": "Portales web."
                }
              },
              "639": {
                "titulo": "Otras actividades de servicio de información.",
                "actividades": {
                  "6391": "Actividades de agencias de noticias.",
                  "6399": "Otras actividades de servicio de información n.c.p."
                }
              }
            }
          }
        }
      },
      "K": {
        "titulo": "Actividades Financieras y de Seguros",
        "divisiones": {
          "64": {
            "titulo": "Actividades de servicios financieros, excepto las de seguros y de pensiones.",
            "subdivisiones": {
              "641": {
                "titulo": "Intermediación monetaria.",
                "actividades": {
                  "6411": "Banco Central.",
                  "6412": "Bancos comerciales."
                }
              },
              "642": {
                "titulo": "Otros tipos de intermediación monetaria.",
                "actividades": {
                  "6421": "Actividades de las corporaciones financieras.",
                  "6422": "Actividades de las compañías de financiamiento.",
                  "6423": "Banca de segundo piso.",
                  "6424": "Actividades de las cooperativas financieras."
                }
              },
              "643": {
                "titulo": "Fideicomisos, fondos (incluye fondos de cesantías) y entidades financieras similares.",
                "actividades": {
                  "6431": "Fideicomisos, fondos y entidades financieras similares.",
                  "6432": "Fondos de cesantías."
                }
              },
              "649": {
                "titulo": "Otras actividades de servicio financiero, excepto las de seguros y pensiones.",
                "actividades": {
                  "6491": "Leasing financiero (arrendamiento financiero).",
                  "6492": "Actividades financieras de fondos de empleados y otras formas asociativas del sector solidario.",
                  "6493": "Actividades de compra de cartera o factoring.",
                  "6494": "Otras actividades de distribución de fondos.",
                  "6495": "Instituciones especiales oficiales.",
                  "6499": "Otras actividades de servicio financiero, excepto las de seguros y pensiones n.c.p."
                }
              }
            }
          },
          "65": {
            "titulo": "Seguros (incluso el reaseguro), seguros sociales y fondos de pensiones, excepto la seguridad social.",
            "subdivisiones": {
              "651": {
                "titulo": "Seguros y capitalización.",
                "actividades": {
                  "6511": "Seguros generales.",
                  "6512": "Seguros de vida.",
                  "6513": "Reaseguros.",
                  "6514": "Capitalización."
                }
              },
              "652": {
                "titulo": "Servicios de seguros sociales de salud y riesgos profesionales.",
                "actividades": {
                  "6521": "Servicios de seguros sociales de salud.",
                  "6522": "Servicios de seguros sociales de riesgos profesionales."
                }
              },
              "653": {
                "titulo": "Servicios de seguros sociales de pensiones.",
                "actividades": {
                  "6531": "Régimen de prima media con prestación definida (RPM).",
                  "6532": "Régimen de ahorro individual (RAI)."
                }
              }
            }
          },
          "66": {
            "titulo": "Actividades auxiliares de las actividades de servicios financieros.",
            "subdivisiones": {
              "661": {
                "titulo": "Actividades auxiliares de las actividades de servicios financieros, excepto las de seguros y pensiones.",
                "actividades": {
                  "6611": "Administración de mercados financieros.",
                  "6612": "Corretaje de valores y de contratos de productos básicos.",
                  "6613": "Otras actividades relacionadas con el mercado de valores.",
                  "6614": "Actividades de las casas de cambio.",
                  "6615": "Actividades de los profesionales de compra y venta de divisas.",
                  "6619": "Otras actividades auxiliares de las actividades de servicios financieros n.c.p."
                }
              },
              "662": {
                "titulo": "Actividades de servicios auxiliares de los servicios de seguros y pensiones.",
                "actividades": {
                  "6621": "Actividades de agentes y corredores de seguros",
                  "6629": "Evaluación de riesgos y daños, y otras actividades de servicios auxiliares"
                }
              },
              "663": {
                "titulo": "Actividades de administración de fondos.",
                "actividades": {
                  "6630": "Actividades de administración de fondos."
                }
              }
            }
          }
        }
      },
      "L": {
        "titulo": "Actividades Inmobiliarias",
        "divisiones": {
          "68": {
            "titulo": "Actividades inmobiliarias.",
            "subdivisiones": {
              "681": {
                "titulo": "Actividades inmobiliarias realizadas con bienes propios o arrendados.",
                "actividades": {
                  "6810": "Actividades inmobiliarias realizadas con bienes propios o arrendados."
                }
              },
              "682": {
                "titulo": "Actividades inmobiliarias realizadas a cambio de una retribución o por contrata.",
                "actividades": {
                  "6820": "Actividades inmobiliarias realizadas a cambio de una retribución o por contrata."
                }
              }
            }
          }
        }
      },
      "M": {
        "titulo": "Actividades Profesionales, Científicas y Técnicas",
        "divisiones": {
          "69": {
            "titulo": "Actividades jurídicas y de contabilidad.",
            "subdivisiones": {
              "691": {
                "titulo": "Actividades jurídicas.",
                "actividades": {
                  "6910": "Actividades jurídicas."
                }
              },
              "692": {
                "titulo": "Actividades de contabilidad, teneduría de libros, auditoría financiera y asesoría tributaria.",
                "actividades": {
                  "6920": "Actividades de contabilidad, teneduría de libros, auditoría financiera y asesoría tributaria."
                }
              }
            }
          },
          "70": {
            "titulo": "Actividades de administración empresarial; actividades de consultoría de gestión.",
            "subdivisiones": {
              "701": {
                "titulo": "Actividades de administración empresarial.",
                "actividades": {
                  "7010": "Actividades de administración empresarial."
                }
              },
              "702": {
                "titulo": "Actividades de consultaría de gestión.",
                "actividades": {
                  "7020": "Actividades de consultaría de gestión."
                }
              }
            }
          },
          "71": {
            "titulo": "Actividades de arquitectura e ingeniería; ensayos y análisis técnicos.",
            "subdivisiones": {
              "711": {
                "titulo": "Actividades de arquitectura e ingeniería y otras actividades conexas de consultoría técnica.",
                "actividades": {
                  "7110": "Actividades de arquitectura e ingeniería y otras actividades conexas de consultoría técnica."
                }
              },
              "712": {
                "titulo": "Ensayos y análisis técnicos.",
                "actividades": {
                  "7120": "Ensayos y análisis técnicos."
                }
              }
            }
          },
          "72": {
            "titulo": "Investigación científica y desarrollo.",
            "subdivisiones": {
              "721": {
                "titulo": "Investigaciones y desarrollo experimental en el campo de las ciencias naturales y la ingeniería.",
                "actividades": {
                  "7210": "Investigaciones y desarrollo experimental en el campo de las ciencias naturales y la ingeniería."
                }
              },
              "722": {
                "titulo": "Investigaciones y desarrollo experimental en el campo de las ciencias sociales y las humanidades.",
                "actividades": {
                  "7220": "Investigaciones y desarrollo experimental en el campo de las ciencias sociales y las humanidades."
                }
              }
            }
          },
          "73": {
            "titulo": "Publicidad y estudios de mercado.",
            "subdivisiones": {
              "731": {
                "titulo": "Publicidad.",
                "actividades": {
                  "7310": "Publicidad."
                }
              },
              "732": {
                "titulo": "Estudios de mercado y realización de encuestas de opinión pública.",
                "actividades": {
                  "7320": "Estudios de mercado y realización de encuestas de opinión pública."
                }
              }
            }
          },
          "74": {
            "titulo": "Otras actividades profesionales, científicas y técnicas.",
            "subdivisiones": {
              "741": {
                "titulo": "Actividades especializadas de diseño.",
                "actividades": {
                  "7410": "Actividades especializadas de diseño."
                }
              },
              "742": {
                "titulo": "Actividades de fotografía.",
                "actividades": {
                  "7420": "Actividades de fotografía."
                }
              },
              "749": {
                "titulo": "Otras actividades profesionales, científicas y técnicas n.c.p.",
                "actividades": {
                  "7490": "Otras actividades profesionales, científicas y técnicas n.c.p."
                }
              }
            }
          },
          "75": {
            "titulo": "Actividades veterinarias.",
            "subdivisiones": {
              "750": {
                "titulo": "Actividades veterinarias.",
                "actividades": {
                  "7500": "Actividades veterinarias."
                }
              }
            }
          }
        }
      },
      "N": {
        "titulo": "Actividades de Servicios Administrativos y de Apoyo",
        "divisiones": {
          "77": {
            "titulo": "Actividades de alquiler y arrendamiento.",
            "subdivisiones": {
              "771": {
                "titulo": "Alquiler y arrendamiento de vehículos automotores.",
                "actividades": {
                  "7710": "Alquiler y arrendamiento de vehículos automotores."
                }
              },
              "772": {
                "titulo": "Alquiler y arrendamiento de efectos personales y enseres domésticos.",
                "actividades": {
                  "7721": "Alquiler y arrendamiento de equipo recreativo y deportivo.",
                  "7722": "Alquiler de videos y discos.",
                  "7729": "Alquiler y arrendamiento de otros efectos personales y enseres domésticos n.c.p."
                }
              },
              "773": {
                "titulo": "Alquiler y arrendamiento de otros tipos de maquinaria, equipo y bienes tangibles n.c.p.",
                "actividades": {
                  "7730": "Alquiler y arrendamiento de otros tipos de maquinaria, equipo y bienes tangibles n.c.p."
                }
              },
              "774": {
                "titulo": "Arrendamiento de propiedad intelectual y productos similares, excepto obras protegidas por derechos de autor.",
                "actividades": {
                  "7740": "Arrendamiento de propiedad intelectual y productos similares, excepto obras protegidas por derechos de autor."
                }
              }
            }
          },
          "78": {
            "titulo": "Actividades de empleo.",
            "subdivisiones": {
              "781": {
                "titulo": "Actividades de agencias de empleo.",
                "actividades": {
                  "7810": "Actividades de agencias de empleo."
                }
              },
              "782": {
                "titulo": "Actividades de agencias de empleo temporal.",
                "actividades": {
                  "7820": "Actividades de agencias de empleo temporal."
                }
              },
              "783": {
                "titulo": "Otras actividades de suministro de recurso humano.",
                "actividades": {
                  "7830": "Otras actividades de suministro de recurso humano."
                }
              }
            }
          },
          "79": {
            "titulo": "Actividades de las agencias de viajes, operadores turísticos, servicios de reserva y actividades relacionadas.",
            "subdivisiones": {
              "791": {
                "titulo": "Actividades de las agencias de viajes y operadores turísticos.",
                "actividades": {
                  "7911": "Actividades de las agencias de viaje.",
                  "7912": "Actividades de operadores turísticos."
                }
              },
              "799": {
                "titulo": "Otros servicios de reserva y actividades relacionadas.",
                "actividades": {
                  "7990": "Otros servicios de reserva y actividades relacionadas."
                }
              }
            }
          },
          "80": {
            "titulo": "Actividades de seguridad e investigación privada.",
            "subdivisiones": {
              "801": {
                "titulo": "Actividades de seguridad privada.",
                "actividades": {
                  "8010": "Actividades de seguridad privada."
                }
              },
              "802": {
                "titulo": "Actividades de servicios de sistemas de seguridad.",
                "actividades": {
                  "8020": "Actividades de servicios de sistemas de seguridad."
                }
              },
              "803": {
                "titulo": "Actividades de detectives e investigadores privados.",
                "actividades": {
                  "8030": "Actividades de detectives e investigadores privados."
                }
              }
            }
          },
          "81": {
            "titulo": "Actividades de servicios a edificios y paisajismo (jardines, zonas verdes).",
            "subdivisiones": {
              "811": {
                "titulo": "Actividades combinadas de apoyo a instalaciones.",
                "actividades": {
                  "8110": "Actividades combinadas de apoyo a instalaciones."
                }
              },
              "812": {
                "titulo": "Actividades de limpieza.",
                "actividades": {
                  "8121": "Limpieza general interior de edificios.",
                  "8129": "Otras actividades de limpieza de edificios e instalaciones industriales."
                }
              },
              "813": {
                "titulo": "Actividades de paisajismo y servicios de mantenimiento conexos.",
                "actividades": {
                  "8130": "Actividades de paisajismo y servicios de mantenimiento conexos."
                }
              }
            }
          },
          "82": {
            "titulo": "Actividades administrativas y de apoyo de oficina y otras actividades de apoyo a las empresas.",
            "subdivisiones": {
              "821": {
                "titulo": "Actividades administrativas y de apoyo de oficina.",
                "actividades": {
                  "8211": "Actividades combinadas de servicios administrativos de oficina.",
                  "8219": "Fotocopiado, preparación de documentos y otras actividades especializadas de apoyo a oficina."
                }
              },
              "822": {
                "titulo": "Actividades de centros de llamadas (Call center).",
                "actividades": {
                  "8220": "Actividades de centros de llamadas (Call center)."
                }
              },
              "823": {
                "titulo": "Organización de convenciones y eventos comerciales.",
                "actividades": {
                  "8230": "Organización de convenciones y eventos comerciales."
                }
              },
              "829": {
                "titulo": "Actividades de servicios de apoyo a las empresas n.c.p.",
                "actividades": {
                  "8291": "Actividades de agencias de cobranza y oficinas de calificación crediticia.",
                  "8292": "Actividades de envase y empaque.",
                  "8299": "Otras actividades de servicio de apoyo a las empresas n.c.p."
                }
              }
            }
          }
        }
      },
      "O": {
        "titulo": "Administración Pública y Defensa; Planes de Seguridad Social de Afiliación Obligatoria",
        "divisiones": {
          "84": {
            "titulo": "Administración pública y defensa; planes de seguridad social de afiliación obligatoria.",
            "subdivisiones": {
              "841": {
                "titulo": "Administración del Estado y aplicación de la política económica y social de la comunidad.",
                "actividades": {
                  "8411": "Actividades legislativas de la administración pública.",
                  "8412": "Actividades ejecutivas de la administración pública.",
                  "8413": "Regulación de las actividades de organismos que prestan servicios de salud, edu­cativos, culturales y otros servicios sociales, excepto servicios de seguridad social.",
                  "8414": "Actividades reguladoras y facilitadoras de la actividad económica.",
                  "8415": "Actividades de los otros órganos de control."
                }
              },
              "842": {
                "titulo": "Prestación de servicios a la comunidad en general.",
                "actividades": {
                  "8421": "Relaciones exteriores.",
                  "8422": "Actividades de defensa.",
                  "8423": "Orden público y actividades de seguridad.",
                  "8424": "Administración de justicia."
                }
              },
              "843": {
                "titulo": "Actividades de planes de seguridad social de afiliación obligatoria.",
                "actividades": {
                  "8430": "Actividades de planes de seguridad social de afiliación obligatoria."
                }
              }
            }
          }
        }
      },
      "P": {
        "titulo": "Educación",
        "divisiones": {
          "85": {
            "titulo": "Educación.",
            "subdivisiones": {
              "851": {
                "titulo": "Educación de la primera infancia, preescolar y básica primaria.",
                "actividades": {
                  "8511": "Educación de la primera infancia.",
                  "8512": "Educación preescolar.",
                  "8513": "Educación básica primaria."
                }
              },
              "852": {
                "titulo": "Educación secundaria y de formación laboral.",
                "actividades": {
                  "8521": "Educación básica secundaria.",
                  "8522": "Educación media académica.",
                  "8523": "Educación media técnica y de formación laboral."
                }
              },
              "853": {
                "titulo": "Establecimientos que combinan diferentes niveles de educación.",
                "actividades": {
                  "8530": "Establecimientos que combinan diferentes niveles de educación."
                }
              },
              "854": {
                "titulo": "Educación superior.",
                "actividades": {
                  "8541": "Educación técnica profesional.",
                  "8542": "Educación tecnológica.",
                  "8543": "Educación de instituciones universitarias o de escuelas tecnológicas.",
                  "8544": "Educación de universidades."
                }
              },
              "855": {
                "titulo": "Otros tipos de educación.",
                "actividades": {
                  "8551": "Formación académica no formal.",
                  "8552": "Enseñanza deportiva y recreativa.",
                  "8553": "Enseñanza cultural.",
                  "8559": "Otros tipos de educación n.c.p."
                }
              },
              "856": {
                "titulo": "Actividades de apoyo a la educación.",
                "actividades": {
                  "8560": "Actividades de apoyo a la educación."
                }
              }
            }
          }
        }
      },
      "Q": {
        "titulo": "Actividades de Atención de la Salud, Humana y de Asistencia Social",
        "divisiones": {
          "86": {
            "titulo": "Actividades de atención de la salud humana.",
            "subdivisiones": {
              "861": {
                "titulo": "Actividades de hospitales y clínicas, con internación.",
                "actividades": {
                  "8610": "Actividades de hospitales y clínicas, con internación."
                }
              },
              "862": {
                "titulo": "Actividades de práctica médica y odontológica, sin internación.",
                "actividades": {
                  "8621": "Actividades de la práctica médica, sin internación.",
                  "8622": "Actividades de la práctica odontológica."
                }
              },
              "869": {
                "titulo": "Otras actividades de atención relacionadas con la salud humana.",
                "actividades": {
                  "8691": "Actividades de apoyo diagnóstico.",
                  "8692": "Actividades de apoyo terapéutico.",
                  "8699": "Otras actividades de atención de la salud humana."
                }
              }
            }
          },
          "87": {
            "titulo": "Actividades de atención residencial medicalizada.",
            "subdivisiones": {
              "871": {
                "titulo": "Actividades de atención residencial medicalizada de tipo general.",
                "actividades": {
                  "8710": "Actividades de atención residencial medicalizada de tipo general."
                }
              },
              "872": {
                "titulo": "Actividades de atención residencial, para el cuidado de pacientes con retardo mental, enfermedad mental y consumo de sustancias psicoactivas.",
                "actividades": {
                  "8720": "Actividades de atención residencial, para el cuidado de pacientes con retardo mental, enfermedad mental y consumo de sustancias psicoactivas."
                }
              },
              "873": {
                "titulo": "Actividades de atención en instituciones para el cuidado de personas mayores y/o discapacitadas.",
                "actividades": {
                  "8730": "Actividades de atención en instituciones para el cuidado de personas mayores y/o discapacitadas."
                }
              },
              "879": {
                "titulo": "Otras actividades de atención en instituciones con alojamiento.",
                "actividades": {
                  "8790": "Otras actividades de atención en instituciones con alojamiento"
                }
              }
            }
          },
          "88": {
            "titulo": "Actividades de asistencia social sin alojamiento.",
            "subdivisiones": {
              "881": {
                "titulo": "Actividades de asistencia social sin alojamiento para personas mayores y discapacitadas.",
                "actividades": {
                  "8810": "Actividades de asistencia social sin alojamiento para personas mayores y discapacitadas."
                }
              },
              "889": {
                "titulo": "Otras actividades de asistencia social sin alojamiento.",
                "actividades": {
                  "8890": "Otras actividades de asistencia social sin alojamiento."
                }
              }
            }
          }
        }
      },
      "R": {
        "titulo": "Actividades Artísticas, de Entretenimiento y Recreación",
        "divisiones": {
          "90": {
            "titulo": "Actividades creativas, artísticas y de entretenimiento.",
            "subdivisiones": {
              "900": {
                "titulo": "Actividades creativas, artísticas y de entretenimiento.",
                "actividades": {
                  "9001": "Creación literaria.",
                  "9002": "Creación musical.",
                  "9003": "Creación teatral.",
                  "9004": "Creación audiovisual.",
                  "9005": "Artes plásticas y visuales.",
                  "9006": "Actividades teatrales.",
                  "9007": "Actividades de espectáculos musicales en vivo.",
                  "9008": "Otras actividades de espectáculos en vivo."
                }
              }
            }
          },
          "91": {
            "titulo": "Actividades de bibliotecas, archivos, museos y otras actividades culturales.",
            "subdivisiones": {
              "910": {
                "titulo": "Actividades de bibliotecas, archivos, museos y otras actividades culturales.",
                "actividades": {
                  "9101": "Actividades de bibliotecas y archivos.",
                  "9102": "Actividades y funcionamiento de museos, conservación de edificios y sitios históricos.",
                  "9103": "Actividades de jardines botánicos, zoológicos y reservas naturales."
                }
              }
            }
          },
          "92": {
            "titulo": "Actividades de juegos de azar y apuestas.",
            "subdivisiones": {
              "920": {
                "titulo": "Actividades de juegos de azar y apuestas.",
                "actividades": {
                  "9200": "Actividades de juegos de azar y apuestas."
                }
              }
            }
          },
          "93": {
            "titulo": "Actividades deportivas y actividades recreativas y de esparcimiento.",
            "subdivisiones": {
              "931": {
                "titulo": "Actividades deportivas.",
                "actividades": {
                  "9311": "Gestión de instalaciones deportivas.",
                  "9312": "Actividades de clubes deportivos.",
                  "9319": "Otras actividades deportivas."
                }
              },
              "932": {
                "titulo": "Otras actividades recreativas y de esparcimiento.",
                "actividades": {
                  "9321": "Actividades de parques de atracciones y parques temáticos.",
                  "9329": "Otras actividades recreativas y de esparcimiento n.c.p."
                }
              }
            }
          }
        }
      },
      "S": {
        "titulo": "otras Actividades de Servicios",
        "divisiones": {
          "94": {
            "titulo": "Actividades de asociaciones.",
            "subdivisiones": {
              "941": {
                "titulo": "Actividades de asociaciones empresariales y de empleadores, y asociaciones profesionales.",
                "actividades": {
                  "9411": "Actividades de asociaciones empresariales y de empleadores",
                  "9412": "Actividades de asociaciones profesionales"
                }
              },
              "942": {
                "titulo": "Actividades de sindicatos de empleados.",
                "actividades": {
                  "9420": "Actividades de sindicatos de empleados."
                }
              },
              "949": {
                "titulo": "Actividades de otras asociaciones.",
                "actividades": {
                  "9491": "Actividades de asociaciones religiosas.",
                  "9492": "Actividades de asociaciones políticas.",
                  "9499": "Actividades de otras asociaciones n.c.p."
                }
              }
            }
          },
          "95": {
            "titulo": "Mantenimiento y reparación de computadores, efectos personales y enseres domésticos.",
            "subdivisiones": {
              "951": {
                "titulo": "Mantenimiento y reparación de computadores y equipo de comunicaciones.",
                "actividades": {
                  "9511": "Mantenimiento y reparación de computadores y de equipo periférico.",
                  "9512": "Mantenimiento y reparación de equipos de comunicación."
                }
              },
              "952": {
                "titulo": "Mantenimiento y reparación de efectos personales y enseres domésticos.",
                "actividades": {
                  "9521": "Mantenimiento y reparación de aparatos electrónicos de consumo.",
                  "9522": "Mantenimiento y reparación de aparatos y equipos domésticos y de jardinería.",
                  "9523": "Reparación de calzado y artículos de cuero.",
                  "9524": "Reparación de muebles y accesorios para el hogar.",
                  "9529": "Mantenimiento y reparación de otros efectos personales y enseres domésticos."
                }
              }
            }
          },
          "96": {
            "titulo": "Otras actividades de servicios personales.",
            "subdivisiones": {
              "960": {
                "titulo": "Otras actividades de servicios personales.",
                "actividades": {
                  "9601": "Lavado y limpieza, incluso la limpieza en seco, de productos textiles y de piel.",
                  "9602": "Peluquería y otros tratamientos de belleza.",
                  "9603": "Pompas fúnebres y actividades relacionadas.",
                  "9609": "Otras actividades de servicios personales n.c.p."
                }
              }
            }
          }
        }
      },
      "T": {
        "titulo": "Actividades de los Hogares Individuales en Calidad de Empleadores; Actividades No Diferenciadas de los Hogares Individuales como Productores de Bienes y Servicios para uso Propio.",
        "divisiones": {
          "97": {
            "titulo": "Actividades de los hogares individuales como empleadores de personal doméstico.",
            "subdivisiones": {
              "970": {
                "titulo": "Actividades de los hogares individuales como empleadores de personal doméstico.",
                "actividades": {
                  "9700": "Actividades de los hogares individuales como empleadores de personal doméstico."
                }
              }
            }
          },
          "98": {
            "titulo": "Actividades no diferenciadas de los hogares individuales como productores de bienes y servicios para uso propio.",
            "subdivisiones": {
              "981": {
                "titulo": "Actividades no diferenciadas de los hogares individuales como productores de bienes para uso propio.",
                "actividades": {
                  "9810": "Actividades no diferenciadas de los hogares individuales como productores de bienes para uso propio."
                }
              },
              "982": {
                "titulo": "Actividades no diferenciadas de los hogares individuales como productores de servicios para uso propio.",
                "actividades": {
                  "9820": "Actividades no diferenciadas de los hogares individuales como productores de servicios para uso propio."
                }
              }
            }
          }
        }
      },
      "U": {
        "titulo": "Actividades de Organizaciones y Entidades Extraterritoriales",
        "divisiones": {
          "99": {
            "titulo": "Actividades de organizaciones y entidades extraterritoriales.",
            "subdivisiones": {
              "990": {
                "titulo": "Actividades de organizaciones y entidades extraterritoriales.",
                "actividades": {
                  "9900": "Actividades de organizaciones y entidades extraterritoriales.",
                  "Otras": "Clasificaciones",
                  "Es": "necesario anotar que estas “Otras Clasificaciones” no son parte de la CIIU Rev. 4 A.C., son establecidas por la Dirección de Impuestos y Aduanas Nacionales - DIAN para propósitos de control, determinación de los impuestos y demás obligaciones tributarias, aduaneras y cambiarias, de su competencia.",
                  "0010": "Asalariados",
                  "Personas": "naturales o sucesiones ilíquidas cuyos ingresos provienen de intereses, descuentos, beneficios, ganancias, utilidades y en general, todo cuanto represente rendimiento de capital o diferencia entre el valor invertido o aportado, y el valor futuro y/o pagado o abonado al aportante o inversionista.",
                  "0081": "Personas Naturales sin Actividad Económica",
                  "0082": "Personas Naturales Subsidiadas por Terceros",
                  "0090": "Rentistas de Capital, solo para personas naturales."
                }
              }
            }
          }
        }
      }
    }
}
