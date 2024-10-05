import { Component, OnInit } from '@angular/core';
import { PostPreviewComponent } from './components/post-preview/post-preview.component';
import { HeaderData, HeaderService } from '../../services/header.services';
import { PostPreview } from '../../types/post-preview.type';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import matter from 'gray-matter-browser';
import { error } from 'console';

type HomeData = {
  posts: Array<string>
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PostPreviewComponent, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private uiData: HeaderData = {
    title: 'Blog de Yireth Saray',
    subtitle: 'Bienvenidos a todos, no se aburran aquí, besos',
    thumbnail: 'https://concepto.de/wp-content/uploads/2015/03/paisaje-800x409.jpg'
  }

  posts: Array<PostPreview> = []

  constructor(private headerService: HeaderService, private http: HttpClient) { }

  ngOnInit() {
    const pathHomeData = 'assets/home/home-data.json'
    this.headerService.uiData.set(this.uiData)
    this.http.get<HomeData>(pathHomeData).subscribe({
      next: data => {
        const requests = data.posts.map(slug =>
          this.http.get(
            `assets/posts/${slug}/post.md`, { responseType: 'text' }
          ))
        forkJoin(requests).subscribe({
          next: allPostDetails => {
            this.posts = allPostDetails.map(markdownFile => {
              const {
                title = '',
                subtitle = '',
                slug = '',
                author = '',
                publicationDate = ''
              } = matter(markdownFile).data;
              return {
                title,
                subtitle,
                slug,
                author,
                publicationDate
              }
            })
          },
          error: error => console.error(error)
        })
      },
      error: error => console.error(error)
    })
  }
}