sap.ui.define([
	"be/rpan/epm/products/base/BaseController",
	"sap/m/ColumnListItem",
	"sap/m/Text",
	"sap/base/Log",
	"sap/ui/model/type/Currency"
], function(BaseController,	ColumnListItem, Text, Log, Currency) {
	"use strict";

	const ListController = BaseController.extend("be.rpan.epm.products.controller.List", /** @lends be.rpan.emp.products.controller.List.prototype */ { });

	ListController.prototype.onInit = function() {
		BaseController.prototype.onInit.apply(this, arguments);
		this.getOwnerComponent().getRouter().getRoute("list").attachMatched(this._onMatched, this);
	};

	ListController.prototype._onMatched = function(event) {
		const args = event.getParameter("arguments");
		const path = decodeURIComponent(args.basepath || "") + "/Products";
		const table = this.getView().byId("table");

		table.bindItems({
			path: path,
			parameters: {
				expand: "Supplier"
			},
			template: new ColumnListItem({
				type: "Navigation",
				press: this.onPressListItem.bind(this),
				cells: [
					new Text({ text: "{Id}" }),
					new Text({ text: "{Name}" }),
					new Text({ text: "{SupplierName}" }),
					new Text({ text: {
						parts: [{
							path: "Price"
						}, {
							path: "CurrencyCode"
						}],
						type: new Currency({
							currencyCode: true
						})
					} })
				]
			})
		});
	};

	ListController.prototype.onPressListItem =  function(event) {
		Log.info(this.getView().getControllerName(), "onPressListItem");

		const productId = event.getSource().getBindingContext().getProperty("Id");

		// inform the parent component about the navigation to the detail page
		//
		// the navigation isn't done within this component because when this component is embedded
		// in suppliers/categories component, it should trigger the navigation within the root
		// component.
		//
		// simply always inform the parent component that a navigation to the detail page is needed.
		// In the deeply nested use case, the direct parent component forwards this event to the root
		// component and a navigation is then triggered from the root component
		this.getOwnerComponent().fireEvent("toProduct", {
			productId: productId
		});
	};

	return ListController;
});
