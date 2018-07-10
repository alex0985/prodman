jQuery.sap.require("jquery.sap.history");
jQuery.sap.require("sap.m.InstanceManager");
jQuery.sap.require("sap.ui.model.json.JSONModel");

sap.ui.controller("ui5bp.view.App", {

	getDefaultPage : function () {
		return "Menu";
	},

	onInit : function () {


		var historyDefaultHandler = function (navType) {
			if (navType === jQuery.sap.history.NavType.Back) {
				this.navBack(this.getDefaultPage());
			} else {
				this.navTo(this.getDefaultPage(), null, false);
			}
		};

		var historyPageHandler = function (params, navType) {
			if (!params || !params.id) {
				jQuery.sap.log.error("invalid parameter: " + params);
			} else {
				if (navType === jQuery.sap.history.NavType.Back) {
					this.navBack(params.id);
				} else {
					this.navTo(params.id, params.data, false);
				}
			}
		};

		jQuery.sap.history({
			routes: [{
				// This handler is executed when you navigate back to the history state on the path "page"
				path : "page",
				handler : jQuery.proxy(historyPageHandler, this)
			}],
			// The default handler is executed when you navigate back to the history state with an empty hash
			defaultHandler: jQuery.proxy(historyDefaultHandler, this)
		});

		// subscribe to event bus
		var bus = sap.ui.getCore().getEventBus();
		bus.subscribe("nav", "to", this.navHandler, this);
		bus.subscribe("nav", "backToPage", this.navHandler, this);
		bus.subscribe("nav", "back", this.navHandler, this);
		bus.subscribe("nav", "virtual", this.navHandler, this);
	},

	navHandler: function (channelId, eventId, data) {

		this.channelId = channelId;
		this.eventId = eventId;
		this.data = data;

		var loginData = sap.ui.getCore().getModel("login").getData();
		if(!loginData.connected){
			this.onSubmitDialog();
		}else{
			var app = this.getView().app;

			if (eventId === "to") {
				this.navTo(data.id, data.data, true);
			} else if (eventId === "backToPage" && data && data.id) {
				app.backToPage(data.id);
			} else if (eventId === "back") {
				if(data && data.id){
					this.navBack(data.id);
				} else {
					jQuery.sap.history.back();
				}
			} else if (eventId === "virtual") {
				jQuery.sap.history.addVirtualHistory();
			} else {
				jQuery.sap.log.error("'nav' event cannot be processed. There's no handler registered for event with id: " + eventId);
			}
		}

	},

	navTo : function (id, data, writeHistory) {

		if (id === undefined) {

			// invalid parameter
			jQuery.sap.log.error("navTo failed due to missing id");

		} else {

			var app = this.getView().app;
			// navigate in the app control
			app.to(id, "slide", data);

		}
	},

	navBack : function (id) {

		if (!id) {

			// invalid parameter
			jQuery.sap.log.error("navBack - parameters id must be given");

		} else {

			// close open popovers
			if (sap.m.InstanceManager.hasOpenPopover()) {
				sap.m.InstanceManager.closeAllPopovers();
			}

			// close open dialogs
			if (sap.m.InstanceManager.hasOpenDialog()) {
				sap.m.InstanceManager.closeAllDialogs();
				jQuery.sap.log.info("navBack - closed dialog(s)");
			}

			// ... and navigate back
			var app = this.getView().app;
			var currentId = (app.getCurrentPage()) ? app.getCurrentPage().getId() : null;
			if (currentId !== id) {
				app.backToPage(id);
				jQuery.sap.log.info("navBack - back to page: " + id);
			}
		}
	}

	,

	onSubmitDialog: function () {
		var dialog = new sap.m.Dialog({
			id: 'idLoginDialog',
			title: 'Login',
			type: 'Message',
			content: [
				new sap.m.Input({ placeholder:"Benutzername", value: "{login>/username}"}),
				new sap.m.Input({ placeholder:"Password", type:"Password", value: "{login>/password}"})
			],
			beginButton: new sap.m.Button({
				text: 'Anmelden'
			}).attachPress(this.onLoginPress),
			endButton: new sap.m.Button({
				text: 'Abbrechen',
				press: function () {
					dialog.close();
				}
			}),
			afterClose: function() {
				dialog.destroy();
			}
		});

		dialog.open();
	},


	onLoginPress: function() {
		var loginData = sap.ui.getCore().getModel("login").getData();
		 loginData.connected = true;
		 sap.ui.getCore().getModel("login").setData(loginData);
		 var dialog = sap.ui.getCore().byId("idLoginDialog");
		 dialog.close();
	}

});
