webpackJsonp([15],{

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhotoService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_camera__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_storage__ = __webpack_require__(291);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PhotoService = (function () {
    function PhotoService(camera, angularFireStorage) {
        this.camera = camera;
        this.angularFireStorage = angularFireStorage;
    }
    PhotoService.prototype.takePhoto = function (sourceType, width, height) {
        var optionsWithSize = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: sourceType,
            allowEdit: true,
            correctOrientation: true,
            targetWidth: width,
            targetHeight: height
        };
        var optionsWithoutSize = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: sourceType,
            allowEdit: true,
            correctOrientation: true,
        };
        if (width === null || height === null) {
            return this.camera.getPicture(optionsWithoutSize);
        }
        else {
            return this.camera.getPicture(optionsWithSize);
        }
    };
    PhotoService.prototype.uploadPhoto = function (photo, path) {
        return this.angularFireStorage.ref(path).putString(photo, 'data_url');
    };
    PhotoService.prototype.deletePhoto = function (path) {
        return this.angularFireStorage.ref(path).delete();
    };
    PhotoService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_storage__["a" /* AngularFireStorage */]])
    ], PhotoService);
    return PhotoService;
}());

//# sourceMappingURL=photo.service.js.map

/***/ }),

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapModalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_address_model__ = __webpack_require__(315);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MapModalComponent = (function () {
    function MapModalComponent(platform, params, viewCtrl, geolocation) {
        this.platform = platform;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.geolocation = geolocation;
        this.selectedPlace = new __WEBPACK_IMPORTED_MODULE_3__models_address_model__["a" /* Address */]();
        this.results = [];
        console.log('initial location', params.get('location'));
    }
    MapModalComponent.prototype.ngOnInit = function () {
        this.initMap();
    };
    MapModalComponent.prototype.initMap = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (resp) {
            _this.currentLocation = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
            var options = {
                center: _this.currentLocation,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            _this.map = new google.maps.Map(_this.mapRef.nativeElement, options);
            _this.map.addListener('click', function (e) { return _this.selectPlace(e.latLng, e.placeId); });
            if (JSON.stringify(_this.params.get('location')) === '{}') {
                _this.placeMarker(_this.currentLocation);
                console.log('OK');
            }
            else {
                _this.selectedPlace = JSON.parse(JSON.stringify(_this.params.get('location')));
                _this.placeMarker(_this.selectedPlace.latLang);
                console.log('KO');
                console.log(_this.selectedPlace);
            }
        }).catch(function (error) {
            console.log('Error getting current location', error);
        });
    };
    MapModalComponent.prototype.placeMarker = function (latLng) {
        if (this.marker) {
            this.marker.setMap(null);
        }
        this.marker = new google.maps.Marker({
            position: latLng,
            visible: true,
            map: this.map
        });
        this.map.panTo(latLng);
    };
    MapModalComponent.prototype.selectPlace = function (latLng, placeId) {
        var _this = this;
        this.placeMarker(latLng);
        var service = new google.maps.places.PlacesService(this.map);
        if (placeId) {
            var request_1 = {
                placeId: placeId
            };
            service.getDetails(request_1, function (place, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    _this.selectedPlace.name = place.name;
                    _this.selectedPlace.adress = place.formatted_address;
                    _this.selectedPlace.placeId = place.place_id;
                    _this.selectedPlace.latLang = place.geometry.location;
                }
                else {
                    console.log('get place details request failed');
                }
            });
        }
        else {
            console.log('unknown location, getting the nearest known place details');
            var request = {
                location: latLng,
                radius: 200,
            };
            service.nearbySearch(request, function (results, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    _this.selectedPlace.name = results[0].name;
                    _this.selectedPlace.adress = results[0].formatted_address;
                    _this.selectedPlace.placeId = results[0].place_id;
                    _this.selectedPlace.latLang = results[0].geometry.location;
                    _this.placeMarker(_this.selectedPlace.latLang);
                }
                else {
                    console.log('get nearby place request failed');
                }
            });
        }
    };
    MapModalComponent.prototype.searchPlace = function (event) {
        var _this = this;
        if (event.target.value && event.target.value.trim().length > 0) {
            var request = {
                location: this.currentLocation,
                radius: '5000',
                query: event.target.value
            };
            var service = new google.maps.places.PlacesService(this.map);
            service.textSearch(request, function (results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    _this.results = results.slice(0);
                }
                else {
                    console.log('search places request failed');
                }
            });
        }
        else {
            this.clearSearch();
        }
    };
    MapModalComponent.prototype.clearSearch = function () {
        this.results = [];
    };
    MapModalComponent.prototype.selectResult = function (index) {
        var place = this.results[index];
        this.clearSearch();
        this.placeMarker(place.geometry.location);
        this.selectedPlace.name = place.name;
        this.selectedPlace.adress = place.formatted_address;
        this.selectedPlace.placeId = place.place_id;
        this.selectedPlace.latLang = place.geometry.location;
    };
    MapModalComponent.prototype.dismissModal = function () {
        this.viewCtrl.dismiss(null);
    };
    MapModalComponent.prototype.choosePlace = function () {
        this.viewCtrl.dismiss(this.selectedPlace);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], MapModalComponent.prototype, "mapRef", void 0);
    MapModalComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\NADER\IonicProjects\MyCampus\src\components\map-modal\map-modal.component.html"*/'<ion-header class="map-modal-header">\n\n    <div class="map-modal-header-content">\n\n        <ion-icon class="close-icon" ios="md-close" md="md-close" (click)="dismissModal()"></ion-icon>\n\n        <p class="title">Localisation de l\'Événement</p>\n\n    </div>\n\n    <ion-searchbar (ionInput)="searchPlace($event)" (ionClear)="clearSearch()" placeholder="Recherche" debounce="500"></ion-searchbar>\n\n    <div class="results-container">\n\n        <div class="results-list">\n\n            <ion-list>\n\n                <ion-item *ngFor="let result of results; let i = index;" (click)="selectResult(i)">{{result.name}}</ion-item>\n\n            </ion-list>\n\n        </div>\n\n    </div>\n\n</ion-header>\n\n\n\n<ion-content class="map-modal-content">\n\n    <div #map class="map-container"></div>\n\n</ion-content>\n\n\n\n<ion-footer class="map-modal-footer">\n\n    <button class="validation-btn" ion-button color="secondary" round large block (click)="choosePlace()">Choisir la Localisation</button>\n\n</ion-footer>\n\n'/*ion-inline-end:"C:\Users\NADER\IonicProjects\MyCampus\src\components\map-modal\map-modal.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["y" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */]])
    ], MapModalComponent);
    return MapModalComponent;
}());

//# sourceMappingURL=map-modal.component.js.map

/***/ }),

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Club; });
var Club = (function () {
    function Club() {
    }
    return Club;
}());

//# sourceMappingURL=club.model.js.map

/***/ }),

/***/ 182:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__(320);
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
    function AuthenticationService(angularFireAuth) {
        this.angularFireAuth = angularFireAuth;
    }
    AuthenticationService.prototype.signUpWithEmailAndPassword = function (credantials) {
        return this.angularFireAuth.auth.createUserWithEmailAndPassword(credantials.email, credantials.password);
    };
    AuthenticationService.prototype.signInWithEmailAndPassword = function (credantials) {
        return this.angularFireAuth.auth.signInWithEmailAndPassword(credantials.email, credantials.password);
    };
    AuthenticationService.prototype.signOut = function () {
        return this.angularFireAuth.auth.signOut();
    };
    AuthenticationService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], AuthenticationService);
    return AuthenticationService;
}());

//# sourceMappingURL=authentication.service.js.map

/***/ }),

/***/ 195:
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
webpackEmptyAsyncContext.id = 195;

/***/ }),

/***/ 239:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/about/about.module": [
		614,
		14
	],
	"../pages/account/account.module": [
		615,
		13
	],
	"../pages/cafeteria/cafeteria-home/cafeteria-home.module": [
		627,
		12
	],
	"../pages/canteen/canteen-home/canteen-home.module": [
		616,
		11
	],
	"../pages/club/club-profile/club-profile.module": [
		618,
		3
	],
	"../pages/club/coming-events/coming-events.module": [
		617,
		1
	],
	"../pages/club/events/events.module": [
		619,
		10
	],
	"../pages/club/membership-applications/membership-applications.module": [
		620,
		9
	],
	"../pages/club/past-events/past-events.module": [
		621,
		0
	],
	"../pages/help/help.module": [
		622,
		8
	],
	"../pages/landing/landing.module": [
		623,
		7
	],
	"../pages/login/login.module": [
		624,
		4
	],
	"../pages/settings/settings.module": [
		625,
		6
	],
	"../pages/signup/signup.module": [
		626,
		2
	],
	"../pages/student/student-home/student-home.module": [
		628,
		5
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 239;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 315:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Address; });
var Address = (function () {
    function Address() {
    }
    return Address;
}());

//# sourceMappingURL=address.model.js.map

/***/ }),

/***/ 316:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Event; });
var Event = (function () {
    function Event() {
    }
    return Event;
}());

//# sourceMappingURL=event.model.js.map

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SideMenuControllerService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SideMenuControllerService = (function () {
    function SideMenuControllerService(events, menuCtrl) {
        this.events = events;
        this.menuCtrl = menuCtrl;
    }
    SideMenuControllerService.prototype.setupClubSideMenuContent = function () {
        var clubSideMenuContents = [
            { name: 'Votre vitrine', path: 'ClubProfilePage' },
            { name: 'Vos événements', path: 'EventsPage' },
            { name: 'Demandes d\'Adhésion', path: 'MembershipApplicationsPage' }
        ];
        this.enableSideMenu(true);
        this.events.publish('sideMenu:changeContent', clubSideMenuContents);
    };
    SideMenuControllerService.prototype.enableSideMenu = function (isEnabled) {
        this.menuCtrl.enable(isEnabled);
    };
    SideMenuControllerService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* MenuController */]])
    ], SideMenuControllerService);
    return SideMenuControllerService;
}());

//# sourceMappingURL=side-menu-controller.service.js.map

/***/ }),

/***/ 363:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventDetailsModalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_club_service__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_photo_service__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__map_modal_map_modal_component__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_event_model__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_club_model__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_photo_model__ = __webpack_require__(367);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};









var EventDetailsModalComponent = (function () {
    function EventDetailsModalComponent(platform, params, viewCtrl, modalCtrl, actionSheetCtrl, clubService, alertCtrl, photoService, geolocation) {
        this.platform = platform;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.modalCtrl = modalCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.clubService = clubService;
        this.alertCtrl = alertCtrl;
        this.photoService = photoService;
        this.geolocation = geolocation;
        this.isAdmin = false;
        this.club = new __WEBPACK_IMPORTED_MODULE_7__models_club_model__["a" /* Club */]();
        this.event = new __WEBPACK_IMPORTED_MODULE_6__models_event_model__["a" /* Event */]();
        this.eventUpdate = new __WEBPACK_IMPORTED_MODULE_6__models_event_model__["a" /* Event */]();
        this.updateEventDetails = false;
        this.spin = false;
        this.showMap = false;
    }
    EventDetailsModalComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isAdmin = this.params.get('isAdmin');
        this.clubService.getClubById(this.params.get('clubKey')).subscribe(function (club) {
            _this.club = club;
            _this.club.events.forEach(function (event) {
                if (event.key === _this.params.get('eventKey')) {
                    _this.event = JSON.parse(JSON.stringify(event));
                    _this.mainPhoto = _this.event.mainPhoto;
                }
            });
        }, function (error) {
            console.log(error);
        });
    };
    EventDetailsModalComponent.prototype.onUpdateEventDetails = function () {
        this.eventUpdate = JSON.parse(JSON.stringify(this.event));
        this.eventUpdate.tags = (this.eventUpdate.tags && this.eventUpdate.tags.length > 0) ? this.eventUpdate.tags : [];
        this.eventUpdate.photoGallery = (this.eventUpdate.photoGallery && this.eventUpdate.photoGallery.length > 0) ? this.eventUpdate.photoGallery : [];
        var date = new Date();
        var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) + '' : (date.getMonth() + 1);
        var day = date.getDate() < 10 ? '0' + date.getDate() + '' : date.getDate();
        this.currentDate = [date.getFullYear(), month, day].join('-');
        this.maxDate = [date.getFullYear() + 1, 12, 31].join('-');
        this.updateEventDetails = true;
    };
    EventDetailsModalComponent.prototype.presentMainPhotoActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Ajouter une photo de couverture à votre événement',
            buttons: [
                {
                    text: 'Choisir à partir du Gallery',
                    icon: 'md-images',
                    role: 'destructive',
                    handler: function () {
                        _this.photoService.takePhoto(0, 600, 500).then(function (imageData) {
                            _this.mainPhoto = 'data:image/jpeg;base64,' + imageData;
                        }, function (error) {
                            console.log('something wrong', error);
                        });
                    }
                },
                {
                    text: 'Prendre une photo',
                    icon: 'md-camera',
                    role: 'destructive',
                    handler: function () {
                        _this.photoService.takePhoto(1, 600, 500).then(function (imageData) {
                            _this.mainPhoto = 'data:image/jpeg;base64,' + imageData;
                        }, function (error) {
                            console.log('something wrong', error);
                        });
                    }
                }
            ]
        });
        actionSheet.present();
    };
    EventDetailsModalComponent.prototype.addTag = function () {
        this.eventUpdate.tags.push(this.tag.trim());
        this.tag = null;
    };
    EventDetailsModalComponent.prototype.deleteTag = function (i) {
        this.eventUpdate.tags.splice(i, 1);
    };
    EventDetailsModalComponent.prototype.onShowMap = function () {
        var _this = this;
        if (!this.showMap) {
            this.showMap = true;
            this.geolocation.getCurrentPosition().then(function (resp) {
                var currentLocation = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
                var options = {
                    center: currentLocation,
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                var map = new google.maps.Map(_this.mapRef.nativeElement, options);
                var directionsService = new google.maps.DirectionsService();
                var directionsRenderer = new google.maps.DirectionsRenderer();
                directionsRenderer.setMap(map);
                var directionsOptions = {
                    origin: currentLocation,
                    destination: _this.event.location.latLang,
                    travelMode: 'DRIVING'
                };
                directionsService.route(directionsOptions, function (result, status) {
                    if (status == 'OK') {
                        directionsRenderer.setDirections(result);
                    }
                });
            }).catch(function (error) {
                console.log('Error getting current location', error);
            });
        }
        else {
            this.showMap = false;
        }
    };
    EventDetailsModalComponent.prototype.presentMapModal = function () {
        var _this = this;
        var mapModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__map_modal_map_modal_component__["a" /* MapModalComponent */], { location: this.eventUpdate.location });
        mapModal.onDidDismiss(function (selectedPlace) {
            if (selectedPlace === null) {
                console.log('place stays the same');
            }
            else {
                console.log('place has been chosen');
                _this.eventUpdate.location = JSON.parse(JSON.stringify(selectedPlace));
            }
            console.log('returned location', _this.eventUpdate.location);
        });
        mapModal.present();
    };
    EventDetailsModalComponent.prototype.presentEventGalleryPhotoActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Ajouter une photo au galerie de l\'événement',
            buttons: [
                {
                    text: 'Choisir à partir du Gallery',
                    icon: 'md-images',
                    role: 'destructive',
                    handler: function () {
                        _this.photoService.takePhoto(0, null, null).then(function (response) {
                            _this.addPhotoToEventGallery("data:image/jpeg;base64," + response);
                        }, function (error) {
                            console.log(error);
                        });
                    }
                },
                {
                    text: 'Prendre une photo',
                    icon: 'md-camera',
                    role: 'destructive',
                    handler: function () {
                        _this.photoService.takePhoto(1, null, null).then(function (response) {
                            _this.addPhotoToEventGallery("data:image/jpeg;base64," + response);
                        }, function (error) {
                            console.log(error);
                        });
                    }
                }
            ]
        });
        actionSheet.present();
    };
    EventDetailsModalComponent.prototype.addPhotoToEventGallery = function (image) {
        var newPhoto = new __WEBPACK_IMPORTED_MODULE_8__models_photo_model__["a" /* Photo */]();
        newPhoto.storagePath = '';
        newPhoto.downloadUrl = image;
        this.eventUpdate.photoGallery.push(newPhoto);
        if (this.gallerySlides) {
            this.gallerySlides.update();
        }
    };
    EventDetailsModalComponent.prototype.deleteEventGalleryPhoto = function (index) {
        this.eventUpdate.photoGallery.splice(index, 1);
        if (this.gallerySlides) {
            this.gallerySlides.update();
        }
    };
    EventDetailsModalComponent.prototype.verifyDeletedEventGalleryPhoto = function () {
        var found = false;
        if (this.event.photoGallery && this.event.photoGallery.length > 0) {
            for (var i = 0; i < this.event.photoGallery.length; i++) {
                found = false;
                for (var j = 0; j < this.eventUpdate.photoGallery.length; j++) {
                    if (this.event.photoGallery[i].storagePath === this.eventUpdate.photoGallery[j].storagePath) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    this.photoService.deletePhoto(this.event.photoGallery[i].storagePath);
                }
            }
        }
    };
    EventDetailsModalComponent.prototype.cancelEventDetailsUpdate = function () {
        this.mainPhoto = this.event.mainPhoto;
        this.eventUpdate = new __WEBPACK_IMPORTED_MODULE_6__models_event_model__["a" /* Event */]();
        this.updateEventDetails = false;
    };
    EventDetailsModalComponent.prototype.saveEventDetailsUpdate = function () {
        var _this = this;
        if (this.event.mainPhoto !== this.mainPhoto) {
            var eventMainPhotoStoragePath = "club/" + this.club.key + "/events/" + this.event.key + "/cover";
            this.photoService.uploadPhoto(this.mainPhoto, eventMainPhotoStoragePath).then(function (res) {
                _this.mainPhoto = res.downloadURL;
                _this.eventUpdate.mainPhoto = _this.mainPhoto;
                _this.updateClubEvents();
                _this.updateEventDetails = false;
            }, function (err) {
                console.log(err);
            });
        }
        else {
            this.updateClubEvents();
            this.updateEventDetails = false;
        }
    };
    EventDetailsModalComponent.prototype.asyncForEach = function (array, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var index;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        index = 0;
                        _a.label = 1;
                    case 1:
                        if (!(index < array.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, callback(array[index], index, array)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        index++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    EventDetailsModalComponent.prototype.updateClubEvents = function () {
        var _this = this;
        var verifyAddedEventGalleryPhoto = function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.asyncForEach(this.eventUpdate.photoGallery, function (photo, index) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(photo.storagePath.length === 0)) return [3 /*break*/, 2];
                                        this.spin = true;
                                        photo.storagePath = "club/" + this.club.key + "/events/" + this.event.key + "/gallery/" + (new Date().getTime() + index);
                                        return [4 /*yield*/, this.photoService.uploadPhoto(photo.downloadUrl, photo.storagePath).then(function (res) {
                                                _this.eventUpdate.photoGallery[index].downloadUrl = res.downloadURL;
                                            }, function (err) {
                                                console.log(err);
                                                _this.eventUpdate.photoGallery.splice(index, 1);
                                            })];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        verifyAddedEventGalleryPhoto().then(function (res) {
            _this.verifyDeletedEventGalleryPhoto();
            _this.spin = false;
            _this.event = new __WEBPACK_IMPORTED_MODULE_6__models_event_model__["a" /* Event */]();
            _this.event = JSON.parse(JSON.stringify(_this.eventUpdate));
            for (var i = 0; i < _this.club.events.length; i++) {
                if (_this.club.events[i].key === _this.event.key) {
                    _this.club.events[i] = JSON.parse(JSON.stringify(_this.event));
                }
            }
            _this.clubService.updateClubInLocalStorage(_this.club);
        }, function (err) {
            console.log(err);
        });
    };
    EventDetailsModalComponent.prototype.deleteEvent = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Vous venez de supprimer un événement!',
            message: 'Êtes-vous sûr?',
            buttons: [
                {
                    text: 'Annuler',
                    handler: function () { }
                },
                {
                    text: 'Supprimer',
                    handler: function () {
                        if (_this.event.photoGallery && _this.event.photoGallery.length > 0) {
                            _this.event.photoGallery.forEach(function (photo) {
                                _this.photoService.deletePhoto(photo.storagePath);
                            });
                        }
                        _this.photoService.deletePhoto("club/" + _this.club.key + "/events/" + _this.event.key + "/cover");
                        for (var i = 0; i < _this.club.events.length; i++) {
                            if (_this.club.events[i].key === _this.event.key) {
                                _this.club.events.splice(i, 1);
                                break;
                            }
                        }
                        _this.clubService.updateClubInLocalStorage(_this.club);
                        _this.dismissModal();
                    }
                }
            ]
        });
        alert.present();
    };
    EventDetailsModalComponent.prototype.dismissModal = function () {
        this.viewCtrl.dismiss();
    };
    EventDetailsModalComponent.prototype.getContactIconUrl = function (contactName) {
        return "assets/imgs/" + contactName + "-logo-yellow.png";
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], EventDetailsModalComponent.prototype, "mapRef", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('gallerySlides'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* Slides */])
    ], EventDetailsModalComponent.prototype, "gallerySlides", void 0);
    EventDetailsModalComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\NADER\IonicProjects\MyCampus\src\components\event-details-modal\event-details-modal.component.html"*/'<ion-content>\n\n\n\n    <section class="event-details-header"  [ngStyle]="{\'background\':\'url(\'+mainPhoto+\')\'}">\n\n\n\n        <div class="header-wrapper">\n\n            <ion-icon *ngIf="!updateEventDetails" ios="md-close" md="md-close" (click)="dismissModal()"></ion-icon>\n\n            <ion-icon *ngIf="updateEventDetails" ios="md-image" md="md-image" (click)="presentMainPhotoActionSheet()"></ion-icon>\n\n            \n\n            <div class="header-bottom">\n\n                <p *ngIf="!updateEventDetails" class="event-title">{{event.name}}</p>\n\n                <ion-item *ngIf="updateEventDetails" class="float-lbl-input">\n\n                    <ion-label floating>Titre de l\'Événement</ion-label>\n\n                    <ion-input type="text" [(ngModel)]="eventUpdate.name"></ion-input>\n\n                </ion-item>\n\n                <p *ngIf="!updateEventDetails" class="club-name">Organisé par <span>{{club.name}}</span></p>\n\n            </div>\n\n        </div>\n\n\n\n    </section>\n\n\n\n    <section *ngIf="!updateEventDetails" class="event-details-body">\n\n\n\n        <div *ngIf="event.tags && event.tags.length > 0" class="tags-container wrapper">\n\n            <div *ngFor="let tag of event.tags" class="tag">\n\n                <span class="tag-label">{{tag}}</span>\n\n            </div>\n\n        </div>\n\n\n\n        <div class="date-container wrapper">\n\n            <div class="calandar-logo-container">\n\n                <span><i class="far fa-calendar-alt"></i></span>\n\n            </div>\n\n            <div class="date-info-container">\n\n                <p>{{event.startDate}}  {{event.startTime}}</p>\n\n                <p>{{event.endDate}}  {{event.endTime}}</p>\n\n            </div>\n\n        </div>\n\n\n\n        <div class="location-container wrapper">\n\n            <div class="pin-logo-container">\n\n                <span><i class="fas fa-map-marker-alt"></i></span>\n\n            </div>\n\n            <div class="location-info-container">\n\n                <p>{{event.location?.name}}</p>\n\n            </div>\n\n            <ion-icon class="map-btn" ios="md-map" md="md-map" (click)="onShowMap()"></ion-icon>\n\n        </div>\n\n\n\n        <div *ngIf="showMap">\n\n            <div #map class="map-container wrapper"></div>\n\n        </div>\n\n\n\n        <div *ngIf="event.photoGallery && event.photoGallery.length > 0 && !spin" class="gallery-container">\n\n            <div class="header">\n\n                <p>Galerie de l\'événement</p>\n\n            </div>\n\n\n\n            <ion-slides #gallerySlides class="gallery-slides-container" loop="true" slidesPerView="2">\n\n                <ion-slide *ngFor="let photo of event.photoGallery; let i = index;">\n\n                    <img [src]="photo.downloadUrl" class="thumb-img" imageViewer>\n\n                </ion-slide>\n\n            </ion-slides>\n\n        </div>\n\n\n\n        <div *ngIf="(!event.photoGallery || event.photoGallery.length <= 0) && !spin" class="gallery-placeholder wrapper">\n\n            <ion-icon ios="md-images" md="md-images"></ion-icon>\n\n            <p>Pas d\'images disponibles pour cet événement</p>\n\n        </div>\n\n\n\n        <div *ngIf="spin" class="spinner-container">\n\n            <div class="lds-rolling">\n\n                <div>\n\n\n\n                </div>\n\n            </div>\n\n        </div>\n\n\n\n        <div *ngIf="event.description && event.description.length > 0" class="description-container wrapper">\n\n            <div class="header">\n\n                <p>A propos cet événement</p>\n\n            </div>\n\n            <p class="description">{{event.description}}</p>\n\n        </div>\n\n\n\n        <div *ngIf="!event.description || event.description.length <= 0" class="description-placeholder wrapper">\n\n            <ion-icon ios="md-information-circle" md="md-information-circle"></ion-icon>\n\n            <p>Pas de d\'autres informations disponibles pour cet événement</p>\n\n        </div>\n\n\n\n        <div *ngIf="club.contacts && club.contacts.length > 0" class="contact-container" padding>\n\n            <div class="header">\n\n                <p>Pour plus d\'informations</p>\n\n            </div>\n\n\n\n            <div class="contact" *ngFor="let contact of club.contacts">\n\n                <img [src]="getContactIconUrl(contact.name)">\n\n                <p>{{contact.value}}</p>\n\n            </div>\n\n        </div>\n\n\n\n    </section>\n\n\n\n    <section *ngIf="updateEventDetails" class="event-details-body">\n\n\n\n        <div class="wrapper">\n\n            <ion-item class="float-lbl-input" *ngIf="eventUpdate.tags && eventUpdate.tags.length < 5">\n\n                <ion-label floating>Quelques Mots Clés</ion-label>\n\n                <ion-input type="text" [(ngModel)]="tag"></ion-input>\n\n                <button clear ion-button item-end color="secondary" icon-only class="input-btn" *ngIf="tag && tag.trim().length > 0" (click)="addTag()">\n\n                    <ion-icon ios="md-add" md="md-add"></ion-icon>\n\n                </button>\n\n            </ion-item>\n\n        </div>\n\n\n\n        <div class="tags-container wrapper" *ngIf="eventUpdate.tags && eventUpdate.tags.length > 0">\n\n            <div class="tag" *ngFor="let tag of eventUpdate.tags; let i = index;">\n\n                <span class="tag-label">{{tag}}</span>\n\n                <span class="delete" (click)="deleteTag(i)">&times;</span>\n\n            </div>\n\n        </div>\n\n\n\n        <div class="wrapper">\n\n            <p class="datetime-separator">L\'Événement commence à</p>\n\n        </div>\n\n\n\n        <div class="date-time wrapper">\n\n            <div class="date">\n\n                <ion-item class="float-lbl-input">\n\n                    <ion-label floating>Date</ion-label>\n\n                    <ion-datetime displayFormat="DDDD DD MMM, YYYY" pickerFormat="MMMM/DD/YYYY" cancelText="Annuler" doneText="Ok" min="{{currentDate}}" max="{{maxDate}}" [(ngModel)]="eventUpdate.startDate"></ion-datetime>\n\n                </ion-item>\n\n            </div>\n\n            <div class="time">\n\n                <ion-item class="float-lbl-input">\n\n                    <ion-label floating>Heure</ion-label>\n\n                    <ion-datetime displayFormat="HH:mm" cancelText="Annuler" doneText="Ok" [(ngModel)]="eventUpdate.startTime"></ion-datetime>\n\n                </ion-item>\n\n            </div>\n\n        </div>\n\n        \n\n        <div class="wrapper">\n\n            <p class="datetime-separator">L\'Événement se termine à</p>\n\n        </div>\n\n\n\n        <div class="date-time wrapper">\n\n            <div class="date">\n\n                <ion-item class="float-lbl-input">\n\n                    <ion-label floating>Date</ion-label>\n\n                    <ion-datetime displayFormat="DDDD DD MMM, YYYY" pickerFormat="MMMM/DD/YYYY" cancelText="Annuler" doneText="Ok" min="{{currentDate}}" max="{{maxDate}}" [(ngModel)]="eventUpdate.endDate"></ion-datetime>\n\n                </ion-item>\n\n            </div>\n\n            <div class="time">\n\n                <ion-item class="float-lbl-input">\n\n                    <ion-label floating>Heure</ion-label>\n\n                    <ion-datetime displayFormat="HH:mm" cancelText="Annuler" doneText="Ok" [(ngModel)]="eventUpdate.endTime"></ion-datetime>\n\n                </ion-item>\n\n            </div>\n\n        </div>\n\n\n\n        <div class="wrapper">\n\n            <div class="event-location-container">\n\n                <ion-icon class="map-btn" ios="md-map" md="md-map" (click)="presentMapModal()"></ion-icon>\n\n                <p *ngIf="!eventUpdate.location || !eventUpdate.location.name || eventUpdate.location.name.length <= 0">Localisation de l\'Événement</p>\n\n                <p *ngIf="eventUpdate.location && eventUpdate.location.name && eventUpdate.location.name.length > 0">{{eventUpdate.location.name}}</p>\n\n            </div>\n\n        </div>\n\n\n\n        <div class="gallery-header-container wrapper">\n\n            <p>Galerie de l\'événement</p>\n\n            <ion-icon class="add-photo-btn" ios="md-add-circle" md="md-add-circle" (click)="presentEventGalleryPhotoActionSheet()"></ion-icon>\n\n        </div>\n\n        \n\n        <div *ngIf="eventUpdate.photoGallery && eventUpdate.photoGallery.length > 0" class="gallery-container" style="margin: 0px 0px 10px 0px">\n\n            <ion-slides #gallerySlides class="gallery-slides-container" loop="true" slidesPerView="2">\n\n                <ion-slide *ngFor="let photo of eventUpdate.photoGallery; let i = index;">\n\n                        <ion-icon class="delete-photo-btn" ios="md-trash" md="md-trash" (click)="deleteEventGalleryPhoto(i)"></ion-icon>\n\n                    <img [src]="photo.downloadUrl" class="thumb-img" imageViewer>\n\n                </ion-slide>\n\n            </ion-slides>\n\n        </div>\n\n        \n\n        <div class="wrapper">\n\n            <ion-item class="float-lbl-input">\n\n                <ion-label floating>Plus d\'Informations</ion-label>\n\n                <ion-textarea autosize autocomplete="on" autocorrect="on" rows="5" [(ngModel)]="eventUpdate.description"></ion-textarea>\n\n            </ion-item>\n\n        </div>\n\n\n\n        <div class="bottom-placeholder"></div>\n\n\n\n    </section>\n\n\n\n    <ion-fab *ngIf="isAdmin && !updateEventDetails" right bottom>\n\n        <button ion-fab color="secondary" (click)="onUpdateEventDetails()"><ion-icon name="create"></ion-icon></button>\n\n    </ion-fab>\n\n\n\n</ion-content>\n\n\n\n<ion-footer *ngIf="updateEventDetails" class="event-details-footer">\n\n    <button ion-button color="secondary" round outline (click)="cancelEventDetailsUpdate()">Annuler</button>\n\n    <button ion-button color="secondary" round (click)="saveEventDetailsUpdate()">Enregistrer</button>\n\n    <button ion-button color="secondary" round (click)="deleteEvent()">Supprimer</button>\n\n</ion-footer>'/*ion-inline-end:"C:\Users\NADER\IonicProjects\MyCampus\src\components\event-details-modal\event-details-modal.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["y" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_3__services_club_service__["a" /* ClubService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4__services_photo_service__["a" /* PhotoService */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */]])
    ], EventDetailsModalComponent);
    return EventDetailsModalComponent;
}());

//# sourceMappingURL=event-details-modal.component.js.map

/***/ }),

/***/ 364:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedbackModalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FeedbackModalComponent = (function () {
    function FeedbackModalComponent(platform, params, viewCtrl) {
        this.platform = platform;
        this.params = params;
        this.viewCtrl = viewCtrl;
        console.log('UserId', params.get('userId'));
    }
    FeedbackModalComponent.prototype.dismissModal = function () {
        this.viewCtrl.dismiss();
    };
    FeedbackModalComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\NADER\IonicProjects\MyCampus\src\components\feedback-modal\feedback-modal.component.html"*/'<ion-content>\n\n    \n\n    <section id="header-section">\n\n\n\n        <div class="header-wrapper">\n\n            <ion-icon ios="md-close" md="md-close" (click)="dismissModal()"></ion-icon>\n\n            <div class="average-rate-container">\n\n                <div class="average-rate">\n\n                    <p>4.6</p>\n\n                </div>\n\n                <div class="average-rate-details">\n\n                    <div class="container">\n\n                        <div class="star-rating" style="margin-bottom: 5px;">\n\n                            <div class="back-stars">\n\n                                <i class="fa fa-star" aria-hidden="true"></i>\n\n                                <i class="fa fa-star" aria-hidden="true"></i>\n\n                                <i class="fa fa-star" aria-hidden="true"></i>\n\n                                <i class="fa fa-star" aria-hidden="true"></i>\n\n                                <i class="fa fa-star" aria-hidden="true"></i>\n\n\n\n                                <div class="front-stars" style="width: 90%">\n\n                                    <i class="fa fa-star" aria-hidden="true"></i>\n\n                                    <i class="fa fa-star" aria-hidden="true"></i>\n\n                                    <i class="fa fa-star" aria-hidden="true"></i>\n\n                                    <i class="fa fa-star" aria-hidden="true"></i>\n\n                                    <i class="fa fa-star" aria-hidden="true"></i>\n\n                                </div>\n\n                            </div>\n\n                        </div>\n\n                        <p>53<i class="fas fa-users"></i></p>\n\n                    </div>\n\n                </div>\n\n            </div>\n\n            <p class="event-title">ISAMM Movie Premiere</p>\n\n        </div>\n\n\n\n    </section>\n\n\n\n    <section id="feedback-section" padding>\n\n\n\n        <div class="feedback-card">\n\n            <div class="feedback-header">\n\n                <div class="avatar-container">\n\n                    <div class="avatar-green-bg">\n\n                        <img src="assets/imgs/default-avatar.png">\n\n                    </div>\n\n                </div>\n\n                <div class="user-details-container">\n\n                    <p class="user-full-name">John Doe</p>\n\n                    <p class="date">05/03/2017</p>\n\n                    <div class="star-rating" style="font-size:10px;">\n\n                        <div class="back-stars">\n\n                            <i class="fa fa-star" aria-hidden="true"></i>\n\n                            <i class="fa fa-star" aria-hidden="true"></i>\n\n                            <i class="fa fa-star" aria-hidden="true"></i>\n\n                            <i class="fa fa-star" aria-hidden="true"></i>\n\n                            <i class="fa fa-star" aria-hidden="true"></i>\n\n                                \n\n                            <div class="front-stars" style="width: 80%">\n\n                                <i class="fa fa-star" aria-hidden="true"></i>\n\n                                <i class="fa fa-star" aria-hidden="true"></i>\n\n                                <i class="fa fa-star" aria-hidden="true"></i>\n\n                                <i class="fa fa-star" aria-hidden="true"></i>\n\n                                <i class="fa fa-star" aria-hidden="true"></i>\n\n                            </div>\n\n                        </div>\n\n                    </div>\n\n                </div>\n\n            </div>\n\n            <div class="feedback-body">\n\n                <p>Qui cupidatat nulla reprehenderit esse ad minim est in ipsum eiusmod. Do sit fugiat elit dolor officia aute enim nostrud esse. Incididunt officia consectetur nulla dolor labore Lorem ipsum officia eu exercitation.</p>\n\n            </div>\n\n        </div>\n\n\n\n        <div class="feedback-card">\n\n            <div class="feedback-header">\n\n                <div class="avatar-container">\n\n                    <div class="avatar-green-bg">\n\n                        <img src="assets/imgs/default-avatar.png">\n\n                    </div>\n\n                </div>\n\n                <div class="user-details-container">\n\n                    <p class="user-full-name">John Doe</p>\n\n                    <p class="date">05/03/2017</p>\n\n                    <div class="star-rating" style="font-size:10px;">\n\n                        <div class="back-stars">\n\n                            <i class="fa fa-star" aria-hidden="true"></i>\n\n                            <i class="fa fa-star" aria-hidden="true"></i>\n\n                            <i class="fa fa-star" aria-hidden="true"></i>\n\n                            <i class="fa fa-star" aria-hidden="true"></i>\n\n                            <i class="fa fa-star" aria-hidden="true"></i>\n\n\n\n                            <div class="front-stars" style="width: 80%">\n\n                                <i class="fa fa-star" aria-hidden="true"></i>\n\n                                <i class="fa fa-star" aria-hidden="true"></i>\n\n                                <i class="fa fa-star" aria-hidden="true"></i>\n\n                                <i class="fa fa-star" aria-hidden="true"></i>\n\n                                <i class="fa fa-star" aria-hidden="true"></i>\n\n                            </div>\n\n                        </div>\n\n                    </div>\n\n                </div>\n\n            </div>\n\n            <div class="feedback-body">\n\n                <p>Qui cupidatat nulla reprehenderit esse ad minim est in ipsum eiusmod. Do sit fugiat elit dolor officia aute enim nostrud esse. Incididunt officia consectetur nulla dolor labore Lorem ipsum officia eu exercitation.</p>\n\n            </div>\n\n        </div>\n\n\n\n        <div class="feedback-card">\n\n            <div class="feedback-header">\n\n                <div class="avatar-container">\n\n                    <div class="avatar-green-bg">\n\n                        <img src="assets/imgs/default-avatar.png">\n\n                    </div>\n\n                </div>\n\n                <div class="user-details-container">\n\n                    <p class="user-full-name">John Doe</p>\n\n                    <p class="date">05/03/2017</p>\n\n                    <div class="star-rating" style="font-size:10px;">\n\n                        <div class="back-stars">\n\n                            <i class="fa fa-star" aria-hidden="true"></i>\n\n                            <i class="fa fa-star" aria-hidden="true"></i>\n\n                            <i class="fa fa-star" aria-hidden="true"></i>\n\n                            <i class="fa fa-star" aria-hidden="true"></i>\n\n                            <i class="fa fa-star" aria-hidden="true"></i>\n\n                                \n\n                            <div class="front-stars" style="width: 80%">\n\n                                <i class="fa fa-star" aria-hidden="true"></i>\n\n                                <i class="fa fa-star" aria-hidden="true"></i>\n\n                                <i class="fa fa-star" aria-hidden="true"></i>\n\n                                <i class="fa fa-star" aria-hidden="true"></i>\n\n                                <i class="fa fa-star" aria-hidden="true"></i>\n\n                            </div>\n\n                        </div>\n\n                    </div>\n\n                </div>\n\n            </div>\n\n            <div class="feedback-body">\n\n                <p>Qui cupidatat nulla reprehenderit esse ad minim est in ipsum eiusmod. Do sit fugiat elit dolor officia aute enim nostrud esse. Incididunt officia consectetur nulla dolor labore Lorem ipsum officia eu exercitation.</p>\n\n            </div>\n\n        </div>\n\n\n\n    </section>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\NADER\IonicProjects\MyCampus\src\components\feedback-modal\feedback-modal.component.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["y" /* ViewController */]])
    ], FeedbackModalComponent);
    return FeedbackModalComponent;
}());

//# sourceMappingURL=feedback-modal.component.js.map

/***/ }),

/***/ 365:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(133);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UserService = (function () {
    function UserService(angularFireDatabase) {
        this.angularFireDatabase = angularFireDatabase;
        this.usersListRef = null;
        this.usersListRef = this.angularFireDatabase.list('/user');
    }
    UserService.prototype.getUsers = function () {
        return this.usersListRef.snapshotChanges().map(function (changes) {
            return changes.map(function (c) { return (__assign({ key: c.payload.key }, c.payload.val())); });
        });
    };
    UserService.prototype.getUserByUid = function (uid) {
        return this.angularFireDatabase.object('/user/' + uid).snapshotChanges().map(function (changes) {
            return __assign({ key: changes.payload.key }, changes.payload.val());
        });
    };
    UserService.prototype.createUserProfile = function (user) {
        return this.angularFireDatabase.object('/user/' + user.uid).set(user);
    };
    UserService.prototype.updateUserProfile = function (user) {
        return this.angularFireDatabase.object('/user/' + user.uid).update(user);
    };
    UserService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], UserService);
    return UserService;
}());

//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ 366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateEventModalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_photo_service__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_club_service__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__map_modal_map_modal_component__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_club_model__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_address_model__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_event_model__ = __webpack_require__(316);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var CreateEventModalComponent = (function () {
    function CreateEventModalComponent(platform, params, viewCtrl, modalCtrl, actionSheetCtrl, photoService, clubService) {
        this.platform = platform;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.modalCtrl = modalCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.photoService = photoService;
        this.clubService = clubService;
        this.showModalHeader = true;
        this.activeSlideIndex = 0;
        this.event = new __WEBPACK_IMPORTED_MODULE_7__models_event_model__["a" /* Event */]();
        this.club = new __WEBPACK_IMPORTED_MODULE_5__models_club_model__["a" /* Club */]();
    }
    CreateEventModalComponent.prototype.ngOnInit = function () {
        this.event = new __WEBPACK_IMPORTED_MODULE_7__models_event_model__["a" /* Event */]();
        this.event.tags = [];
        this.event.location = new __WEBPACK_IMPORTED_MODULE_6__models_address_model__["a" /* Address */]();
        var date = new Date();
        var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) + '' : (date.getMonth() + 1);
        var day = date.getDate() < 10 ? '0' + date.getDate() + '' : date.getDate();
        this.currentDate = [date.getFullYear(), month, day].join('-');
        this.maxDate = [date.getFullYear() + 1, 12, 31].join('-');
    };
    CreateEventModalComponent.prototype.dismissModal = function () {
        this.viewCtrl.dismiss();
    };
    CreateEventModalComponent.prototype.onShowModalHeader = function () {
        this.showModalHeader = true;
    };
    CreateEventModalComponent.prototype.onHideModalHeader = function () {
        this.showModalHeader = false;
    };
    CreateEventModalComponent.prototype.slideChanged = function () {
        this.activeSlideIndex = this.slides.getActiveIndex();
    };
    CreateEventModalComponent.prototype.addTag = function () {
        this.event.tags.push(this.tag.trim());
        this.tag = null;
    };
    CreateEventModalComponent.prototype.deleteTag = function (i) {
        this.event.tags.splice(i, 1);
    };
    CreateEventModalComponent.prototype.presentMapModal = function () {
        var _this = this;
        var mapModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__map_modal_map_modal_component__["a" /* MapModalComponent */], { location: this.event.location });
        mapModal.onDidDismiss(function (selectedPlace) {
            if (selectedPlace === null) {
                console.log('place stays the same');
            }
            else {
                console.log('place has been chosen');
                _this.event.location = JSON.parse(JSON.stringify(selectedPlace));
            }
            console.log('returned location', _this.event.location);
        });
        mapModal.present();
    };
    CreateEventModalComponent.prototype.presentPhotoActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Ajouter une photo de couverture à votre événement',
            buttons: [
                {
                    text: 'Choisir à partir du Gallery',
                    icon: 'md-images',
                    role: 'destructive',
                    handler: function () {
                        _this.photoService.takePhoto(0, 600, 500).then(function (imageData) {
                            _this.event.mainPhoto = 'data:image/jpeg;base64,' + imageData;
                        }, function (error) {
                            console.log('something wrong', error);
                        });
                    }
                },
                {
                    text: 'Prendre une photo',
                    icon: 'md-camera',
                    role: 'destructive',
                    handler: function () {
                        _this.photoService.takePhoto(1, 600, 500).then(function (imageData) {
                            _this.event.mainPhoto = 'data:image/jpeg;base64,' + imageData;
                        }, function (error) {
                            console.log('something wrong', error);
                        });
                    }
                }
            ]
        });
        actionSheet.present();
    };
    CreateEventModalComponent.prototype.createEvent = function () {
        var _this = this;
        var location = new __WEBPACK_IMPORTED_MODULE_6__models_address_model__["a" /* Address */]();
        location.name = 'Campus Universitaire de La Manouba';
        location.adress = 'Campus Universitaire de La, Manouba 2010, Tunisie';
        location.placeId = 'ChIJHVh6LZct_RIRIjXaJi2nJxw';
        location.latLang = {
            lat: 36.8160304,
            lng: 10.061551099999974
        };
        this.event.location = location;
        if (this.event.name && this.event.name.trim().length > 0 &&
            this.event.startDate && this.event.startDate.length > 0 &&
            this.event.startTime && this.event.startTime.length > 0 &&
            this.event.endDate && this.event.endDate.length > 0 &&
            this.event.endTime && this.event.endTime.length > 0 &&
            this.event.mainPhoto && this.event.mainPhoto.length > 0 &&
            JSON.stringify(this.event.location) !== '{}') {
            this.clubService.getClubFromLocalStorage().then(function (club) {
                _this.club = club;
                _this.event.key = new Date().getTime();
                _this.event.organizator = _this.club.key;
                var eventMainPhotoStoragePath = "club/" + _this.club.key + "/events/" + _this.event.key + "/cover";
                _this.photoService.uploadPhoto(_this.event.mainPhoto, eventMainPhotoStoragePath).then(function (res) {
                    _this.event.mainPhoto = res.downloadURL;
                    _this.club.events = (_this.club.events && _this.club.events.length > 0) ? _this.club.events : [];
                    _this.club.events.push(_this.event);
                    _this.clubService.updateClubInLocalStorage(_this.club);
                    _this.dismissModal();
                }, function (err) {
                    console.log(err);
                });
            }, function (error) {
                console.log(error);
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* Slides */])
    ], CreateEventModalComponent.prototype, "slides", void 0);
    CreateEventModalComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\NADER\IonicProjects\MyCampus\src\components\create-event-modal\create-event-modal.component.html"*/'<ion-content class="create-event-modal">\n\n    \n\n    <div class="create-event-modal-main-container">\n\n\n\n        <ion-icon *ngIf="showModalHeader" class="close-icon" ios="md-close" md="md-close" (click)="dismissModal()"></ion-icon>\n\n        <p *ngIf="showModalHeader" class="create-event-modal-header">Créez votre<br>prochain événement!</p>\n\n\n\n        <div class="slides-container" [style.height]="(showModalHeader) ? \'80%\' : \'fit-content\'">\n\n            <ion-slides spaceBetween="50" (ionSlideDidChange)="slideChanged()">\n\n                <ion-slide class="slide">\n\n                    <ion-item class="float-lbl-input">\n\n                        <ion-label floating>Titre de l\'Événement</ion-label>\n\n                        <ion-input type="text" [(ngModel)]="event.name" (ionFocus)="onHideModalHeader()" (ionBlur)="onShowModalHeader()"></ion-input>\n\n                    </ion-item>\n\n\n\n                    <ion-item class="float-lbl-input" *ngIf="event.tags && event.tags.length < 5">\n\n                        <ion-label floating>Quelques Mots Clés</ion-label>\n\n                        <ion-input type="text" [(ngModel)]="tag" (ionFocus)="onHideModalHeader()" (ionBlur)="onShowModalHeader()"></ion-input>\n\n                        <button clear ion-button item-end color="secondary" icon-only class="input-btn" *ngIf="tag && tag.trim().length > 0" (click)="addTag()">\n\n                            <ion-icon ios="md-add" md="md-add"></ion-icon>\n\n                        </button>\n\n                    </ion-item>\n\n\n\n                    <div class="tags-container" *ngIf="event.tags && event.tags.length > 0">\n\n                        <div class="tag" *ngFor="let tag of event.tags; let i = index;">\n\n                            <span class="tag-label">{{tag}}</span>\n\n                            <span class="delete" (click)="deleteTag(i)">&times;</span>\n\n                        </div>\n\n                    </div>\n\n\n\n                    <ion-item class="float-lbl-input">\n\n                        <ion-label floating>Plus d\'Informations</ion-label>\n\n                        <ion-textarea autosize autocomplete="on" autocorrect="on" rows="5" [(ngModel)]="event.description" (ionFocus)="onHideModalHeader()" (ionBlur)="onShowModalHeader()"></ion-textarea>\n\n                    </ion-item>\n\n                </ion-slide>\n\n\n\n                <ion-slide class="slide">\n\n                    <p class="datetime-separator">L\'Événement commence à</p>\n\n\n\n                    <div class="date-time">\n\n                        <div class="date">\n\n                            <ion-item class="float-lbl-input">\n\n                                <ion-label floating>Date</ion-label>\n\n                                <ion-datetime displayFormat="DDDD DD MMM, YYYY" pickerFormat="MMMM/DD/YYYY" cancelText="Annuler" doneText="Ok" min="{{currentDate}}" max="{{maxDate}}" [(ngModel)]="event.startDate"></ion-datetime>\n\n                            </ion-item>\n\n                        </div>\n\n                        <div class="time">\n\n                            <ion-item class="float-lbl-input">\n\n                                <ion-label floating>Heure</ion-label>\n\n                                <ion-datetime displayFormat="HH:mm" cancelText="Annuler" doneText="Ok" [(ngModel)]="event.startTime"></ion-datetime>\n\n                            </ion-item>\n\n                        </div>\n\n                    </div>\n\n                    \n\n                    <p class="datetime-separator" style="margin-top:40px;">L\'Événement se termine à</p>\n\n\n\n                    <div class="date-time">\n\n                        <div class="date">\n\n                            <ion-item class="float-lbl-input">\n\n                                <ion-label floating>Date</ion-label>\n\n                                <ion-datetime displayFormat="DDDD DD MMM, YYYY" pickerFormat="MMMM/DD/YYYY" cancelText="Annuler" doneText="Ok" min="{{currentDate}}" max="{{maxDate}}" [(ngModel)]="event.endDate"></ion-datetime>\n\n                            </ion-item>\n\n                        </div>\n\n                        <div class="time">\n\n                            <ion-item class="float-lbl-input">\n\n                                <ion-label floating>Heure</ion-label>\n\n                                <ion-datetime displayFormat="HH:mm" cancelText="Annuler" doneText="Ok" [(ngModel)]="event.endTime"></ion-datetime>\n\n                            </ion-item>\n\n                        </div>\n\n                    </div>\n\n\n\n                    <div class="event-location-container">\n\n                        <ion-icon class="map-btn" ios="md-map" md="md-map" (click)="presentMapModal()"></ion-icon>\n\n                        <p *ngIf="!event.location || !event.location.name || event.location.name.length <= 0">Localisation de l\'Événement</p>\n\n                        <p *ngIf="event.location && event.location.name && event.location.name.length > 0">{{event.location.name}}</p>\n\n                    </div>\n\n\n\n                </ion-slide>\n\n\n\n                <ion-slide class="slide">\n\n                    <div class="cover-photo-container" (click)="presentPhotoActionSheet()" [style.background]="(event.mainPhoto && event.mainPhoto.length > 0) ? \'url(\'+event.mainPhoto+\')\' : \'transparent\'">\n\n                        <div class="placeholder" *ngIf="!event.mainPhoto || event.mainPhoto.length === 0">\n\n                            <i class="fas fa-camera"></i>\n\n                            <p>Ajouter une photo de couverture pour votre événement</p>\n\n                        </div>\n\n                    </div>\n\n                </ion-slide>\n\n            </ion-slides>\n\n        </div>\n\n\n\n    </div>\n\n\n\n</ion-content>\n\n\n\n<ion-footer *ngIf="showModalHeader" class="create-event-modal-footer">\n\n    <div class="dots-container" *ngIf="activeSlideIndex < 2">\n\n        <span class="dot" [ngClass]="{\'full\': activeSlideIndex === 0}"></span>\n\n        <span class="dot" [ngClass]="{\'full\': activeSlideIndex === 1}"></span>\n\n        <span class="dot"></span>\n\n    </div>\n\n\n\n    <button class="validation-btn" *ngIf="activeSlideIndex >= 2" ion-button color="secondary" round large block (click)="createEvent()">Créez votre Événement</button>\n\n</ion-footer>\n\n'/*ion-inline-end:"C:\Users\NADER\IonicProjects\MyCampus\src\components\create-event-modal\create-event-modal.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["y" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_2__services_photo_service__["a" /* PhotoService */],
            __WEBPACK_IMPORTED_MODULE_3__services_club_service__["a" /* ClubService */]])
    ], CreateEventModalComponent);
    return CreateEventModalComponent;
}());

//# sourceMappingURL=create-event-modal.component.js.map

/***/ }),

/***/ 367:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Photo; });
var Photo = (function () {
    function Photo() {
    }
    return Photo;
}());

//# sourceMappingURL=photo.model.js.map

/***/ }),

/***/ 369:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(377);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 377:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angularfire2_auth__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2_database__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2_storage__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__environments_firebase_credentials__ = __webpack_require__(610);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_ionic_img_viewer__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_side_menu_controller_service__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_photo_service__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__services_authentication_service__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__services_user_service__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__services_club_service__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__app_component__ = __webpack_require__(611);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_feedback_modal_feedback_modal_component__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_create_event_modal_create_event_modal_component__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__components_event_details_modal_event_details_modal_component__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__components_map_modal_map_modal_component__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pipes_side_menu_icons_matcher_pipe__ = __webpack_require__(612);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__directives_textarea_autosize_directive__ = __webpack_require__(613);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


























var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_19__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_20__components_feedback_modal_feedback_modal_component__["a" /* FeedbackModalComponent */],
                __WEBPACK_IMPORTED_MODULE_21__components_create_event_modal_create_event_modal_component__["a" /* CreateEventModalComponent */],
                __WEBPACK_IMPORTED_MODULE_22__components_event_details_modal_event_details_modal_component__["a" /* EventDetailsModalComponent */],
                __WEBPACK_IMPORTED_MODULE_23__components_map_modal_map_modal_component__["a" /* MapModalComponent */],
                __WEBPACK_IMPORTED_MODULE_24__pipes_side_menu_icons_matcher_pipe__["a" /* SideMenuIconsMatcherPipe */],
                __WEBPACK_IMPORTED_MODULE_25__directives_textarea_autosize_directive__["a" /* TextAreaAutosizeDirective */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_19__app_component__["a" /* MyApp */], {
                    backButtonText: '',
                    menuType: 'overlay',
                    monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
                    monthShortNames: ['JAN', 'FÉV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOÛ', 'SEP', 'OCT', 'NOV', 'DÉC'],
                    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
                    dayShortNames: ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM']
                }, {
                    links: [
                        { loadChildren: '../pages/about/about.module#AboutPageModule', name: 'AboutPage', segment: 'about', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/account/account.module#AccountPageModule', name: 'AccountPage', segment: 'account', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/canteen/canteen-home/canteen-home.module#CanteenHomePageModule', name: 'CanteenHomePage', segment: 'canteen-home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/club/coming-events/coming-events.module#ComingEventsPageModule', name: 'ComingEventsPage', segment: 'coming-events', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/club/club-profile/club-profile.module#ClubProfilePageModule', name: 'ClubProfilePage', segment: 'club-profile', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/club/events/events.module#EventsPageModule', name: 'EventsPage', segment: 'events', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/club/membership-applications/membership-applications.module#MembershipApplicationsPageModule', name: 'MembershipApplicationsPage', segment: 'membership-applications', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/club/past-events/past-events.module#PastEventsPageModule', name: 'PastEventsPage', segment: 'past-events', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/help/help.module#HelpPageModule', name: 'HelpPage', segment: 'help', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/landing/landing.module#LandingPageModule', name: 'LandingPage', segment: 'landing', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/settings/settings.module#SettingsPageModule', name: 'SettingsPage', segment: 'settings', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/signup/signup.module#SignupPageModule', name: 'SignupPage', segment: 'signup', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/cafeteria/cafeteria-home/cafeteria-home.module#CafeteriaHomePageModule', name: 'CafeteriaHomePage', segment: 'cafeteria-home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/student/student-home/student-home.module#StudentHomePageModule', name: 'StudentHomePage', segment: 'student-home', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_8_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_12__environments_firebase_credentials__["a" /* FIREBASE_CONFIG */]),
                __WEBPACK_IMPORTED_MODULE_10_angularfire2_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_9_angularfire2_auth__["b" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_11_angularfire2_storage__["b" /* AngularFireStorageModule */],
                __WEBPACK_IMPORTED_MODULE_13_ionic_img_viewer__["a" /* IonicImageViewerModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_19__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_20__components_feedback_modal_feedback_modal_component__["a" /* FeedbackModalComponent */],
                __WEBPACK_IMPORTED_MODULE_21__components_create_event_modal_create_event_modal_component__["a" /* CreateEventModalComponent */],
                __WEBPACK_IMPORTED_MODULE_22__components_event_details_modal_event_details_modal_component__["a" /* EventDetailsModalComponent */],
                __WEBPACK_IMPORTED_MODULE_23__components_map_modal_map_modal_component__["a" /* MapModalComponent */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_15__services_photo_service__["a" /* PhotoService */],
                __WEBPACK_IMPORTED_MODULE_14__services_side_menu_controller_service__["a" /* SideMenuControllerService */],
                __WEBPACK_IMPORTED_MODULE_16__services_authentication_service__["a" /* AuthenticationService */],
                __WEBPACK_IMPORTED_MODULE_17__services_user_service__["a" /* UserService */],
                __WEBPACK_IMPORTED_MODULE_18__services_club_service__["a" /* ClubService */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 610:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FIREBASE_CONFIG; });
// export const FIREBASE_CONFIG = {
//     apiKey: "AIzaSyDnXXQfGyG8j5tDNx8o--MmFjHBg2d2G88",
//     authDomain: "mycampus-a7db4.firebaseapp.com",
//     databaseURL: "https://mycampus-a7db4.firebaseio.com",
//     projectId: "mycampus-a7db4",
//     storageBucket: "mycampus-a7db4.appspot.com",
//     messagingSenderId: "152609683417"
// };
var FIREBASE_CONFIG = {
    apiKey: "AIzaSyCPe0-6z4uXv44Fpw2lG4Vp2K-BXs9tnME",
    authDomain: "mycampustmp.firebaseapp.com",
    databaseURL: "https://mycampustmp.firebaseio.com",
    projectId: "mycampustmp",
    storageBucket: "mycampustmp.appspot.com",
    messagingSenderId: "35110800283"
};
//# sourceMappingURL=firebase.credentials.js.map

/***/ }),

/***/ 611:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_observable_timer__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_observable_timer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_observable_timer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_authentication_service__ = __webpack_require__(182);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, events, alertCtrl, authenticationService, storage) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.authenticationService = authenticationService;
        this.storage = storage;
        this.rootPage = 'LandingPage';
        this.sideMenuContent = [];
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            _this.setupSideMenuContent();
        });
    }
    MyApp.prototype.setupSideMenuContent = function () {
        var _this = this;
        this.events.subscribe('sideMenu:changeContent', function (content) {
            _this.sideMenuContent = content;
        });
    };
    MyApp.prototype.navigate = function (path) {
        this.nav.push(path);
    };
    MyApp.prototype.showLogoutAlert = function () {
        var _this = this;
        var logoutAlert = this.alertCtrl.create({
            title: 'Vous venez de se deconnecter!',
            message: 'Êtes-vous sûr?',
            buttons: [
                {
                    text: 'Annuler',
                    handler: function () { }
                },
                {
                    text: 'Se deconnecter',
                    handler: function () {
                        _this.splashScreen.show();
                        _this.authenticationService.signOut().then(function (result) {
                            _this.storage.clear();
                            _this.nav.setRoot('LoginPage');
                            _this.nav.popToRoot();
                            Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_observable_timer__["timer"])(3000).subscribe(function () {
                                _this.splashScreen.hide();
                            });
                        }, function (error) {
                            console.log(error);
                        });
                    }
                }
            ]
        });
        logoutAlert.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('content'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\NADER\IonicProjects\MyCampus\src\app\app.html"*/'<!-- <div *ngIf="showSplash" class="splash">\n    <div class="spinner">\n    </div>\n</div> -->\n\n<ion-menu id="sideMenu" [content]="content" persistent="true">\n\n    <ion-content class="side-menu">\n\n        <div class="side-menu-header">\n\n            <div class="avatar-container">\n                <div class="avatar-green-bg">\n                    <img src="assets/imgs/default-avatar.png">\n                </div>\n            </div>\n\n            <div class="general-info-container">\n                <p class="username">Film Club</p>\n                <p class="detail">@ISAMM</p>\n            </div>\n\n        </div>\n\n        <div class="side-menu-options" padding>\n            <ion-list no-lines>\n                <button ion-item detail-none menuClose *ngFor="let content of sideMenuContent" (click)="navigate(content.path)" class="side-menu-option ripple">\n                    <span class="option-icon-container"><i class="{{content.name | sideMenuIconsMatcher}}"></i></span>{{content.name}}\n                </button>\n                <button ion-item detail-none menuClose class="side-menu-option ripple" (click)="navigate(\'AccountPage\')">\n                    <span class="option-icon-container"><i class="fas fa-lock"></i></span>Votre compte\n                </button>\n                <button ion-item detail-none menuClose class="side-menu-option ripple" (click)="navigate(\'SettingsPage\')">\n                    <span class="option-icon-container"><i class="fas fa-cog"></i></span>Paramètres\n                </button>\n                <button ion-item detail-none menuClose class="side-menu-option ripple" (click)="navigate(\'HelpPage\')">\n                    <span class="option-icon-container"><i class="fas fa-question-circle"></i></span>Aide\n                </button>\n                <button ion-item detail-none menuClose class="side-menu-option ripple" (click)="navigate(\'AboutPage\')">\n                    <span class="option-icon-container"><i class="fas fa-info-circle"></i></span>A propos\n                </button>\n                <button ion-item detail-none menuClose class="side-menu-option ripple" (click)="showLogoutAlert()">\n                    <span class="option-icon-container"><i class="fas fa-sign-out-alt"></i></span>Se deconnecter\n                </button>\n            </ion-list>\n        </div>\n\n    </ion-content>\n\n</ion-menu>\n\n<ion-nav #content [root]="rootPage"></ion-nav>'/*ion-inline-end:"C:\Users\NADER\IonicProjects\MyCampus\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_6__services_authentication_service__["a" /* AuthenticationService */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 612:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SideMenuIconsMatcherPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SideMenuIconsMatcherPipe = (function () {
    function SideMenuIconsMatcherPipe() {
    }
    SideMenuIconsMatcherPipe.prototype.transform = function (value) {
        switch (value) {
            case 'Votre vitrine': {
                return 'fas fa-id-card';
            }
            case 'Vos événements': {
                return 'far fa-calendar-alt';
            }
            case 'Demandes d\'Adhésion': {
                return 'fas fa-user-plus';
            }
        }
    };
    SideMenuIconsMatcherPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'sideMenuIconsMatcher'
        })
    ], SideMenuIconsMatcherPipe);
    return SideMenuIconsMatcherPipe;
}());

//# sourceMappingURL=side-menu-icons-matcher.pipe.js.map

/***/ }),

/***/ 613:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TextAreaAutosizeDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TextAreaAutosizeDirective = (function () {
    function TextAreaAutosizeDirective(element) {
        this.element = element;
    }
    TextAreaAutosizeDirective.prototype.onInput = function (textArea) {
        this.adjust();
    };
    TextAreaAutosizeDirective.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () { return _this.adjust(); }, 0);
    };
    TextAreaAutosizeDirective.prototype.adjust = function () {
        var textArea = this.element.nativeElement.getElementsByTagName('textarea')[0];
        textArea.style.overflow = 'hidden';
        textArea.style.height = 'auto';
        textArea.style.height = textArea.scrollHeight + "px";
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* HostListener */])('input', ['$event.target']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [HTMLTextAreaElement]),
        __metadata("design:returntype", void 0)
    ], TextAreaAutosizeDirective.prototype, "onInput", null);
    TextAreaAutosizeDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Directive */])({
            selector: 'ion-textarea[autosize]'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]])
    ], TextAreaAutosizeDirective);
    return TextAreaAutosizeDirective;
}());

//# sourceMappingURL=textarea-autosize.directive.js.map

/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClubService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(133);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ClubService = (function () {
    function ClubService(angularFireDatabase, storage) {
        this.angularFireDatabase = angularFireDatabase;
        this.storage = storage;
        this.clubListRef = null;
        this.clubListRef = this.angularFireDatabase.list('/club');
    }
    ClubService.prototype.getClubs = function () {
        return this.clubListRef.snapshotChanges().map(function (changes) {
            return changes.map(function (c) { return (__assign({ key: c.payload.key }, c.payload.val())); });
        });
    };
    ClubService.prototype.getClubById = function (key) {
        return this.angularFireDatabase.object('/club/' + key).snapshotChanges().map(function (changes) {
            return __assign({ key: changes.payload.key }, changes.payload.val());
        });
    };
    ClubService.prototype.getClubByAdminUid = function (uid) {
        return this.angularFireDatabase.list('/club', function (ref) { return ref.orderByChild('admin/uid').equalTo(uid); }).snapshotChanges().map(function (changes) {
            return changes.map(function (c) { return (__assign({ key: c.payload.key }, c.payload.val())); });
        });
    };
    ClubService.prototype.createClub = function (club) {
        return this.clubListRef.push(club);
    };
    ClubService.prototype.updateClub = function (club) {
        return this.clubListRef.update(club.key, club);
    };
    ClubService.prototype.updateClubInLocalStorage = function (club) {
        var _this = this;
        this.updateClub(club).then(function (response) {
            _this.storage.set('currentClub', club);
        }, function (error) {
            console.log(error);
        });
    };
    ClubService.prototype.getClubFromLocalStorage = function () {
        return this.storage.get('currentClub');
    };
    ClubService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]])
    ], ClubService);
    return ClubService;
}());

//# sourceMappingURL=club.service.js.map

/***/ })

},[369]);
//# sourceMappingURL=main.js.map