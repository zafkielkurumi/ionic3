import { Component } from '@angular/core';
import { NavController,ActionSheetController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import {Response} from "@angular/http";
import { HttpService } from '../providers/HttpService';

import { NativeService } from '../providers/NativeService';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[
    HttpService
  ]
})
export class HomePage {
    isDanger=true;
    isOutline=false;
    data;
  imgSrc;
  constructor(public navCtrl: NavController,
              public httpService:HttpService,
              public actionSheetCtrl:ActionSheetController,
              public nativeService:NativeService
  ) {

  }
  logEvent(event) {
    this.httpService.get('http://jsonplaceholder.typicode.com/posts',{"userId":1}).subscribe((res)=>{

      this.data=res.json();
      console.log(this.data)
    })
  }
  post(){
    this.httpService.post('http://jsonplaceholder.typicode.com/post',{
      title: 'foo',
      body: 'bar',
      userId: 1
    }).subscribe(res=>{
      console.log(res)
      this.data=res.json()
    })
  }
  delete(chip:Element){
    chip.remove();
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择照片',
      buttons: [
        {
          text: '拍照',
          handler: () => {
           this.nativeService.getPictureByCamera().subscribe(res=>{
             console.log(res)
           })
          }
        },{
          text: '相册',
          handler: () => {
            this.nativeService.getPictureByPhotoLibrary().subscribe(res=>{
              this.imgSrc=res
            })
          }
        },{
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
