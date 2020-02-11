sap.ui.define([
	"sap/ui/core/UIComponent"
], function(UIComponent) {
	"use strict";

	const BaseComponent = UIComponent.extend("be.rpan.epm.products.base.BaseComponent", /** @lends be.rpan.epm.products.base.BaseComponent.prototype */ {
	});

	BaseComponent.prototype.init = function () {
		UIComponent.prototype.init.apply(this, arguments);
		this.getRouter().initialize();
	};


	return BaseComponent;
});
