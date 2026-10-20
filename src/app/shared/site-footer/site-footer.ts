import { Component } from '@angular/core';
import { BiPipe } from '../lang/bi.pipe';
import { BrandLockup } from '../brand-lockup/brand-lockup';
import { FOOTER } from '../site-content';

/** Pied de page commun à toutes les pages du site. */
@Component({
  selector: 'app-site-footer',
  imports: [BiPipe, BrandLockup],
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.css',
})
export class SiteFooter {
  protected readonly footer = FOOTER;
  protected readonly year = new Date().getFullYear();
}
