/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','sap/ui/core/EnabledPropagator','sap/ui/core/delegate/ItemNavigation','sap/ui/core/ResizeHandler'],function(q,l,C,E,I,R){"use strict";var S=C.extend("sap.m.SegmentedButton",{metadata:{library:"sap.m",properties:{width:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:null},enabled:{type:"boolean",group:"Behavior",defaultValue:true},selectedKey:{type:"string",group:"Data",defaultValue:"",bindable:"bindable"}},defaultAggregation:"buttons",aggregations:{buttons:{type:"sap.m.Button",multiple:true,singularName:"button"},items:{type:"sap.m.SegmentedButtonItem",multiple:true,singularName:"item",bindable:"bindable"},_select:{type:"sap.m.Select",multiple:false,visibility:"hidden"}},associations:{selectedButton:{type:"sap.m.Button",multiple:false},ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{select:{parameters:{button:{type:"sap.m.Button"},id:{type:"string"},key:{type:"string"}}}}}});E.call(S.prototype);S.prototype.init=function(){this._aWidths=[];this._oItemNavigation=new I();this._oItemNavigation.setCycling(false);this.addDelegate(this._oItemNavigation);this.removeButton=function(b){var r=S.prototype.removeButton.call(this,b);this.setSelectedButton(this.getButtons()[0]);return r;};};S.prototype.onBeforeRendering=function(){var b=this._getVisibleButtons();this._bCustomButtonWidth=b.some(function(B){return B.getWidth();});if(this._sResizeListenerId){R.deregister(this._sResizeListenerId);this._sResizeListenerId=null;}this.setSelectedKey(this.getProperty("selectedKey"));if(!this.getSelectedButton()){this._selectDefaultButton();}};S.prototype.onAfterRendering=function(){var b=this._getVisibleButtons(),p;if(!this._sResizeListenerId){p=this.getDomRef().parentNode;if(p){this._sResizeListenerId=R.register(p,this._handleContainerResize.bind(this));}}this._setItemNavigation();this._aWidths=this._getRenderedButtonWidths(b);this._updateWidth();};S.prototype._handleContainerResize=function(){var b=this._getVisibleButtons();this._clearAutoWidthAppliedToControl();this._aWidths=this._getRenderedButtonWidths(b);this._updateWidth();};S.prototype._clearAutoWidthAppliedToControl=function(){var b=this._getVisibleButtons(),B=b.length,o,i=0;if(!this.getWidth()){this.$().css("width","");}while(i<B){o=b[i];if(!o.getWidth()){o.$().css("width","");}i++;}};S.prototype._getRenderedButtonWidths=function(b){return b.map(function(B){return B.$().outerWidth();});};S.prototype._getButtonWidth=function(b){var B=b.length,w,n=0,s=0,a=0,p,P,i=0;if(this._bCustomButtonWidth){while(i<B){w=b[i].getWidth();if(w){if(w.indexOf("%")!==-1){s+=parseInt(w.slice(0,-1),10);}else{a+=parseInt(w.slice(0,-2),10);}}else{n++;}i++;}if(n===0){return false;}p=(100-s)/n;P=(a/n);if(p<0){p=0;}if(P<0){P=0;}if(P>0){return"calc("+p+"% - "+P+"px)";}else{return p+"%";}}else{return(100/B)+"%";}};S.prototype._updateWidth=function(){if(this.$().length===0||this.hasStyleClass("sapMSegmentedButtonNoAutoWidth")){return;}var c=this.getWidth(),b=this._getVisibleButtons(),B=b.length,m=(this._aWidths.length>0)?Math.max.apply(Math,this._aWidths):0,a=(100/B),p=this.$().parent().innerWidth(),w=this._getButtonWidth(b),o,i;if(!c){if((m*B)>p){this.$().css("width","100%");}else if(m>0){this.$().width((m*B)+1);}i=0;while(i<B){o=b[i];o.$().css("width",o.getWidth()?o.getWidth():w);i++;}}else if(c&&!this._bCustomButtonWidth){i=0;while(i<B){b[i].$().css("width",a+"%");i++;}}};S.prototype.exit=function(){if(this._sResizeListenerId){R.deregister(this._sResizeListenerId);this._sResizeListenerId=null;}if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation;}this._bCustomButtonWidth=null;this._aWidths=null;};S.prototype._setItemNavigation=function(){var b,d=this.getDomRef();if(d){this._oItemNavigation.setRootDomRef(d);b=this.$().find(".sapMSegBBtn:not(.sapMSegBBtnDis)");this._oItemNavigation.setItemDomRefs(b);this._focusSelectedButton();}};S.prototype.createButton=function(t,u,e,T){var b=new sap.m.Button();if(t!==null){b.setText(t);}if(u!==null){b.setIcon(u);}if(e||e===undefined){b.setEnabled(true);}else{b.setEnabled(false);}if(T){b.setTextDirection(T);}this.addButton(b);return b;};S.prototype._createButtonFromItem=function(i){var b=new sap.m.Button(i.getId()+"-button",{text:i.getText(),icon:i.getIcon(),enabled:i.getEnabled(),textDirection:i.getTextDirection(),width:i.getWidth(),tooltip:i.getTooltip(),visible:i.getVisible(),press:function(){i.firePress();}});i.oButton=b;this.addButton(b);};(function(){S.prototype.addButton=function(b){if(b){p(b,this);this.addAggregation('buttons',b);this._syncSelect();return this;}};S.prototype.insertButton=function(b,i){if(b){p(b,this);this.insertAggregation('buttons',b,i);this._syncSelect();return this;}};function p(b,P){b.attachPress(function(e){P._buttonPressed(e);});b.attachEvent("_change",P._syncSelect,P);b.attachEvent("_change",P._forwardChangeEvent,P);var o=sap.m.Button.prototype.setEnabled;b.setEnabled=function(e){b.$().toggleClass("sapMSegBBtnDis",!e).toggleClass("sapMFocusable",e);o.apply(b,arguments);};b.setVisible=function(v){sap.m.Button.prototype.setVisible.apply(this,arguments);P.invalidate();};}})();S.prototype.updateItems=function(r){var b=this.getButtons(),a,u,i;if(r!==undefined){this.updateAggregation("items");b=this.getButtons();}a=this.getAggregation("items");if(a&&b.length!==0){this.destroyAggregation("buttons",true);u=true;}a=a||[];for(i=0;i<a.length;i++){this._createButtonFromItem(a[i]);}if(u){this._updateWidth();}};S.prototype.getSelectedKey=function(){var b=this.getButtons(),a=this.getItems(),s=this.getSelectedButton(),i=0;if(a.length>0){for(;i<b.length;i++){if(b[i]&&b[i].getId()===s){this.setProperty("selectedKey",a[i].getKey(),true);return a[i].getKey();}}}return"";};S.prototype.setSelectedKey=function(k){var b=this.getButtons(),a=this.getItems(),i=0;if(!k){this.setProperty("selectedKey",k,true);return this;}if(b.length===0&&a.length>0){this.updateItems();b=this.getButtons();}if(a.length>0&&b.length>0){for(;i<a.length;i++){if(a[i]&&a[i].getKey()===k){this.setSelectedButton(b[i]);break;}}}this.setProperty("selectedKey",k,true);return this;};S.prototype.removeButton=function(b){var r=this.removeAggregation("buttons",b);if(r){delete r.setEnabled;r.detachEvent("_change",this._syncSelect,this);r.detachEvent("_change",this._forwardChangeEvent,this);this._syncSelect();}return r;};S.prototype.removeAllButtons=function(){var b=this.getButtons();if(b){for(var i=0;i<b.length;i++){var B=b[i];if(B){delete B.setEnabled;this.removeAggregation("buttons",B);B.detachEvent("_change",this._syncSelect,this);B.detachEvent("_change",this._forwardChangeEvent,this);}}this._syncSelect();}return b;};S.prototype.addItem=function(i,s){this.addAggregation("items",i,s);this.updateItems();};S.prototype.removeItem=function(i,s){var r=this.removeAggregation("items",i,s);if(i&&i instanceof sap.m.SegmentedButtonItem&&this.getSelectedButton()===i.oButton.getId()){this.setSelectedKey("");this.setSelectedButton("");}this.updateItems();return r;};S.prototype.insertItem=function(i,a,s){this.insertAggregation("items",i,a,s);this.updateItems();};S.prototype.removeAllItems=function(s){var r=this.removeAllAggregation("items",s);this.removeAllButtons();this.setSelectedKey("");this.setSelectedButton("");return r;};S.prototype._buttonPressed=function(e){var b=e.getSource();if(this.getSelectedButton()!==b.getId()){this.getButtons().forEach(function(B){B.$().removeClass("sapMSegBBtnSel");B.$().attr("aria-checked",false);});b.$().addClass("sapMSegBBtnSel");b.$().attr("aria-checked",true);this.setAssociation('selectedButton',b,true);this.setProperty("selectedKey",this.getSelectedKey(),true);this.fireSelect({button:b,id:b.getId(),key:this.getSelectedKey()});}};S.prototype._selectDefaultButton=function(){var b=this._getVisibleButtons();if(b.length>0){this.setAssociation('selectedButton',b[0],true);}};S.prototype.setSelectedButton=function(b){var s=this.getSelectedButton(),o,B=this.getButtons();this.setAssociation("selectedButton",b,true);if(s!==this.getSelectedButton()){if(this.$().length){if(!this.getSelectedButton()&&B.length>1){this._selectDefaultButton();}o=sap.ui.getCore().byId(this.getSelectedButton());B.forEach(function(a){a.$().removeClass("sapMSegBBtnSel");a.$().attr("aria-checked",false);});if(o){o.$().addClass("sapMSegBBtnSel");o.$().attr("aria-checked",true);}this._focusSelectedButton();}}this._syncSelect();return this;};S.prototype._focusSelectedButton=function(){var b=this.getButtons(),s=this.getSelectedButton(),i=0;for(;i<b.length;i++){if(b[i]&&b[i].getId()===s){this._oItemNavigation.setFocusedIndex(i);break;}}};S.prototype.onsappagedown=function(e){this._oItemNavigation.onsapend(e);};S.prototype.onsappageup=function(e){this._oItemNavigation.onsaphome(e);};S.prototype._lazyLoadSelectForm=function(){var s=this.getAggregation("_select");if(!s){s=new sap.m.Select(this.getId()+"-select");s.attachChange(this._selectChangeHandler,this);s.addStyleClass("sapMSegBSelectWrapper");this.setAggregation("_select",s,true);}};S.prototype._selectChangeHandler=function(e){var s=e.getParameter("selectedItem"),n=parseInt(s.getKey(),10),b=this.getButtons()[n],B=b.getId();b.firePress();this.setSelectedButton(B);};S.prototype._forwardChangeEvent=function(){this.fireEvent("_change");};S.prototype._syncSelect=function(){var k=0,s=0,b,o=this.getAggregation("_select");if(!o){return;}o.destroyItems();this._getVisibleButtons().forEach(function(B){b=B.getText();o.addItem(new sap.ui.core.Item({key:k.toString(),text:b?b:B.getTooltip_AsString(),enabled:B.getEnabled()}));if(B.getId()===this.getSelectedButton()){s=k;}k++;},this);o.setSelectedKey(s.toString());};S.prototype._toSelectMode=function(){this._bInOverflow=true;this.addStyleClass("sapMSegBSelectWrapper");this._lazyLoadSelectForm();this._syncSelect();};S.prototype._toNormalMode=function(){delete this._bInOverflow;this.removeStyleClass("sapMSegBSelectWrapper");this.getAggregation("_select").removeAllItems();this.destroyAggregation("_select");};S.prototype._overwriteImageOnload=function(i){var t=this;if(i.onload===sap.m.Image.prototype.onload){i.onload=function(){if(sap.m.Image.prototype.onload){sap.m.Image.prototype.onload.apply(this,arguments);}window.setTimeout(function(){t._updateWidth();},20);};}};S.prototype._getIconAriaLabel=function(i){var o=sap.ui.core.IconPool.getIconInfo(i.getSrc()),r="";if(o&&o.name){r=o.name;}return r;};S.prototype._getVisibleButtons=function(){return this.getButtons().filter(function(b){return b.getVisible();});};S.prototype.clone=function(){var s=this.getSelectedButton(),B=this.removeAllAggregation("buttons"),c=C.prototype.clone.apply(this,arguments),a=B.map(function(b){return b.getId();}).indexOf(s),i;if(a>-1){c.setSelectedButton(c.getButtons()[a]);}for(i=0;i<B.length;i++){this.addAggregation("buttons",B[i]);}return c;};return S;},true);
