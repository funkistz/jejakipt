import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SearchPage } from '../search/search';
import { NewsPage } from '../news/news';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  homePage: any;
  searchPage: any;
  newsPage: any;

  constructor () {
    this.homePage = HomePage;
    this.searchPage = SearchPage;
    this.newsPage = NewsPage;
  }

}
