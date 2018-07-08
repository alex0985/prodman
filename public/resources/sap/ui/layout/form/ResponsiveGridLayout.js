/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/layout/Grid','sap/ui/layout/GridData','./FormLayout','sap/ui/layout/library'],function(q,G,a,F,l){"use strict";var R=F.extend("sap.ui.layout.form.ResponsiveGridLayout",{metadata:{library:"sap.ui.layout",properties:{labelSpanXL:{type:"int",group:"Misc",defaultValue:-1},labelSpanL:{type:"int",group:"Misc",defaultValue:4},labelSpanM:{type:"int",group:"Misc",defaultValue:2},labelSpanS:{type:"int",group:"Misc",defaultValue:12},adjustLabelSpan:{type:"boolean",group:"Misc",defaultValue:true},emptySpanXL:{type:"int",group:"Misc",defaultValue:-1},emptySpanL:{type:"int",group:"Misc",defaultValue:0},emptySpanM:{type:"int",group:"Misc",defaultValue:0},emptySpanS:{type:"int",group:"Misc",defaultValue:0},columnsXL:{type:"int",group:"Misc",defaultValue:-1},columnsL:{type:"int",group:"Misc",defaultValue:2},columnsM:{type:"int",group:"Misc",defaultValue:1},singleContainerFullSize:{type:"boolean",group:"Misc",defaultValue:true},breakpointXL:{type:"int",group:"Misc",defaultValue:1440},breakpointL:{type:"int",group:"Misc",defaultValue:1024},breakpointM:{type:"int",group:"Misc",defaultValue:600}}}});sap.ui.core.Control.extend("sap.ui.layout.form.ResponsiveGridLayoutPanel",{metadata:{aggregations:{"content":{type:"sap.ui.layout.Grid",multiple:false}},associations:{"container":{type:"sap.ui.layout.form.FormContainer",multiple:false},"layout":{type:"sap.ui.layout.form.ResponsiveLayout",multiple:false}}},getLayoutData:function(){var C=sap.ui.getCore().byId(this.getContainer());var L=sap.ui.getCore().byId(this.getLayout());var o;if(L&&C){o=L.getLayoutDataForElement(C,"sap.ui.layout.GridData");}if(o){return o;}else{return this.getAggregation("layoutData");}},getCustomData:function(){var C=sap.ui.getCore().byId(this.getContainer());if(C){return C.getCustomData();}},refreshExpanded:function(){var C=sap.ui.getCore().byId(this.getContainer());if(C){if(C.getExpanded()){this.$().removeClass("sapUiRGLContainerColl");}else{this.$().addClass("sapUiRGLContainerColl");}}},renderer:function(r,p){var C=sap.ui.getCore().byId(p.getContainer());var L=sap.ui.getCore().byId(p.getLayout());var o=p.getContent();var E=C.getExpandable();var t=C.getTooltip_AsString();var T=C.getToolbar();var i=C.getTitle();r.write("<div");r.writeControlData(p);r.addClass("sapUiRGLContainer");if(E&&!C.getExpanded()){r.addClass("sapUiRGLContainerColl");}if(T){r.addClass("sapUiFormContainerToolbar");}else if(i){r.addClass("sapUiFormContainerTitle");}if(t){r.writeAttributeEscaped('title',t);}r.writeClasses();L.getRenderer().writeAccessibilityStateContainer(r,C);r.write(">");if(T){r.renderControl(T);}else if(C.getTitle()){L.getRenderer().renderTitle(r,i,C._oExpandButton,E,false,C.getId());}if(o){r.write("<div");r.addClass("sapUiRGLContainerCont");r.writeClasses();r.write(">");r.renderControl(o);r.write("</div>");}r.write("</div>");}});R.prototype.init=function(){this.mContainers={};this.oDummyLayoutData=new a(this.getId()+"--Dummy");};R.prototype.exit=function(){var t=this;for(var C in this.mContainers){h(t,C);}if(this._mainGrid){this._mainGrid.destroy();delete this._mainGrid;}this.oDummyLayoutData.destroy();this.oDummyLayoutData=undefined;};R.prototype.onBeforeRendering=function(E){var o=this.getParent();if(!o||!(o instanceof sap.ui.layout.form.Form)){return;}o._bNoInvalidate=true;var t=this;_(t,o);k(t,o);o._bNoInvalidate=false;};R.prototype.onAfterRendering=function(E){if(this._mainGrid&&this._mainGrid.__bIsUsed){for(var C in this.mContainers){if(this.mContainers[C][1]._sContainerResizeListener){sap.ui.core.ResizeHandler.deregister(this.mContainers[C][1]._sContainerResizeListener);this.mContainers[C][1]._sContainerResizeListener=null;}}}};R.prototype.contentOnAfterRendering=function(o,C){F.prototype.contentOnAfterRendering.apply(this,arguments);if(C.getWidth&&(!C.getWidth()||C.getWidth()=="auto")&&C.getMetadata().getName()!="sap.ui.commons.Image"){C.$().css("width","100%");}};R.prototype.toggleContainerExpanded=function(C){var s=C.getId();if(this.mContainers[s]&&this.mContainers[s][0]){var p=this.mContainers[s][0];p.refreshExpanded();}};R.prototype.onLayoutDataChange=function(E){var s=E.srcControl;if(s instanceof sap.ui.layout.form.FormContainer){if(this._mainGrid){this._mainGrid.onLayoutDataChange(E);}}else if(!(s instanceof sap.ui.layout.form.FormElement)){var p=s.getParent();if(p instanceof sap.ui.layout.form.FormElement){var C=p.getParent();var i=C.getId();if(this.mContainers[i]&&this.mContainers[i][1]){this.mContainers[i][1].onLayoutDataChange(E);}}}};R.prototype.onsapup=function(E){this.onsapleft(E);};R.prototype.onsapdown=function(E){this.onsapright(E);};R.prototype.getContainerRenderedDomRef=function(C){if(this.getDomRef()){var s=C.getId();if(this.mContainers[s]){if(this.mContainers[s][0]){var p=this.mContainers[s][0];return p.getDomRef();}else if(this.mContainers[s][1]){var o=this.mContainers[s][1];return o.getDomRef();}}}return null;};R.prototype.getElementRenderedDomRef=function(E){return null;};function _(L,o){var C=o.getFormContainers();var j=C.length;var v=0;var V=0;var n=[];var p;var r;var s;var t;var i=0;for(i=0;i<j;i++){s=C[i];s._checkProperties();if(s.getVisible()){v++;n.push(s);}}for(i=0;i<v;i++){s=n[i];if(s.getVisible()){V++;t=s.getId();p=undefined;r=undefined;var u=n[i+1];if(L.mContainers[t]&&L.mContainers[t][1]){r=L.mContainers[t][1];}else{r=d(L,s);}var T=s.getTitle();var w=s.getToolbar();if(w||T||s.getExpandable()){if(L.mContainers[t]&&L.mContainers[t][0]){p=L.mContainers[t][0];}else{p=b(L,s,r);f(r,true);}g(p,s,V,u,v);}else{if(L.mContainers[t]&&L.mContainers[t][0]){c(L.mContainers[t][0]);}f(r,false);g(r,s,V,u,v);}L.mContainers[t]=[p,r];}}var O=m(L.mContainers);if(v<O){for(t in L.mContainers){var x=false;for(i=0;i<j;i++){s=C[i];if(t==s.getId()&&s.getVisible()){x=true;break;}}if(!x){h(L,t);}}}}function b(L,C,o){var s=C.getId();var p=new sap.ui.layout.form.ResponsiveGridLayoutPanel(s+"---Panel",{container:C,layout:L,content:o});return p;}function c(p){p.setContent("");p.setLayout("");p.setContainer("");p.destroy();}function d(L,C){var I=C.getId()+"--Grid";var o=new G(I,{vSpacing:0,hSpacing:0,containerQuery:true});o.__myParentLayout=L;o.__myParentContainerId=C.getId();o.addStyleClass("sapUiFormResGridCont");o.getContent=function(){var C=sap.ui.getCore().byId(this.__myParentContainerId);if(C){var n=[];var E=C.getFormElements();var p;var r;for(var i=0;i<E.length;i++){var s=E[i];if(s.getVisible()){r=s.getLabelControl();if(r){n.push(r);}p=s.getFields();for(var j=0;j<p.length;j++){n.push(p[j]);}}}return n;}else{return false;}};o.getAriaLabelledBy=function(){var C=sap.ui.getCore().byId(this.__myParentContainerId);if(C&&!C.getToolbar()&&!C.getTitle()&&!C.getExpandable()){return C.getAriaLabelledBy();}return[];};o._getLayoutDataForControl=function(j){var L=this.__myParentLayout;var n=L.getLayoutDataForElement(j,"sap.ui.layout.GridData");var E=j.getParent();var p=E.getLabelControl();if(n){if(p==j){n._setStylesInternal("sapUiFormElementLbl");}return n;}else{var C=sap.ui.getCore().byId(this.__myParentContainerId);var r=L.getLayoutDataForElement(C,"sap.ui.layout.GridData");var s=C.getParent();var t=L.getLabelSpanL();var u=L.getLabelSpanM();var v=L.getLabelSpanS();if(L.getAdjustLabelSpan()){if(s.getFormContainers().length>=1&&L.getColumnsM()>1){u=L.getLabelSpanL();}if(r){if(r._getEffectiveSpanLarge()==12){t=L.getLabelSpanM();u=L.getLabelSpanM();}}if(s.getFormContainers().length==1||L.getColumnsL()==1){t=L.getLabelSpanM();u=L.getLabelSpanM();}}var w=L.getLabelSpanXL();if(w<0){w=t;}if(p==j){L.oDummyLayoutData.setSpan("XL"+w+" L"+t+" M"+u+" S"+v);L.oDummyLayoutData.setLinebreak(true);L.oDummyLayoutData._setStylesInternal("sapUiFormElementLbl");return L.oDummyLayoutData;}else{var x=12-L.getEmptySpanL();var M=12-L.getEmptySpanM();var S=12-L.getEmptySpanS();var X=x;var y=L.getEmptySpanXL();if(y>-1){X=12-y;}var z;if(p){var A=L.getLayoutDataForElement(p,"sap.ui.layout.GridData");if(A){z=A._getEffectiveSpanLarge();if(z){t=z;}z=A._getEffectiveSpanXLarge();if(z){w=z;}if(w<0){w=t;}z=A._getEffectiveSpanMedium();if(z){u=z;}z=A._getEffectiveSpanSmall();if(z){v=z;}}if(w<12){X=X-w;}if(t<12){x=x-t;}if(u<12){M=M-u;}if(v<12){S=S-v;}}var B=E.getFields();var D=B.length;var H=1;var J=false;for(var i=0;i<D;i++){var K=B[i];if(K!=j){var N=L.getLayoutDataForElement(K,"sap.ui.layout.GridData");if(N){z=N._getEffectiveSpanLarge();if(z&&z<x){x=x-z;}var O=N._getEffectiveSpanXLarge();if(O){if(O<X){X=X-O;}}else{if(z&&z<X){X=X-z;}}z=N._getEffectiveSpanMedium();if(z&&z<M){M=M-z;}z=N._getEffectiveSpanSmall();if(z&&z<S){S=S-z;}}else{H++;}}else{if(H==1){J=true;}}}var P,Q,T,U=12;if(J){var V=X-Math.floor(X/H)*H;P=Math.floor(X/H)+V;V=x-Math.floor(x/H)*H;Q=Math.floor(x/H)+V;V=M-Math.floor(M/H)*H;T=Math.floor(M/H)+V;if(v<12){V=S-Math.floor(S/H)*H;U=Math.floor(S/H)+V;}}else{P=Math.floor(X/H);Q=Math.floor(x/H);T=Math.floor(M/H);if(v<12){U=Math.floor(S/H);}}L.oDummyLayoutData.setSpan("XL"+P+" L"+Q+" M"+T+" S"+U);L.oDummyLayoutData.setLinebreak(J&&!p);L.oDummyLayoutData._setStylesInternal(undefined);return L.oDummyLayoutData;}return n;}};o._onParentResizeOrig=o._onParentResize;o._onParentResize=function(){if(!this.getDomRef()){this._cleanup();return;}if(!q(this.getDomRef()).is(":visible")){return;}var L=this.__myParentLayout;if(!L._mainGrid||!L._mainGrid.__bIsUsed){var j=L.getParent().getFormContainers();var n;for(var i=0;i<j.length;i++){if(j[i].getVisible()){n=j[i];break;}}if(!n||!L.mContainers[n.getId()]||n.getId()!=this.__myParentContainerId){return;}if(L.mContainers[this.__myParentContainerId][0]){var D=L.mContainers[this.__myParentContainerId][0].getDomRef();var p=D.clientWidth;if(p<=L.getBreakpointM()){this._toggleClass("Phone");}else if((p>L.getBreakpointM())&&(p<=L.getBreakpointL())){this._toggleClass("Tablet");}else if((p>L.getBreakpointL())&&(p<=L.getBreakpointXL())){this._toggleClass("Desktop");}else{this._toggleClass("LargeDesktop");}}else{this._setBreakPointTablet(L.getBreakpointM());this._setBreakPointDesktop(L.getBreakpointL());this._setBreakPointLargeDesktop(L.getBreakpointXL());this._onParentResizeOrig();}}else{var $=L._mainGrid.$();if($.hasClass("sapUiRespGridMedia-Std-Phone")){this._toggleClass("Phone");}else if($.hasClass("sapUiRespGridMedia-Std-Tablet")){this._toggleClass("Tablet");}else if($.hasClass("sapUiRespGridMedia-Std-Desktop")){this._toggleClass("Desktop");}else{this._toggleClass("LargeDesktop");}}};o._getAccessibleRole=function(){var C=sap.ui.getCore().byId(this.__myParentContainerId);var L=this.__myParentLayout;if(L._mainGrid&&L._mainGrid.__bIsUsed&&!C.getToolbar()&&!C.getTitle()&&!C.getExpandable()&&C.getAriaLabelledBy().length>0){return"form";}};return o;}function e(o){if(o.__myParentContainerId){o.__myParentContainerId=undefined;}o.__myParentLayout=undefined;o.destroy();}function f(o,O){if(O){if(o.__originalGetLayoutData){o.getLayoutData=o.__originalGetLayoutData;delete o.__originalGetLayoutData;}}else if(!o.__originalGetLayoutData){o.__originalGetLayoutData=o.getLayoutData;o.getLayoutData=function(){var L=this.__myParentLayout;var C=sap.ui.getCore().byId(this.__myParentContainerId);var i;if(C){i=L.getLayoutDataForElement(C,"sap.ui.layout.GridData");}if(i){return i;}else{return this.getAggregation("layoutData");}};}}function g(C,o,v,i,V){var L;if(C instanceof sap.ui.layout.form.ResponsiveGridLayoutPanel){L=sap.ui.getCore().byId(C.getLayout());}else{L=C.__myParentLayout;}var j=L.getLayoutDataForElement(o,"sap.ui.layout.GridData");if(!j){var n=L.getColumnsM();var p=L.getColumnsL();var r=L.getColumnsXL();var s=(v%p)==1;var t=(v%p)==0;var u=v>(V-p+(V%p));var w=v<=p;var x=(v%n)==1;var y=(v%n)==0;var z=v>(V-n+(V%n));var A=v<=n;var B=false;var D=t;var E=u;var H=w;if(r>0){B=(v%r)==1;D=(v%r)==0;E=v>(V-r+(V%r));H=v<=r;}if(i){var I=L.getLayoutDataForElement(i,"sap.ui.layout.GridData");if(I&&(I.getLinebreak()||I.getLinebreakXL())){D=true;E=false;}if(I&&(I.getLinebreak()||I.getLinebreakL())){t=true;u=false;}if(I&&(I.getLinebreak()||I.getLinebreakM())){y=true;z=false;}}var S="";if(D){S="sapUiFormResGridLastContXL";}if(t){if(S){S=S+" ";}S=S+"sapUiFormResGridLastContL";}if(y){if(S){S=S+" ";}S=S+"sapUiFormResGridLastContM";}if(E){if(S){S=S+" ";}S=S+"sapUiFormResGridLastRowXL";}if(u){if(S){S=S+" ";}S=S+"sapUiFormResGridLastRowL";}if(z){if(S){S=S+" ";}S=S+"sapUiFormResGridLastRowM";}if(H){if(S){S=S+" ";}S=S+"sapUiFormResGridFirstRowXL";}if(w){if(S){S=S+" ";}S=S+"sapUiFormResGridFirstRowL";}if(A){if(S){S=S+" ";}S=S+"sapUiFormResGridFirstRowM";}j=C.getLayoutData();if(!j){j=new a(C.getId()+"--LD",{linebreakL:s,linebreakM:x});C.setLayoutData(j);}else{j.setLinebreakL(s);j.setLinebreakM(x);}if(r>0){j.setLinebreakXL(B);}j._setStylesInternal(S);}}function h(L,C){var i=L.mContainers[C];var o=i[1];if(o){e(o);}var p=i[0];if(p){c(p);}delete L.mContainers[C];}function k(L,o){var C=o.getFormContainers();var v=[];var n;var p=0;var r=0;var i=0;var j=0;for(i=0;i<C.length;i++){n=C[i];if(n.getVisible()){p++;v.push(n);}}if(p>1||!L.getSingleContainerFullSize()){var s=Math.floor(12/L.getColumnsM());var S=Math.floor(12/L.getColumnsL());var t;var D="";var u=L.getColumnsXL();if(u>=0){t=Math.floor(12/u);D=D+"XL"+t+" ";}D=D+"L"+S+" M"+s+" S12";if(!L._mainGrid){L._mainGrid=new G(o.getId()+"--Grid",{defaultSpan:D,hSpacing:0,vSpacing:0,containerQuery:true}).setParent(L);L._mainGrid.addStyleClass("sapUiFormResGridMain");L._mainGrid._onParentResizeOrig=L._mainGrid._onParentResize;L._mainGrid._onParentResize=function(){this._onParentResizeOrig();for(var A in L.mContainers){L.mContainers[A][1]._onParentResize();}};}else{L._mainGrid.setDefaultSpan(D);var w=L._mainGrid.getContent();r=w.length;var E=false;for(i=0;i<r;i++){var x=w[i];n=undefined;if(x.getContainer){n=sap.ui.getCore().byId(x.getContainer());}else{n=sap.ui.getCore().byId(x.__myParentContainerId);}if(n&&n.getVisible()){var V=v[j];if(n!=V){E=true;break;}var y=L.mContainers[n.getId()];if(y[0]&&y[0]!=x){E=true;break;}if(!y[0]&&y[1]&&y[1]!=x){E=true;break;}j++;}else{L._mainGrid.removeContent(x);}}if(E){L._mainGrid.removeAllContent();r=0;}}L._mainGrid._setBreakPointTablet(L.getBreakpointM());L._mainGrid._setBreakPointDesktop(L.getBreakpointL());L._mainGrid._setBreakPointLargeDesktop(L.getBreakpointXL());L._mainGrid.__bIsUsed=true;if(r<p){var z=0;if(r>0){z=r--;}for(i=z;i<C.length;i++){n=C[i];if(n.getVisible()){var A=n.getId();if(L.mContainers[A]){if(L.mContainers[A][0]){L._mainGrid.addContent(L.mContainers[A][0]);}else if(L.mContainers[A][1]){L._mainGrid.addContent(L.mContainers[A][1]);}}}}}}else if(L._mainGrid){L._mainGrid.__bIsUsed=false;}}function m(o){var L=0;if(!Object.keys){q.each(o,function(){L++;});}else{L=Object.keys(o).length;}return L;}return R;},true);
