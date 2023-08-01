import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article } from 'src/app/interfaces';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll:any;

  public categorias: string[] = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology'
  ];
  public selectedCategory = this.categorias[0];

  public articles: Article[] = [];

  constructor(
    private newsService: NewsService,
  ) { }

  ngOnInit(): void {
    this.newsService.getTopHeadLinesByCategory(this.selectedCategory).subscribe(
      articles => {
        console.log(articles);
        this.articles = [...articles];
      }
    );
  }
  segmentChanged(event: any) {
    this.selectedCategory = event.detail.value;
    this.newsService.getTopHeadLinesByCategory(this.selectedCategory).subscribe(
      articles => {
        this.articles = [...articles];
      }
    );
  }

  loadData(){
    this.newsService.getTopHeadLinesByCategory(this.selectedCategory, true).subscribe(
      articles => {
        if (this.articles.length === articles.length) {
          this.infiniteScroll.disabled = true;
          return;
        }
        this.articles = articles;
        this.infiniteScroll.complete();
      }
    );
  }
}
