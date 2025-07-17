import {AfterViewInit, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit {
  headerShown = false;


  @ViewChild('header') headerRef!: ElementRef;
  @ViewChild('headerToggleBtn') headerToggleBtnRef!: ElementRef;

  constructor(private renderer: Renderer2, private host: ElementRef) {}

  toggleHeader() {
    this.headerShown = !this.headerShown;
  }

  get toggleIconClass() {
    return this.headerShown ? 'bi-x' : 'bi-list';
  }

  ngAfterViewInit() {
    // Hide mobile nav on same-page/hash links
    const navLinks = this.host.nativeElement.querySelectorAll('#navmenu a');
    navLinks.forEach((link: HTMLAnchorElement) => {
      this.renderer.listen(link, 'click', () => {
        if (this.headerShown) {
          this.toggleHeader();
        }
      });
    });

    // Toggle mobile nav dropdowns
    const dropdownToggles = this.host.nativeElement.querySelectorAll('.navmenu .toggle-dropdown');
    dropdownToggles.forEach((toggle: HTMLElement) => {
      this.renderer.listen(toggle, 'click', (e: Event) => {
        e.preventDefault();
        const parent = toggle.parentElement;
        const sibling = parent?.nextElementSibling;
        if (parent) {
          if (parent.classList.contains('active')) {
            this.renderer.removeClass(parent, 'active');
          } else {
            this.renderer.addClass(parent, 'active');
          }
        }

        if (sibling) {
          if (sibling.classList.contains('dropdown-active')) {
            this.renderer.removeClass(sibling, 'dropdown-active');
          } else {
            this.renderer.addClass(sibling, 'dropdown-active');
          }
        }
        e.stopImmediatePropagation();
      });
    });
    const navMenuLinks: NodeListOf<HTMLAnchorElement> = this.host.nativeElement.querySelectorAll('.navmenu a');
    this.setupScrollSpy(navMenuLinks);
  }

  private setupScrollSpy(navMenuLinks: NodeListOf<HTMLAnchorElement>) {
    const onScroll = () => {
      const scrollPos = window.scrollY + 200;
      navMenuLinks.forEach((link) => {
        if (!link.hash) return;
        const section = document.querySelector(link.hash);
        if (!section) return;

        const top = (section as HTMLElement).offsetTop;
        const bottom = top + (section as HTMLElement).offsetHeight;

        if (scrollPos >= top && scrollPos <= bottom) {
          navMenuLinks.forEach((el) => el.classList.remove('active'));
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    };

    window.addEventListener('load', onScroll);
    document.addEventListener('scroll', onScroll);
  }

}
