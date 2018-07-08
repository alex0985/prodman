sap.ui.define(
	["sap/ui/core/UIComponent"],
	function(UIComponent){
		return UIComponent.extend("prodman",{

			metadata: {
				"manifest":"json"
			},

			init: function(){
				//super class constructor
				UIComponent.prototype.init.apply(this);
				this.getRouter().initialize();

			},
			// createContent: function(){

			// 	var oAppView = new sap.ui.view({
			// 		id:"idApp",
			// 		viewName:"fiori.view.App",
			// 		type:sap.ui.core.mvc.ViewType.XML
			// 	});



			// 	// var oApp = new sap.m.SplitApp("idApp",{
			// 	// 				masterPages:[new sap.ui.view({
			// 	// 								id:"idMain",
			// 	// 								viewName:"fiori.view.Main",
			// 	// 								type:sap.ui.core.mvc.ViewType.XML
			// 	// 							})],
			// 	// 				detailPages:[new sap.ui.view({
			// 	// 								id:"idView2",
			// 	// 								viewName:"fiori.view.View2",
			// 	// 								type:sap.ui.core.mvc.ViewType.XML
			// 	// 							})]
			// 	// 				});

			// 	//Component JS is the driver and will set the model object


			// 	return oAppView;
			// },
			destroy: function(){

			}

		});
	}
);
