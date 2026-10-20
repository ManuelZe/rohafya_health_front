import { Component, DestroyRef, afterNextRender, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PIcon } from '@primeicons/angular/p-icon';
import { Card } from 'primeng/card';
import { SeoService } from '../shared/seo/seo.service';
import { LangService } from '../shared/lang/lang';
import { BiPipe } from '../shared/lang/bi.pipe';
import { BrandLockup } from '../shared/brand-lockup/brand-lockup';
import { Reveal } from '../shared/reveal';
import { DemoForm } from '../shared/demo-form/demo-form';
import { SiteFooter } from '../shared/site-footer/site-footer';
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from '../shared/site-content';
import { homeSeo } from './home.seo';
import { AUDIENCES, COMPARE_ROWS, DEMO_ANCHOR, FAQ, HERO, NAV_LINKS, ONBOARDING, PILLARS, TRUST_POINTS } from './home.content';

/** Hauteur de défilement à partir de laquelle l'en-tête prend son ombre. */
const SCROLLED_AT = 12;

/**
 * Site de présentation de ROHAFYA HEALTH, pour les responsables d'établissements de santé
 * (ce sont eux qui décident). Une seule page, servie en français (/) et en anglais (/en) :
 * la langue est fixée par la route (voir app.routes.ts, shared/lang/lang.resolver.ts).
 */
@Component({
  selector: 'app-home',
  imports: [RouterLink, PIcon, BiPipe, BrandLockup, Reveal, DemoForm, Card, SiteFooter],
  templateUrl: './home.html',
  styleUrls: ['../shared/buttons.css', './home.css'],
})
export class Home {
  private readonly seo = inject(SeoService);
  protected readonly lang = inject(LangService);

  protected readonly navLinks = NAV_LINKS;
  protected readonly demoAnchor = DEMO_ANCHOR;
  protected readonly hero = HERO;
  protected readonly audiences = AUDIENCES;
  protected readonly pillars = PILLARS;
  protected readonly compareRows = COMPARE_ROWS;
  protected readonly onboarding = ONBOARDING;
  protected readonly trustPoints = TRUST_POINTS;
  protected readonly faq = FAQ;
  protected readonly whatsappNumber = WHATSAPP_NUMBER;
  protected readonly whatsappDisplay = WHATSAPP_DISPLAY;

  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);
  protected readonly otherLangPath = computed(() => (this.lang.current() === 'fr' ? '/en' : '/'));
  protected readonly devisPath = computed(() => (this.lang.current() === 'fr' ? '/devis' : '/en/devis'));

  constructor() {
    this.seo.apply(homeSeo(this.lang.current()));

    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const view = globalThis.window;
      if (!view) return;
      const onScroll = () => this.scrolled.set(view.scrollY > SCROLLED_AT);
      onScroll();
      view.addEventListener('scroll', onScroll, { passive: true });
      destroyRef.onDestroy(() => view.removeEventListener('scroll', onScroll));
    });
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
