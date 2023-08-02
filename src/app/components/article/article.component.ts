import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Article } from 'src/app/interfaces';
import { StorageService } from '../../services/storage.service';

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
    private storageService: StorageService,
  ) { }

  async onOpenMenu(){

    const articleInFavourites = await this.storageService.articleInFavourites(this.article);

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: [
        {
          text: 'Compartir',
          icon: 'share-outline',
          handler: () => this.onShareArticle(),
        },
        {
          text: articleInFavourites? 'Quitar favorito':'Favorito',
          icon: articleInFavourites? 'heart':'heart-outline',
          handler: () => this.onToggleFavourite(),
        },
        {
          text: 'Cancelar',
          icon: 'close-outline',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }

  onShareArticle(){
    console.log('share article');
  }

  onToggleFavourite(){
    this.storageService.saveRemoveArticle(this.article);
  }
  openArticle(){
    window.open(this.article?.url, '_blank'); 
  }

}
