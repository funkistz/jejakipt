import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { News } from '../../providers/api/news';

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  news = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public newsApi: News,
  ) {

    this.newsApi.getData(null).subscribe(data =>{
      this.news = data.json();
    });

  }

  refresh(refresher){
    this.newsApi.getData(null).subscribe(data =>{
      this.news = data.json();
      refresher.complete();
    });
  }


}
