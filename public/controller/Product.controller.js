sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("ui5bp.controller.Product", {

		onInit: function() {

		},
    onPress: function (oEvent) {
			var oModel = this.refresh();
			//var oList = this.byId('productList');
			this.getView().setModel(oModel);

    },
		onBack: function(oEvent){
			sap.ui.getCore().getEventBus().publish("nav", "back", {id : "Launchpad"});
		},

		refresh: function () {
			var oModel = new JSONModel();
			var aData = jQuery.ajax({
		             type : "POST",
		             contentType : "application/json",
		             url : "/api/getproducts",
		             dataType : "json",
		             async: false,
		             success : function(data,textStatus, jqXHR) {
									 	oModel.setData(data);
		             }
		         });
			 return oModel;
		},
		toLaunchpad: function () {
			sap.ui.getCore().getEventBus().publish("nav", "back", {id : "Launchpad"});
		}
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf test.view.TEST
		 */


		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf test.view.TEST
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf test.view.TEST
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf test.view.TEST
		 */
		//	onExit: function() {
		//
		//	}

	});

});
