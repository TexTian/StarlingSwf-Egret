//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        this.loadingView.createView();

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield:egret.TextField;

    private swf:starlingswf.Swf;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene():void {
        var swfData:Object = RES.getRes("test_swf");
        this.swf = new starlingswf.Swf(swfData,this.stage.frameRate);
        this.test1();

        // this.testAlert();

        // this.testSocket();

        // lzm.HttpClient.send("http://192.168.2.188/aptana/rings_server/test.php",{'a':123,"b":321},(data:string)=>{
        //     egret.log(data);
        // },null,'post');
    }

    

    /**
     * Sprite测试
     * */
    private test1():void{
        var sprite:starlingswf.SwfSprite = this.swf.createSprite("spr_1");
        this.addChild(sprite);
    }

    /**
     * MovieClip测试
     * */
    private test2():void{

        var mcNames:string[] = ["mc_lajiao","mc_test1","mc_Tain","mc_Zombie_balloon","mc_Zombie_dolphinrider","mc_Zombie_gargantuar","mc_Zombie_imp","mc_Zombie_jackbox","mc_Zombie_ladder","mc_Zombie_polevaulter"];
        for(var i:number = 0 ; i < 50 ; i++){
            var mcName:string = mcNames[Math.floor(Math.random() * mcNames.length)];
            var mc:starlingswf.SwfMovieClip = this.swf.createMovie(mcName);
            mc.x = Math.random() * 480;
            mc.y = Math.random() * 320;
            this.addChild(mc);
        }

    }

    /**
     * 动画事件测试
     * */
    private test3():void{
        var mc:starlingswf.SwfMovieClip = this.swf.createMovie("mc_Tain");
        mc.x = 480 / 2;
        mc.y = 320 / 2;
        mc.addEventListener(egret.Event.COMPLETE,this.mcComplete,mc);
        mc.gotoAndPlay("walk");
        this.addChild(mc);
    }

    private mcComplete(e:egret.Event):void{
        console.log("mcComplete");
    }

    /**
     * 帧事件测试
     * */
    private test4():void{
        var mc:starlingswf.SwfMovieClip = this.swf.createMovie("mc_frame_event");
        mc.addEventListener("@out",this.frameEventOut,mc);
        mc.addEventListener("@in",this.frameEventIn,mc);
        this.addChild(mc);
    }

    private frameEventOut(e:egret.Event):void{
        egret.log("@out");
    }

    private frameEventIn(e:egret.Event):void{
        egret.log("@in");
    }

    /**
     * blendMode
     * */
    private test5(){
        var spr:starlingswf.SwfSprite = this.swf.createSprite("spr_blendmode");
        this.addChild(spr);
    }

    private testBtn(){
        var btn:starlingswf.SwfButton = this.swf.createButton("btn_test1");
        this.addChild(btn);
        
        btn.addEventListener(starlingswf.SwfButton.onClick,( evt:egret.Event )=>{
            egret.log("onClick");
        },this)
    }

    private testSocket(){
        var socket:lzm.JSONWebSocketClient = new lzm.JSONWebSocketClient("127.0.0.1",8501);

        socket.onConnectCallBack = ()=>{
            egret.log("链接成功");
            socket.sendData({"a":"a","b":"b"});
        }

        socket.onIOErrorCallBack = ()=>{
             egret.log("链接失败");
        }

        socket.onDataCallBack = (data:Object)=>{
            egret.log(data);
        }

        socket.onCloseCallBack = ()=>{
             egret.log("链接关闭");
        }

        socket.connect(); 
    }

    private testAlert(){
        lzm.Alert.init(this.stage);

        var shape:egret.Shape = new egret.Shape();
        shape.graphics.beginFill(0xff00ff);
        shape.graphics.drawRect(0,0,100,100);
        shape.graphics.endFill();
        
        lzm.Alert.alert(shape);

    }
}


