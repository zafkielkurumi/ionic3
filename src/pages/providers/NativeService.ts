import {Injectable} from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {ToastController, LoadingController, Platform, Loading, AlertController} from 'ionic-angular';
import {ImagePicker} from '@ionic-native/image-picker';
import {Response} from "@angular/http";
import { HttpService } from './HttpService';
import {Observable} from "rxjs";

import {
   IMG_WIDTH,
  IMG_HEIGHT,
  QUALITY
  } from './constant';

@Injectable()

export class NativeService{

  constructor(
    public camera:Camera,
    public imagePicker:ImagePicker,
    public http:HttpService
  ){

  }

  //通过相机的方法获取照片 利用Object.assign()进行拷贝
  getPicture(opts:CameraOptions={}):Observable<string>{
     let options=Object.assign({
       quality:QUALITY,//图片质量
       destinationType:this.camera.DestinationType.DATA_URL, //图片来源路径
       allowEdit:false,//选择图片钱是否允许编辑
       saveToPhotoAlbum:true,//是否保存到手机相册
       correctOrientation:true,//
       targetWidth:IMG_WIDTH,//缩放图片的宽度
       targetHeight:IMG_HEIGHT,//图片的高度
       encodingType: this.camera.EncodingType.JPEG,//编码
       sourceType: this.camera.PictureSourceType.CAMERA//图片来源 1camera 相机 0 photolibrary 相册
     },opts);
    return Observable.create(observe=>{
      this.camera.getPicture(options).then((imgData)=>{
        observe.next('data:image/jpg;base64,' + imgData)
      }).catch(err=>{
        //提示错误，权限等
        console.log(err)
      })
    })
  }
  //通过拍照获取照片opt:CameraOptions={}
  getPictureByCamera():Observable<string>{
    let options:CameraOptions={
      sourceType: this.camera.PictureSourceType.CAMERA,
    };
    return this.getPicture(options)
  }

  //通过图库获取照片
  getPictureByPhotoLibrary():Observable<string>{
    let options:CameraOptions={
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    return this.getPicture(options);
  }

    //通过图库选择多张图片 使用imagePicker
  getMultiplePicture(){
    let that=this;
    let options={
      maximumImagesCount: 2, //能选择的数量，0-6
      width: IMG_WIDTH,//缩放图像的宽度（像素）
      height: IMG_HEIGHT,//缩放图像的高度（像素）
      quality: QUALITY//图像质量，范围为0 - 100
      //还有个outputType  默认是 FILE_URL  不知道其他值。。。。
    }
    return Observable.create(observe=>{
        this.imagePicker.getPictures(options).then((result)=>{
          for(let v of result){
              console.log(v)
          }
          observe.next(result)
        }).catch(err=>{
          console.log(err)
        })
    })
  }

  //上传图片
  uploadPicture(imaData){
    this.http.post('后端地址',{"url":imaData}).subscribe(res=>{
      res.json();
    })
  }
}
