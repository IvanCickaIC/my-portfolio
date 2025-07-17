import {AfterViewInit, Component} from '@angular/core';
declare var Waypoint: any;
declare var PureCounter: any;


@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})

export class SkillsComponent implements AfterViewInit{
  ngAfterViewInit(): void {
    this.initSkillsAnimation();
    new PureCounter();
  }

  private initSkillsAnimation(): void {
    const skillsAnimation = document.querySelectorAll('.skills-animation');
    skillsAnimation.forEach((item) => {
      new Waypoint({
        element: item,
        offset: '80%',
        handler: function () {
          const progress = item.querySelectorAll('.progress .progress-bar');
          progress.forEach(el => {
            el.setAttribute('style', `width: ${el.getAttribute('aria-valuenow')}%`);
          });
        }
      });
    });
  }
}
