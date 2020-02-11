sap.ui.define([
	"be/rpan/epm/products/base/BaseController",
	"sap/base/Log"
], function(BaseController, Log) {
	"use strict";

	const DetailController = BaseController.extend("be.rpan.epm.products.controller.Detail", /** @lends be.rpan.epm.products.controller.Detail.prototype */ { });

	DetailController.prototype.onInit = function() {
		BaseController.prototype.onInit.apply(this, arguments);
		this.getOwnerComponent().getRouter().getRoute("detail").attachPatternMatched(this._onMatched, this);
	};

	DetailController.prototype._onMatched = function(oEvent) {
		Log.info(this.getView().getControllerName(), "_onMatched");
		const args = oEvent.getParameter("arguments");
		this.getOwnerComponent().getModel().metadataLoaded().then(this._bindData.bind(this, args.id));
	};

	DetailController.prototype._bindData = function(id) {
		Log.info(this.getView().getControllerName(), "_bindData");

		const objectPath = this.getOwnerComponent().getModel().createKey("Products", { Id: id });

		this.getView().bindElement({
			path: "/" + objectPath,
			parameters: {
				expand: "Supplier"
			},
			events: {
				change: function() {
					Log.info(this.getView().getControllerName(), "_bindData change");
					this.getView().setBusy(false);
				}.bind(this),
				dataRequested: function() {
					Log.info(this.getView().getControllerName(), "_bindData dataRequested");
					this.getView().setBusy(true);
				}.bind(this),
				dataReceived: function() {
					Log.info(this.getView().getControllerName(), "_bindData dataReceived");
					this.getView().setBusy(false);
					if (this.getView().getBindingContext() === null) {
						this.getOwnerComponent().getRouter().getTargets().display("notFound");
					}
				}.bind(this)
			}
		});
	};

	DetailController.prototype.onPressSupplier = function(event) {
		Log.info(this.getView().getControllerName(), "onPressSupplier " + event.getSource().getBindingContext().getObject().SupplierId);

		const ownerComponent = this.getOwnerComponent();
		const model = ownerComponent.getModel();
		const bindingContext = event.getSource().getBindingContext();
		const supplierId = bindingContext.getProperty("SupplierId");

		ownerComponent.fireEvent("toSupplier", {
			supplierId: supplierId,
			supplierKey: encodeURIComponent("/" + model.createKey("Suppliers", {
				Id: supplierId
			}))
		});
	};

	DetailController.prototype.onPressCategory = function(event) {
		Log.info(this.getView().getControllerName(), "onPressCategory " + event.getSource().getBindingContext().getObject().SubCategoryId);

		const ownerComponent = this.getOwnerComponent();
		const model = ownerComponent.getModel();
		const bindingContext = event.getSource().getBindingContext();
		const categoryId = bindingContext.getProperty("SubCategoryId");

		ownerComponent.fireEvent("toCategory", {
			categoryID: sCategoryID,
			categoryKey: encodeURIComponent("/" + model.createKey("SubCategories", {
				CategoryID: categoryId
			}))
		});
	};

	return DetailController;
});
