webpackJsonp([18],{

/***/ 664:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login__ = __webpack_require__(931);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LoginPageModule = (function () {
    function LoginPageModule() {
    }
    LoginPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */])
            ],
        })
    ], LoginPageModule);
    return LoginPageModule;
}());

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ 882:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Credentials; });
var Credentials = (function () {
    function Credentials() {
    }
    return Credentials;
}());

//# sourceMappingURL=credentials.model.js.map

/***/ }),

/***/ 883:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return STUDENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return CLUB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CANTEEN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CAFETERIA; });
var STUDENT = 'STUDENT';
var CLUB = 'CLUB';
var CANTEEN = 'CANTEEN';
var CAFETERIA = 'CAFETERIA';
//# sourceMappingURL=users-types.constant.js.map

/***/ }),

/***/ 931:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_side_menu_controller_service__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_authentication_service__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_club_service__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_user_service__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_credentials_model__ = __webpack_require__(882);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__consts_users_types_constant__ = __webpack_require__(883);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, sideMenuControllerService, authenticationService, clubService, userService, storage, splashScreen, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sideMenuControllerService = sideMenuControllerService;
        this.authenticationService = authenticationService;
        this.clubService = clubService;
        this.userService = userService;
        this.storage = storage;
        this.splashScreen = splashScreen;
        this.toastCtrl = toastCtrl;
        this.credentials = new __WEBPACK_IMPORTED_MODULE_8__models_credentials_model__["a" /* Credentials */]();
        this.modules = [
            { name: 'Etudiant', path: 'StudentHomePage' },
            { name: 'Restaurant', path: 'CanteenHomePage' },
            { name: 'Buvette', path: 'CafeteriaHomePage' },
            { name: 'Club', path: 'ClubProfilePage' }
        ];
        this.sideMenuControllerService.enableSideMenu(false);
    }
    LoginPage.prototype.ionViewDidLoad = function () {
    };
    LoginPage.prototype.navigate = function (path) {
        this.navCtrl.push(path);
    };
    LoginPage.prototype.goToHomePage = function (homePage) {
        this.splashScreen.hide();
        this.navCtrl.setRoot(homePage);
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        var emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (this.credentials.email && this.credentials.email.trim().length > 0 && emailRegEx.test(String(this.credentials.email).toLocaleLowerCase()) && this.credentials.password && this.credentials.password.trim().length > 0) {
            this.splashScreen.show();
            this.authenticationService.signInWithEmailAndPassword(this.credentials).then(function (result) {
                _this.userService.getUserByUid(result.uid).subscribe(function (response) {
                    _this.storage.set('currentUser', response);
                    switch (response.userType) {
                        case __WEBPACK_IMPORTED_MODULE_9__consts_users_types_constant__["d" /* STUDENT */]: {
                            _this.goToHomePage('StudentHomePage');
                            break;
                        }
                        case __WEBPACK_IMPORTED_MODULE_9__consts_users_types_constant__["c" /* CLUB */]: {
                            _this.clubService.getClubByAdminUid(response.uid).subscribe(function (response) {
                                _this.storage.set('currentClub', response[0]);
                                _this.goToHomePage('ClubProfilePage');
                            }, function (error) {
                                _this.splashScreen.hide();
                                console.log(error);
                            });
                            break;
                        }
                        case __WEBPACK_IMPORTED_MODULE_9__consts_users_types_constant__["a" /* CAFETERIA */]: {
                            _this.goToHomePage('CafeteriaHomePage');
                            break;
                        }
                        case __WEBPACK_IMPORTED_MODULE_9__consts_users_types_constant__["b" /* CANTEEN */]: {
                            _this.goToHomePage('CanteenHomePage');
                            break;
                        }
                    }
                }, function (error) {
                    _this.splashScreen.hide();
                    console.log(error);
                });
            }, function (error) {
                _this.splashScreen.hide();
                console.log(error);
                switch (error.code) {
                    case 'auth/user-not-found': {
                        var toast = _this.toastCtrl.create({
                            message: 'Vous devez créer un compte d\'abord!',
                            duration: 3000,
                            position: 'top'
                        });
                        toast.present();
                        break;
                    }
                    case 'auth/wrong-password': {
                        var toast = _this.toastCtrl.create({
                            message: 'Email ou mot de passe incorrecte!',
                            duration: 3000,
                            position: 'top'
                        });
                        toast.present();
                        break;
                    }
                }
            });
        }
        else {
            return;
        }
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\Users\firas\Desktop\MyCampus\src\pages\login\login.html"*/'<ion-content class="login-page">\n\n    <div class="logo-container">\n        <img src="assets/imgs/myCampus-logo-v1.png">\n    </div>\n\n    <div class="login-form-container">\n        <ion-item class="float-lbl-input">\n            <ion-label floating>Votre email</ion-label>\n            <ion-input type="text" [(ngModel)]="credentials.email"></ion-input>\n        </ion-item>\n\n        <ion-item class="float-lbl-input">\n            <ion-label floating>Votre mot de passe</ion-label>\n            <ion-input type="password" [(ngModel)]="credentials.password"></ion-input>\n        </ion-item>\n    </div>\n\n    <div class="action-container">\n        <button ion-button color="secondary" round block large (click)="login()">Se connecter</button>\n        <p class="signup-link">Vous n\'avez pas de compte?<br><span (click)="navigate(\'SignupPage\')">Inscrivez vous!</span>\n        </p>\n    </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\firas\Desktop\MyCampus\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__services_side_menu_controller_service__["a" /* SideMenuControllerService */],
            __WEBPACK_IMPORTED_MODULE_5__services_authentication_service__["a" /* AuthenticationService */],
            __WEBPACK_IMPORTED_MODULE_6__services_club_service__["a" /* ClubService */],
            __WEBPACK_IMPORTED_MODULE_7__services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["y" /* ToastController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ })

});
//# sourceMappingURL=18.js.map