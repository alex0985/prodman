/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./TableExtension','./TableUtils','sap/ui/Device','./library'],function(q,T,a,D,l){"use strict";var S=l.SharedDomRef;var H={onScroll:function(e){var s=this._getScrollExtension();q.sap.interaction.notifyScrollEvent&&q.sap.interaction.notifyScrollEvent(e);if(this._bOnAfterRendering){return;}var n=e.target.scrollLeft;var O=e.target._scrollLeft;if(n!==O){var f=H._getScrollAreas(this);e.target._scrollLeft=n;for(var i=0;i<f.length;i++){var g=f[i];if(g!==e.target&&g.scrollLeft!==n){g.scrollLeft=n;g._scrollLeft=n;}}s._iHorizontalScrollPosition=n;this._determineVisibleCols(this._collectTableSizes());}},restoreScrollPosition:function(t){var s=t._getScrollExtension();var h=s.getHorizontalScrollbar();if(h!==null&&s._iHorizontalScrollPosition!==null){var e=H._getScrollAreas(t);for(var i=0;i<e.length;i++){var f=e[i];delete f._scrollLeft;}if(h.scrollLeft!==s._iHorizontalScrollPosition){h.scrollLeft=s._iHorizontalScrollPosition;}else{var g=q.Event("scroll");g.target=h;H.onScroll.call(t,g);}}},addEventListeners:function(t){var s=t._getScrollExtension();var e=H._getScrollAreas(t);if(s._onHorizontalScrollEventHandler==null){s._onHorizontalScrollEventHandler=H.onScroll.bind(t);}for(var i=0;i<e.length;i++){e[i].addEventListener("scroll",s._onHorizontalScrollEventHandler);}},removeEventListeners:function(t){var s=t._getScrollExtension();var e=H._getScrollAreas(t);if(s._onHorizontalScrollEventHandler!=null){for(var i=0;i<e.length;i++){e[i].removeEventListener("scroll",s._onHorizontalScrollEventHandler);delete e[i]._scrollLeft;}delete s._onHorizontalScrollEventHandler;}},_getScrollAreas:function(t){var s=[t._getScrollExtension().getHorizontalScrollbar(),t.getDomRef("sapUiTableColHdrScr"),t.getDomRef("sapUiTableCtrlScr")];return s.filter(function(e){return e!=null;});}};var V={onScroll:function(e){var s=this._getScrollExtension();q.sap.interaction.notifyScrollEvent&&q.sap.interaction.notifyScrollEvent(e);if(s._bIsScrolledVerticallyByKeyboard){return;}this._getKeyboardExtension().setActionMode(false);function u(t){var v=t._getScrollExtension().getVerticalScrollbar();if(!v){return;}var i=v.scrollTop;s._iVerticalScrollPosition=i;var n=t._getFirstVisibleRowByScrollTop(i);var O=t.getFirstVisibleRow();var f=n!==O;if(f){t.setFirstVisibleRow(n,true);if(a.isVariableRowHeightEnabled(t)){t.attachEventOnce("_rowsUpdated",function(){this._adjustTablePosition(v.scrollTop,this._aRowHeights);});}}else if(a.isVariableRowHeightEnabled(t)){t._adjustTablePosition(i,t._aRowHeights);}}if(this._bLargeDataScrolling&&!s._bIsScrolledVerticallyByWheel){q.sap.clearDelayedCall(this._mTimeouts.scrollUpdateTimerId);this._mTimeouts.scrollUpdateTimerId=q.sap.delayedCall(300,this,function(){u(this);delete this._mTimeouts.scrollUpdateTimerId;}.bind(this));}else{u(this);}s._bIsScrolledVerticallyByWheel=false;},onScrollbarMouseDown:function(e){var s=this._getScrollExtension();s._bIsScrolledVerticallyByWheel=false;s._bIsScrolledVerticallyByKeyboard=false;},restoreScrollPosition:function(t){var s=t._getScrollExtension();if(s._iVerticalScrollPosition!==null){t._updateVSbScrollTop(s._iVerticalScrollPosition);}else{t._updateVSbScrollTop();}},addEventListeners:function(t){var s=t._getScrollExtension();var e=V._getScrollAreas(t);var v=s.getVerticalScrollbar();if(s._onVerticalScrollEventHandler==null){s._onVerticalScrollEventHandler=V.onScroll.bind(t);}for(var i=0;i<e.length;i++){e[i].addEventListener("scroll",s._onVerticalScrollEventHandler);}if(v!==null){if(s._onVerticalScrollbarMouseDownEventHandler==null){s._onVerticalScrollbarMouseDownEventHandler=V.onScrollbarMouseDown.bind(t);}v.addEventListener("mousedown",s._onVerticalScrollbarMouseDownEventHandler);}},removeEventListeners:function(t){var s=t._getScrollExtension();var e=V._getScrollAreas(t);var v=s.getVerticalScrollbar();if(s._onVerticalScrollEventHandler!=null){for(var i=0;i<e.length;i++){e[i].removeEventListener("scroll",s._onVerticalScrollEventHandler);}delete s._onVerticalScrollEventHandler;}if(v!==null&&s._onVerticalScrollbarMouseDownEventHandler!=null){v.removeEventListener("mousedown",s._onVerticalScrollbarMouseDownEventHandler);delete s._onVerticalScrollbarMouseDownEventHandler;}},_getScrollAreas:function(t){var s=[t._getScrollExtension().getVerticalScrollbar()];return s.filter(function(e){return e!=null;});}};var E={onMouseWheelScrolling:function(e){var s=this._getScrollExtension();var v=Math.abs(e.originalEvent.deltaY)>Math.abs(e.originalEvent.deltaX);var i=v?e.originalEvent.deltaY:e.originalEvent.deltaX;var h=v&&e.originalEvent.shiftKey||!v;var f=i>0;var g=false;if(i===0){return;}if(h){var j=s.getHorizontalScrollbar();if(e.originalEvent.deltaMode>0){var m=a.Column.getMinColumnWidth();i=f?m:-m;}if(f){g=j.scrollLeft===j.scrollWidth-j.clientWidth;}else{g=j.scrollLeft===0;}if(s.isHorizontalScrollbarVisible()&&!g){j.scrollLeft=j.scrollLeft+i;}e.preventDefault();e.stopPropagation();}else{var k=s.getVerticalScrollbar();if(e.originalEvent.deltaMode===1){i*=this._getScrollingPixelsForRow();}else if(e.originalEvent.deltaMode===2){i*=this._getScrollingPixelsForRow()*this.getVisibleRowCount();}if(f){g=k.scrollTop===k.scrollHeight-k.clientHeight;}else{g=k.scrollTop===0;}if(s.isVerticalScrollbarVisible()&&!g){e.preventDefault();e.stopPropagation();var r=i/this._getDefaultRowHeight();if(r>1){r=Math.floor(r);}s._bIsScrolledVerticallyByWheel=true;s._bIsScrolledVerticallyByKeyboard=false;k.scrollTop+=r*this._getScrollingPixelsForRow();}}}};function o(e){if(e.type==="touchstart"||e.pointerType==="touch"){this._bIsScrollVertical=null;var t=e.touches?e.touches[0]:e;this._aTouchStartPosition=[t.pageX,t.pageY];if(this._oVSb){this._iTouchScrollTop=this._oVSb.scrollTop;}if(this._oHSb){this._iTouchScrollLeft=this._oHSb.scrollLeft;}}}function b(e){if((e.type==="touchmove"||e.pointerType==="touch")&&this._aTouchStartPosition){var t=e.touches?e.touches[0]:e;var i=(t.pageX-this._aTouchStartPosition[0]);var f=(t.pageY-this._aTouchStartPosition[1]);if(this._bIsScrollVertical===null){if(i===0&&f===0){return;}this._bIsScrollVertical=Math.abs(f)>=Math.abs(i);}if(this._bIsScrollVertical&&this._oVSb){this._oVSb.scrollTop=this._iTouchScrollTop-f;if(D.browser.safari){e.preventDefault();}}else if(!this._bIsScrollVertical&&this._oHSb){this._oHSb.scrollLeft=this._iTouchScrollLeft-i;if(D.browser.safari){e.preventDefault();}}}}var c={_ontouchstart:o,_ontouchmove:b,onAfterRendering:function(e){V.restoreScrollPosition(this);H.restoreScrollPosition(this);this._oVSb=this._getScrollExtension().getVerticalScrollbar();this._oHSb=this._getScrollExtension().getHorizontalScrollbar();var f=this.getDomRef("tableCCnt");if(D.support.pointer&&D.system.desktop){f.addEventListener("pointerdown",o.bind(this));f.addEventListener("pointermove",b.bind(this),D.browser.chrome?{passive:true}:false);}else if(D.support.touch){f.addEventListener("touchstart",o.bind(this));f.addEventListener("touchmove",b.bind(this));}},onfocusin:function(e){var r;var C=a.getCellInfo(e.target);var i;if(C===null){return;}if(C.type===a.CELLTYPES.DATACELL){r=this.getDomRef("sapUiTableCtrlScr");i=a.getDataCellInfo(this,C.cell).columnIndex;}else if(C.type===a.CELLTYPES.COLUMNHEADER){r=this.getDomRef("sapUiTableColHdrScr");i=a.getColumnHeaderCellInfo(C.cell).index;}if(r!=null&&i>=this.getFixedColumnCount()){var f=C.cell[0];var s=r.scrollLeft;var R=r.clientWidth;var g=f.offsetLeft;var h=g+f.offsetWidth;var O=g-s;var j=h-R-s;var k=this._getScrollExtension().getHorizontalScrollbar();if(O<0&&j<0){k.scrollLeft=s+O;}else if(j>0&&O>0){k.scrollLeft=s+j;}}}};var d=T.extend("sap.ui.table.TableScrollExtension",{_init:function(t,s,m){this._type=s;this._delegate=c;this._iHorizontalScrollPosition=null;this._iVerticalScrollPosition=null;this._bIsScrolledVerticallyByWheel=false;this._bIsScrolledVerticallyByKeyboard=false;t.addEventDelegate(this._delegate,t);return"ScrollExtension";},_attachEvents:function(){var t=this.getTable();H.addEventListeners(t);V.addEventListeners(t);t._getScrollTargets().on("wheel",E.onMouseWheelScrolling.bind(t));},_detachEvents:function(){var t=this.getTable();H.removeEventListeners(t);V.removeEventListeners(t);t._getScrollTargets().off("wheel");},_debug:function(){this._ExtensionHelper=E;this._ExtensionDelegate=c;this._HorizontalScrollingHelper=H;this._VerticalScrollingHelper=V;},destroy:function(){var t=this.getTable();if(t){t.removeEventDelegate(this._delegate);}this._delegate=null;T.prototype.destroy.apply(this,arguments);},scroll:function(e,p,i){if(e==null){e=false;}if(p==null){p=false;}if(i==null){i=false;}var t=this.getTable();var s=false;var r=t._getRowCount();var v=t.getVisibleRowCount();var f=v-t.getFixedRowCount()-t.getFixedBottomRowCount();var F=t._getSanitizedFirstVisibleRow();var g=p?f:1;if(e){if(F+v<r){t.setFirstVisibleRow(Math.min(F+g,r-v));s=true;}}else if(F>0){t.setFirstVisibleRow(Math.max(F-g,0));s=true;}if(s&&i){this._bIsScrolledVerticallyByKeyboard=true;}return s;},scrollMax:function(e,i){if(e==null){e=false;}if(i==null){i=false;}var t=this.getTable();var s=false;var f=t._getSanitizedFirstVisibleRow();if(e){var F=t._getRowCount()-a.getNonEmptyVisibleRowCount(t);if(f<F){t.setFirstVisibleRow(F);s=true;}}else if(f>0){t.setFirstVisibleRow(0);s=true;}if(s&&i){this._bIsScrolledVerticallyByKeyboard=true;}return s;},getHorizontalScrollbar:function(){var t=this.getTable();if(t!=null){var v=t.getDomRef(S.HorizontalScrollBar);if(v!=null){return v;}}return null;},getVerticalScrollbar:function(){var t=this.getTable();if(t!=null){var v=t.getDomRef(S.VerticalScrollBar);if(v!=null){return v;}}return null;},isHorizontalScrollbarVisible:function(){var t=this.getTable();if(t!=null){var e=t.getDomRef();if(e!=null){return e.classList.contains("sapUiTableHScr");}}return false;},isVerticalScrollbarVisible:function(){var t=this.getTable();if(t!=null){var e=t.getDomRef();if(e!=null){return e.classList.contains("sapUiTableVScr");}}return false;},updateVerticalScrollbarHeight:function(){var t=this.getTable();t.getDomRef(S.VerticalScrollBar).style.maxHeight=t._getVSbHeight()+"px";}});return d;},true);
