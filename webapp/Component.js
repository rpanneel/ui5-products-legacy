sap.ui.define(
	["be/rpan/epm/products/base/BaseComponent", "sap/ui/core/Component"],
	function(BaseComponent, Component) {
		"use strict";

		const ProductsComponent = BaseComponent.extend(
			"be.rpan.epm.products.Component",
			/** @lends be.rpan.epm.products.Component.prototype */ {
				metadata: {
					manifest: "json"
				}
			}
		);

		ProductsComponent.prototype.init = function() {
			BaseComponent.prototype.init.apply(this, arguments);

			// Check if component is running inside another one
			const parentComponent = Component.getOwnerComponentFor(this);
			if (!parentComponent) {
				// No parent - Do navigation ourself
				this.attachEvent(
					"toProduct",
					function (event) {
						const productId = event.getParameter("productId");
						this.getRouter().navTo("detail", {
							id: productId
						});
					},
					this
				);
			}
		};

		return ProductsComponent;
	}
);
