import {AfterViewInit, Component} from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {HeroComponent} from './components/hero/hero.component';
import {AboutComponent} from './components/about/about.component';
import {SkillsComponent} from './components/skills/skills.component';
import {ResumeComponent} from './components/resume/resume.component';
import {PortfolioComponent} from './components/portfolio/portfolio.component';
import {ContactComponent} from './components/contact/contact.component';
import {FooterComponent} from './components/footer/footer.component';

declare var AOS: any;


@Component({
  selector: 'app-root',
  imports: [HeaderComponent, HeroComponent, AboutComponent, SkillsComponent, ResumeComponent, PortfolioComponent, ContactComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent implements AfterViewInit{
  title = 'moj-portfolio';

  ngAfterViewInit(): void {
    this.initAOS();
    this.removePreloader();
    this.initScrollTop();
  }

  private initAOS() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }


  private removePreloader(): void {
    const preloader = document.querySelector('#preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        preloader.remove();
      });
    }
  }

  private initScrollTop(): void {
    const scrollTop = document.querySelector('.scroll-top');

    const toggleScrollTop = () => {
      if (scrollTop) {
        scrollTop.classList.toggle('active', window.scrollY > 100);
      }
    };

    if (scrollTop) {
      scrollTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      });
    }

    window.addEventListener('load', toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);
  }
}
