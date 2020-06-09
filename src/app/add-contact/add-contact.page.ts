import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
//import the ArryList :
import {Contact} from '../providers/contact';



@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.page.html',
  styleUrls: ['./add-contact.page.scss'],
})



export class AddContactPage implements OnInit {

  users : any = Contact.contact_array;
  public frist_input_value: any;
  public last_input_value: any ;
  public profession:any;


    constructor(public navCtrl: NavController,private route:Router) {}

   

  ngOnInit() {
  }



  onChange(){
    //console.log("Selected:"+this.profession);
  }

  add_contact(){
    console.log("buttons cklecked ")
    //console.log("profession",this.profession)
 
    if ((this.frist_input_value.length > 0) &&(this.last_input_value.length > 0)){
        //adding in the arraylist :
        let Frist_name= this.frist_input_value;
        let Last_name= this.last_input_value;
        let Profession_value=this.profession;
        
      this.users.push(
        { 
        nom: Frist_name,
        prenom: Last_name,
        profession: Profession_value
        });
      
        
        this.route.navigate(['/home']);
      
        
    }
   

    
  }
  goToHome(){
    this.route.navigate(['/home']);
    
  }


}
