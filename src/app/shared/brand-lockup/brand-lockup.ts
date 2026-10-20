import { Component, input } from '@angular/core';
import { RohafyaMark } from '../rohafya-mark/rohafya-mark';

/**
 * Lockup « emblème + ROHAFYA HEALTH », utilisé dans l'en-tête et le pied de page de chaque page.
 * Mettre la classe `on-dark` sur l'hôte quand le fond est sombre (pied de page, section démo).
 */
@Component({
  selector: 'app-brand-lockup',
  imports: [RohafyaMark],
  template: `
    <app-rohafya-mark [size]="size()" [animated]="false" />
    <span class="brand__text"><span class="brand__name">ROHAFYA</span><span class="brand__suffix">HEALTH</span></span>
  `,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }
    .brand__text {
      display: inline-flex;
      flex-direction: column;
      line-height: 1.05;
      font-weight: 800;
      letter-spacing: 0.01em;
    }
    .brand__name {
      color: var(--color-primary);
      font-size: 1.05rem;
    }
    .brand__suffix {
      color: var(--rohafya-navy);
      font-size: 0.72rem;
      letter-spacing: 0.12em;
    }
    :host(.on-dark) .brand__name {
      color: var(--rohafya-green-400);
    }
    :host(.on-dark) .brand__suffix {
      color: #fff;
    }
  `,
})
export class BrandLockup {
  readonly size = input(34);
}
