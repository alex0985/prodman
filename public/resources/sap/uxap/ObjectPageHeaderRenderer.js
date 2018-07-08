/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ObjectPageLayout","sap/ui/core/Icon"],function(O,I){"use strict";var a={};a.render=function(r,c){var n=c.getNavigationBar(),t=(c.getIsObjectIconAlwaysVisible()||c.getIsObjectTitleAlwaysVisible()||c.getIsObjectSubtitleAlwaysVisible()||c.getIsActionAreaAlwaysVisible()),p=c.getParent(),e=c.getAggregation("_expandButton"),o=c._lazyLoadInternalAggregation("_objectImage",true),b=sap.ui.Device.system.desktop,d=p&&p instanceof O&&((p.getHeaderContent()&&p.getHeaderContent().length>0&&p.getShowHeaderContent())||(p.getShowHeaderContent()&&p.getShowTitleInHeaderContent()));r.write("<div");r.writeControlData(c);r.addClass('sapUxAPObjectPageHeader');r.addClass('sapUxAPObjectPageHeaderDesign-'+c.getHeaderDesign());r.writeClasses();r.write(">");if(n){r.write("<div");r.addClass('sapUxAPObjectPageHeaderNavigation');r.writeClasses();r.write(">");r.renderControl(n);r.write("</div>");}r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-identifierLine");r.addClass('sapUxAPObjectPageHeaderIdentifier');if(t){r.addClass('sapUxAPObjectPageHeaderIdentifierForce');}r.writeClasses();r.write(">");if(p&&p instanceof O&&p.getIsChildPage()){r.write("<div");r.addClass('sapUxAPObjectChildPage');r.writeClasses();r.write("></div>");}if(c.getObjectImageURI()||c.getShowPlaceholder()){r.write("<span ");r.addClass('sapUxAPObjectPageHeaderObjectImageContainer');r.addClass('sapUxAPObjectPageHeaderObjectImage-'+c.getObjectImageShape());if(c.getIsObjectIconAlwaysVisible()){r.addClass('sapUxAPObjectPageHeaderObjectImageForce');}r.writeClasses();r.write(">");r.write("<span class='sapUxAPObjectPageHeaderObjectImageContainerSub'>");a._renderInProperContainer(function(){r.renderControl(o);a._renderPlaceholder(r,c,!(c.getObjectImageShape()||c.getShowPlaceholder()));},o,r);r.write("</span>");r.write("</span>");}r.write("<span ");r.writeAttributeEscaped("id",c.getId()+"-identifierLineContainer");r.addClass('sapUxAPObjectPageHeaderIdentifierContainer');r.writeClasses();r.write(">");this._renderObjectPageTitle(r,c);r.write("</span>");r.write("<span");r.writeAttributeEscaped("id",c.getId()+"-actions");r.addClass('sapUxAPObjectPageHeaderIdentifierActions');if(c.getIsActionAreaAlwaysVisible()){r.addClass('sapUxAPObjectPageHeaderIdentifierActionsForce');}if(c._getActionsPaddingStatus()){r.addClass("sapUxAPObjectPageHeaderIdentifierActionsNoPadding");}r.writeClasses();r.write(">");if(b&&d){e.addStyleClass("sapUxAPObjectPageHeaderExpandButton");r.renderControl(e);}var A=c.getActions();for(var i=0;i<A.length;i++){var f=A[i];r.renderControl(f);}var g=c.getAggregation("_overflowButton");r.renderControl(g);this._renderSideContentBtn(r,c);r.write("</span>");r.write("</div>");r.write("</div>");};a._renderInProperContainer=function(r,o,R){if(o instanceof I){R.write("<div");R.addClass("sapUxAPObjectPageHeaderObjectImage");R.addClass("sapUxAPObjectPageHeaderPlaceholder");R.writeClasses();R.write(">");r();R.write("</div>");}else{r();}};a._renderPlaceholder=function(r,c,v,t){r.write("<div");r.addClass('sapUxAPObjectPageHeaderPlaceholder');r.addClass('sapUxAPObjectPageHeaderObjectImage');if(!v){r.addClass('sapUxAPHidePlaceholder');}r.writeClasses();r.write(">");r.renderControl(c._oPlaceholder);r.write("</div>");};a._renderObjectPageTitle=function(r,c,t){var o=c.getObjectTitle(),m=(c.getShowMarkers()&&(c.getMarkFavorite()||c.getMarkFlagged())),b=c._lazyLoadInternalAggregation('_breadCrumbs',true);if(!t&&b&&b.getLinks().length){r.renderControl(b);}r.write("<h1");r.addClass('sapUxAPObjectPageHeaderIdentifierTitle');if(c.getIsObjectTitleAlwaysVisible()){r.addClass('sapUxAPObjectPageHeaderIdentifierTitleForce');}if(t){r.addClass('sapUxAPObjectPageHeaderIdentifierTitleInContent');}if(c.getShowTitleSelector()){r.addClass('sapUxAPObjectPageHeaderTitleFollowArrow');}r.writeClasses();r.writeAttributeEscaped("id",c.getId()+"-title");r.write(">");r.write("<span");r.addClass("sapUxAPObjectPageHeaderTitleTextWrappable");r.writeClasses();r.writeAttributeEscaped("id",c.getId()+"-innerTitle");r.write(">");if(m||c.getShowTitleSelector()||c.getMarkLocked()||c.getMarkChanges()){var s=o.substr(o.lastIndexOf(" ")+1);var d=o.substr(0,o.lastIndexOf(" ")+1);if(s.length===1){s=o;d='';}r.writeEscaped(d);r.write("</span>");r.write("<span");r.addClass('sapUxAPObjectPageHeaderNowrapMarkers');if(c.getMarkLocked()||c.getMarkChanges()){r.addClass('sapUxAPObjectPageHeaderMarks');}r.writeClasses();r.write(">");r.writeEscaped(s);this._renderMarkers(r,c);if(c.getMarkLocked()){this._renderLock(r,c,t);}else if(c.getMarkChanges()){this._renderMarkChanges(r,c,t);}this._renderSelectTitleArrow(r,c,t);r.write("</span>");}else{r.writeEscaped(o);r.write("</span>");}r.write("</h1>");r.write("<span");r.addClass('sapUxAPObjectPageHeaderIdentifierDescription');if(c.getIsObjectSubtitleAlwaysVisible()&&c.getObjectSubtitle()){r.addClass('sapUxAPObjectPageHeaderIdentifierDescriptionForce');}if(t){r.addClass('sapUxAPObjectPageHeaderIdentifierSubTitleInContent');}r.writeClasses();r.writeAttributeEscaped("id",c.getId()+"-subtitle");r.write(">");r.writeEscaped(c.getObjectSubtitle());r.write("</span>");};a._renderSelectTitleArrow=function(r,c,t){if(c.getShowTitleSelector()){r.write("<span");r.addClass("sapUxAPObjectPageHeaderTitleArrow");r.writeClasses();r.write(">");if(t){r.renderControl(c._oTitleArrowIconCont);}else{r.renderControl(c._oTitleArrowIcon);}r.write("</span>");}};a._renderSideContentBtn=function(r,c){var s=c.getSideContentButton();if(s){r.write("<span");r.addClass("sapUxAPObjectPageHeaderSideContentBtn");r.writeClasses();r.write(">");r.write("<span");r.addClass("sapUxAPObjectPageHeaderSeparator");r.writeClasses();r.write("></span>");r.renderControl(s);r.write("</span>");}};a._renderMarkChanges=function(r,c,t){r.write("<span");r.addClass("sapUxAPObjectPageHeaderChangesBtn");r.addClass("sapUiSizeCompact");r.writeClasses();r.write(">");if(t){r.renderControl(c._oChangesIconCont);}else{r.renderControl(c._oChangesIcon);}r.write("</span>");};a._renderLock=function(r,c,t){r.write("<span");r.addClass("sapUxAPObjectPageHeaderLockBtn");r.addClass("sapUiSizeCompact");r.writeClasses();r.write(">");if(t){r.renderControl(c._oLockIconCont);}else{r.renderControl(c._oLockIcon);}r.write("</span>");};a._renderMarkers=function(r,c){var b=[];if(c.getShowMarkers()){b.push(c._oFavIcon);b.push(c._oFlagIcon);this._renderMarkersAria(r,c);r.write("<span");r.addClass("sapMObjStatusMarker");r.writeClasses();r.writeAttributeEscaped("id",c.getId()+"-markers");r.writeAttributeEscaped("aria-describedby",c.getId()+"-markers-aria");r.write(">");for(var i=0;i<b.length;i++){r.renderControl(b[i]);}r.write("</span>");}};a._renderMarkersAria=function(r,c){var A="";if(c.getMarkFlagged()){A+=(c.oLibraryResourceBundle.getText("ARIA_FLAG_MARK_VALUE")+" ");}if(c.getMarkFavorite()){A+=(c.oLibraryResourceBundle.getText("ARIA_FAVORITE_MARK_VALUE")+" ");}if(A!==""){r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-markers-aria");r.writeAttribute("aria-hidden","false");r.addClass("sapUiHidden");r.writeClasses();r.write(">");r.writeEscaped(A);r.write("</div>");}};return a;},true);
