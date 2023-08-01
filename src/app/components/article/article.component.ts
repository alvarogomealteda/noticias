import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Article } from 'src/app/interfaces';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent{
  @Input() article?:Article;
  @Input() index?:number;


  constructor(
    private actionSheetCtrl : ActionSheetController,
  ) { }

  async onOpenMenu(){
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: [
        {
          text: 'Compartir',
          icon: 'share-outline',
          handler: () => this.onShareArticle(),
        },
        {
          text: 'Favorito',
          icon: 'heart-outline',
          handler: () => this.onToggleFavourite(),
        },
      ],
    });

    await actionSheet.present();
  }

  onShareArticle(){
    console.log('share article');
  }

  onToggleFavourite(){
    console.log('toggle favourite');
  }
  openArticle(){
    window.open(this.article?.url, '_blank'); 
  }

}
