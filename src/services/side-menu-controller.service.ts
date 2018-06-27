import { Injectable } from '@angular/core';
import { Events, MenuController } from 'ionic-angular';

import { SideMenuContent } from './../models/side-menu-content.model';


@Injectable()
export class SideMenuControllerService {

    constructor(
        public events: Events,
        public menuCtrl: MenuController
    ) {}

    setupClubSideMenuContent() {

        let clubSideMenuContents: SideMenuContent[] = [
            {name: 'Votre vitrine', path: 'ClubProfilePage'},
            {name: 'Vos événements', path: 'EventsPage'},
            {name: 'Demandes d\'Adhésion', path: 'MembershipApplicationsPage'}
        ];
        
        this.enableSideMenu(true);
        this.events.publish('sideMenu:changeContent', clubSideMenuContents);

    }

      setupCanteenSideMenuContent() {

        let canteenSideMenuContents: SideMenuContent[] = [
            {name: 'Home', path: 'CanteenHomePage'},
    {name: 'Menu', path: 'MenuCanteenPage'},
    {name: 'Feedback', path: 'FeedbackCanteenPage'},
    {name: 'Reservation', path: 'ReservationPage'},
    {name: 'MenuEtudiant', path: 'EtudiantMenuPage'},
    {name: 'Mon compte', path: 'AccountPage'}
        ];
        
        this.enableSideMenu(true);
        this.events.publish('sideMenu:changeContent', canteenSideMenuContents);

    }
    

    enableSideMenu(isEnabled: boolean) {
        this.menuCtrl.enable(isEnabled);
    }

}
