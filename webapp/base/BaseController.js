sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/base/Log"
], function(Controller, Log) {
	"use strict";

	const BaseController = Controller.extend("be.rpan.epm.products.base.BaseController", /** be.rpan.epm.products.base.BaseController.prototype */ {
		navProps: {}
	});

	BaseController.prototype.onInit = function () {
		Log.info(this.getView().getControllerName(), "onInit");

		const router = this.getRouter();
		router.attachEvent(
			"routeMatched",
			{},
			this.onRouteMatched,
			this
		);
	};

	BaseController.prototype.onRouteMatched = function (event) {
		this.navProps = event.getParameter("arguments") || {};
	};

	BaseController.prototype.navTo = function(route, params) {
		let parentChild = this.navProps || {};
		let resultParams = {};
		params = params || {}; //make sure it's an object

		resultsParams = { ...parentChild, ...params };

		this.getRouter().navTo(route, resultParams);
	};

	/**
	 * Convenience method for accessing the router in every controller of the application.
	 *
	 * @public
	 * @returns {sap.ui.core.routing.Router} the router for this component
	 */
	BaseController.prototype.getRouter = function () {
		return this.getOwnerComponent().getRouter();
	};

	/**
	 * Convenience method for getting the view model by name in every controller of the application.
	 *
	 * @public
	 * @param {string} sName the model name
	 * @returns {sap.ui.model.Model} the model instance
	 */
	BaseController.prototype.getModel = function (sName) {
		return this.getView().getModel(sName);
	};

	/**
	 * Convenience method for setting the view model in every controller of the application.
	 *
	 * @public
	 * @param {sap.ui.model.Model} oModel the model instance
	 * @param {string} sName the model name
	 * @returns {sap.ui.mvc.View} the view instance
	 */
	BaseController.prototype.setModel = function (oModel, sName) {
		return this.getView().setModel(oModel, sName);
	};

	/**
	 * Convenience method for getting the resource bundle.
	 *
	 * @public
	 * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
	 */
	BaseController.prototype.getResourceBundle = function () {
		return this.getOwnerComponent().getModel("i18n").getResourceBundle();
	};

	return BaseController;
});
