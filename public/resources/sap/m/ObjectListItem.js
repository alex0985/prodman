/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./ListItemBase','./library','sap/ui/core/IconPool','sap/m/ObjectNumber'],function(q,L,l,I,O){"use strict";var a=L.extend("sap.m.ObjectListItem",{metadata:{library:"sap.m",properties:{title:{type:"string",group:"Misc",defaultValue:null},number:{type:"string",group:"Misc",defaultValue:null},numberUnit:{type:"string",group:"Misc",defaultValue:null},intro:{type:"string",group:"Misc",defaultValue:null},icon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},activeIcon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},iconDensityAware:{type:"boolean",group:"Misc",defaultValue:true},markFavorite:{type:"boolean",group:"Misc",defaultValue:null,deprecated:true},markFlagged:{type:"boolean",group:"Misc",defaultValue:null,deprecated:true},showMarkers:{type:"boolean",group:"Misc",defaultValue:null,deprecated:true},numberState:{type:"sap.ui.core.ValueState",group:"Misc",defaultValue:sap.ui.core.ValueState.None},titleTextDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:sap.ui.core.TextDirection.Inherit},introTextDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:sap.ui.core.TextDirection.Inherit},numberTextDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:sap.ui.core.TextDirection.Inherit},markLocked:{type:"boolean",group:"Misc",defaultValue:false,deprecated:true}},defaultAggregation:"attributes",aggregations:{attributes:{type:"sap.m.ObjectAttribute",multiple:true,singularName:"attribute"},firstStatus:{type:"sap.m.ObjectStatus",multiple:false},secondStatus:{type:"sap.m.ObjectStatus",multiple:false},markers:{type:"sap.m.ObjectMarker",multiple:true,singularName:"marker"},_objectNumber:{type:"sap.m.ObjectNumber",multiple:false,visibility:"hidden"}},designTime:true}});a.prototype.init=function(e){this._generateObjectNumber();};a.prototype.exit=function(e){if(this._oImageControl){this._oImageControl.destroy();}if(this._oTitleText){this._oTitleText.destroy();this._oTitleText=undefined;}L.prototype.exit.apply(this);};a.prototype.onAfterRendering=function(){var o=this.getAggregation("_objectNumber"),p=sap.ui.getCore().getConfiguration().getRTL(),t=p?sap.ui.core.TextAlign.Left:sap.ui.core.TextAlign.Right;if(o&&o.getNumber()){o.setTextAlign(t);}};a.prototype._generateObjectNumber=function(){var n=this.getNumber(),N=this.getNumberUnit(),s=this.getNumberState(),t=this.getNumberTextDirection();this.setAggregation("_objectNumber",new O(this.getId()+"-ObjectNumber",{number:n,unit:N,state:s,textDirection:t}),true);};a.prototype._hasAttributes=function(){var b=this.getAttributes();if(b.length>0){for(var i=0;i<b.length;i++){if(!b[i]._isEmpty()){return true;}}}return false;};a.prototype._hasStatus=function(){return((this.getFirstStatus()&&!this.getFirstStatus()._isEmpty())||(this.getSecondStatus()&&!this.getSecondStatus()._isEmpty()));};a.prototype._hasBottomContent=function(){return(this._hasAttributes()||this._hasStatus()||this.getShowMarkers()||this.getMarkLocked()||this._getVisibleMarkers().length>0);};a.prototype._getVisibleAttributes=function(){var A=this.getAttributes();var v=[];for(var i=0;i<A.length;i++){if(A[i].getVisible()){v.push(A[i]);}}return v;};a.prototype._getVisibleMarkers=function(){var A=this.getMarkers();var v=[];for(var i=0;i<A.length;i++){if(A[i].getVisible()){v.push(A[i]);}}return v;};a.prototype._getImageControl=function(){var i=this.getId()+'-img';var s="2.5rem";var p;if(I.isIconURI(this.getIcon())){p={src:this.getIcon(),height:s,width:s,size:s,useIconTooltip:false,densityAware:this.getIconDensityAware()};}else{p={src:this.getIcon(),useIconTooltip:false,densityAware:this.getIconDensityAware()};}var c=['sapMObjLIcon'];this._oImageControl=sap.m.ImageHelper.getImageControl(i,this._oImageControl,this,p,c);return this._oImageControl;};a.prototype._activeHandlingInheritor=function(){var A=this.getActiveIcon();if(!!this._oImageControl&&!!A){this._oImageControl.setSrc(A);}};a.prototype._inactiveHandlingInheritor=function(){var s=this.getIcon();if(!!this._oImageControl){this._oImageControl.setSrc(s);}};a.prototype.setNumber=function(n){this.setProperty('number',n,true);this.getAggregation("_objectNumber").setNumber(n);return this;};a.prototype.setNumberUnit=function(n){this.setProperty('numberUnit',n,true);this.getAggregation('_objectNumber').setUnit(n);return this;};a.prototype.setNumberTextDirection=function(t){this.setProperty('numberTextDirection',t,true);this.getAggregation("_objectNumber").setTextDirection(t);return this;};a.prototype.setNumberState=function(v){this.setProperty('numberState',v,true);this.getAggregation("_objectNumber").setState(v);return this;};a.prototype.setMarkFavorite=function(m){return this._setOldMarkers(sap.m.ObjectMarkerType.Favorite,m);};a.prototype.setMarkFlagged=function(m){return this._setOldMarkers(sap.m.ObjectMarkerType.Flagged,m);};a.prototype.setMarkLocked=function(m){return this._setOldMarkers(sap.m.ObjectMarkerType.Locked,m);};a.prototype.setShowMarkers=function(m){var M;var A=this.getMarkers();this.setProperty("showMarkers",m,false);for(var i=0;i<A.length;i++){M=A[i].getType();if((M===sap.m.ObjectMarkerType.Flagged&&this.getMarkFlagged())||(M===sap.m.ObjectMarkerType.Favorite&&this.getMarkFavorite())||(M===sap.m.ObjectMarkerType.Locked&&this.getMarkLocked())){A[i].setVisible(m);}}return this;};a.prototype._setOldMarkers=function(m,M){var A=this.getMarkers();var h=false;var o={Flagged:"-flag",Favorite:"-favorite",Locked:"-lock"};this.setProperty("mark"+m,M,false);if(!this.getShowMarkers()){M=false;}for(var i=0;i<A.length;i++){if(A[i].getType()===m){h=true;A[i].setVisible(M);break;}}if(!h){this.insertAggregation("markers",new sap.m.ObjectMarker({id:this.getId()+o[m],type:m,visible:M}));}return this;};a.prototype._getTitleText=function(){if(!this._oTitleText){this._oTitleText=new sap.m.Text(this.getId()+"-titleText",{maxLines:2});this._oTitleText.setParent(this,null,true);}return this._oTitleText;};return a;},true);
