/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','sap/ui/core/IconPool'],function(q,l,C,I){"use strict";var T=C.extend("sap.m.TileContainer",{metadata:{library:"sap.m",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'},editable:{type:"boolean",group:"Misc",defaultValue:null},allowAdd:{type:"boolean",group:"Misc",defaultValue:null}},defaultAggregation:"tiles",aggregations:{tiles:{type:"sap.m.Tile",multiple:true,singularName:"tile"}},events:{tileMove:{parameters:{tile:{type:"sap.m.Tile"},newIndex:{type:"int"}}},tileDelete:{parameters:{tile:{type:"sap.m.Tile"}}},tileAdd:{}}}});I.insertFontFaceStyle();T.prototype._bRtl=sap.ui.getCore().getConfiguration().getRTL();T.prototype.init=function(){this._iCurrentTileStartIndex=0;this._oDim=null;this._iScrollLeft=0;this._iScrollGap=0;if(!sap.ui.Device.system.desktop){this._iScrollGap=0;}this.bAllowTextSelection=false;this._oDragSession=null;this._oTouchSession=null;this._bAvoidChildTapEvent=false;this._iEdgeShowStart=sap.ui.Device.system.phone?10:20;if(sap.ui.Device.system.phone){this._iTriggerScrollOffset=10;}else if(sap.ui.Device.system.desktop){this._iTriggerScrollOffset=-40;}else{this._iTriggerScrollOffset=20;}this._iCurrentFocusIndex=-1;if(sap.ui.Device.system.desktop||sap.ui.Device.system.combi){var o=q.proxy(function(E){if(this._iCurrentFocusIndex>=0){var r=this._iCurrentFocusIndex-this._iCurrentFocusIndex%this._iMaxTilesX;var F=this._iCurrentTileStartIndex===this._iCurrentFocusIndex?0:this._iCurrentTileStartIndex;var t=E.ctrlKey?F:r;var k=this._getVisibleTiles()[t];if(!!k){this._findTile(k.$()).focus();E.stopPropagation();}this._handleAriaActiveDescendant();}},this),O=q.proxy(function(E){if(this._iCurrentFocusIndex>=0){var t=this._getVisibleTiles();var r=this._iCurrentFocusIndex-this._iCurrentFocusIndex%this._iMaxTilesX;var R=r+this._iMaxTilesX<t.length?r+this._iMaxTilesX-1:t.length-1;var L=this._iCurrentTileStartIndex+this._iMaxTiles<t.length?this._iCurrentTileStartIndex+this._iMaxTiles-1:t.length-1;var k=L===this._iCurrentFocusIndex?t.length-1:L;var m=E.ctrlKey?k:R;if(t.length>0){this._findTile(t[m].$()).focus();E.stopPropagation();}this._handleAriaActiveDescendant();}},this),f=q.proxy(function(E){var t=this._getVisibleTiles();if(t.length>0){var n=this._iCurrentFocusIndex-this._iMaxTiles>=0?this._iCurrentFocusIndex-this._iMaxTiles:0;var N=t[n];if(!!N){this._renderTilesInTheSamePage(n,t);this._findTile(N.$()).focus();E.stopPropagation();}this._handleAriaActiveDescendant();}},this),c=q.proxy(function(E){var t=this._getVisibleTiles(),k=t.length;if(k>0){var n=this._iCurrentFocusIndex+this._iMaxTiles<k?this._iCurrentFocusIndex+this._iMaxTiles:k-1;var N=t[n];if(!!N){this._renderTilesInTheSamePage(n,t);this._findTile(N.$()).focus();E.stopPropagation();}this._handleAriaActiveDescendant();}},this),d=q.proxy(function(E){if(this._iCurrentFocusIndex>=0){var t=this._getVisibleTiles();var n=this._iCurrentFocusIndex+1<t.length?this._iCurrentFocusIndex+1:this._iCurrentFocusIndex;if(!E.ctrlKey){var N=t[n];if(!!N){if(n<this._iCurrentTileStartIndex+this._iMaxTiles){this._findTile(N.$()).focus();}else{this._renderTilesInTheSamePage(n,t);this.scrollIntoView(N,true,t);var k=this;setTimeout(function(){k._findTile(N.$()).focus();},400);}}}else if(this.getEditable()){var m=t[this._iCurrentFocusIndex];this.moveTile(m,n);m.$().focus();}this._handleAriaActiveDescendant();E.stopPropagation();}},this),e=q.proxy(function(E){if(this._iCurrentFocusIndex>=0){var t=this._getVisibleTiles();var n=this._iCurrentFocusIndex-1>=0?this._iCurrentFocusIndex-1:this._iCurrentFocusIndex;if(!E.ctrlKey){var N=t[n];if(!!N){if(n>=this._iCurrentTileStartIndex){this._findTile(N.$()).focus();}else{this._renderTilesInTheSamePage(n,t);this.scrollIntoView(N,true,t);var k=this;setTimeout(function(){k._findTile(N.$()).focus();},400);}}}else if(this.getEditable()){var m=t[this._iCurrentFocusIndex];this.moveTile(m,n);m.$().focus();}this._handleAriaActiveDescendant();E.stopPropagation();}},this),g=q.proxy(function(E){var t=this._getVisibleTiles();if(this._iCurrentFocusIndex>=0){var m=this._iCurrentFocusIndex%this._iMaxTiles,n=this._iCurrentFocusIndex+this._iMaxTilesX,M=n%this._iMaxTiles;if(!E.ctrlKey){var N=t[n];if((M>m)&&!!N){this._findTile(N.$()).focus();}}else if(this.getEditable()){var k=t[this._iCurrentFocusIndex];this.moveTile(k,n);k.$().focus();}this._handleAriaActiveDescendant();E.stopPropagation();}},this),i=q.proxy(function(E){var t=this._getVisibleTiles();if(this._iCurrentFocusIndex>=0){var m=this._iCurrentFocusIndex%this._iMaxTiles,n=this._iCurrentFocusIndex-this._iMaxTilesX,M=n%this._iMaxTiles;if(!E.ctrlKey){var N=t[n];if((M<m)&&!!N){this._findTile(N.$()).focus();}}else if(this.getEditable()){var k=t[this._iCurrentFocusIndex];this.moveTile(k,n);k.$().focus();}this._handleAriaActiveDescendant();E.stopPropagation();}},this),j=q.proxy(function(E){var t=this._getVisibleTiles();if(this._iCurrentFocusIndex>=0&&this.getEditable()){var k=t[this._iCurrentFocusIndex];if(k.getRemovable()){this.deleteTile(k);if(this._iCurrentFocusIndex===t.length){if(t.length!==0){t[this._iCurrentFocusIndex-1].$().focus();}else{this._findNextTabbable().focus();}}else{t[this._iCurrentFocusIndex].$().focus();}this._handleAriaActiveDescendant();}E.stopPropagation();}},this);this.onsaphome=o;this.onsaphomemodifiers=o;this.onsapend=O;this.onsapendmodifiers=O;this.onsapright=this._bRtl?e:d;this.onsaprightmodifiers=this._bRtl?e:d;this.onsapleft=this._bRtl?d:e;this.onsapleftmodifiers=this._bRtl?d:e;this.onsapup=i;this.onsapupmodifiers=i;this.onsapdown=g;this.onsapdownmodifiers=g;this.onsappageup=f;this.onsappagedown=c;this.onsapdelete=j;this.data("sap-ui-fastnavgroup","true",true);}if(sap.ui.Device.system.tablet||sap.ui.Device.system.phone){this._fnOrientationChange=function(E){if(this.getDomRef()){this._oTileDimensionCalculator.calc();}}.bind(this);}this._oTileDimensionCalculator=new a(this);this._bRtl=sap.ui.getCore().getConfiguration().getRTL();this._oPagesInfo=(function(r){var k,m,n,p,P=false,R=r;return{setCurrentPage:function(s){n=k;k=s;},setCount:function(s){p=m;m=s;},setPagerCreated:function(s){P=s;},syncOldToCurrentValues:function(){p=m;n=k;},reset:function(){p=undefined;n=undefined;m=undefined;k=undefined;P=false;},getCurrentPage:function(){return k;},getCount:function(){return m;},getOldCurrentPage:function(){return n;},getOldCount:function(){return p;},isPagerCreated:function(){return P;},currentPageIsLast:function(){return R?(k===0):(k===m-1);},currentPageIsFirst:function(){return R?(k===m-1):(k===0);},oldCurrentPageIsLast:function(){return R?(n===0):(n===p-1);},oldCurrentPageIsFirst:function(){return R?(n===p-1):(n===0);},currentPageIsLastChanged:function(){return this.currentPageIsLast()!==this.oldCurrentPageIsLast();},currentPageIsFirstChanged:function(){return this.currentPageIsFirst()!==this.oldCurrentPageIsFirst();},pageCountChanged:function(){return m!==p;},currentPageChanged:function(){return k!==n;}};}(this._bRtl));this._iMaxTiles=1;};T.prototype._findNextTabbable=function(){var r=this.$();var t=q.merge(q.merge(r.nextAll(),r.parents().nextAll()).find(':sapTabbable').addBack(':sapTabbable'),q.merge(r.parents().prevAll(),r.prevAll()).find(':sapTabbable').addBack(':sapTabbable'));return t.first();};T.prototype.onBeforeRendering=function(){var t=this.getTiles(),c=t.length;if(this._sResizeListenerId){sap.ui.core.ResizeHandler.deregister(this._sResizeListenerId);this._sResizeListenerId=null;}this._oPagesInfo.reset();for(var i=0;i<c;i++){t[i]._rendered=false;}};T.prototype.onAfterRendering=function(){var v=[];this._sResizeListenerId=sap.ui.core.ResizeHandler.register(this.getDomRef().parentElement,q.proxy(this._resize,this));this._oDim=this._calculateDimension();this._applyDimension();this.$().toggleClass("sapMTCEditable",this.getEditable()===true);if(this._bRenderFirstPage){this._bRenderFirstPage=false;v=this._getVisibleTiles();this._updateTileDimensionInfoAndPageSize(v);if(this._iMaxTiles!==Infinity&&this._iMaxTiles){this._renderTiles(v,0,this._iMaxTiles-1);}}else{this._update(true);}if(sap.ui.Device.system.desktop||sap.ui.Device.system.combi){var t=v||this._getVisibleTiles();if(t.length>0&&this._mFocusables&&this._mFocusables[t[0].getId()]){this._mFocusables[t[0].getId()].eq(0).attr('tabindex','0');}}if(sap.ui.Device.system.tablet||sap.ui.Device.system.phone){sap.ui.Device.orientation.attachHandler(this._fnOrientationChange,this);}};T.prototype.setEditable=function(v){var t=this._getVisibleTiles();this.setProperty("editable",v,true);var e=this.getEditable();this.$().toggleClass("sapMTCEditable",e);for(var i=0;i<t.length;i++){var o=t[i];if(o instanceof sap.m.Tile){o.isEditable(e);}}return this;};T.prototype.updateTiles=function(r){this.destroyTiles();this.updateAggregation('tiles');};T.prototype._applyDimension=function(){var d=this._getDimension(),$=this.$(),t,o=10,c=this.$("scrl"),s,e,p=this.$("pager").outerHeight();c.css({width:d.outerwidth+"px",height:(d.outerheight-p)+"px"});t=$.position();s=c.position();e=c.outerHeight();if(sap.ui.Device.system.phone){o=2;}else if(sap.ui.Device.system.desktop){o=0;}this.$("blind").css({top:(s.top+o)+"px",left:(s.left+o)+"px",right:"auto",width:(c.outerWidth()-o)+"px",height:(e-o)+"px"});this.$("rightedge").css({top:(t.top+o)+"px",right:o+"px",left:"auto",height:(e-o)+"px"});this.$("leftedge").css({top:(t.top+o)+"px",left:(t.left+o)+"px",right:"auto",height:(e-o)+"px"});};T.prototype._resize=function(){if(this._oDragSession){return;}setTimeout(q.proxy(function(){var v=this._getVisibleTiles(),t=v.length,c=this._iCurrentTileStartIndex,o=this._oDim,n,N,d;this._oPagesInfo.reset();this._oDim=this._calculateDimension();this._updateTileDimensionInfoAndPageSize(v);if(o.width!==this._oDim.width||o.height!==this._oDim.height){for(var i=0;i<t;i++){if(v[i]._rendered){v[i]._rendered=false;v[i].$().remove();}}n=this._getPageNumberForTile(c);N=n*this._iMaxTiles;d=N+this._iMaxTiles-1;this._renderTiles(v,N,d);}},this),0);};T.prototype.exit=function(){if(this._sResizeListenerId){sap.ui.core.ResizeHandler.deregister(this._sResizeListenerId);this._sResizeListenerId=null;}if(sap.ui.Device.system.tablet||sap.ui.Device.system.phone){sap.ui.Device.orientation.detachHandler(this._fnOrientationChange,this);}delete this._oPagesInfo;};T.prototype._update=function(A,v){if(!this.getDomRef()){return;}if(!this.getVisible()){return;}v=v||this._getVisibleTiles();this._oTileDimensionCalculator.calc(v);this._updateTilePositions(v);if(!this._oDragSession){this.scrollIntoView(this._iCurrentTileStartIndex||0,A,v);}};T.prototype.getPageFirstTileIndex=function(){return this._iCurrentTileStartIndex||0;};T.prototype.moveTile=function(t,n){if(!isNaN(t)){t=this._getVisibleTiles()[t];}if(!t){q.sap.log.info("No Tile to move");return this;}this.deleteTile(t);this.insertTile(t,n);return this;};T.prototype.addTile=function(t){this.insertTile(t,this.getTiles().length);};T.prototype.insertTile=function(t,i){var c=this,v;if(sap.ui.Device.system.desktop||sap.ui.Device.system.combi){t.addEventDelegate({"onAfterRendering":function(){if(!c._mFocusables){c._mFocusables={};}c._mFocusables[this.getId()]=this.$().find("[tabindex!='-1']").addBack().filter(c._isFocusable);c._mFocusables[this.getId()].attr('tabindex','-1');}},t);var o=function(e){var i=c.indexOfAggregation("tiles",this),E=Math.floor(i/c._iMaxTiles),p=E-c._oPagesInfo.getCurrentPage();var P=c._iCurrentFocusIndex>=0?c._iCurrentFocusIndex:0;var V=c._getVisibleTiles();var d=V[P];if(d){c._mFocusables[d.getId()].attr("tabindex","-1");c._mFocusables[this.getId()].attr("tabindex","0");}if(p!=0){c.scrollIntoView(i,null,V);}c._handleAriaActiveDescendant();c._iCurrentFocusIndex=i;};t.addEventDelegate({"onfocusin":o},t);}if(this.getDomRef()){this.insertAggregation("tiles",t,i,true);v=this._getVisibleTiles();if(!this._oDragSession){if(t.getVisible()&&(v.length===1||this._getPageNumberForTile(i)<=this._oPagesInfo.getCurrentPage())){this._renderTile(t,i);this._update(false,v);}else{this._oPagesInfo.setCount(Math.ceil(v.length/this._iMaxTiles));this._updatePager();}}else{this._update(false,v);}if(sap.ui.Device.system.desktop||sap.ui.Device.system.combi){this._updateTilesTabIndex(v);}}else{this.insertAggregation("tiles",t,i);v=this._getVisibleTiles();}if(t.getVisible()){b.call(this,i,v.length,v);h.call(this,v);}return this;};T.prototype._updateTilesTabIndex=function(v){v=v||this._getVisibleTiles();if(v.length&&v.length>0){for(var i=0;i<v.length;i++){if(v[i].$().attr("tabindex")==="0"){return;}}}v[0].$().attr("tabindex","0");};T.prototype._isFocusable=function(i,e){var c=!isNaN(q(e).attr("tabindex"));var n=e.nodeName.toLowerCase();if(n==="area"){var m=e.parentNode,d=m.name,f;if(!e.href||!d||m.nodeName.toLowerCase()!=="map"){return false;}f=q("img[usemap='#"+d+"']")[0];return!!f;}return(/input|select|textarea|button|object/.test(n)?!e.disabled:n=="a"?e.href||c:c);};T.prototype.deleteTile=function(t){var v=this._getVisibleTiles(),d=this._indexOfVisibleTile(t,v);if(this.getDomRef()){v.splice(d,1);this.removeAggregation("tiles",t,true);if(!this._oDragSession){if(t.getDomRef()){t.getDomRef().parentNode.removeChild(t.getDomRef());}if(sap.ui.Device.system.desktop||sap.ui.Device.system.combi){if(this._mFocusables&&this._mFocusables[t.getId()]){delete this._mFocusables[t.getId()];}}}if(v.length===0){this._oPagesInfo.reset();}else if(t.getVisible()&&d>=0&&this._getPageNumberForTile(d)<=this._oPagesInfo.getCurrentPage()){this._renderTilesInTheSamePage(this._oPagesInfo.getCurrentPage()*this._iMaxTiles,v);}this._update(false);}else{this.removeAggregation("tiles",t,false);v=this._getVisibleTiles();}b.call(this,d,v.length);h.call(this,v);return this;};T.prototype.removeTile=T.prototype.deleteTile;T.prototype.removeAllTiles=function(){var t=this.getTiles().length-1;for(var i=t;i>=0;i--){var o=this.getTiles()[i];this.deleteTile(o);}return this;};T.prototype.destroyTiles=function(){if(this.getDomRef()){var t=this.getTiles();this.removeAllAggregation("tiles",true);this._oPagesInfo.reset();this._update();for(var i=0;i<t.length;i++){var c=t[i];c.destroy();}}else{this.destroyAggregation("tiles",false);}return this;};T.prototype.rerender=function(){if(!this._oDragSession||this._oDragSession.bDropped){C.prototype.rerender.apply(this);}};T.prototype.scrollLeft=function(){var s=0,v=this._getVisibleTiles();if(this._bRtl){s=this._iCurrentTileStartIndex+this._iMaxTiles;}else{s=this._iCurrentTileStartIndex-this._iMaxTiles;}this._renderTiles(v,s,s+this._iMaxTiles-1);this.scrollIntoView(s,null,v);};T.prototype.scrollRight=function(){var s=0,v=this._getVisibleTiles();if(this._bRtl){s=this._iCurrentTileStartIndex-this._iMaxTiles;}else{s=this._iCurrentTileStartIndex+this._iMaxTiles;}this._renderTiles(v,s,s+this._iMaxTiles-1);this.scrollIntoView(s,null,v);};T.prototype._renderTilesInTheSamePage=function(t,c){var i=this._getPageNumberForTile(t),f=i*this._iMaxTiles,L=f+this._iMaxTiles-1;this._renderTiles(c,f,L);};T.prototype._renderTiles=function(t,s,e){var n=false,i;for(i=s;i<=e;i++){if(t[i]&&!t[i]._rendered){this._renderTile(t[i],i);n=true;}}if(n){this._update(false,t);if(sap.ui.Device.system.desktop||sap.ui.Device.system.combi){this._updateTilesTabIndex();}}};T.prototype.scrollIntoView=function(t,A,v){var c=this._getContentDimension().outerwidth,i=t,d=this.getTiles();if(isNaN(t)){i=this.indexOfAggregation("tiles",t);}if(!d[i]||!d[i].getVisible()){return;}v=v||this._getVisibleTiles();i=this._indexOfVisibleTile(d[i]);this._applyPageStartIndex(i,v);this._oPagesInfo.setCurrentPage(Math.floor(this._iCurrentTileStartIndex/this._iMaxTiles));if(this._bRtl){this._scrollTo((this._oPagesInfo.getCount()-this._oPagesInfo.getCurrentPage())*c,A);}else{this._scrollTo(this._oPagesInfo.getCurrentPage()*c,A);}this._updatePager();};T.prototype._updateTilePositions=function(v){var d=this._getDimension();if(d.height===0){return;}v=v||this._getVisibleTiles();if(v.length===0){this._oPagesInfo.setCount(0);this._updatePager();return;}this._applyPageStartIndex(this._iCurrentTileStartIndex,v);this._applyDimension();var c=this._getContentDimension();this._oPagesInfo.setCount(Math.ceil(v.length/this._iMaxTiles));var t=this._oTileDimensionCalculator.getLastCalculatedDimension();for(var i=0;i<v.length;i++){if(!v[i]._rendered||v[i].isDragged()){continue;}var p=Math.floor(i/this._iMaxTiles),o=v[i],L=(p*c.outerwidth)+this._iOffsetX+i%this._iMaxTilesX*t.width,e=this._iOffsetY+Math.floor(i/this._iMaxTilesX)*t.height-(p*this._iMaxTilesY*t.height);if(this._bRtl){L=(this._oPagesInfo.getCount()-p)*c.outerwidth-this._iOffsetX-(i%this._iMaxTilesX+1)*t.width;}o.setPos(L,e);o.setSize(t.width,t.height);}};T.prototype._findTile=function($){if($.hasClass('sapMTile')||$.hasClass('sapMCustomTile')){return $;}else{return $.find('.sapMTile')||$.find('.sapMCustomTile');}};T.prototype._updatePager=function(){var p,s,S,H;if(!this._oPagesInfo.pageCountChanged()&&!this._oPagesInfo.currentPageChanged()){return;}p=this.$("pager")[0];s=this.$("leftscroller")[0];S=this.$("rightscroller")[0];if(this._oPagesInfo.getCount()==undefined||this._oPagesInfo.getCount()<=1){p.innerHTML="";S.style.right="-100px";s.style.left="-100px";s.style.display="none";S.style.display="none";this._oPagesInfo.setPagerCreated(false);return;}if(!this._oPagesInfo.isPagerCreated()){H=[""];for(var i=0;i<this._oPagesInfo.getCount();i++){H.push("");}p.innerHTML=H.join("<span></span>");p.style.display="block";p.childNodes[0].className="sapMTCActive";this._oPagesInfo.setPagerCreated(true);}else if(this._oPagesInfo.pageCountChanged()){if(this._oPagesInfo.getCount()-this._oPagesInfo.getOldCount()<0){p.removeChild(p.lastChild);}else{p.appendChild(document.createElement("span"));}}if(this._oPagesInfo.currentPageChanged()){p.childNodes[this._oPagesInfo.getCurrentPage()].className="sapMTCActive";if(p.childNodes[this._oPagesInfo.getOldCurrentPage()]){p.childNodes[this._oPagesInfo.getOldCurrentPage()].className="";}if(this._oPagesInfo.getCurrentPage()>=2){p.childNodes[0].className="";}}if(sap.ui.Device.system.desktop&&(this._oPagesInfo.currentPageIsFirstChanged()||this._oPagesInfo.currentPageIsLastChanged())){if(this._bRtl){S.style.left="auto";s.style.right="auto";}S.style.right=this._oPagesInfo.currentPageIsLast()?"-100px":"1rem";s.style.left=this._oPagesInfo.currentPageIsFirst()?"-100px":"1rem";S.style.display=this._oPagesInfo.currentPageIsLast()?"none":"block";s.style.display=this._oPagesInfo.currentPageIsFirst()?"none":"block";}this._oPagesInfo.syncOldToCurrentValues();};T.prototype._getContentDimension=function(){if(!this.getDomRef()){return;}var s=this.$("scrl");return{width:s.width(),height:s.height()-20,outerheight:s.outerHeight()-20,outerwidth:s.outerWidth()};};T.prototype._getDimension=function(){if(!this._oDim){this._oDim=this._calculateDimension();}return this._oDim;};T.prototype._calculatePageSize=function(v){var d,t;v=v||this._getVisibleTiles();t=v.length;if(t===0){return;}d=q.extend({},this._getDimension());if(d.height===0){return;}if(sap.ui.Device.system.desktop){d.width-=45*2;}var o=this._oTileDimensionCalculator.getLastCalculatedDimension(),p=this.$("pager")[0].offsetHeight,m=Math.max(Math.floor(d.width/o.width),1),M=Math.max(Math.floor((d.height-p)/o.height),1),n=(t<m)?t:m,N=(t/n<M)?Math.ceil(t/n):M;this._iMaxTiles=m*M;this._iMaxTilesX=m;this._iMaxTilesY=M;this._iOffsetX=Math.floor((d.width-(o.width*n))/2);if(sap.ui.Device.system.desktop){this._iOffsetX+=45;}this._iOffsetY=Math.floor((d.height-p-(o.height*N))/2);};T.prototype._getTilesFromPosition=function(x,y){if(!this._getVisibleTiles().length){return[];}x=x+this._iScrollLeft;var t=this._getVisibleTiles(),r=[];for(var i=0;i<t.length;i++){var o=t[i],R={top:o._posY,left:o._posX,width:o._width,height:o._height};if(!t[i].isDragged()&&y>R.top&&y<R.top+R.height&&x>R.left&&x<R.left+R.width){r.push(t[i]);}}return r;};T.prototype._applyPageStartIndex=function(i,v){var c=this._getDimension();if(c.height===0){return;}v=v||this._getVisibleTiles();this._calculatePageSize(v);var L=v.length;if(i<0){i=0;}else if(i>L-1){i=L-1;}var d=Math.floor(i/this._iMaxTiles||0);this._iCurrentTileStartIndex=d*(this._iMaxTiles||0);q.sap.log.info("current index "+this._iCurrentTileStartIndex);};T.prototype._scrollTo=function(s,A){if(A!==false){A=true;}this._applyTranslate(this.$("cnt"),-s,0,A);if(this._bRtl){this._iScrollLeft=s-this._getContentDimension().outerwidth;}else{this._iScrollLeft=s;}};T.prototype._applyTranslate=function(c,x,y,A){var o=c[0];this.$("cnt").toggleClass("sapMTCAnim",A);if("webkitTransform"in o.style){c.css('-webkit-transform','translate3d('+x+'px,'+y+'px,0)');}else if("MozTransform"in o.style){c.css('-moz-transform','translate('+x+'px,'+y+'px)');}else if("transform"in o.style){c.css('transform','translate3d('+x+'px,'+y+'px,0)');}else if("msTransform"in o.style){c.css('-ms-transform','translate('+x+'px,'+y+'px)');}};T.prototype._initTouchSession=function(e){if(e.type=="touchstart"){var t=e.targetTouches[0];this._oTouchSession={dStartTime:new Date(),fStartX:t.pageX,fStartY:t.pageY,fDiffX:0,fDiffY:0,oControl:e.srcControl,iOffsetX:t.pageX-e.target.offsetLeft};}else{this._oTouchSession={dStartTime:new Date(),fStartX:e.pageX,fStartY:e.pageY,fDiffX:0,fDiffY:0,oControl:e.srcControl,iOffsetX:e.pageX-e.target.offsetLeft};}};T.prototype._initDragSession=function(e){while(e.srcControl&&e.srcControl.getParent()!=this){e.srcControl=e.srcControl.getParent();}var i=this.indexOfAggregation("tiles",e.srcControl);if(e.type=="touchstart"){this._oDragSession={oTile:e.srcControl,oTileElement:e.srcControl.$()[0],iOffsetLeft:e.targetTouches[0].pageX-e.srcControl._posX+this._iScrollLeft,iOffsetTop:e.targetTouches[0].pageY-e.srcControl._posY,iIndex:i,iOldIndex:i,iDiffX:e.targetTouches[0].pageX,iDiffY:e.targetTouches[0].pageY};}else{this._oDragSession={oTile:e.srcControl,oTileElement:e.srcControl.$()[0],iOffsetLeft:e.pageX-e.srcControl._posX+this._iScrollLeft,iOffsetTop:e.pageY-e.srcControl._posY,iIndex:i,iOldIndex:i,iDiffX:e.pageX,iDiffY:e.pageY};}};T.prototype.onclick=function(e){var p=this.$("pager")[0];if(e.target.id==this.getId()+"-leftscroller"||e.target.parentNode.id==this.getId()+"-leftscroller"){this.scrollLeft();}else if(e.target.id==this.getId()+"-rightscroller"||e.target.parentNode.id==this.getId()+"-rightscroller"){this.scrollRight();}else if(e.target==p&&sap.ui.Device.system.desktop){if(e.offsetX<p.offsetWidth/2){this.scrollLeft();}else{this.scrollRight();}}};T.prototype.ontouchstart=function(e){e.setMarked();if(e.targetTouches.length>1||this._oTouchSession){return;}while(e.srcControl&&e.srcControl.getParent()!=this){e.srcControl=e.srcControl.getParent();}if(e.srcControl instanceof sap.m.Tile&&this.getEditable()){if(e.target.className!="sapMTCRemove"){this._initDragSession(e);this._initTouchSession(e);this._oDragSession.oTile.isDragged(true);}else{this._initTouchSession(e);}this._bAvoidChildTapEvent=true;}else{this._initTouchSession(e);}q(document).on("touchmove mousemove",q.proxy(this._onmove,this));q(document).on("touchend touchcancel mouseup",q.proxy(this._onend,this));};T.prototype._onmove=function(e){if(document.selection&&document.selection.clear){document.selection.clear();}if(e.isMarked("delayedMouseEvent")){return;}if(e.targetTouches&&e.targetTouches.length>1){return;}if(!e.targetTouches){e.targetTouches=[{pageX:e.pageX,pageY:e.pageY}];}var t=this._oTouchSession;t.fDiffX=t.fStartX-e.targetTouches[0].pageX;t.fDiffY=t.fStartY-e.targetTouches[0].pageY;if(this._oDragSession){if(Math.abs(t.fDiffX)>5){if(!this._oDragSession.bStarted){this._oDragSession.bStarted=true;this._onDragStart(e);}else{this._onDrag(e);}this._bAvoidChildTapEvent=true;}}else if(t){var c=this._getContentDimension().outerwidth;var n=-this._iScrollLeft-t.fDiffX;if(n>this._iScrollGap){return;}else if(n<-(((this._oPagesInfo.getCount()-1)*c)+this._iScrollGap)){return;}if(this._bRtl){n=n-c;}var v=this._getVisibleTiles();var N=this._iCurrentTileStartIndex+this._iMaxTiles;var i=N+this._iMaxTiles-1;this._renderTiles(v,N,i);this._applyTranslate(this.$("cnt"),n,0,false);}};T.prototype._onend=function(e){if(e.isMarked("delayedMouseEvent")){return;}q(document).off("touchend touchcancel mouseup",this._onend);q(document).off("touchmove mousemove",this._onmove);if(this._oDragSession){this._onDrop(e);delete this._oTouchSession;return;}if(!this._oTouchSession){return;}var t=this._oTouchSession,d=new Date(),f=(d-t.dStartTime<600),r=this._bRtl?-1:1;if(f){var p=this.$("pager")[0];if(Math.abs(t.fDiffX)>30){this._applyPageStartIndex(this._iCurrentTileStartIndex+((t.fDiffX*r>0?1:-1)*this._iMaxTiles));this._bAvoidChildTapEvent=true;}else if(e.target==p&&!sap.ui.Device.system.desktop){if((t.iOffsetX-p.offsetWidth/2)*r<0){this.scrollLeft();}else{this.scrollRight();}this._bAvoidChildTapEvent=true;}else if(e.target.className=="sapMTCRemove"){if(e.type==="touchend"||(e.type==="mouseup"&&e.button===0)){this.fireTileDelete({tile:t.oControl});}}}else{var c=this._getContentDimension();if(Math.abs(t.fDiffX)>c.outerwidth/2){this._applyPageStartIndex(this._iCurrentTileStartIndex+((t.fDiffX*r>0?1:-1)*this._iMaxTiles));this._bAvoidChildTapEvent=true;}}this._update();delete this._oDragSession;delete this._oTouchSession;var g=this;setTimeout(function(){g._bAvoidChildTapEvent=false;},100);};T.prototype._onDragStart=function(e){this.$().append(this._oDragSession.oTileElement);this._oDragSession.iDiffX=this._oTouchSession.fStartX-this._oTouchSession.fDiffX;this._oDragSession.iDiffY=this._oTouchSession.fStartY-this._oTouchSession.fDiffY;this._oDragSession.oTile.setPos(this._oDragSession.iDiffX-this._oDragSession.iOffsetLeft,this._oDragSession.iDiffY-this._oDragSession.iOffsetTop);this.$("blind").css("display","block");};T.prototype._onDrag=function(e){if(!this._oTouchSession){clearTimeout(this.iScrollTimer);this._oDragSession=null;this.iScrollTimer=null;this._bTriggerScroll=false;return;}this._oDragSession.iDiffX=this._oTouchSession.fStartX-this._oTouchSession.fDiffX;this._oDragSession.iDiffY=this._oTouchSession.fStartY-this._oTouchSession.fDiffY;var c=this._getContentDimension(),t=this._oDragSession.iDiffY-this._oDragSession.iOffsetTop,L=this._oDragSession.iDiffX-this._oDragSession.iOffsetLeft,m=t+(this._oDragSession.oTileElement.offsetHeight/2),i=L+(this._oDragSession.oTileElement.offsetWidth/2),s=L+this._oDragSession.oTileElement.offsetWidth-this._iTriggerScrollOffset>c.width,S=L<-this._iTriggerScrollOffset,n=c.width-(L+this._oDragSession.oTileElement.offsetWidth),N=L;this._oDragSession.oTile.setPos(L,t);this._oDragSession.oTile.$().css("clip","auto");var r=this.$("rightedge")[0];if(L+this._oDragSession.oTile._width>r.offsetLeft+r.offsetWidth&&this._oPagesInfo.getCurrentPage()<this._oPagesInfo.getCount()-1){var d=r.offsetLeft+r.offsetWidth-L-((this._oDragSession.oTile._width-this._oDragSession.oTile.$().outerWidth(false))/2)-2;this._oDragSession.oTile.$().css("clip","rect(-25px,"+d+"px,"+(this._oDragSession.oTile._height+20)+"px,-25px)");}var o=this.$("leftedge")[0];if(L<o.offsetLeft+2+((this._oDragSession.oTile._width-this._oDragSession.oTile.$().outerWidth(false))/2)&&this._oPagesInfo.getCurrentPage()>0){var f=o.offsetLeft+4-L-((this._oDragSession.oTile._width-this._oDragSession.oTile.$().outerWidth(false))/2);this._oDragSession.oTile.$().css("clip","rect(-25px,"+this._oDragSession.oTile._width+"px,"+(this._oDragSession.oTile._height+20)+"px,"+f+"px)");}if(n<this._iEdgeShowStart&&this._oPagesInfo.getCurrentPage()<this._oPagesInfo.getCount()-1){var O=(this._iEdgeShowStart-n)/(this._iEdgeShowStart+this._iTriggerScrollOffset);this.$("rightedge").css("opacity",""+O);}else{this.$("rightedge").css("opacity","0.01");}if(N<this._iEdgeShowStart&&this._oPagesInfo.getCurrentPage()>0){var O=(this._iEdgeShowStart-N)/(this._iEdgeShowStart+this._iTriggerScrollOffset);this.$("leftedge").css("opacity",""+O);}else{this.$("leftedge").css("opacity","0.01");}var g;if(this._bRtl){g=s&&this._oPagesInfo.getCurrentPage()>0||S&&this._oPagesInfo.getCurrentPage()<this._oPagesInfo.getCount()-1;}else{g=S&&this._oPagesInfo.getCurrentPage()>0||s&&this._oPagesInfo.getCurrentPage()<this._oPagesInfo.getCount()-1;}if(g){if(this._bTriggerScroll){S?this.scrollLeft():this.scrollRight();}else{var j=this;if(!this.iScrollTimer){this.iScrollTimer=setInterval(function(){j._bTriggerScroll=true;j._onDrag(e);j._bTriggerScroll=false;},1000);}}return;}else{if(this.iScrollTimer){clearTimeout(this.iScrollTimer);this._bTriggerScroll=false;this.iScrollTimer=null;}}var H=this._getTilesFromPosition(i,m);if(H&&H.length>0){var k=H[0],R={top:k._posY,left:k._posX,width:k._width,height:k._height};var p=this.indexOfAggregation("tiles",k);if(i+this._iScrollLeft<((R.left+R.width)/2)&&(p%this._iMaxTilesX)!=0){p--;}this._oDragSession.iIndex=p;this.moveTile(this._oDragSession.oTile,this._oDragSession.iIndex);}else if(this._oPagesInfo.getCurrentPage()==this._oPagesInfo.getCount()-1){var u=this._getVisibleTiles(),v=u[u.length-1];if(v&&i>v._posX-this._iScrollLeft&&m>v._posY){this._oDragSession.iIndex=u.length-1;this.moveTile(this._oDragSession.oTile,this._oDragSession.iIndex);}}};T.prototype._onDrop=function(e){if(this._oDragSession){var t=this._oDragSession.oTile,i=this._oDragSession.iIndex;this._oDragSession.oTile.isDragged(false);if(this._oDragSession.iOldIndex!=this._oDragSession.iIndex){this.fireTileMove({tile:t,newIndex:i});}this.$("blind").css("display","block");if(this._oDragSession.bStarted){this._oDragSession.oTile.setPos(this._oDragSession.oTile._posX+this._iScrollLeft,this._oDragSession.oTile._posY);}this._oDragSession.oTile.$().css("clip","auto");this.$("rightedge").css("opacity","0.01");this.$("leftedge").css("opacity","0.01");this.$("cnt").append(this._oDragSession.oTileElement);delete this._oDragSession;this.moveTile(t,i);this.scrollIntoView(t,false);if(sap.ui.Device.system.desktop||sap.ui.Device.system.combi){this._findTile(t.$()).focus();}this._handleAriaActiveDescendant();this.$("blind").css("display","none");}};T.prototype._handleAriaActiveDescendant=function(){var A=q(document.activeElement).control(0);if(A instanceof sap.m.Tile&&A.getParent()===this){this.getDomRef().setAttribute("aria-activedescendant",A.getId());}};T.prototype._renderTile=function(t,i){var r=sap.ui.getCore().createRenderManager(),c=this.$("cnt")[0];r.renderControl(t);r.flush(c,false,i);r.destroy();};T.prototype.onThemeChanged=function(){if(this.getDomRef()){this.invalidate();}};T.prototype._calculateDimension=function(){var d=this.$();if(!d){return;}return{width:d.width(),height:d.height(),outerheight:d.outerHeight(),outerwidth:d.outerWidth()};};T.prototype._getVisibleTiles=function(){var r=[],t=this.getTiles();for(var i=0,c=t.length;i<c;i++){if(t[i].mProperties["visible"]){r.push(t[i]);}}return r;};T.prototype._indexOfVisibleTile=function(t,c){var i,d;c=c||this._getVisibleTiles();d=c.length;for(i=0;i<d;i++){if(c[i]===t){return i;}}return-1;};T.prototype._updateTileDimensionInfoAndPageSize=function(v){v=v||this._getVisibleTiles();this._oTileDimensionCalculator.calc(v);this._calculatePageSize(v);};T.prototype._getPageNumberForTile=function(t){return Math.floor((t/this._iMaxTiles)||0);};var a=function(t){this._oDim=null;this._oTileContainer=t;};a.prototype.calc=function(v){var V,t;if(!this._oTileContainer.getDomRef()){return;}V=v||this._oTileContainer._getVisibleTiles();if(V.length){t=V[0];for(var i=0,c=V.length;i<c;i++){if(V[i]._rendered){t=V[i];break;}}this._oDim={width:Math.round(t.$().outerWidth(true)),height:Math.round(t.$().outerHeight(true))};}return this._oDim;};a.prototype.getLastCalculatedDimension=function(){return this._oDim;};function h(v){var t,i,o;v=v||this._getVisibleTiles();t=v.length;for(i=0;i<t;i++){o=v[i];if(o._rendered&&o.getDomRef()){o.getDomRef().setAttribute("aria-setsize",t);}}}function b(s,e,v){var i,t=null;v=v||this._getVisibleTiles();for(i=s;i<e;i++){t=v[i];if(t){t.$().attr('aria-posinset',this._indexOfVisibleTile(t,v)+1);}}}return T;},true);
