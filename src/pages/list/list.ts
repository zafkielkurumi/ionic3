import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  templateUrl: 'list.html',
})
export class ListPage {
   selectedItem:any;
  icons:string[];
  items:Array<{title:string,note:string,icon:string}>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedItem=navParams.get('item');
    this.icons=['']
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

}
