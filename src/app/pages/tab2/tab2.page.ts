import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article } from 'src/app/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

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
}
