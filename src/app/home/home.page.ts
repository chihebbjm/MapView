import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Contact} from '../providers/contact';
import { HttpClient } from '@angular/common/http';
import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';




class Post {
  constructor(public nom: string, public latitude: string, public longitude: string) {}
}


var geojsonFeature = [
  
  {
    "nom": "Bourgo Mall",
    "latitude": "33.8172",
    "longitude": "10.9709"
  },
  {
    "nom": "ISET Djerba",
    "latitude": "33.8188",
    "longitude": "10.9735"
  } ,
 
];


    
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //users : any = Contact.contact_array;
  public users : [];
  
  public baseurl = 'http://localhost:3000/places/';

  map: Map;


  ionViewDidEnter() {
    this.leafletMap();
  }

  leafletMap() {
    this.map = new Map('mapId2').setView([33.8187, 10.9733 ], 16);

    tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: 'edupala.com'
    }).addTo(this.map);
    geojsonFeature.forEach(element => {

      const markPoint1 = marker([element.latitude, element.longitude]);
      markPoint1
          .bindPopup('<p>'+element.nom+'</p>')
          .openPopup()
     
      this.map.addLayer(markPoint1);
     
      
    });
   
  }

  ionViewWillLeave() {
    this.map.remove();
  }


  constructor(private route: Router,private http: HttpClient) {}
  ngOnInit() {
    //this.LoadData();
    }


  LoadData(){

   const promise = new Promise((resolve, reject) => {
    const apiURL = this.baseurl;
    this.http.get<Post[]>(apiURL).toPromise().then(
        (res: any) => {
            // Success
            this.users = res.map((res: any) => {
                return new Post(res.nom, res.latitude, res.longitude);
                
            });
            resolve();
        },
        (err) => {
            // Error
            reject(err);
        }
    );
});
return promise;
}

    


  
  goToPage(){
    console.log("button clicked")
    this.route.navigate(['/add-contact']);
  }




  removeItem(index){

  this.users.splice(index, 1);

  const promise = new Promise((resolve, reject) => {
    const apiURL = this.baseurl;
    this.http.delete<Post[]>(apiURL+"/"+index).subscribe(res => {     
      resolve(res);
      console.log(res)
  }, err => {               
      resolve(err);
  });
});
return promise;


}


async updateItem(index){
  
  this.route.navigate(['/update-contact'],{ state: { position: index} });
  
}

}

