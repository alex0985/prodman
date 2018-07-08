/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/CustomData","sap/ui/layout/Grid","./ObjectPageSectionBase","./ObjectPageSubSectionLayout","./ObjectPageSubSectionMode","./BlockBase","sap/ui/layout/GridData","sap/m/Button","sap/ui/Device","./ObjectPageLazyLoader","sap/ui/core/StashedControlSupport","./library"],function(C,G,O,a,b,B,c,d,D,e,S,l){"use strict";var f=O.extend("sap.uxap.ObjectPageSubSection",{metadata:{library:"sap.uxap",properties:{mode:{type:"sap.uxap.ObjectPageSubSectionMode",group:"Appearance",defaultValue:b.Collapsed},titleUppercase:{type:"boolean",group:"Appearance",defaultValue:false}},defaultAggregation:"blocks",aggregations:{_grid:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},blocks:{type:"sap.ui.core.Control",multiple:true,singularName:"block"},moreBlocks:{type:"sap.ui.core.Control",multiple:true,singularName:"moreBlock"},actions:{type:"sap.ui.core.Control",multiple:true,singularName:"action"}}}});f.MEDIA_RANGE=D.media.RANGESETS.SAP_STANDARD;f.prototype.init=function(){O.prototype.init.call(this);this._bRenderedFirstTime=false;this._aAggregationProxy={blocks:[],moreBlocks:[]};this._$spacer=[];this._sContainerSelector=".sapUxAPBlockContainer";this._switchSubSectionMode(this.getMode());};f.prototype._expandSection=function(){O.prototype._expandSection.call(this);var p=this.getParent();p&&typeof p._expandSection==="function"&&p._expandSection();return this;};f.prototype._getGrid=function(){if(!this.getAggregation("_grid")){this.setAggregation("_grid",new G({id:this.getId()+"-innerGrid",defaultSpan:"XL12 L12 M12 S12",hSpacing:1,vSpacing:1,width:"100%",containerQuery:true}),true);}return this.getAggregation("_grid");};f.prototype._unStashControls=function(){S.getStashedControls(this.getId()).forEach(function(o){o.setStashed(false);});};f.prototype.connectToModels=function(){var g=this.getBlocks()||[],m=this.getMoreBlocks()||[],s=this.getMode();this._unStashControls();g.forEach(function(o){if(o instanceof B){if(!o.getMode()){o.setMode(s);}o.connectToModels();}});if(m.length>0&&s===b.Expanded){m.forEach(function(M){if(M instanceof B){if(!M.getMode()){M.setMode(s);}M.connectToModels();}});}};f.prototype._allowPropagationToLoadedViews=function(A){var g=this.getBlocks()||[],m=this.getMoreBlocks()||[];g.forEach(function(o){if(o instanceof B){o._allowPropagationToLoadedViews(A);}});m.forEach(function(M){if(M instanceof B){M._allowPropagationToLoadedViews(A);}});};f.prototype.clone=function(){Object.keys(this._aAggregationProxy).forEach(function(A){var o=this.mAggregations[A];if(!o||o.length===0){this.mAggregations[A]=this._aAggregationProxy[A];}},this);return sap.ui.core.Control.prototype.clone.apply(this,arguments);};f.prototype._cleanProxiedAggregations=function(){var p=this._aAggregationProxy;Object.keys(p).forEach(function(k){p[k].forEach(function(o){o.destroy();});});};f.prototype.exit=function(){if(this._oSeeMoreButton){this._oSeeMoreButton.destroy();this._oSeeMoreButton=null;}D.media.detachHandler(this._updateImportance,this,f.MEDIA_RANGE);D.media.detachHandler(this._titleOnLeftSynchronizeLayouts,this,f.MEDIA_RANGE);this._cleanProxiedAggregations();if(O.prototype.exit){O.prototype.exit.call(this);}};f.prototype.onAfterRendering=function(){var o=this._getObjectPageLayout();if(O.prototype.onAfterRendering){O.prototype.onAfterRendering.call(this);}if(!o){return;}if(this._getUseTitleOnTheLeft()){D.media.attachHandler(this._titleOnLeftSynchronizeLayouts,this,f.MEDIA_RANGE);}else{D.media.detachHandler(this._titleOnLeftSynchronizeLayouts,this,f.MEDIA_RANGE);}this._$spacer=jQuery.sap.byId(o.getId()+"-spacer");};f.prototype.onBeforeRendering=function(){if(O.prototype.onBeforeRendering){O.prototype.onBeforeRendering.call(this);}this._setAggregationProxy();this._getGrid().removeAllContent();this._applyLayout(this._getObjectPageLayout());this.refreshSeeMoreVisibility();};f.prototype._applyLayout=function(L){var v,g=this._getGrid(),s=this.getMode(),h=L.getSubSectionLayout(),o=this._calculateLayoutConfiguration(h,L),i=this.getBlocks(),A=i.concat(this.getMoreBlocks());this._oLayoutConfig=o;this._resetLayoutData(A);if(s===b.Expanded){v=A;}else{v=i;}this._calcBlockColumnLayout(v,this._oLayoutConfig);try{v.forEach(function(j){this._setBlockMode(j,s);g.addAggregation("content",j,true);},this);}catch(E){jQuery.sap.log.error("ObjectPageSubSection :: error while building layout "+h+": "+E);}return this;};f.prototype._calculateLayoutConfiguration=function(L,o){var g={M:2,L:3,XL:4},i=g.L,E=g.XL,t=(L===a.TitleOnLeft),u=o.getUseTwoColumnsForLargeScreen();if(t){i-=1;E-=1;}if(u){i-=1;}g.L=i;g.XL=E;return g;};f.prototype.refreshSeeMoreVisibility=function(){var g=!!this.getMoreBlocks().length,s=this._getSeeMoreButton(),$=s.$(),h=this.$();if(!g){g=this.getBlocks().some(function(o){if(o instanceof B&&o.getVisible()&&o.getShowSubSectionMore()){return true;}});}if(h.length){h.toggleClass("sapUxAPObjectPageSubSectionWithSeeMore",g);}this.toggleStyleClass("sapUxAPObjectPageSubSectionWithSeeMore",g);if($.length){$.toggleClass("sapUxAPSubSectionSeeMoreButtonVisible",g);}s.toggleStyleClass("sapUxAPSubSectionSeeMoreButtonVisible",g);return g;};f.prototype.setMode=function(m){if(this.getMode()!==m){this._switchSubSectionMode(m);if(this._bRenderedFirstTime){this.rerender();}}return this;};f.prototype.onkeydown=function(E){if(E.keyCode===jQuery.sap.KeyCodes.F7){E.stopPropagation();var t=sap.ui.getCore().byId(E.target.id);if(t instanceof f){this._handleSubSectionF7();}else{this._handleInteractiveElF7();this._oLastFocusedControlF7=t;}}};f.prototype._handleInteractiveElF7=function(){if(this.getParent().getSubSections().length>1){this.$().focus();}else{this.getParent().$().focus();}};f.prototype._handleSubSectionF7=function(E){if(this._oLastFocusedControlF7){this._oLastFocusedControlF7.$().focus();}else{this.$().firstFocusableDomRef().focus();}};f.prototype._calcBlockColumnLayout=function(g,o){var i=12,v,M,L,X,h;M={iRemaining:o.M,iColumnConfig:o.M};L={iRemaining:o.L,iColumnConfig:o.L};X={iRemaining:o.XL,iColumnConfig:o.XL};h=[X,L,M];v=g.filter(function(j){return j.getVisible&&j.getVisible();});v.forEach(function(j,I){h.forEach(function(k){k.iCalculatedSize=this._calculateBlockSize(j,k.iRemaining,v,I,k.iColumnConfig);},this);j.setLayoutData(new c(j.getId()+"-layoutData",{spanS:i,spanM:M.iCalculatedSize*(i/M.iColumnConfig),spanL:L.iCalculatedSize*(i/L.iColumnConfig),spanXL:X.iCalculatedSize*(i/X.iColumnConfig),linebreakM:(I>0&&M.iRemaining===M.iColumnConfig),linebreakL:(I>0&&L.iRemaining===L.iColumnConfig),linebreakXL:(I>0&&X.iRemaining===X.iColumnConfig)}));h.forEach(function(k){k.iRemaining-=k.iCalculatedSize;if(k.iRemaining<1){k.iRemaining=k.iColumnConfig;}});},this);return v;};f.prototype._calculateBlockSize=function(o,r,v,i,m){var g,F=m,h;if(!this._hasAutoLayout(o)){return Math.min(m,parseInt(o.getColumnLayout(),10));}for(h=1;h<=F;h++){g=this._calcLayout(v[i+h]);if(g<r){r-=g;}else{break;}}return r;};f.prototype._calcLayout=function(o){var L=1;if(!o){L=0;}else if(o instanceof B&&o.getColumnLayout()!="auto"){L=parseInt(o.getColumnLayout(),10);}return L;};f.prototype._hasAutoLayout=function(o){return!(o instanceof B)||o.getColumnLayout()=="auto";};f.prototype._onDesktopMediaRange=function(o){var m=o||D.media.getCurrentRange(f.MEDIA_RANGE);return["LargeDesktop","Desktop"].indexOf(m.name)>-1;};f.prototype._titleOnLeftSynchronizeLayouts=function(o){this.$("header").toggleClass("titleOnLeftLayout",this._onDesktopMediaRange(o));};f.prototype._setAggregationProxy=function(){if(this._bRenderedFirstTime){return;}jQuery.each(this._aAggregationProxy,jQuery.proxy(function(A,v){this._setAggregation(A,this.removeAllAggregation(A,true),true);},this));this._bRenderedFirstTime=true;};f.prototype.hasProxy=function(A){return this._bRenderedFirstTime&&this._aAggregationProxy.hasOwnProperty(A);};f.prototype._getAggregation=function(A){return this._aAggregationProxy[A];};f.prototype._setAggregation=function(A,v,s){this._aAggregationProxy[A]=v;if(s!==true){this._notifyObjectPageLayout();this.invalidate();}return this._aAggregationProxy[A];};f.prototype.addAggregation=function(A,o,s){var g;if(o instanceof e){o.getContent().forEach(function(h){this.addAggregation(A,h,true);},this);o.removeAllContent();o.destroy();this.invalidate();return this;}if(this.hasProxy(A)){g=this._getAggregation(A);g.push(o);this._setAggregation(A,g,s);if(o instanceof B||o instanceof e){o.setParent(this);}return this;}return O.prototype.addAggregation.apply(this,arguments);};f.prototype.insertAggregation=function(A,o,i){if(this.hasProxy(A)){jQuery.sap.log.warning("ObjectPageSubSection :: used of insertAggregation for "+A+" is not supported, will use addAggregation instead");return this.addAggregation(A,o);}return O.prototype.insertAggregation.apply(this,arguments);};f.prototype.removeAllAggregation=function(A,s){var i;if(this.hasProxy(A)){i=this._getAggregation(A);this._setAggregation(A,[],s);return i.slice();}return O.prototype.removeAllAggregation.apply(this,arguments);};f.prototype.removeAggregation=function(A,o){var r=false,i;if(this.hasProxy(A)){i=this._getAggregation(A);i.forEach(function(g,I){if(g.getId()===o.getId()){i.splice(I,1);this._setAggregation(A,i);r=true;}return!r;},this);return(r?o:null);}return O.prototype.removeAggregation.apply(this,arguments);};f.prototype.indexOfAggregation=function(A,o){var i=-1;if(this.hasProxy(A)){this._getAggregation(A).some(function(g,I){if(g.getId()===o.getId()){i=I;return true;}},this);return i;}return O.prototype.indexOfAggregation.apply(this,arguments);};f.prototype.getAggregation=function(A){if(this.hasProxy(A)){return this._getAggregation(A);}return O.prototype.getAggregation.apply(this,arguments);};f.prototype.destroyAggregation=function(A){if(this.hasProxy(A)){this._getAggregation(A).forEach(function(o){o.destroy();});this._setAggregation(A,[]);return this;}return O.prototype.destroyAggregation.apply(this,arguments);};f.prototype._getSeeMoreButton=function(){if(!this._oSeeMoreButton){this._oSeeMoreButton=new d(this.getId()+"--seeMore",{type:sap.m.ButtonType.Transparent,iconFirst:false}).addStyleClass("sapUxAPSubSectionSeeMoreButton").attachPress(this._seeMoreLessControlPressHandler,this);}return this._oSeeMoreButton;};f.prototype._seeMoreLessControlPressHandler=function(E){var s=this.getMode(),t,m=this.getMoreBlocks()||[];if(s===b.Expanded){t=b.Collapsed;}else{t=b.Expanded;m.forEach(function(o){if(o instanceof B){o.setMode(s);o.connectToModels();}},this);}this._switchSubSectionMode(t);if(this._$spacer.length>0){this._$spacer.height(this._$spacer.height()+this.$().height());}this.rerender();};f.prototype._switchSubSectionMode=function(s){s=this.validateProperty("mode",s);if(s===b.Collapsed){this.setProperty("mode",b.Collapsed,true);this._getSeeMoreButton().setText(l.i18nModel.getResourceBundle().getText("SEE_MORE"));}else{this.setProperty("mode",b.Expanded,true);this._getSeeMoreButton().setText(l.i18nModel.getResourceBundle().getText("SEE_LESS"));}};f.prototype._setBlockMode=function(o,m){if(o instanceof B){o.setMode(m);}else{jQuery.sap.log.debug("ObjectPageSubSection :: cannot propagate mode "+m+" to "+o.getMetadata().getName());}};f.prototype._setToFocusable=function(F){var s='0',n='-1',t="tabIndex";if(F){this.$().attr(t,s);}else{this.$().attr(t,n);}return this;};f.prototype._getUseTitleOnTheLeft=function(){var o=this._getObjectPageLayout();return o.getSubSectionLayout()===a.TitleOnLeft;};f.prototype._resetLayoutData=function(g){g.forEach(function(o){if(o.getLayoutData()){o.destroyLayoutData();}},this);};f.prototype.getVisibleBlocksCount=function(){var v=S.getStashedControls(this.getId()).length;(this.getBlocks()||[]).forEach(function(o){if(o.getVisible&&!o.getVisible()){return true;}v++;});(this.getMoreBlocks()||[]).forEach(function(m){if(m.getVisible&&!m.getVisible()){return true;}v++;});return v;};return f;});
