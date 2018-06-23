import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import { MealService } from '../../../services_canteen/meal.service';


/**
 * Generated class for the MenuCanteenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

let fromMonday = [],
i = 0;
for (i; i < 7; i++) 
{
  fromMonday.push(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + i));
}


@IonicPage()
@Component({
  selector: 'page-menu-canteen',
  templateUrl: 'menu-canteen.html',
})
export class MenuCanteenPage {

  sideMenuContent: {name: string, path: string}[] = [
    {name: 'Home', path: 'CanteenHomePage'},
    {name: 'Feedback', path: 'FeedbackCanteenPage'},
    {name: 'Mon compte', path: 'AccountPage'},
    {name: 'MenuEtudiant', path: 'EtudiantMenuPage'}
];

demo: Array < Date > = fromMonday;
mealList$ : any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public events : Events,private mealservice:MealService,public loadingCtrl:LoadingController) {
    this.setupSideMenuContent();

    //loading 
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();

    this.mealList$ = this.mealservice.getAllmeal()
    .snapshotChanges().map( changes=>{
      return changes.map( c=>({
        key: c.payload.key, ...c.payload.val(),
      }));
    });
    console.log(this.demo);
    console.log(this.mealList$);
    this.mealList$.subscribe((value)=>{
      console.log(value);
    })

    loading.dismiss();
    
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuCanteenPage');
    
  }

  setupSideMenuContent() {
    this.events.publish('sideMenu:changeContent', this.sideMenuContent);
}

onDetailMenu(d:any)
{
  this.navCtrl.push('DetailMenuPage',{meal:d});
}



}
