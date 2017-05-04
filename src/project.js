require=function t(e,i,n){function o(c,r){if(!i[c]){if(!e[c]){var a="function"==typeof require&&require;if(!r&&a)return a(c,!0);if(s)return s(c,!0);var h=new Error("Cannot find module '"+c+"'");throw h.code="MODULE_NOT_FOUND",h}var p=i[c]={exports:{}};e[c][0].call(p.exports,function(t){var i=e[c][1][t];return o(i?i:t)},p,p.exports,t,e,i,n)}return i[c].exports}for(var s="function"==typeof require&&require,c=0;c<n.length;c++)o(n[c]);return o}({Background:[function(t,e,i){"use strict";cc._RFpush(e,"4a8a8g8fIlLSZ5xoRWc4YRl","Background");var n=t("Constant");cc.Class({"extends":cc.Component,properties:{groundNode:{"default":[],type:[cc.Node]},groundImg:{"default":null,type:cc.Sprite}},onLoad:function(){this._size=cc.winSize,this._width=this.groundImg.spriteFrame.getRect().width,this.schedule(this.onGroundMove,n.GROUND_MOVE_INTERVAL)},onGroundMove:function(){this.groundNode[0].x+=n.GROUND_VX,this.groundNode[1].x+=n.GROUND_VX,this.groundNode[0].x+this._width/2<-this._size.width/2&&(this.groundNode[0].x=this.groundNode[1].x+this._width-5),this.groundNode[1].x+this._width/2<-this._size.width/2&&(this.groundNode[1].x=this.groundNode[0].x+this._width-5)}});cc._RFpop()},{Constant:"Constant"}],Bird:[function(t,e,i){"use strict";cc._RFpush(e,"dba40+MKV5FjpALbo9uDYLc","Bird"),cc.Class({"extends":cc.Component,properties:{gravity:.5,birdJump:6.6,AnimName:"",jumpAudio:{"default":null,url:cc.AudioClip},JumpAnim:""},onLoad:function(){this.getComponent(cc.Animation).play(this.AnimName),this.velocity=0},onStartDrop:function(){this.schedule(this.onDrop,.01)},onDrop:function(){this.node.y<-108?(this.node.y=-108,this.velocity=.1):(this.node.y+=this.velocity,this.velocity-=this.gravity)},onJump:function(){this.velocity=this.birdJump,this.getComponent(cc.Animation).play(this.JumpAnim),cc.audioEngine.playEffect(this.jumpAudio,!1)},test:function(){this.getComponent(cc.Animation).play(this.AnimName)}}),cc._RFpop()},{}],Constant:[function(t,e,i){"use strict";cc._RFpush(e,"1f331Khw8ZPUpFSgo3Y95tw","Constant");var n=cc.Enum({GROUND_MOVE_INTERVAL:.05,GROUND_VX:-5,PIPE_UP:0,PIPE_DOWN:1,GAMEOVER_TXT:"GAME OVER",HIGHSCORE_TXT:"HighScore: "});e.exports=n,cc._RFpop()},{}],Game:[function(t,e,i){"use strict";cc._RFpush(e,"6bb266V8atHdb56fl6sfmwu","Game");var n=t("Bird"),o=t("Background"),s=t("Constant"),c=t("Storage");cc.Class({"extends":cc.Component,properties:{pipeMaxOffsetY:300,pipeMinGap:250,pipeMaxGap:300,pipeSpawnInterval:4.5,pipeSpawnOffsetX:30,gameReflashTime:5,scoreScaleDuration:.2,gameMenu:{"default":null,type:cc.Node},bird:{"default":null,type:n},pipesNode:{"default":null,type:cc.Node},pipePrefabs:{"default":[],type:[cc.Prefab]},background:{"default":null,type:o},gameOverText:{"default":null,type:cc.Label},scoreText:{"default":null,type:cc.Label},highScoreText:{"default":null,type:cc.Label}},onLoad:function(){this.setInputControl(),this.pipes=[],this.size=cc.winSize;var t=this.background.groundNode[0].getBoundingBox();this.groundTop=t.y+t.height/2,this.isGameOver=!1,this.curScore=0,c.getHighScore()>0&&(this.highScoreText.string=s.HIGHSCORE_TXT+c.getHighScore())},setInputControl:function(){var t=this;cc.eventManager.addListener({event:cc.EventListener.TOUCH_ONE_BY_ONE,onTouchBegan:t._onTouchBegan.bind(t)},t.node)},_onTouchBegan:function(t,e){this.isGameOver!==!0&&this.bird.onJump()},onStartGame:function(){this.gameMenu.active=!1,this.bird.onStartDrop(),this.scoreText.string=""+this.curScore,this.schedule(this.spawnPipes,this.pipeSpawnInterval),this.schedule(this.gameUpdate,s.GROUND_MOVE_INTERVAL)},spawnPipes:function(){var t=cc.instantiate(this.pipePrefabs[s.PIPE_UP]);t.getComponent("Pipe").init(s.PIPE_UP);var e=t.getComponent("cc.Sprite").spriteFrame.getRect().height;t.x=this.size.width/2+this.pipeSpawnOffsetX,t.y=Math.floor(Math.random()*this.pipeMaxOffsetY)+e/2;var i=cc.instantiate(this.pipePrefabs[s.PIPE_DOWN]);i.getComponent("Pipe").init(s.PIPE_DOWN),i.x=this.size.width/2+this.pipeSpawnOffsetX;var n=Math.floor(Math.random()*(this.pipeMaxGap-this.pipeMinGap))+this.pipeMinGap;i.y=t.y-n-e,this.pipesNode.addChild(t),this.pipesNode.addChild(i),this.pipes.push(t),this.pipes.push(i)},gameUpdate:function(){for(var t=0;t<this.pipes.length;t++){var e=this.pipes[t];e.x+=s.GROUND_VX;var i=this.bird.node.getBoundingBox(),n=e.getBoundingBox();if(cc.Intersection.rectRect(i,n))return void this.onGameOver();var o=e.getComponent("Pipe");e.x<this.bird.node.x&&o.isPassed===!1&&o.type===s.PIPE_UP&&(o.isPassed=!0,this.addScore()),e.x<-(this.size.width/2+s.PIPE_SPAWN_OFFSET_X)&&(this.pipes.splice(t,1),this.pipesNode.removeChild(e,!0))}},addScore:function(){this.curScore++,this.scoreText.string=""+this.curScore;var t=cc.scaleTo(this.scoreScaleDuration,1.1,.6),e=cc.scaleTo(this.scoreScaleDuration,.8,1.2),i=cc.scaleTo(this.scoreScaleDuration,1,1);this.scoreText.node.runAction(cc.sequence(t,e,i))},onGameOver:function(){this.isGameOver=!0,this.curScore>c.getHighScore()&&c.setHighScore(this.curScore),this.gameOverText.string=s.GAMEOVER_TXT,this.bird.unscheduleAllCallbacks(),this.background.unscheduleAllCallbacks(),this.unscheduleAllCallbacks(),this.schedule(function(){cc.director.loadScene("game")},this.gameReflashTime)}});cc._RFpop()},{Background:"Background",Bird:"Bird",Constant:"Constant",Storage:"Storage"}],Pipe:[function(t,e,i){"use strict";cc._RFpush(e,"fc122qToQhByr8kag01h1T3","Pipe"),cc.Class({"extends":cc.Component,properties:{isPassed:!1},onLoad:function(){},init:function(t){this.type=t}}),cc._RFpop()},{}],Storage:[function(t,e,i){"use strict";cc._RFpush(e,"66102528YBJXJl8YVn9PiMH","Storage");var n={getHighScore:function(){var t=cc.sys.localStorage.getItem("HighScore")||0;return parseInt(t)},setHighScore:function(t){cc.sys.localStorage.setItem("HighScore",t)}};e.exports=n,cc._RFpop()},{}]},{},["Background","Bird","Constant","Game","Pipe","Storage"]);