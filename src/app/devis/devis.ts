import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PIcon } from '@primeicons/angular/p-icon';
import { Card } from 'primeng/card';
import { SeoService } from '../shared/seo/seo.service';
import { LangService } from '../shared/lang/lang';
import { BiPipe } from '../shared/lang/bi.pipe';
import { BrandLockup } from '../shared/brand-lockup/brand-lockup';
import { DemoForm } from '../shared/demo-form/demo-form';
import { SiteFooter } from '../shared/site-footer/site-footer';
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from '../shared/site-content';
import { devisSeo } from './devis.seo';
import { DEVIS_HERO, DEVIS_NOTE, PRICING_FACTORS } from './devis.content';

/**
 * Page « Demander un devis » (/devis, /en/devis) : distincte de la demande de démonstration,
 * pour les visiteurs qui veulent d'abord un chiffrage. Même formulaire que la démo
 * (shared/demo-form), en mode `devis` pour le libellé du bouton et le message de confirmation.
 */
@Component({
  selector: 'app-devis',
  imports: [RouterLink, PIcon, BiPipe, BrandLockup, Card, DemoForm, SiteFooter],
  templateUrl: './devis.html',
  styleUrls: ['../shared/buttons.css', './devis.css'],
})
export class Devis {
  private readonly seo = inject(SeoService);
  protected readonly lang = inject(LangService);

  protected readonly hero = DEVIS_HERO;
  protected readonly factors = PRICING_FACTORS;
  protected readonly note = DEVIS_NOTE;
  protected readonly whatsappNumber = WHATSAPP_NUMBER;
  protected readonly whatsappDisplay = WHATSAPP_DISPLAY;

  protected readonly homePath = computed(() => (this.lang.current() === 'fr' ? '/' : '/en'));
  protected readonly otherLangPath = computed(() => (this.lang.current() === 'fr' ? '/en/devis' : '/devis'));

  constructor() {
    this.seo.apply(devisSeo(this.lang.current()));
  }
}
