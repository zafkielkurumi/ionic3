import {Injectable} from '@angular/core';
import {
  Http, Response, Headers, RequestOptions, URLSearchParams, RequestOptionsArgs, RequestMethod
  } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { LoadingController } from 'ionic-angular';
import {Observable, TimeoutError} from "rxjs";


import {
  REQUEST_TIMEOUT
  } from './constant';

@Injectable()

export class HttpService{
  loader;

  constructor(
    public http:Http,
    public loadingCtrl:LoadingController
  ){

  }

  //对象序列化
  private static buildURLSearchParams(paramMap): URLSearchParams {
    let params = new URLSearchParams();
    //console.log(params)
    //console.log(params.toString())
    if (!paramMap) {
      return params;
    }
    for (let key in paramMap) {
      let val = paramMap[key];
      //if (val instanceof Date) {
      //  val = Utils.dateFormat(val, 'yyyy-MM-dd hh:mm:ss')
      //}
      params.set(key, val);
    }
    return params;
  }
//显示loading
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: ""
    });
    this.loader.present();
  }
  //请求
  public request(url:string,options:RequestOptionsArgs):Observable<Response>{

    return Observable.create(observer=>{
      //开始loading
      console.log(1)
      this.presentLoading()
      this.http.request(url,options).timeout(REQUEST_TIMEOUT).subscribe(res=>{
        //成功关闭loading
        this.loader.dismiss()
        console.log('成功')
        observer.next(res)
      },err=>{
        //失败关闭loading
        //失败处理
        this.loader.dismiss()
        console.log('失败')
        this.reqFailed(url,options,err)
        observer.error(err)
      })
    })
  }

  //get请求
  public get(url:string, paramMap:any=null):Observable<Response>{
    return this.request(url,new RequestOptions({
      method:RequestMethod.Get,
      search:HttpService.buildURLSearchParams(paramMap).toString()
    }))
  }

  public post(url:string,body:any={}):Observable<Response>{
    return this.request(url,new RequestOptions({
      method:RequestMethod.Post,
      body:body,
      headers:new Headers({
        'Content-Type': 'application/json; charset=UTF-8'
      })
    }))
  }

  public put(url:string,body:any={}):Observable<Response>{
    return this.request(url,new RequestOptions({
      method:RequestMethod.Put,
      body:body
    }))
  }

  //请求失败处理
  private reqFailed(url:string,options:RequestOptionsArgs,err:Response):void{
    if(err instanceof TimeoutError){
      //使用alert提示请求超时
      console.log('请求超时')
      return
    }
    console.log(err)
    return
    //还可以检测网络连接的提示错误一种
    //服务器方面方面提示错误
    //let msg = '请求发生异常';
    //try {
    //  let result = err.json();
    //  this.nativeService.alert(result.message || msg);
    //} catch (err) {
    //  let status = err.status;
    //  if (status === 0) {
    //    msg = '请求失败，请求响应出错';
    //  } else if (status === 404) {
    //    msg = '请求失败，未找到请求地址';
    //  } else if (status === 500) {
    //    msg = '请求失败，服务器出错，请稍后再试';
    //  }
    //  this.nativeService.alert(msg);
    //  this.logger.httpLog(err, msg, {
    //    url: url,
    //    status: status
    //  });
    //}
  }

}

