/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/IconPool'],function(q,I){"use strict";var R={},s='px';R.render=function(r,c){var t=this;this.initSharedState(c);this.renderControlContainer(r,c,function(){t.renderAriaLabel(r,c);t.renderSelectedItems(r,c);t.renderUnselectedItems(r,c);t.renderHoverItems(r,c);t.renderSelectorDiv(r,c);});};R.renderControlContainer=function(r,c,i){r.write("<div");r.writeControlData(c);r.addStyle("width",this._iWidth+"px");r.addStyle("height",this._iHeight+"px");c.getEnabled()?r.writeAttribute("tabindex","0"):r.writeAttribute("tabindex","-1");c.getEnabled()?r.addClass("sapMPointer"):r.addClass("sapMRIDisabled");r.addClass("sapMRI");r.addClass("sapUiRatingIndicator"+c._getIconSizeLabel(this._fIconSize));r.writeStyles();r.writeClasses();this.writeTooltip(r,c);this.writeAccessibility(r,c);r.write(">");i();r.write("</div>");};R.initSharedState=function(c){var r=c._roundValueToVisualMode(c.getValue()),i=c._iPxIconSize,f=c._iPxPaddingSize,S=r*i+(Math.round(r)-1)*f;if(S<0){S=0;}this._bUseGradient=sap.ui.Device.browser.chrome||sap.ui.Device.browser.safari;this._sLabelID=c.getId()+"-ariaLabel";this._iSymbolCount=c.getMaxValue();this._iWidth=this._iSymbolCount*(i+f)-f;this._iHeight=i;this._iSelectedWidth=S;this._fIconSize=i;};R.writeTooltip=function(r,c){var t=c.getTooltip_AsString();if(t){r.writeAttributeEscaped("title",t);}};R.writeAccessibility=function(r,c){r.writeAccessibilityState(c,{"role":"slider","orientation":"horizontal","valuemin":0,"disabled":!c.getEnabled(),"labelledby":{value:this._sLabelID,append:true}});};R.renderAriaLabel=function(r,c){r.write("<label id='"+this._sLabelID+"' class='sapMRIAriaLabel' aria-hidden='true'>"+c._oResourceBundle.getText("RATING_ARIA_NAME")+"</label>");};R.renderSelectedItems=function(r,c){r.write("<div class='sapMRISel");if(this._bUseGradient){r.write(" sapMRIGrd");}r.write("'");r.writeAttribute("id",c.getId()+"-sel");r.writeAttribute("style","width: "+this._iSelectedWidth+s);r.write(">");for(var i=0;i<this._iSymbolCount;i++){this.renderIcon("SELECTED",r,c);}r.write("</div>");};R.renderUnselectedItems=function(r,c){r.write("<div class='sapMRIUnselWrapper'");r.writeAttribute("id",c.getId()+"-unsel-wrapper");r.writeAttribute("style","width: "+(this._iWidth-this._iSelectedWidth)+s);r.write(">");r.write("<div class='sapMRIUnsel");if(this._bUseGradient&&c.getEnabled()){r.write(" sapMRIGrd");}r.write("' id='"+c.getId()+"-unsel'>");for(var i=0;i<this._iSymbolCount;i++){this.renderIcon("UNSELECTED",r,c);}r.write("</div>");r.write("</div>");};R.renderHoverItems=function(r,c){if(c.getEnabled()){r.write("<div class='sapMRIHov' id='"+c.getId()+"-hov'>");for(var i=0;i<this._iSymbolCount;i++){this.renderIcon("HOVERED",r,c);}r.write("</div>");}};R.renderSelectorDiv=function(r,c){r.write("<div class='sapMRISelector' id='"+c.getId()+"-selector'>");r.write("</div>");};R.renderIcon=function(i,r,c){var a=this.getIconURI(i,c),t=this.getIconTag(a),b=sap.ui.core.IconPool.isIconURI(a),d=this._fIconSize+s;r.write("<"+t+" ");r.write("class='sapUiIcon "+this.getIconClass(i)+"' ");var e="";e+="width:"+d+";";e+="height:"+d+";";e+="line-height:"+d+";";e+="font-size:"+d+";";r.writeAttribute("style",e);if(!b){r.writeAttributeEscaped("src",a);}r.write(">");if(b){r.writeEscaped(I.getIconInfo(a).content);}r.write("</"+t+">");};R.getIconClass=function(i){switch(i){case"SELECTED":return"sapMRIIconSel";case"UNSELECTED":return"sapMRIIconUnsel";case"HOVERED":return"sapMRIIconHov";}};R.getIconURI=function(S,c){if(sap.ui.getCore().getConfiguration().getTheme()==="sap_hcb"){if(S=="UNSELECTED"&&c.getEnabled()){return I.getIconURI("unfavorite");}return I.getIconURI('favorite');}switch(S){case"SELECTED":return c.getIconSelected()||I.getIconURI("favorite");case"UNSELECTED":return c.getIconUnselected()||I.getIconURI("favorite");case"HOVERED":return c.getIconHovered()||I.getIconURI("favorite");}};R.getIconTag=function(i){if(sap.ui.core.IconPool.isIconURI(i)){return"span";}return"img";};return R;},true);
