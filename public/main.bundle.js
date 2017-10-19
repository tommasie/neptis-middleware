webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/admin/admin-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__admin_component__ = __webpack_require__("../../../../../src/app/admin/admin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home_component__ = __webpack_require__("../../../../../src/app/admin/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__attractions_attraction_routes__ = __webpack_require__("../../../../../src/app/admin/attractions/attraction-routes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__museums_museum_routes__ = __webpack_require__("../../../../../src/app/admin/museums/museum-routes.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var routes = [
    { path: 'home', component: __WEBPACK_IMPORTED_MODULE_2__admin_component__["a" /* AdminComponent */],
        children: [
            { path: '', component: __WEBPACK_IMPORTED_MODULE_3__home_home_component__["a" /* HomeComponent */] },
            { path: 'attractions', children: __WEBPACK_IMPORTED_MODULE_4__attractions_attraction_routes__["a" /* attractionRoutes */].slice() },
            { path: 'museums', children: __WEBPACK_IMPORTED_MODULE_5__museums_museum_routes__["a" /* museumRoutes */].slice() },
        ]
    }
];
var AdminRoutingModule = (function () {
    function AdminRoutingModule() {
    }
    return AdminRoutingModule;
}());
AdminRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forChild(routes)
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]
        ]
    })
], AdminRoutingModule);

//# sourceMappingURL=admin-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/admin/admin.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".side-btn {\n  height:80px;\n  margin-top:30px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/admin/admin.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"double-column\" align=\"left\">\n\n\t<form name=\"form\" role=\"form\">\n\t\t<div class=\"col-md-3\">\n\n\t\t\t<button type=\"button\" class=\"btn btn-primary btn-lg btn-block side-btn\" [routerLink]=\"['/home']\" [routerLinkActive]=\"['active']\">\n\t\t\t\tHome\n\t\t\t</button>\n\n\t\t\t<button type=\"button\" class=\"btn btn-primary btn-lg btn-block side-btn\" [routerLink]=\"['attractions']\" [routerLinkActive]=\"['active']\">\n\t\t\t\tAttrazioni\n\t\t\t</button>\n\t\t\t<!-- <div class='sub_container' align=\"center\" [hidden]=\"vm.Cards_subButtons\">\n\t\t\t\t<button id=\"addCard\" type=\"button\" class=\"btn sub-btn btn-success\" ng-click=\"vm.addCard();\">Add a Card</button>\n\t\t\t\t<button id=\"delCard\" type=\"button\" class=\"btn sub-btn btn-danger\" ng-click=\"vm.delCard();\">Delete a Card</button>\n\t\t\t</div> -->\n\n\n\t\t\t<button type=\"button\" class=\"btn btn-primary btn-lg btn-block side-btn\" [routerLink]=\"['museums']\" [routerLinkActive]=\"['active']\">\n\t\t\t\tMusei\n\t\t\t</button>\n\t\t\t<!-- <div class='sub_container' align=\"center\" [hidden]=\"vm.Missions_subButtons\">\n\t\t\t\t<button id=\"addMission\" type=\"button\" class=\"btn sub-btn btn-success\" ng-click=\"vm.addMission();\">Add a Mission</button>\n\t\t\t</div> -->\n\n\t\t</div>\n\t\t<div class=\"col-md-9\">\n\t\t\t<router-outlet></router-outlet>\n\t\t</div>\n\n\t</form>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/admin/admin.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_attraction_service__ = __webpack_require__("../../../../../src/app/services/attraction.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AdminComponent = (function () {
    function AdminComponent() {
    }
    AdminComponent.prototype.ngOnInit = function () {
    };
    return AdminComponent;
}());
AdminComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-admin',
        providers: [__WEBPACK_IMPORTED_MODULE_1__services_attraction_service__["a" /* AttractionService */]],
        template: __webpack_require__("../../../../../src/app/admin/admin.component.html"),
        styles: [__webpack_require__("../../../../../src/app/admin/admin.component.css")]
    }),
    __metadata("design:paramtypes", [])
], AdminComponent);

//# sourceMappingURL=admin.component.js.map

/***/ }),

/***/ "../../../../../src/app/admin/admin.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__admin_routing_module__ = __webpack_require__("../../../../../src/app/admin/admin-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__agm_core__ = __webpack_require__("../../../../@agm/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__admin_component__ = __webpack_require__("../../../../../src/app/admin/admin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__home_home_component__ = __webpack_require__("../../../../../src/app/admin/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_attraction_service__ = __webpack_require__("../../../../../src/app/services/attraction.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//Core modules






//Components



var AdminModule = (function () {
    function AdminModule() {
    }
    return AdminModule;
}());
AdminModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__admin_component__["a" /* AdminComponent */],
            __WEBPACK_IMPORTED_MODULE_7__home_home_component__["a" /* HomeComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_4__admin_routing_module__["a" /* AdminRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_5__agm_core__["a" /* AgmCoreModule */].forRoot({ apiKey: 'AIzaSyAqY3G_iymwda5bn9g87a4YwDPWu13gnw0' }),
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_8__services_attraction_service__["a" /* AttractionService */]]
    })
], AdminModule);

//# sourceMappingURL=admin.module.js.map

/***/ }),

/***/ "../../../../../src/app/admin/attractions/addAttraction.component.html":
/***/ (function(module, exports) {

module.exports = "<div align=\"center\">\n  <h1>Aggiunta di una nuova attrazione</h1>\n</div>\n\n<form #form=\"ngForm\">\n  <div class=\"form-group\">\n    <label for=\"name\" style=\"float:left\">Nome</label>\n    <input [(ngModel)]=\"attraction.name\" name=\"name\" type=\"text\" class=\"form-control\" required />\n  </div>\n  <p align=\"center\"> Seleziona il sito dell'attrazione sulla mappa e aggiustane\n    i confini tenendo premuto sulla circonferenza e trascinando il mouse </p>\n\n  <agm-map  [latitude]=\"lat\"\n            [longitude]=\"lng\"\n            (mapClick) = \"mapclick($event)\"\n            style=\"height: 400px;\">\n    <agm-circle\n      [latitude]=\"circ.lat\" [longitude]=\"circ.lng\" [radius]=\"circ.radius\" [editable]=\"true\"\n      (radiusChange)=\"rChange(circ, $event)\"></agm-circle>\n  </agm-map>\n\n   <image-upload\n    [buttonCaption]=\"'Aggiungi immagine dell\\'attrazione'\"></image-upload>\n   <div align=\"center\" style=\"margin-top:20px;\">\n     <button class=\"btn btn-success\" (click)=\"finish()\">Aggiungi</button>\n     <button class=\"btn btn-danger\" [routerLink]=\"['new']\">Annulla</button>\n   </div>\n</form>\n"

/***/ }),

/***/ "../../../../../src/app/admin/attractions/addAttraction.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddAttractionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_attraction_service__ = __webpack_require__("../../../../../src/app/services/attraction.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_attraction__ = __webpack_require__("../../../../../src/app/model/attraction.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AddAttractionComponent = (function () {
    function AddAttractionComponent(service) {
        this.service = service;
        this.attraction = new __WEBPACK_IMPORTED_MODULE_2__model_attraction__["a" /* Attraction */]();
        this.lat = 41.90;
        this.lng = 12.4963;
        this.circ = new Circle();
    }
    AddAttractionComponent.prototype.ngOnInit = function () {
    };
    AddAttractionComponent.prototype.select = function (attraction) {
        console.log(attraction);
    };
    AddAttractionComponent.prototype.mapclick = function (event) {
        console.log(event);
        this.circ = new Circle();
        this.circ.lat = +event.coords.lat;
        this.circ.lng = +event.coords.lng;
        this.circ.radius = 100;
    };
    AddAttractionComponent.prototype.rChange = function (c, value) {
        this.circ.radius = value;
    };
    AddAttractionComponent.prototype.finish = function () {
        this.attraction.latitude = this.circ.lat;
        this.attraction.longitude = this.circ.lng;
        this.attraction.radius = this.circ.radius;
        this.service.addAttraction(this.attraction);
    };
    return AddAttractionComponent;
}());
AddAttractionComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'admin-add-attraction',
        template: __webpack_require__("../../../../../src/app/admin/attractions/addAttraction.component.html"),
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_attraction_service__["a" /* AttractionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_attraction_service__["a" /* AttractionService */]) === "function" && _a || Object])
], AddAttractionComponent);

var Circle = (function () {
    function Circle() {
    }
    return Circle;
}());
var _a;
//# sourceMappingURL=addAttraction.component.js.map

/***/ }),

/***/ "../../../../../src/app/admin/attractions/attraction-routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return attractionRoutes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__attractions_component__ = __webpack_require__("../../../../../src/app/admin/attractions/attractions.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__addAttraction_component__ = __webpack_require__("../../../../../src/app/admin/attractions/addAttraction.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__editAttraction_component__ = __webpack_require__("../../../../../src/app/admin/attractions/editAttraction.component.ts");



var attractionRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_0__attractions_component__["a" /* AttractionsComponent */],
        children: [
            { path: 'new', component: __WEBPACK_IMPORTED_MODULE_1__addAttraction_component__["a" /* AddAttractionComponent */] },
            { path: ':id', component: __WEBPACK_IMPORTED_MODULE_2__editAttraction_component__["a" /* EditAttractionComponent */] }
        ]
    }
];
//# sourceMappingURL=attraction-routes.js.map

/***/ }),

/***/ "../../../../../src/app/admin/attractions/attraction.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AttractionModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__agm_core__ = __webpack_require__("../../../../@agm/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_image_upload__ = __webpack_require__("../../../../angular2-image-upload/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pipe_main_pipe_module__ = __webpack_require__("../../../../../src/app/pipe/main-pipe.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__attractions_component__ = __webpack_require__("../../../../../src/app/admin/attractions/attractions.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__addAttraction_component__ = __webpack_require__("../../../../../src/app/admin/attractions/addAttraction.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__editAttraction_component__ = __webpack_require__("../../../../../src/app/admin/attractions/editAttraction.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_attraction_service__ = __webpack_require__("../../../../../src/app/services/attraction.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//Core modules








//Components




var AttractionModule = (function () {
    function AttractionModule() {
    }
    return AttractionModule;
}());
AttractionModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_8__attractions_component__["a" /* AttractionsComponent */],
            __WEBPACK_IMPORTED_MODULE_9__addAttraction_component__["a" /* AddAttractionComponent */],
            __WEBPACK_IMPORTED_MODULE_10__editAttraction_component__["a" /* EditAttractionComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["b" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* RouterModule */],
            __WEBPACK_IMPORTED_MODULE_5__agm_core__["a" /* AgmCoreModule */].forRoot({ apiKey: 'AIzaSyAqY3G_iymwda5bn9g87a4YwDPWu13gnw0' }),
            __WEBPACK_IMPORTED_MODULE_6_angular2_image_upload__["a" /* ImageUploadModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_7__pipe_main_pipe_module__["a" /* MainPipe */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_8__attractions_component__["a" /* AttractionsComponent */],
            __WEBPACK_IMPORTED_MODULE_9__addAttraction_component__["a" /* AddAttractionComponent */],
            __WEBPACK_IMPORTED_MODULE_10__editAttraction_component__["a" /* EditAttractionComponent */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_11__services_attraction_service__["a" /* AttractionService */]]
    })
], AttractionModule);

//# sourceMappingURL=attraction.module.js.map

/***/ }),

/***/ "../../../../../src/app/admin/attractions/attractions.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"panel panel-primary\" style=\"margin-top:30px;\">\n  <div class=\"panel-heading\">\n    <h3 class=\"panel-title\">Attrazioni all'aperto</h3>\n  </div>\n  <div class=\"form-group\" style=\"margin:20px\">\n    <label for=\"search\" style=\"float:left\">Cerca attrazione</label>\n    <input type=\"text\" name=\"search\" class=\"form-control\" [(ngModel)]=\"searchString\"/>\n  </div>\n  <div style=\"height=10px;overflow: auto;\">\n    <table class=\"table table-hover\">\n      <thead>\n        <tr>\n          <th>Nome</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor=\"let attraction of attractions | myfilter: searchString\" (click)=\"select(attraction)\" [ngClass]=\"{'info': attraction == selectedAttraction, 'default': attraction != selectedAttraction}\">\n          <td>{{ attraction['name'] }}<td>\n          <!-- <td>\n            <button class=\"btn btn-xs btn-default\">\n              <span class=\"glyphicon glyphicon-map-marker\"></span>\n              Map\n            </button>\n          </td> -->\n          <td align=\"right\">\n            <button class=\"btn btn-xs btn-warning\" [routerLink]=\"[attraction['id']]\">\n              <span class=\"glyphicon glyphicon-edit\"></span>\n              Modifica\n            </button>\n            <button class=\"btn btn-xs btn-danger\">\n              <span class=\"glyphicon glyphicon-trash\"></span>\n              Elimina\n            </button>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</div>\n\n<div align=\"center\">\n  <button class=\"btn btn-primary\" [routerLink]=\"['new']\">Aggiungi nuova attrazione</button>\n  <!-- <div [hidden]=\"!selected\">\n    <button class=\"btn btn-warning\">Modifica</button>\n    <button class=\"btn btn-danger\">Elimina</button>\n  </div> -->\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/admin/attractions/attractions.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AttractionsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_attraction_service__ = __webpack_require__("../../../../../src/app/services/attraction.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AttractionsComponent = (function () {
    function AttractionsComponent(service) {
        this.service = service;
        this.selected = false;
    }
    AttractionsComponent.prototype.ngOnInit = function () {
        this.load();
    };
    AttractionsComponent.prototype.load = function () {
        var _this = this;
        this.service.getCitiesAttractions().subscribe(function (data) { _this.attractions = data; console.log(_this.attractions); });
        this.service.getMuseums().subscribe(function (data) { _this.museums = data; console.log(_this.museums); });
    };
    AttractionsComponent.prototype.select = function (attraction) {
        console.log(attraction);
        this.selectedAttraction = attraction;
        this.selected = true;
    };
    return AttractionsComponent;
}());
AttractionsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'admin-attractions',
        template: __webpack_require__("../../../../../src/app/admin/attractions/attractions.component.html"),
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_attraction_service__["a" /* AttractionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_attraction_service__["a" /* AttractionService */]) === "function" && _a || Object])
], AttractionsComponent);

var _a;
//# sourceMappingURL=attractions.component.js.map

/***/ }),

/***/ "../../../../../src/app/admin/attractions/editAttraction.component.html":
/***/ (function(module, exports) {

module.exports = "<div align=\"center\">\n  <h1>Modifica dell'attrazione</h1>\n</div>\n\n<form #form=\"ngForm\">\n  <div class=\"form-group\">\n    <label for=\"name\" style=\"float:left\">Nome</label>\n    <input [(ngModel)]=\"attraction.name\" name=\"name\" type=\"text\" class=\"form-control\" required />\n  </div>\n\n  <agm-map  [latitude]=\"attraction.latitude\"\n            [longitude]=\"attraction.longitude\"\n            [zoom]=\"13\"\n            (mapClick) = \"mapclick($event)\"\n            style=\"height: 400px;\">\n    <agm-circle\n      [latitude]=\"attraction.latitude\" [longitude]=\"attraction.longitude\" [radius]=\"attraction.radius\" [editable]=\"true\" [draggable]=\"true\"\n      (radiusChange)=\"rChange(attraction, $event)\" (drag)=\"drag(attraction,event)\"></agm-circle>\n  </agm-map>\n   <image-upload\n    [buttonCaption]=\"'Aggiungi immagine dell\\'attrazione'\"></image-upload>\n   <div align=\"center\" style=\"margin-top:20px;\">\n     <button class=\"btn btn-success\" (click)=\"finish()\">Aggiungi</button>\n     <button class=\"btn btn-danger\" [routerLink]=\"['new']\">Annulla</button>\n   </div>\n</form>\n"

/***/ }),

/***/ "../../../../../src/app/admin/attractions/editAttraction.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditAttractionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_attraction_service__ = __webpack_require__("../../../../../src/app/services/attraction.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EditAttractionComponent = (function () {
    function EditAttractionComponent(route, router, service) {
        this.route = route;
        this.router = router;
        this.service = service;
        this.lat = 41.90;
        this.lng = 12.4963;
    }
    EditAttractionComponent.prototype.ngOnInit = function () {
        //params.get('id')
        /*this.route.paramMap
        .switchMap((params: ParamMap) =>
          this.service.getCityAttraction()).subscribe(res => {
            console.log(res);
            this.name = res[0]['name'];
            this.latitude = +res[0]['latitude'];
            this.longitude = +res[0]['longitude'];
            this.m = {lat: this.latitude, lng: this.longitude, label: this.name};
          });*/
        this.attraction = this.service.attractions[0];
        console.log(this.attraction);
    };
    EditAttractionComponent.prototype.mapclick = function (event) {
        console.log(event);
        this.attraction.latitude = event.coords.lat;
        this.attraction.longitude = event.coords.lng;
    };
    EditAttractionComponent.prototype.drag = function (m, event) {
        console.log(m);
        console.log(event);
    };
    EditAttractionComponent.prototype.rChange = function (attraction, event) {
        console.log(attraction, event);
        this.attraction.radius = event;
    };
    EditAttractionComponent.prototype.finish = function () {
        //PUT data to server
    };
    return EditAttractionComponent;
}());
EditAttractionComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'admin-attraction',
        template: __webpack_require__("../../../../../src/app/admin/attractions/editAttraction.component.html"),
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_attraction_service__["a" /* AttractionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_attraction_service__["a" /* AttractionService */]) === "function" && _c || Object])
], EditAttractionComponent);

var Circle = (function () {
    function Circle() {
    }
    return Circle;
}());
var _a, _b, _c;
//# sourceMappingURL=editAttraction.component.js.map

/***/ }),

/***/ "../../../../../src/app/admin/home/home.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "agm-map {\n  height: 400px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/admin/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"panel panel-primary\" style=\"margin-top:30px;\">\n  <div class=\"panel-heading\">\n    <h3 class=\"panel-title\">Mappa delle attrazioni</h3>\n  </div>\n  <div class=\"panel-body\">\n    <agm-map  [latitude]=\"lat\"\n              [longitude]=\"lng\"\n              [zoom]=\"13\"\n              (mapClick) = \"mapclick($event)\">\n      <agm-marker *ngFor=\"let m of markers\" [latitude]=\"m.lat\" [longitude]=\"m.lng\"></agm-marker>\n      <agm-circle *ngFor=\"let c of circles\"\n        [latitude]=\"c.lat\" [longitude]=\"c.lng\" [radius]=\"c.radius\" [editable]=\"true\"\n        (radiusChange)=\"rChange(c, $event)\"></agm-circle>\n    </agm-map>\n  </div>\n</div>\n\n\n<div class=\"panel panel-primary\">\n  <div class=\"panel-heading\">\n    <h3 class=\"panel-title\">Attrazioni all'aperto</h3>\n  </div>\n  <div class=\"panel-body\">\n    <table class=\"table\">\n      <thead>\n        <tr>\n          <th>Nome</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor=\"let attraction of attractions\">\n          <td>{{ attraction['name'] }}<td>\n          <td align=\"right\">\n            <button class=\"btn btn-xs btn-default\">\n              <span class=\"glyphicon glyphicon-map-marker\"></span>\n              Guarda su mappa\n            </button>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</div>\n\n<div class=\"panel panel-primary\">\n  <div class=\"panel-heading\">\n    <h3 class=\"panel-title\">Musei</h3>\n  </div>\n  <div class=\"panel-body\">\n    <table class=\"table\">\n      <thead>\n        <tr>\n          <th>Nome</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor=\"let museum of museums\">\n          <td>{{ museum['name'] }}<td>\n            <td align=\"right\">\n              <button class=\"btn btn-xs btn-default\">\n                <span class=\"glyphicon glyphicon-map-marker\"></span>\n                Guarda su mappa\n              </button>\n            </td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/admin/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_attraction_service__ = __webpack_require__("../../../../../src/app/services/attraction.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomeComponent = (function () {
    function HomeComponent(service) {
        this.service = service;
        this.markers = [];
        this.lat = 41.90;
        this.lng = 12.4963;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.load();
    };
    HomeComponent.prototype.load = function () {
        var _this = this;
        this.service.getCitiesAttractions().subscribe(function (data) {
            _this.attractions = data;
            console.log(_this.attractions);
            for (var _i = 0, _a = _this.attractions; _i < _a.length; _i++) {
                var attraction = _a[_i];
                console.log(attraction);
                var lat = +attraction['latitude'];
                var lng = +attraction['longitude'];
                var label = attraction['name'];
                var marker = {
                    lat: lat, lng: lng, label: label
                };
                _this.markers.push(marker);
            }
            console.log(_this.markers);
        });
        this.service.getMuseums().subscribe(function (data) { _this.museums = data; console.log(_this.museums); });
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'admin-home',
        template: __webpack_require__("../../../../../src/app/admin/home/home.component.html"),
        styles: [__webpack_require__("../../../../../src/app/admin/home/home.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_attraction_service__["a" /* AttractionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_attraction_service__["a" /* AttractionService */]) === "function" && _a || Object])
], HomeComponent);

var _a;
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ "../../../../../src/app/admin/museums/addMuseum.component.html":
/***/ (function(module, exports) {

module.exports = "<div align=\"center\">\n  <h1>Aggiunta di un nuovo museo</h1>\n</div>\n\n<form #form=\"ngForm\">\n  <div class=\"form-group\">\n    <label for=\"name\" style=\"float:left\">Nome del museo</label>\n    <input [(ngModel)]=\"museum.name\" name=\"name\" type=\"text\" class=\"form-control\" required />\n  </div>\n  <p align=\"center\" style=\"margin-top:20px;margin-bottom:20px\">Inserisci la varie sale che compongono il museo, dopodiché seleziona una sala dalla\n    lista per aggiungere le attrazioni e le sale adiacenti</p>\n  <div class=\"row\">\n    <div class=\"col-md-4\">\n      <div class=\"form-group\">\n        <label for=\"areaName\" style=\"float:left\">Nome sala</label>\n        <input [(ngModel)]=\"areaName\" name=\"areaName\" type=\"text\" class=\"form-control\" required />\n        <table class=\"table\">\n          <tr>\n            <th>Lista delle sale</th>\n          </tr>\n          <tr *ngFor=\"let area of museum.rooms\" (click)=\"selectArea(area)\" [ngClass]=\"{'info':area==selectedArea, 'default':area!=selectedArea}\">\n            <td>{{area.name}}</td>\n          </tr>\n        </table>\n        <div align=\"center\">\n          <button class=\"btn btn-primary\" (click)=\"addRoom()\">Aggiungi</button>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-md-4\">\n      <div class=\"form-group\">\n        <label for=\"attractionName\" style=\"float:left\">Nome dell'attrazione</label>\n        <input [(ngModel)]=\"attractionName\" name=\"attractionName\" type=\"text\" class=\"form-control\" required />\n        <table class=\"table\">\n          <tr>\n            <th>Lista delle attrazioni</th>\n          </tr>\n          <tr *ngFor=\"let attraction of selectedArea.attractions\">\n            <td>{{attraction.name}}</td>\n          </tr>\n        </table>\n        <div align=\"center\">\n          <button class=\"btn btn-primary\" [disabled]=\"selectedArea.name==undefined\" (click)=\"addAttraction()\">Aggiungi</button>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-md-4\">\n      <div class=\"form-group\">\n        <label style=\"float:left\">Collegamenti</label>\n        <ng-select [allowClear]=\"true\"\n              [items]=\"getRooms()\"\n              [disabled]=\"selectedArea.name==undefined\"\n              (selected)=\"addLink($event)\">\n        </ng-select>\n        <table class=\"table\">\n          <tr>\n            <th>Lista dei collegamenti</th>\n          </tr>\n          <tr *ngFor=\"let room of selectedArea.adjacent\">\n            <td>{{room.name}}</td>\n          </tr>\n        </table>\n        <div align=\"center\">\n          <button class=\"btn btn-primary\" [disabled]=\"selectedArea.name==undefined\" (click)=\"addLink()\">Aggiungi</button>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div align=\"center\">\n      <p style=\"margin-top:20px;margin-bottom:20px\">Definisci la prima ed ultima sala del museo (possono coincidere)</p>\n    </div>\n    <div class=\"col-md-4 col-md-offset-4\">\n      <ng-select\n            [items]=\"getRooms()\"\n            (selected)=\"addStartRoom($event)\">\n      </ng-select>\n    </div>\n    <div class=\"col-md-4 col-md-offset-4\" style=\"margin-top:20px\">\n      <ng-select\n            [items]=\"getRooms()\"\n            (selected)=\"addStartRoom($event)\">\n      </ng-select>\n    </div>\n  </div>\n   <div align=\"center\" style=\"margin-top:20px;\">\n     <button class=\"btn btn-success\" (click)=\"finish()\">Aggiungi</button>\n     <button class=\"btn btn-danger\" [routerLink]=\"['/home','museums']\">Annulla</button>\n   </div>\n</form>\n"

/***/ }),

/***/ "../../../../../src/app/admin/museums/addMuseum.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddMuseumComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_attraction_service__ = __webpack_require__("../../../../../src/app/services/attraction.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_museum__ = __webpack_require__("../../../../../src/app/model/museum.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AddMuseumComponent = (function () {
    function AddMuseumComponent(service) {
        this.service = service;
        this.museum = new __WEBPACK_IMPORTED_MODULE_2__model_museum__["a" /* Museum */]();
        this.selectedArea = new __WEBPACK_IMPORTED_MODULE_2__model_museum__["c" /* Room */]();
    }
    AddMuseumComponent.prototype.ngOnInit = function () {
    };
    AddMuseumComponent.prototype.addRoom = function () {
        var room = new __WEBPACK_IMPORTED_MODULE_2__model_museum__["c" /* Room */]();
        room.name = this.areaName;
        this.museum.rooms.push(room);
        this.areaName = "";
    };
    AddMuseumComponent.prototype.selectArea = function (area) {
        this.selectedArea = area;
    };
    AddMuseumComponent.prototype.addAttraction = function () {
        var attr = new __WEBPACK_IMPORTED_MODULE_2__model_museum__["b" /* MuseumAttraction */]();
        attr.name = this.attractionName;
        this.selectedArea.attractions.push(attr);
        this.attractionName = "";
    };
    AddMuseumComponent.prototype.getRooms = function () {
        var array = [];
        for (var _i = 0, _a = this.museum.rooms; _i < _a.length; _i++) {
            var room = _a[_i];
            array.push(room.name);
        }
        return array;
    };
    AddMuseumComponent.prototype.addLink = function (event) {
        for (var _i = 0, _a = this.museum.rooms; _i < _a.length; _i++) {
            var room = _a[_i];
            if (event['text'] == room.name)
                this.selectedArea.adjacent.push(room);
        }
    };
    AddMuseumComponent.prototype.addStartRoom = function (event) {
        for (var _i = 0, _a = this.museum.rooms; _i < _a.length; _i++) {
            var room = _a[_i];
            if (event['text'] == room.name)
                this.museum.start = room;
        }
    };
    AddMuseumComponent.prototype.addEndRoom = function (event) {
        for (var _i = 0, _a = this.museum.rooms; _i < _a.length; _i++) {
            var room = _a[_i];
            if (event['text'] == room.name)
                this.museum.end = room;
        }
    };
    AddMuseumComponent.prototype.finish = function () {
        this.service.addMuseum(this.museum);
    };
    return AddMuseumComponent;
}());
AddMuseumComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'admin-add-museum',
        template: __webpack_require__("../../../../../src/app/admin/museums/addMuseum.component.html"),
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_attraction_service__["a" /* AttractionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_attraction_service__["a" /* AttractionService */]) === "function" && _a || Object])
], AddMuseumComponent);

var _a;
//# sourceMappingURL=addMuseum.component.js.map

/***/ }),

/***/ "../../../../../src/app/admin/museums/editMuseum.component.html":
/***/ (function(module, exports) {

module.exports = "<div align=\"center\">\n  <h1>Aggiunta di un nuovo museo</h1>\n</div>\n\n<form #form=\"ngForm\">\n  <div class=\"form-group\">\n    <label for=\"name\" style=\"float:left\">Nome del museo</label>\n    <input [(ngModel)]=\"museum.name\" name=\"name\" type=\"text\" class=\"form-control\" required />\n  </div>\n  <p align=\"center\" style=\"margin-top:20px;margin-bottom:20px\">Inserisci la varie sale che compongono il museo, dopodiché seleziona una sala dalla\n    lista per aggiungere le attrazioni e le sale adiacenti</p>\n  <div class=\"row\">\n    <div class=\"col-md-4\">\n      <div class=\"form-group\">\n        <label for=\"areaName\" style=\"float:left\">Nome sala</label>\n        <input [(ngModel)]=\"areaName\" name=\"areaName\" type=\"text\" class=\"form-control\" required />\n        <table class=\"table\">\n          <tr>\n            <th>Lista delle sale</th>\n          </tr>\n          <tr *ngFor=\"let area of museum.rooms\" (click)=\"selectArea(area)\" [ngClass]=\"{'info':area==selectedArea, 'default':area!=selectedArea}\">\n            <td>{{area.name}}</td>\n          </tr>\n        </table>\n        <div align=\"center\">\n          <button class=\"btn btn-primary\" (click)=\"addRoom()\">Aggiungi</button>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-md-4\">\n      <div class=\"form-group\">\n        <label for=\"attractionName\" style=\"float:left\">Nome dell'attrazione</label>\n        <input [(ngModel)]=\"attractionName\" name=\"attractionName\" type=\"text\" class=\"form-control\" required />\n        <table class=\"table\">\n          <tr>\n            <th>Lista delle attrazioni</th>\n          </tr>\n          <tr *ngFor=\"let attraction of selectedArea.attractions\">\n            <td>{{attraction.name}}</td>\n          </tr>\n        </table>\n        <div align=\"center\">\n          <button class=\"btn btn-primary\" [disabled]=\"selectedArea.name==undefined\" (click)=\"addAttraction()\">Aggiungi</button>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-md-4\">\n      <div class=\"form-group\">\n        <label style=\"float:left\">Collegamenti</label>\n        <ng-select [allowClear]=\"true\"\n              [items]=\"getRooms()\"\n              [disabled]=\"selectedArea.name==undefined\"\n              (selected)=\"addLink($event)\">\n        </ng-select>\n        <table class=\"table\">\n          <tr>\n            <th>Lista dei collegamenti</th>\n          </tr>\n          <tr *ngFor=\"let room of selectedArea.adjacent\">\n            <td>{{room.name}}</td>\n          </tr>\n        </table>\n        <div align=\"center\">\n          <button class=\"btn btn-primary\" [disabled]=\"selectedArea.name==undefined\" (click)=\"addLink()\">Aggiungi</button>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div align=\"center\">\n      <p style=\"margin-top:20px;margin-bottom:20px\">Definisci la prima ed ultima sala del museo (possono coincidere)</p>\n    </div>\n    <div class=\"col-md-4 col-md-offset-4\">\n      <ng-select\n            [items]=\"getRooms()\"\n            (selected)=\"addStartRoom($event)\">\n      </ng-select>\n    </div>\n    <div class=\"col-md-4 col-md-offset-4\" style=\"margin-top:20px\">\n      <ng-select\n            [items]=\"getRooms()\"\n            (selected)=\"addStartRoom($event)\">\n      </ng-select>\n    </div>\n  </div>\n   <div align=\"center\" style=\"margin-top:20px;\">\n     <button class=\"btn btn-success\" (click)=\"finish()\">Aggiungi</button>\n     <button class=\"btn btn-danger\" [routerLink]=\"['/home','museums']\">Annulla</button>\n   </div>\n</form>\n"

/***/ }),

/***/ "../../../../../src/app/admin/museums/editMuseum.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditMuseumComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_attraction_service__ = __webpack_require__("../../../../../src/app/services/attraction.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_museum__ = __webpack_require__("../../../../../src/app/model/museum.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EditMuseumComponent = (function () {
    function EditMuseumComponent(service) {
        this.service = service;
        this.museum = new __WEBPACK_IMPORTED_MODULE_2__model_museum__["a" /* Museum */]();
        this.selectedArea = new __WEBPACK_IMPORTED_MODULE_2__model_museum__["c" /* Room */]();
    }
    EditMuseumComponent.prototype.ngOnInit = function () {
    };
    EditMuseumComponent.prototype.addRoom = function () {
        var room = new __WEBPACK_IMPORTED_MODULE_2__model_museum__["c" /* Room */]();
        room.name = this.areaName;
        this.museum.rooms.push(room);
        this.areaName = "";
    };
    EditMuseumComponent.prototype.selectArea = function (area) {
        this.selectedArea = area;
    };
    EditMuseumComponent.prototype.addAttraction = function () {
        var attr = new __WEBPACK_IMPORTED_MODULE_2__model_museum__["b" /* MuseumAttraction */]();
        attr.name = this.attractionName;
        this.selectedArea.attractions.push(attr);
        this.attractionName = "";
    };
    EditMuseumComponent.prototype.getRooms = function () {
        var array = [];
        for (var _i = 0, _a = this.museum.rooms; _i < _a.length; _i++) {
            var room = _a[_i];
            array.push(room.name);
        }
        return array;
    };
    EditMuseumComponent.prototype.addLink = function (event) {
        for (var _i = 0, _a = this.museum.rooms; _i < _a.length; _i++) {
            var room = _a[_i];
            if (event['text'] == room.name)
                this.selectedArea.adjacent.push(room);
        }
    };
    EditMuseumComponent.prototype.addStartRoom = function (event) {
        for (var _i = 0, _a = this.museum.rooms; _i < _a.length; _i++) {
            var room = _a[_i];
            if (event['text'] == room.name)
                this.museum.start = room;
        }
    };
    EditMuseumComponent.prototype.addEndRoom = function (event) {
        for (var _i = 0, _a = this.museum.rooms; _i < _a.length; _i++) {
            var room = _a[_i];
            if (event['text'] == room.name)
                this.museum.end = room;
        }
    };
    EditMuseumComponent.prototype.finish = function () {
        this.service.addMuseum(this.museum);
    };
    return EditMuseumComponent;
}());
EditMuseumComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'admin-edit-museum',
        template: __webpack_require__("../../../../../src/app/admin/museums/editMuseum.component.html"),
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_attraction_service__["a" /* AttractionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_attraction_service__["a" /* AttractionService */]) === "function" && _a || Object])
], EditMuseumComponent);

var _a;
//# sourceMappingURL=editMuseum.component.js.map

/***/ }),

/***/ "../../../../../src/app/admin/museums/museum-routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return museumRoutes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__museums_component__ = __webpack_require__("../../../../../src/app/admin/museums/museums.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__addMuseum_component__ = __webpack_require__("../../../../../src/app/admin/museums/addMuseum.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__editMuseum_component__ = __webpack_require__("../../../../../src/app/admin/museums/editMuseum.component.ts");



var museumRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_0__museums_component__["a" /* MuseumsComponent */],
        children: [
            { path: 'new', component: __WEBPACK_IMPORTED_MODULE_1__addMuseum_component__["a" /* AddMuseumComponent */] },
            { path: ':id', component: __WEBPACK_IMPORTED_MODULE_2__editMuseum_component__["a" /* EditMuseumComponent */] }
        ]
    }
];
//# sourceMappingURL=museum-routes.js.map

/***/ }),

/***/ "../../../../../src/app/admin/museums/museum.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MuseumModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__agm_core__ = __webpack_require__("../../../../@agm/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_image_upload__ = __webpack_require__("../../../../angular2-image-upload/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_select__ = __webpack_require__("../../../../ng2-select/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_select___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_ng2_select__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pipe_main_pipe_module__ = __webpack_require__("../../../../../src/app/pipe/main-pipe.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__museums_component__ = __webpack_require__("../../../../../src/app/admin/museums/museums.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__addMuseum_component__ = __webpack_require__("../../../../../src/app/admin/museums/addMuseum.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__editMuseum_component__ = __webpack_require__("../../../../../src/app/admin/museums/editMuseum.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var MuseumModule = (function () {
    function MuseumModule() {
    }
    return MuseumModule;
}());
MuseumModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_9__museums_component__["a" /* MuseumsComponent */],
            __WEBPACK_IMPORTED_MODULE_10__addMuseum_component__["a" /* AddMuseumComponent */],
            __WEBPACK_IMPORTED_MODULE_11__editMuseum_component__["a" /* EditMuseumComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_7_ng2_select__["SelectModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["c" /* RouterModule */],
            __WEBPACK_IMPORTED_MODULE_5__agm_core__["a" /* AgmCoreModule */].forRoot({ apiKey: 'AIzaSyAqY3G_iymwda5bn9g87a4YwDPWu13gnw0' }),
            __WEBPACK_IMPORTED_MODULE_6_angular2_image_upload__["a" /* ImageUploadModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_8__pipe_main_pipe_module__["a" /* MainPipe */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_9__museums_component__["a" /* MuseumsComponent */],
            __WEBPACK_IMPORTED_MODULE_10__addMuseum_component__["a" /* AddMuseumComponent */],
            __WEBPACK_IMPORTED_MODULE_11__editMuseum_component__["a" /* EditMuseumComponent */]
        ],
        providers: []
    })
], MuseumModule);

//# sourceMappingURL=museum.module.js.map

/***/ }),

/***/ "../../../../../src/app/admin/museums/museums.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"panel panel-primary\" style=\"margin-top:30px;\">\n  <div class=\"panel-heading\">\n    <h3 class=\"panel-title\">Musei</h3>\n  </div>\n  <div class=\"form-group\" style=\"margin:20px\">\n    <label for=\"search\" style=\"float:left\">Cerca museo</label>\n    <input type=\"text\" name=\"search\" class=\"form-control\" [(ngModel)]=\"searchString\"/>\n  </div>\n    <table class=\"table table-hover\">\n      <thead>\n        <tr>\n          <th>Nome</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor=\"let museum of museums\" (click)=\"select(museum)\" [ngClass]=\"{'info': museum == selectedAttraction, 'default': museum != selectedAttraction}\">\n          <td>{{ museum['name'] }}<td>\n          <td align=\"right\">\n            <button class=\"btn btn-xs btn-warning\" [routerLink]=\"[museum['id']]\">\n              <span class=\"glyphicon glyphicon-edit\"></span>\n              Modifica\n            </button>\n            <button class=\"btn btn-xs btn-danger\">\n              <span class=\"glyphicon glyphicon-trash\"></span>\n              Elimina\n            </button>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n</div>\n\n<div align=\"center\">\n  <button class=\"btn btn-primary\" [routerLink]=\"['new']\">Aggiungi nuovo museo</button>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/admin/museums/museums.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MuseumsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_attraction_service__ = __webpack_require__("../../../../../src/app/services/attraction.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MuseumsComponent = (function () {
    function MuseumsComponent(service) {
        this.service = service;
    }
    MuseumsComponent.prototype.ngOnInit = function () {
        this.load();
    };
    MuseumsComponent.prototype.load = function () {
        //this.service.getMuseums().subscribe(data => {this.museums = data; console.log(this.museums);});
        this.museums = this.service.museums;
    };
    return MuseumsComponent;
}());
MuseumsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'admin-museums',
        template: __webpack_require__("../../../../../src/app/admin/museums/museums.component.html"),
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_attraction_service__["a" /* AttractionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_attraction_service__["a" /* AttractionService */]) === "function" && _a || Object])
], MuseumsComponent);

var _a;
//# sourceMappingURL=museums.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".row > div {\n\theight: 100%;\n}\n\n/* Remove the navbar's default margin-bottom and rounded borders */\n.navbar {\n\tmargin-top: 0;\n\tmargin-bottom: 0;\n\tborder-radius: 0;\n\tbackground-color: #003d66;\n}\n\n/* Set height of the grid so .sidenav can be 100% (adjust as needed) */\n.row.content {\n\theight: 876px;\n}\n\n.sidenav {\n\theight: 100%;\n\tpadding: 0px;\n\tbackground-color: #ffffff;\n}\n\n/* Set black background color, white text and some padding */\nfooter {\n\theight: 20px;\n\tright: 0;\n\tbottom: 0;\n\tleft: 0;\n\tbackground-color: #003d66;\n\ttext-align: center;\n\tcolor: white;\n\tdisplay: block;\n}\n\na {\n    cursor: pointer;\n}\n\n.btn-primary {\n    margin-bottom:20px;\n    margin-top:20px;\n    padding:15px;\n   \tborder-radius:10px;\n}\n\n.sub-btn {\n\ttext-align: center;\n\tmargin-bottom:5px;\n    margin-top:5px;\n\talign: center;\n    width: 80%;\n   \tborder-radius:10px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-inverse navbar-static-top\">\n    <div class=\"container-fluid\">\n        <div class=\"navbar-header\">\n            <img class=\"navbar-brand\" src=\"assets/neptis_icon.png\" style=\"width: 50px; height: 50px; padding:5px; \">\n            <a class=\"navbar-brand\" style=\"color: white; cursor: default; pointer-events: none;\">Neptis Planner</a>\n        </div>\n    <div class=\"collapse navbar-collapse\">\n        <ul class=\"nav navbar-nav navbar-right\" [hidden]=\"!logged\">\n            <li ng-show=\"showNotification\"><a href=\"\"><button type=\"button\" class=\"btn {{notification}}\" style=\"color: white; padding:2px; padding-left:8px; padding-right:8px; margin:-5px; border-radius: 20px;\" ng-click=\"enable()\"><b>{{notifications}}</b></button></a></li>\n            <li><a href=\"\" style=\"color: white; cursor: default; pointer-events: none;\"><span class=\"glyphicon glyphicon-user\"></span> Logged as {{ username }}</a></li>\n            <li><a (click)=\"click()\"><span class=\"glyphicon glyphicon-log-out\"></span> Logout</a></li>\n        </ul>\n      </div>\n    </div>\n</nav>\n<div class=\"container\">\n    <router-outlet></router-outlet>\n</div>\n<footer class=\"container-fluid navbar-fixed-bottom\" >\n\t\t<p>© Diritti riservati</p>\n</footer>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_authentication_service__ = __webpack_require__("../../../../../src/app/services/authentication.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    function AppComponent(auth, router) {
        var _this = this;
        this.auth = auth;
        this.router = router;
        this.auth.getStatus().subscribe(function (value) {
            _this.logged = value;
            //this.username = JSON.parse(localStorage.getItem('currentUser')).email;
        });
    }
    AppComponent.prototype.click = function () {
        var _this = this;
        this.auth.logout();
        this.auth.getStatus().subscribe(function (value) { _this.logged = value; });
        this.router.navigate(['/login']);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_authentication_service__["a" /* AuthenticationService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object])
], AppComponent);

var _a, _b;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__routing_module__ = __webpack_require__("../../../../../src/app/routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__agm_core__ = __webpack_require__("../../../../@agm/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_authentication_service__ = __webpack_require__("../../../../../src/app/services/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__guards_auth_guard__ = __webpack_require__("../../../../../src/app/guards/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__login_login_module__ = __webpack_require__("../../../../../src/app/login/login.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__admin_admin_module__ = __webpack_require__("../../../../../src/app/admin/admin.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__admin_attractions_attraction_module__ = __webpack_require__("../../../../../src/app/admin/attractions/attraction.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__admin_museums_museum_module__ = __webpack_require__("../../../../../src/app/admin/museums/museum.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["BrowserModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_5__agm_core__["a" /* AgmCoreModule */].forRoot({ apiKey: 'AIzaSyAqY3G_iymwda5bn9g87a4YwDPWu13gnw0' }),
            __WEBPACK_IMPORTED_MODULE_9__login_login_module__["a" /* LoginModule */],
            __WEBPACK_IMPORTED_MODULE_10__admin_admin_module__["a" /* AdminModule */],
            __WEBPACK_IMPORTED_MODULE_11__admin_attractions_attraction_module__["a" /* AttractionModule */],
            __WEBPACK_IMPORTED_MODULE_12__admin_museums_museum_module__["a" /* MuseumModule */],
            __WEBPACK_IMPORTED_MODULE_4__routing_module__["a" /* RoutingModule */],
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_7__services_authentication_service__["a" /* AuthenticationService */],
            __WEBPACK_IMPORTED_MODULE_8__guards_auth_guard__["a" /* AuthGuard */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/guards/auth.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_authentication_service__ = __webpack_require__("../../../../../src/app/services/authentication.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = (function () {
    function AuthGuard(router, auth) {
        this.router = router;
        this.auth = auth;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_authentication_service__["a" /* AuthenticationService */]) === "function" && _b || Object])
], AuthGuard);

var _a, _b;
//# sourceMappingURL=auth.guard.js.map

/***/ }),

/***/ "../../../../../src/app/login/login-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_component__ = __webpack_require__("../../../../../src/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__register_component__ = __webpack_require__("../../../../../src/app/login/register.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_2__login_component__["a" /* LoginComponent */] },
    { path: 'register', component: __WEBPACK_IMPORTED_MODULE_3__register_component__["a" /* RegisterComponent */] }
];
var LoginRoutingModule = (function () {
    function LoginRoutingModule() {
    }
    return LoginRoutingModule;
}());
LoginRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forChild(routes)
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]
        ]
    })
], LoginRoutingModule);

//# sourceMappingURL=login-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/login/login.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-6 col-md-offset-3\" align=\"center\">\n\n\t<div style=\"margin-bottom: 20px; margin-top: 100px;\">\n\t\t<h1>\n\t\t\t<b>\n\t\t\t\t<img src=\"../assets/colosseo.png\" style=\"width: 60px; height: 60px;\">\n\t\t\t\tNeptis Planner\n\t\t\t</b>\n\t\t</h1>\n\t</div>\n\n\t<div style=\"width: 90%; margin-bottom: 30px;\">\n   \t\t<h4><b>Please type your account information to log in.</b></h4>\n   \t</div>\n\n    <form name=\"form\" #f=\"ngForm\" role=\"form\">\n\n    \t<div class=\"form-group\" ng-class=\"{ 'has-error': form.email.$dirty && form.email.$error.required }\">\n            <label for=\"email\" style=\"float:left\">E-mail</label>\n            <input [(ngModel)]=\"email\" name=\"email\" type=\"text\" id=\"email\" class=\"form-control\" required />\n        </div>\n\n    \t<div class=\"form-group\" ng-class=\"{ 'has-error': form.password.$dirty && form.password.$error.required }\">\n            <label for=\"password\" style=\"float:left\">Password</label>\n            <input [(ngModel)]=\"password\" name=\"password\" type=\"password\" id=\"password\" class=\"form-control\" required />\n        </div>\n\n\t\t<div class=\"form-actions\" style=\"margin-top: 50px;\">\n            <button type=\"submit\" [disabled]=\"!f.form.valid\" class=\"btn btn-primary\" (click)=\"click()\" >Login</button>\n            <img *ngIf=\"loading\" src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\" />\n        </div>\n\n       \t<div class=\"form-actions\">\n            <a class=\"btn btn-link\" [routerLink]=\"['/register']\">Crea un nuovo account</a>\n        </div>\n\n    </form>\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_authentication_service__ = __webpack_require__("../../../../../src/app/services/authentication.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginComponent = (function () {
    function LoginComponent(auth, router) {
        this.auth = auth;
        this.router = router;
        this.valid = true;
        this.loading = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.click = function () {
        var _this = this;
        this.loading = true;
        console.log(this.email + " " + this.password);
        this.auth.login(this.email, this.password)
            .subscribe(function (data) { _this.router.navigate(['/home']); }, function (error) { return console.log(error); });
    };
    LoginComponent.prototype.isValid = function () {
        return this.email.length > 0 && this.password.length > 0;
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-login',
        template: __webpack_require__("../../../../../src/app/login/login.component.html"),
        styles: [__webpack_require__("../../../../../src/app/login/login.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_authentication_service__["a" /* AuthenticationService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object])
], LoginComponent);

var _a, _b;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ "../../../../../src/app/login/login.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_component__ = __webpack_require__("../../../../../src/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__register_component__ = __webpack_require__("../../../../../src/app/login/register.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_routing_module__ = __webpack_require__("../../../../../src/app/login/login-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_authentication_service__ = __webpack_require__("../../../../../src/app/services/authentication.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//Core modules




//Components


//Routes


var LoginModule = (function () {
    function LoginModule() {
    }
    return LoginModule;
}());
LoginModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__login_component__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_5__register_component__["a" /* RegisterComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_6__login_routing_module__["a" /* LoginRoutingModule */],
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_7__services_authentication_service__["a" /* AuthenticationService */]]
    })
], LoginModule);

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ "../../../../../src/app/login/register.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-6 col-md-offset-3\" align=\"center\">\n\n\t<div style=\"margin-top: 100px; margin-bottom: 20px;\">\n\t\t<h1 style=\"padding-rigth: 20px;\">\n\t\t\t<b>\n\t\t\t\t<img src=\"../assets/colosseo.png\" style=\"width: 60px; height: 60px;\">\n\t\t\t\tNeptis Planner\n\t\t\t</b>\n\t\t</h1>\n\t</div>\n\n\t<div style=\"margin-bottom: 30px;\">\n   \t\t<h4><b>Inserisci le informazioni richieste</b></h4>\n   \t</div>\n\n    <form name=\"form\" #f=\"ngForm\" role=\"form\">\n\n    \t<div class=\"form-group\">\n\t    \t<label for=\"organization\" style=\"float:left\">Organizzazione</label>\n\t\t\t<select class=\"form-control\" id=\"organization\" ng-model=\"vm.user.organization\" name=\"organization\" ng-options=\"option as option.name for option in organizations\" required></select>\n    \t</div>\n\n    \t<div class=\"form-group\" ng-class=\"{ 'has-error': form.orgname.$dirty && form.orgname.$error.required }\" ng-show=\"showOrganizationName\">\n            <label for=\"orgname\" style=\"float:left\">Nome dell'organizzazione</label>\n            <input type=\"text\" name=\"orgname\" id=\"orgname\" class=\"form-control\" ng-model=\"vm.user.orgname\" required/>\n        </div>\n\n    \t<div class=\"form-group\" [ngClass]=\"{ 'has-error': true }\">\n            <label for=\"email\" style=\"float:left\">E-mail</label>\n            <input [(ngModel)]=\"email\" #name=\"ngModel\" type=\"text\" name=\"email\" id=\"email\" class=\"form-control\" required />\n        </div>\n\n    \t<div class=\"form-group\" ng-class=\"{ 'has-error': form.password.$dirty && form.password.$error.required }\">\n            <label for=\"password\" style=\"float:left\">Password</label>\n            <input [(ngModel)]=\"password\" type=\"password\" name=\"password\" id=\"password\" class=\"form-control\" required />\n        </div>\n\n        <div class=\"form-group\" ng-class=\"{ 'has-error': form.repassword.$dirty && form.repassword.$error.required }\">\n            <label for=\"repassword\" style=\"float:left\">Reinserisci Password</label>\n            <input [(ngModel)]=\"confirmPassword\" type=\"password\" name=\"confirmPassword\" id=\"repassword\" class=\"form-control\" required />\n        </div>\n\n    \t<div class=\"form-actions\" style=\"margin-top: 50px; \">\n\t\t\t\t<button type=\"submit\" [disabled]=\"!f.form.valid\" class=\"btn btn-primary\" (click)=\"click()\" >Registrati</button>\n\t\t\t\t<img *ngIf=\"loading\" src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\" />\n      </div>\n\n    \t<div class=\"form-actions\">\n            <a [routerLink]=\"['/login']\" class=\"btn btn-link\">Annulla</a>\n        </div>\n\n    </form>\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/login/register.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var RegisterComponent = (function () {
    function RegisterComponent() {
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent.prototype.verifyPassword = function () {
        return this.password == this.confirmPassword && this.password !== "";
    };
    RegisterComponent.prototype.register = function () {
        if (!this.verifyPassword())
            return;
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-register',
        template: __webpack_require__("../../../../../src/app/login/register.component.html"),
    }),
    __metadata("design:paramtypes", [])
], RegisterComponent);

//# sourceMappingURL=register.component.js.map

/***/ }),

/***/ "../../../../../src/app/model/attraction.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Attraction; });
var Attraction = (function () {
    function Attraction() {
    }
    return Attraction;
}());

//# sourceMappingURL=attraction.js.map

/***/ }),

/***/ "../../../../../src/app/model/museum.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MuseumAttraction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Room; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Museum; });
var MuseumAttraction = (function () {
    function MuseumAttraction() {
    }
    return MuseumAttraction;
}());

var Room = (function () {
    function Room() {
        this.attractions = [];
        this.adjacent = [];
    }
    return Room;
}());

var Museum = (function () {
    function Museum() {
        this.rooms = [];
    }
    return Museum;
}());

//# sourceMappingURL=museum.js.map

/***/ }),

/***/ "../../../../../src/app/pipe/filter.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyFilterPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var MyFilterPipe = (function () {
    function MyFilterPipe() {
    }
    MyFilterPipe.prototype.transform = function (items, filter) {
        console.log(items);
        console.log(filter);
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be kept, false will be filtered out
        return items.filter(function (item) { return item.name.search(filter) !== -1; });
    };
    return MyFilterPipe;
}());
MyFilterPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'myfilter',
        pure: false
    })
], MyFilterPipe);

//# sourceMappingURL=filter.pipe.js.map

/***/ }),

/***/ "../../../../../src/app/pipe/main-pipe.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__filter_pipe__ = __webpack_require__("../../../../../src/app/pipe/filter.pipe.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MainPipe = (function () {
    function MainPipe() {
    }
    return MainPipe;
}());
MainPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [__WEBPACK_IMPORTED_MODULE_2__filter_pipe__["a" /* MyFilterPipe */]],
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"]],
        exports: [__WEBPACK_IMPORTED_MODULE_2__filter_pipe__["a" /* MyFilterPipe */]]
    })
], MainPipe);

//# sourceMappingURL=main-pipe.module.js.map

/***/ }),

/***/ "../../../../../src/app/routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var appRoutes = [
    { path: '**', redirectTo: '/login', pathMatch: 'full' }
];
var RoutingModule = (function () {
    function RoutingModule() {
    }
    return RoutingModule;
}());
RoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forRoot(appRoutes //,
            //{ enableTracing: true } // <-- debugging purposes only
            )
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]
        ]
    })
], RoutingModule);

//# sourceMappingURL=routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/services/attraction.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AttractionService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_attraction__ = __webpack_require__("../../../../../src/app/model/attraction.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AttractionService = (function () {
    function AttractionService(http) {
        this.http = http;
        this.museums = [];
        this.attractions = [];
        var attraction = new __WEBPACK_IMPORTED_MODULE_2__model_attraction__["a" /* Attraction */]();
        attraction.name = "Prova";
        attraction.latitude = 41.90;
        attraction.longitude = 12.4963;
        attraction.radius = 100;
        this.attractions.push(attraction);
    }
    AttractionService.prototype.getCitiesAttractions = function () {
        return this.http.get("http://neptistest.asuscomm.com:9070/cities/1");
    };
    AttractionService.prototype.getCityAttraction = function () {
        return this.http.get("http://neptistest.asuscomm.com:9070/cities/1");
    };
    AttractionService.prototype.addCityAttraction = function () {
        return this.http.post("http://neptistest.asuscomm.com:9070/cities/1", {});
    };
    AttractionService.prototype.getMuseums = function () {
        return this.http.get("http://neptistest.asuscomm.com:9070/museums");
    };
    AttractionService.prototype.addMuseum = function (museum) {
        this.museums.push(museum);
    };
    AttractionService.prototype.addAttraction = function (attraction) {
        this.attractions.push(attraction);
    };
    return AttractionService;
}());
AttractionService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]) === "function" && _a || Object])
], AttractionService);

var _a;
//# sourceMappingURL=attraction.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/authentication.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthenticationService = (function () {
    function AuthenticationService(http) {
        this.http = http;
        this.isLoggedIn = false;
        this.subject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
    AuthenticationService.prototype.login = function (email, password) {
        var _this = this;
        this.isLoggedIn = true;
        this.subject.next(true);
        return this.http.post('http://localhost:9070/admin_login', { email: email, password: password })
            .map(function (response) {
            console.log(response);
            var token = response['token'];
            if (token) {
                _this.token = token;
                localStorage.setItem('currentUser', JSON.stringify({ email: email, token: token }));
            }
        });
    };
    AuthenticationService.prototype.logout = function () {
        this.isLoggedIn = false;
        this.subject.next(false);
        this.token = null;
        localStorage.removeItem('currentUser');
    };
    AuthenticationService.prototype.getStatus = function () {
        return this.subject.asObservable();
    };
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]) === "function" && _a || Object])
], AuthenticationService);

var _a;
//# sourceMappingURL=authentication.service.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map