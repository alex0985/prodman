/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/Object','jquery.sap.script'],function(q,B){"use strict";var L=B.extend("sap.ui.core.util.LibraryInfo",{constructor:function(){B.apply(this);this._oLibInfos={};},destroy:function(){B.prototype.destroy.apply(this,arguments);this._oLibInfos={};},getInterface:function(){return this;}});L.prototype._loadLibraryMetadata=function(l,c){l=l.replace(/\//g,".");if(this._oLibInfos[l]){q.sap.delayedCall(0,window,c,[this._oLibInfos[l]]);return;}var t=this,u,s,p=/themelib_(.*)/i.exec(l);if(!p){s=".library";u=q.sap.getModulePath(l,'/');}else{s=".theme";u=q.sap.getModulePath("sap.ui.core",'/themes/'+p[1]+"/");}q.ajax({url:u+s,dataType:"xml",error:function(x,a,e){q.sap.log.error("failed to load library details from '"+u+s+": "+a+", "+e);t._oLibInfos[l]={name:l,data:null,url:u};c(t._oLibInfos[l]);},success:function(d,S,x){t._oLibInfos[l]={name:l,data:d,url:u};c(t._oLibInfos[l]);}});};L.prototype._getLibraryInfo=function(l,c){this._loadLibraryMetadata(l,function(d){var r={libs:[],library:d.name,libraryUrl:d.url};if(d.data){var $=q(d.data);r.vendor=$.find("vendor").text();r.copyright=$.find("copyright").text();r.version=$.find("version").text();r.documentation=$.find("documentation").text();r.releasenotes=$.find("releasenotes").attr("url");r.componentInfo=L.prototype._getLibraryComponentInfo($);}c(r);});};L.prototype._getThirdPartyInfo=function(l,c){this._loadLibraryMetadata(l,function(d){var r={libs:[],library:d.name,libraryUrl:d.url};if(d.data){var $=q(d.data).find("appData").find("thirdparty").children();$.each(function(i,o){if(o.nodeName==="lib"){var a=q(o);var b=a.children("license");r.libs.push({displayName:a.attr("displayName"),homepage:a.attr("homepage"),license:{url:b.attr("url"),type:b.attr("type"),file:d.url+b.attr("file")}});}});}c(r);});};L.prototype._getDocuIndex=function(l,c){this._loadLibraryMetadata(l,function(d){var a=d.name,b=d.url,r={"docu":{},library:a,libraryUrl:b};if(!d.data){c(r);return;}var D=q(d.data).find("appData").find("documentation");var u=D.attr("indexUrl");if(!u){c(r);return;}if(D.attr("resolve")=="lib"){u=d.url+u;}q.ajax({url:u,dataType:"json",error:function(x,s,e){q.sap.log.error("failed to load library docu from '"+u+"': "+s+", "+e);c(r);},success:function(d,s,x){d.library=a;d.libraryUrl=b;c(d);}});});};L.prototype._getReleaseNotes=function(l,v,c){this._loadLibraryMetadata(l,function(d){if(!d.data){c({});return;}var i=(v.split(".").length===3)&&!(/-SNAPSHOT/.test(v));var V=q.sap.Version(v);var m=V.getMajor();var M=V.getMinor();var p=V.getPatch();var D=q(d.data).find("appData").find("releasenotes");var u=D.attr("url");if(!u){q.sap.log.warning("failed to load release notes for library "+l);c({});return;}if(V.getSuffix()==="-SNAPSHOT"){if(M%2!=0){M=(M+1);p=0;}v=m+"."+M+"."+p;}var b=window.location.href,r=/\/\d.\d{1,2}.\d{1,2}\//;if(D.attr("resolve")=="lib"){if(r.test(b)||i===false){u=d.url+u;}else{u="{major}.{minor}.{patch}/"+d.url+u;}}u=u.replace(/\{major\}/g,m);u=u.replace(/\{minor\}/g,M);u=u.replace(/\{patch\}/g,p);q.ajax({url:u,dataType:"json",error:function(x,s,e){if(s==="parsererror"){q.sap.log.error("failed to parse release notes for library '"+l+", "+e);}else{q.sap.log.warning("failed to load release notes for library '"+l+", "+e);}c({});},success:function(d,s,x){c(d,v);}});});};L.prototype._getLibraryComponentInfo=function(d){var a={};var c=[];var D="";d.find("ownership > component").each(function(b,C){if(C.childElementCount===0){D=C.textContent;}else{var v=C.getElementsByTagName("name");if(v&&v.length>0){v=v[0].textContent;var e=C.getElementsByTagName("module");if(v&&e&&e.length>0){var m=[];for(var i=0;i<e.length;i++){var M=e[i].textContent.replace(/\//g,".");if(M){m.push(M);}}if(m.length>0){c.push({"component":v,"modules":m});}}}}});a["defaultComponent"]=D;if(c&&c.length>0){a["specialCases"]=c;}return a;};L.prototype._getActualComponent=function(c,m){function a(m,p){m=m.toLowerCase();p=p.toLowerCase();return(m===p||p.match(/\*$/)&&m.indexOf(p.slice(0,-1))===0||p.match(/\.*$/)&&m===p.slice(0,-2));}if(m){for(var k in c){if(!c[k]){q.sap.log.error("No library information deployed for "+k);continue;}var C;if(m.indexOf(k)===0){C=c[k].defaultComponent;}var s=c[k].specialCases;if(s){for(var i=0;i<s.length;i++){var S=s[i].modules;for(var j=0;j<S.length;j++){if(a(m,S[j])){C=s[i].component;}}}}if(C){return C;}}}};L.prototype._getDefaultComponent=function(l){return l&&l.componentInfo&&l.componentInfo.defaultComponent;};return L;});
