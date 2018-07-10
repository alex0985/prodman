sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function(Controller, JSONModel,MsgToast) {
	"use strict";

	return Controller.extend("ui5bp.controller.CreateProduct", {

		onInit: function() {
			this._initViewModel();
			this._showFormFragment("StartProduct");
		},
		onBack: function(oEvent){
			this._initViewModel();
			this._showFormFragment("StartProduct");
			sap.ui.getCore().getEventBus().publish("nav", "back", {id : "Launchpad"});
		},
		toLaunchpad: function () {
			this._initViewModel();
			this._showFormFragment("StartProduct");
			sap.ui.getCore().getEventBus().publish("nav", "back", {id : "Launchpad"});
		},
		onPress: function (oEvent) {
		},

		_formFragments: {},

		_getFormFragment: function (sFragmentName) {
			var oFormFragment = this._formFragments[sFragmentName];
			if (oFormFragment) {
				return oFormFragment;
			}
			oFormFragment = sap.ui.xmlfragment(this.getView().getId(), "ui5bp.fragments." + sFragmentName);
			this._formFragments[sFragmentName] = oFormFragment;
			return this._formFragments[sFragmentName];
		},
		_showFormFragment : function (sFragmentName) {
			var oPage = this.byId("idProductPage");
			oPage.removeAllContent();
			oPage.insertContent(this._getFormFragment(sFragmentName));
		},
		handleCheckPress: function () {
			debugger;
			var oModel = this.getView().getModel('maintainProduct');
			var productName = oModel.getData().productname;
			var eanCode = oModel.getData().eancode;


			if ( (eanCode == null || eanCode == '') && (productName == null || productName == '') ) {
				MsgToast.show("EAN Code oder Artikelname angeben");
			}else{
				this.byId('saveButton').setVisible(true);
				this.byId('cancelButton').setVisible(true);
				this.byId('checkButton').setVisible(false);

				var filter = {};
				if(eanCode){
					filter["eancode"] = eanCode;
				}
				if(productName){
					filter["productname"] = productName;
				}

				var oModelDB =	this._queryForProduct(filter);
				var dbData = oModelDB.getData();
				if (dbData.length > 0) {
					oModel.setData(dbData[0]);
					this._showFormFragment("CreateProduct");
					this._dbId = dbData[0]._id;
				}else{
					MsgToast.show("Artikel nicht vorhangen");
					this._showFormFragment("CreateProduct");
				}
			}
		},

		_queryForProduct: function (filter) {
			var oModelDB = new JSONModel();
			var aData = jQuery.ajax({
		             type : "POST",
		             contentType : "application/json",
		             url : "/api/getproducts",
		             dataType : "json",
								 data: JSON.stringify(filter),
		             async: false,
		             success : function(data,textStatus, jqXHR) {
									 debugger;
									 	oModelDB.setData(data);
		             }
		         });
			 return oModelDB;
		},
		_initViewModel: function () {
			this.byId('saveButton').setVisible(false);
			this.byId('cancelButton').setVisible(false);
			this.byId('checkButton').setVisible(true);
			var oModel = new JSONModel('/model/product.json');
			this.getView().setModel(oModel, 'maintainProduct');
		},
		handleCancelPress: function () {
			MsgToast.show("Pflege abgebrochen");
			this._initViewModel();
		},

		handleSavePress: function(){
			var data = this.getView().getModel('maintainProduct').getData();

			if(this._dbId){
				data["id"] = this._dbId;
				this._updateProductOnDb(data);
			}else{
				this._saveProductOnDb(data);
			}
		},
		_updateProductOnDb: function (data) {
				var aData = jQuery.ajax({
									 type : "POST",
									 contentType : "application/json",
									 url : "/api/updateProduct",
									 data: JSON.stringify(data),
									 success : function(data,textStatus, jqXHR) {
										 if (data.message) {
											 MsgToast.show(data.message);
										 }else{
											MsgToast.show("Artikel bearbeitet");
										 }
									 },
									 error: function(err){
											MsgToast.show("AJAX Request error");
										}
			  });
		},
		_saveProductOnDb: function (data) {
				var aData = jQuery.ajax({
									 type : "POST",
									 contentType : "application/json",
									 url : "/api/product",
									 data: JSON.stringify(data),
									 success : function(data,textStatus, jqXHR) {
										 if (data.message) {
											 MsgToast.show(data.message);
										 }else{
											MsgToast.show("Artikel angelegt");
										 }
									},
									 error: function(err){
											MsgToast.show("AJAX Request error");
									}
				});
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
