import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JsonFormData } from 'src/app/shared/components/dynamic-form/dynamic-form.component';
import { CommonRoutes } from 'src/global.routes';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { NavController } from '@ionic/angular';
import { SKELETON } from 'src/app/core/constants/skeleton.constant';
import { Router } from '@angular/router';
import { localKeys } from 'src/app/core/constants/localStorage.keys';
import { UserService } from 'src/app/core/services';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public formData: JsonFormData;
  user;
  SESSIONS: string=CommonRoutes.SESSIONS;
  SKELETON=SKELETON;
  sessions=[{
    _id:1,
    title:'Topic, Mentor name',
    subTitle: 'Short description ipsum dolor sit amet, consectetur',
    description:'Short description ipsum dolor sit amet, consectetur',
    date:'20/11/2021',
    status:'Live',
    image:'shapes-sharp'
  },
  {
    _id:2,
    title:'Topic, Mentor name',
    subTitle: 'Short description ipsum dolor sit amet, consectetur',
    description:'Short description ipsum dolor sit amet, consectetur',
    date:'20/11/2021',
    image:'shapes-sharp',
    status:'Live',
  },{
    _id:3,
    title:'Topic, Mentor name',
    subTitle: 'Short description ipsum dolor sit amet, consectetur',
    description:'Short description ipsum dolor sit amet, consectetur',
    date:'20/11/2021',
    image:'shapes-sharp'
  },{
    _id:4,
    title:'Topic, Mentor name',
    subTitle: 'Short description ipsum dolor sit amet, consectetur',
    description:'Short description ipsum dolor sit amet, consectetur',
    date:'20/11/2021',
    image:'shapes-sharp'
  }
];

public headerConfig: any = {
  menu: true,
  notification: true,
  headerColor: 'primary',
  label:'MENU'
};
  constructor(
    private http: HttpClient,
    private router : Router,
    private navController: NavController,
    private deeplinks: Deeplinks,
    private userService :UserService) {}
    
  ngOnInit() {
    this.getUser();
    this.deeplinks.routeWithNavController(this.navController, {
      '/sessions': '',
    }).subscribe((match) => {
      if(match.$link.path === '/sessions'){
        this.navController.navigateForward('/sessions', {
          queryParams:{
            type:'all-sessions'
          }
        });
      }
    }, (nomatch) => {
    });
  }
  eventAction(event){
    switch (event.type) {
      case 'cardSelect':
        this.router.navigate([`/${CommonRoutes.SESSIONS_DETAILS}`]);
    }
  }
  viewMore(){
    this.router.navigate([`/${CommonRoutes.SESSIONS}`]);
  }

  search(){
    this.router.navigate([`/${CommonRoutes.HOME_SEARCH}`]);
  }
  getUser() {
    this.userService.getUserValue().then(user =>{
      this.user=user;
    })
  }
}
