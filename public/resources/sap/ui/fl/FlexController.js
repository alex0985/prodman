/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/fl/Persistence","sap/ui/fl/registry/ChangeRegistry","sap/ui/fl/Utils","sap/ui/fl/LrepConnector","sap/ui/fl/Change","sap/ui/fl/Cache","sap/ui/fl/registry/Settings","sap/ui/fl/ChangePersistenceFactory","sap/ui/core/mvc/View","sap/ui/fl/changeHandler/JsControlTreeModifier","sap/ui/fl/changeHandler/XmlTreeModifier","sap/ui/fl/context/ContextManager"],function(q,P,C,U,L,a,b,F,c,V,J,X,d){"use strict";var e=function(s){this._oChangePersistence=undefined;this._sComponentName=s||"";if(this._sComponentName){this._createChangePersistence();}};e.appliedChangesCustomDataKey="sap.ui.fl:AppliedChanges";e.PENDING="sap.ui.fl:PendingChange";e.PROCESSING="sap.ui.fl:ProcessingChange";e.prototype.setComponentName=function(s){this._sComponentName=s;this._createChangePersistence();};e.prototype.getComponentName=function(){return this._sComponentName;};e.prototype.createChange=function(o,f){var g,h,i;if(!f){throw new Error("A flexiblity change cannot be created without a targeted control");}var j=d._getContextIdsFromUrl();if(j.length>1){throw new Error("More than one DesignTime Context is currently active");}var s=f.id||f.getId();if(!o.selector){o.selector={};}var A=f.appComponent||U.getAppComponentForControl(f);if(!A){throw new Error("No Application Component found - to offer flexibility the control with the id '"+s+"' has to have a valid relation to its owning application component.");}if(U.hasLocalIdSuffix(s,A)){var l=A.getLocalId(s);if(!l){throw new Error("Generated id attribute found - to offer flexibility a stable control id is needed to assign the changes to, but for this control the id was generated by SAPUI5 "+s);}o.selector.id=l;o.selector.idIsLocal=true;}else{o.selector.id=s;o.selector.idIsLocal=false;}var k=U.getAppDescriptor(A);var m=this.getComponentName();o.reference=m;if(k&&k["sap.app"]){o.componentName=k["sap.app"].componentName||k["sap.app"].id;}else{o.componentName=m;}o.packageName="$TMP";o.context=j.length===1?j[0]:"";g=a.createInitialFileContent(o);h=new a(g);var n=f.controlType||U.getControlType(f);if(!n){throw new Error("No control type found - the change handler can not be retrieved");}i=this._getChangeHandler(h,n);if(i){i.completeChangeContent(h,o,{modifier:J,appComponent:A});}else{throw new Error('Change handler could not be retrieved for change '+JSON.stringify(o));}return h;};e.prototype.addChange=function(o,f){var g=this.createChange(o,f);var h=U.getAppComponentForControl(f);this._oChangePersistence.addChange(g,h);return g;};e.prototype.addPreparedChange=function(o,f){var g=U.getAppComponentForControl(f);this._oChangePersistence.addChange(o,g);return o;};e.prototype.createAndApplyChange=function(o,f){var g=this.addChange(o,f);try{var p={modifier:J,appComponent:U.getAppComponentForControl(f)};this._checkTargetAndApplyChange(g,f,p);}catch(E){this._oChangePersistence.deleteChange(g);throw E;}};e.prototype.saveAll=function(){return this._oChangePersistence.saveDirtyChanges();};e.prototype.processXmlView=function(v,p){var o=sap.ui.getCore().getComponent(p.componentId);var A=U.getAppComponentForControl(o);var m=o.getManifest();p.appComponent=A;p.appDescriptor=m;p.modifier=X;p.view=v;return this.processViewByModifier(p);};e.prototype.processViewByModifier=function(p){p.viewId=p.modifier.getId(p.view);p.siteId=U.getSiteId(p.appComponent);var g=F.getInstance(this.getComponentName(),p);return g.then(this._oChangePersistence.getChangesForView.bind(this._oChangePersistence,p.viewId,p),this._handlePromiseChainError.bind(this,p.view)).then(this._resolveGetChangesForView.bind(this,p));};e.prototype._resolveGetChangesForView=function(p,f){if(!Array.isArray(f)){var E="No list of changes was passed for processing the flexibility on view: "+p.view;U.log.error(E,undefined,"sap.ui.fl.FlexController");return[];}f.forEach(function(o){try{var s=this._getSelectorOfChange(o);if(!s||!s.id){throw new Error("No selector in change found or no selector ID.");}var g=p.modifier.bySelector(s,p.appComponent,p.view);if(!g){throw new Error("A flexiblity change tries to change a non existing control");}this._checkTargetAndApplyChange(o,g,p);}catch(h){this._logApplyChangeError(h,o);}}.bind(this));return p.view;};e.prototype._logApplyChangeError=function(E,o){var D=o.getDefinition();var s=D.changeType;var t=D.selector.id;var f=D.namespace+D.fileName+"."+D.fileType;var w="A flexiblity change could not be applied.";w+="\nThe displayed UI might not be displayed as intedend.";if(E.message){w+="\n   occurred error message: '"+E.message+"'";}w+="\n   type of change: '"+s+"'";w+="\n   LRep location of the change: "+f;w+="\n   id of targeted control: '"+t+"'";U.log.warning(w,undefined,"sap.ui.fl.FlexController");};e.prototype._checkTargetAndApplyChange=function(o,f,p){var m=p.modifier;var s=m.getControlType(f);var g=this._getChangeHandler(o,s);if(!g){if(o&&f){U.log.warning("Change handler implementation for change not found or change type not enabled for current layer - Change ignored");}return;}var h=m.getAggregation(f,"customData")||[];var i=o.getId();var A=[];var j;var k="";h.some(function(r){var K=m.getProperty(r,"key");if(K===e.appliedChangesCustomDataKey){j=r;k=m.getProperty(r,"value");A=k.split(",");return true;}});if(A.indexOf(i)===-1){try{g.applyChange(o,f,p);}catch(l){this._setMergeError(true);U.log.error("Change could not be applied. Merge error detected.");return;}if(j){m.setProperty(j,"value",k+","+i);}else{var n=p.appComponent;var v=p.view;j=m.createControl("sap.ui.core.CustomData",n,v);m.setProperty(j,"key",e.appliedChangesCustomDataKey);m.setProperty(j,"value",i);m.insertAggregation(f,"customData",j,0,v,true);}}};e.prototype._handlePromiseChainError=function(v,E){U.log.error('Error processing view '+E);return v;};e.prototype._getSelectorOfChange=function(o){if(!o||!o.getSelector){return undefined;}return o.getSelector();};e.prototype.applyChange=function(o,f){var s=U.getControlType(f);var g=this._getChangeHandler(o,s);if(!g){if(o&&f){U.log.warning("Change handler implementation for change not found or change type not enabled for current layer - Change ignored");}return;}try{g.applyChange(o,f);}catch(h){this._setMergeError(true);U.log.error("Change could not be applied. Merge error detected.");throw h;}};e.prototype._getChangeHandler=function(o,s){var f,g;f=this._getChangeTypeMetadata(o,s);if(!f){return undefined;}g=f.getChangeHandler();return g;};e.prototype._getChangeTypeMetadata=function(o,s){var f,g;f=this._getChangeRegistryItem(o,s);if(!f||!f.getChangeTypeMetadata){return undefined;}g=f.getChangeTypeMetadata();return g;};e.prototype._getChangeRegistryItem=function(o,s){var f,g,l;if(!o||!s){return undefined;}f=o.getChangeType();if(!f||!s){return undefined;}l=o.getLayer();g=this._getChangeRegistry().getRegistryItems({"changeTypeName":f,"controlType":s,"layer":l});if(g&&g[s]&&g[s][f]){return g[s][f];}else if(g&&g[s]){return g[s];}else{return g;}};e.prototype._getChangeRegistry=function(){var i=C.getInstance();i.initSettings(this.getComponentName());return i;};e.prototype.getComponentChanges=function(p){return this._oChangePersistence.getChangesForComponent(p);};e.prototype._createChangePersistence=function(){this._oChangePersistence=c.getChangePersistenceForComponent(this.getComponentName());return this._oChangePersistence;};e.prototype.discardChanges=function(f){var A=U.getCurrentLayer(false);f.forEach(function(o){if(o&&o.getLayer&&o.getLayer()===A){this._oChangePersistence.deleteChange(o);}}.bind(this));return this._oChangePersistence.saveDirtyChanges();};e.prototype.deleteChangesForControlDeeply=function(o){return Promise.resolve();};e.prototype._setMergeError=function(h){return F.getInstance(this.getComponentName()).then(function(s){s.setMergeErrorOccured(true);});};e.prototype.applyChangesOnControl=function(g,A,o){var m=g();var f=m.mChanges;var D=m.mDependencies;var h=m.mDependentChangesOnMe;var i=f[o.getId()]||[];i.forEach(function(j){if(!D[j.getKey()]){this._checkTargetAndApplyChange(j,o,{modifier:J,appComponent:A});this._updateDependencies(D,h,j.getKey());}else{D[j.getKey()][e.PENDING]=this._checkTargetAndApplyChange.bind(this,j,o,{modifier:J,appComponent:A});}}.bind(this));this._processDependentQueue(D,h,A);};e.prototype._updateDependencies=function(D,m,s){if(m[s]){m[s].forEach(function(k){var o=D[k];var i=o.dependencies.indexOf(s);if(i>-1){o.dependencies.splice(i,1);}});delete m[s];}};e.prototype._processDependentQueue=function(D,m,A){var f;var g;do{f=[];g=[];for(var i=0;i<Object.keys(D).length;i++){var s=Object.keys(D)[i];var o=D[s];if(o[e.PENDING]&&o.dependencies.length===0&&!o[e.PROCESSING]){o[e.PROCESSING]=true;o[e.PENDING]();g.push(s);f.push(o.changeObject.getKey());}}for(var j=0;j<g.length;j++){delete D[g[j]];}for(var k=0;k<f.length;k++){this._updateDependencies(D,m,f[k]);}}while(f.length>0);};e.getChangesAndPropagate=function(o,v){var m=o.getManifestObject();c._getChangesForComponentAfterInstantiation(v,m,o).then(function(g){o.addPropagationListener(e.applyChangesOnControl.bind(this,g,o));});};return e;},true);
