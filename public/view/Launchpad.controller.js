sap.ui.controller("ui5bp.view.Launchpad", {

    onInit: function() {
        this.bus = sap.ui.getCore().getEventBus();
    },

	doNavOnSelect : function (event) {
		this.bus.publish("nav", "to", {
			id : event
		});
	},
	onLoginPress: function(){
		this.onSubmitDialog();
	},

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
				text: 'Anmelden',
				press: function(){
				  	var loginData = sap.ui.getCore().getModel("login").getData();
					 loginData.connected = true;
					 sap.ui.getCore().getModel("login").setData(loginData);
					 var dialog = sap.ui.getCore().byId("idLoginDialog");
					 dialog.close();
				}
			}),
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
	}

});
