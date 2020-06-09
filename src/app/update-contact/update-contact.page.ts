import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
//import the ArryList :
import {Contact} from '../providers/contact';


@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.page.html',
  styleUrls: ['./update-contact.page.scss'],
})
export class UpdateContactPage implements OnInit {


  users : any = Contact.contact_array;
  public frist_input_upadte: any;
  public last_input_upadte: any ;
  public profession_upadte:any;

  pos_item:any;

  constructor(public navCtrl: NavController,private route:Router) { 
   this.pos_item=this.route.getCurrentNavigation().extras.state.position;

  }


  UpdateContact(){
    if ((this.frist_input_upadte.length > 0) &&(this.last_input_upadte.length > 0)){
      //adding in the arraylist :
      let Frist_name_upadte= this.frist_input_upadte;
      let Last_name_upadte= this.last_input_upadte;
      let Profession_value_upadte=this.profession_upadte;
      this.users[this.pos_item]=(
        { 
        nom: Frist_name_upadte,
        prenom: Last_name_upadte,
        profession: Profession_value_upadte
        });

    }
    this.pos_item=0;
    this.route.navigate(['/home']);
  }



  goToHome(){
    this.route.navigate(['/home']);
    
  }


  
  ngOnInit() {
  }



}
