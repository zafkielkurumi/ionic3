import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  cucumber:boolean;
  constructor(public navCtrl: NavController) {

  }
  updateCucumber(){
    console.log('cumber new state'+this.cucumber)
  }
}
