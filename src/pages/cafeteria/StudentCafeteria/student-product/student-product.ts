import { Component , ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams , Slides} from 'ionic-angular';

/**
 * Generated class for the StudentProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-student-product',
  templateUrl: 'student-product.html',
})
export class StudentProductPage {

  @ViewChild('slider') slider: Slides;
  page="0";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  selectedTab(index){
    this.slider.slideTo(index);
  }

  moveButton($event){
    this.page= $event._snapIndex.toString();
  }

  goTo(category,type){
    this.navCtrl.push("ProductsPage",{category:category,type:type});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentProductPage');
  }

}
