import {AfterViewInit, Component} from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
declare var GLightbox: any;
declare var Isotope: any;
declare var imagesLoaded: any;

@Component({
  selector: 'app-portfolio',
  imports: [
    NgForOf,
  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements AfterViewInit{
  ngAfterViewInit(): void {
    GLightbox({
      selector: '.glightbox'
    });
    this.initIsotopeLayouts();
  }

  portfolioItems = [
    {
      title: 'Scheduler App',
      description: 'An open-source application developed as part of my Master’s thesis. It provides an efficient solution for academic institutions to manage and schedule teachers across subjects and time slots. The frontend is built with Angular, while the backend uses Spring Boot, ensuring a structured, scalable, and maintainable architecture.',
      images: [
        'assets/img/portfolio/scheduler.png',
        'assets/img/portfolio/scheduler-1.png',
        'assets/img/portfolio/scheduler-2.png',
        'assets/img/portfolio/scheduler-3.png',
      ],
      githubLinks: [
        {
          label: 'Frontend',
          url: 'https://github.com/RAFSoftLab/eSchedulerFront'
        },
        {
          label: 'Backend',
          url: 'https://github.com/RAFSoftLab/eSchedulerBackend'
        }
      ],
      gallery: 'portfolio-gallery-app'
    },
    {
      title: 'School Bell',
      description: 'A fully functional application designed to automate school bell schedules. Developed using Angular for the frontend and Spring Boot for the backend, it enables administrators to define custom ringing plans tailored to school requirements.',
      images: [
        'assets/img/portfolio/schoolbell-1.png',
        'assets/img/portfolio/schoolbell-2.png'
      ],
      githubLinks: [],
      gallery: 'portfolio-gallery-schoolbell'
    },
    {
      title: 'Family Business Website',
      description: 'A professional website built to support my family’s business while expanding my expertise with different technologies. Initially implemented using Vue.js and Node.js, the project was later re-engineered in Laravel to evaluate PHP-based solutions and improve maintainability.',
      images: [
        'assets/img/portfolio/family-1.png',
        'assets/img/portfolio/family-2.png',
        'assets/img/portfolio/family-3.png',
        'assets/img/portfolio/family-4.png',
        'assets/img/portfolio/family-5.png',
        'assets/img/portfolio/family-6.png',
        'assets/img/portfolio/family-7.png',
        'assets/img/portfolio/family-8.png'
      ],
      githubLinks: [
        {
          label: 'Laravel Version',
          url: 'https://github.com/IvanCickaIC/family-laravel-site'
        },
        {
          label: 'Node.js Version',
          url: 'https://github.com/IvanCickaIC/mareking-application-nodejs'
        }
      ],
      gallery: 'portfolio-gallery-family'
    }
  ];


  private initIsotopeLayouts(): void {
    const isotopeItems = document.querySelectorAll('.isotope-layout');

    isotopeItems.forEach((isotopeItem) => {
      const layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
      const filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
      const sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

      const container = isotopeItem.querySelector('.isotope-container');
      if (!container) return;

      imagesLoaded(container, () => {
        const iso = new Isotope(container, {
          itemSelector: '.isotope-item',
          layoutMode: layout,
          filter: filter,
          sortBy: sort
        });

        const filters = isotopeItem.querySelectorAll('.isotope-filters li');
        filters.forEach((filterBtn) => {
          filterBtn.addEventListener('click', function (this: HTMLElement) {
            isotopeItem.querySelector('.filter-active')?.classList.remove('filter-active');
            this.classList.add('filter-active');

            iso.arrange({
              filter: this.getAttribute('data-filter') ?? '*'
            });

            if (typeof (window as any).aosInit === 'function') {
              (window as any).aosInit();
            }
          });
        });

      });
    });
  }
}
