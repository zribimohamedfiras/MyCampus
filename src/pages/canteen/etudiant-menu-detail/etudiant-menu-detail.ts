import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Modal, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { MealService } from '../../../services_canteen/meal.service';


import firebase from 'firebase';

import { FIREBASE_CONFIG } from '../../../environments/firebase.credentials';
import { Meal } from '../../../models/meal.model';
import { ReserverService } from '../../../services_canteen/reserver.service';
import { Reservation } from '../../../models/reservation.model';
import { ToastService } from '../../../servicesCafeteria/toast.service';
import { UserService } from '../../../services/user.service';


/**
 * Generated class for the EtudiantMenuDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-etudiant-menu-detail',
  templateUrl: 'etudiant-menu-detail.html',
})
export class EtudiantMenuDetailPage {

  sideMenuContent: {name: string, path: string}[] = [
    {name: 'Home', path: 'CanteenHomePage'},
    {name: 'Menu', path: 'MenuCanteenPage'},
    {name: 'Feedback', path: 'FeedbackCanteenPage'},
    {name: 'Reservation', path: 'ReservationPage'},
    {name: 'MenuEtudiant', path: 'EtudiantMenuPage'},
    {name: 'Mon compte', path: 'AccountPage'}
    
  ];

defaultMsgEntre="entrer le plat d'entrée";
defaultMsgDessert="entrer dessert";
defaultMsgMainCourse="entrer plat principale";

datemeal:Date;
meals:any;
meal:Meal;
mealList$ : any;
photosRepat : any;
photosDinner : any;
user : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private events:Events,private mealserv:MealService,private modal: ModalController
    ,private alertCtrl: AlertController,private reserverserv:ReserverService
    ,public toast: ToastService,public loadingCtrl:LoadingController,
    public userServe: UserService) {
      this.setupSideMenuContent();
  

      //loading 
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
    
      loading.present();


      if (!firebase.apps.length) {
        firebase.initializeApp(FIREBASE_CONFIG);
        
    }
    
  
      this.datemeal=this.navParams.get('meal');
      this.mealList$ = this.mealserv.getAllmeal()
      .snapshotChanges().map( changes=>{
        return changes.map( c=>({
          key: c.payload.key, ...c.payload.val(),
        }));
      });
  
      this.mealList$.subscribe((value)=>{
        this.meals=value;
        //console.log(this.meals);
        for(let element of this.meals)
        {
          //console.log(this.datemeal.getFullYear());
          //console.log(new Date(element.date).getFullYear());
          if((new Date(element.date).getFullYear()==this.datemeal.getFullYear())
        &&(new Date(element.date).getMonth()==this.datemeal.getMonth())
        &&(new Date(element.date).getDate()==this.datemeal.getDate()))
        {
          //console.log("if");
          this.meal=element;
        }
        
        }
        console.log(this.meal);

        if(this.meal.photoGalleryRepat != null)
        {
          let i=0;
          this.photosRepat=[];
          for(let pic of this.meal.photoGalleryRepat)
          {console.log(pic);
            firebase.storage().ref('repat/'+pic+'.jpg')
            .getDownloadURL().then((url)=>{
              console.log(pic+" campos");
                this.photosRepat.push({URLI : url, PIC : pic} );
                
            })
            i++;
  
          }
        }
        if(this.meal.photoGalleryDinner != null)
        {
          let j=0;
          this.photosDinner=[];
          for(let pic of this.meal.photoGalleryDinner)
          {console.log(pic);
            firebase.storage().ref('dinner/'+pic+'.jpg')
            .getDownloadURL().then((url)=>{
              console.log(pic+" campos");
                this.photosDinner.push({URLI : url, PIC : pic});
                
            })
            j++;
  
          }
        }

        let sum=0;
        let i=0;
        
        if(this.meal.feedbacks != null)
        {
          for(let feed of this.meal.feedbacks)
          {
            if(feed.userID!='canteen')
            {
              sum+= feed.rate;
              i++;
            }
          }

          if(i!=0)
          {
            this.meal.moyennefeed= sum/i ;
          }
          else
          {
            this.meal.moyennefeed=0;
          }
          
        
        }
        else
        {
          this.meal.moyennefeed=0;
        }

      })
      console.log(this.meal);

      if(this.meal==null)
      {
        console.log("null");
        this.meal=new Meal();
      }
      loading.dismiss();

    }

    ngOnInit() {
      let acc = document.getElementsByClassName('accordion');
      let i;
    
      for (i = 0; i < acc.length; i++) {
          acc[i].addEventListener('click', function() {
              this.classList.toggle('active');
              let panel = this.nextElementSibling;
              if (panel.style.maxHeight) {
                  panel.style.maxHeight = null;
              } else {
                  panel.style.maxHeight = panel.scrollHeight + 'px';
              }
          });
        }
    }

    Commentaire(meal : Meal,iduser : string)
    {
      console.log(iduser+" "+meal.starterRepat);
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EtudiantMenuDetailPage');
  }

  setupSideMenuContent() {
    this.events.publish('sideMenu:changeContent', this.sideMenuContent);
}

Commenter(meal:Meal, iduser: string)
{
  let name : string
  this.userServe.getUserFromLocalStorage().then((use)=>{
    this.user=use;
    name = this.user.firstName +" "+ this.user.lastName;
    console.log(this.user);
  console.log(name);
  const myData= {
    commentmeal: meal,
    commentuser: name
  };

  const mymodal :Modal= this.modal.create('ModalPageCommentaireConteenPage', {data: myData},
  {
    cssClass: "my-modal",
   
  });

  mymodal.present();

  mymodal.onDidDismiss((data)=> {
    console.log(data);
  })
      
  });
  
  
}

reserver(meal:Meal,iduser:string,type:string)
{

  
  

  let alert = this.alertCtrl.create();
  alert.setTitle('Reservation');
  alert.setSubTitle('Choisir le nombre de plats à reserver');
  alert.setCssClass('alertcss');
  
  alert.addInput({
    type: 'radio',
    label: '1',
    value: '1',
    checked: true,
  });

  alert.addInput({
    type: 'radio',
    label: '2',
    value: '2'
  });

  alert.addInput({
    type: 'radio',
    label: '3',
    value: '3'
  });

  alert.addInput({
    type: 'radio',
    label: '4',
    value: '4'
  });

  alert.addInput({
    type: 'radio',
    label: '5',
    value: '5'
  });

  alert.addButton({
    text: 'Cancel',
    role: 'cancel',
    cssClass: 'buttoncss',
    handler: data => {
          console.log('Cancel clicked');
      }
  });

  alert.addButton({
    text: 'Confirmer',
    cssClass: 'buttoncss',
    handler: data => {
      console.log('radio'+ data);
      console.log(meal.key);
      this.userServe.getUserFromLocalStorage().then((use)=>{

        this.user=use;
        console.log(this.user.icn)
        let reserve:Reservation;
      reserve= new Reservation();
      reserve.meal=meal.date;
      reserve.quantity= data;
      reserve.type= type;
      reserve.userID=this.user.icn;
      reserve.checked = 'false';
      reserve.date= new Date().toString();
      this.reserverserv.addreservation(reserve).then(ref=>{
        this.toast.show(`Reservation Effectuer avec succes!`);
      });
      console.log(reserve);
  });

      
    }
  })
  alert.present();

}


}
