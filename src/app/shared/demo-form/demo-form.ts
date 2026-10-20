import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Injector, afterNextRender, inject, input, signal, viewChild } from '@angular/core';
import { FormField, FormRoot, email, form, maxLength, required, validate } from '@angular/forms/signals';
import { ButtonDirective } from 'primeng/button';
import { environment } from '../../../environments/environment';
import { extractErrorMessage } from '../api-error';
import { BiPipe } from '../lang/bi.pipe';
import { LangService } from '../lang/lang';
import { DEMO_KINDS } from '../site-content';

interface DemoModel {
  contact_name: string;
  job_title: string;
  establishment: string;
  city: string;
  phone: string;
  email: string;
  kind: string;
  software: string;
  pain_points: string;
  consent: boolean;
  /** Champ piège, invisible : rempli seulement par les robots. */
  website: string;
}

function emptyModel(): DemoModel {
  return {
    contact_name: '',
    job_title: '',
    establishment: '',
    city: '',
    phone: '',
    email: '',
    kind: '',
    software: '',
    pain_points: '',
    consent: false,
    website: '',
  };
}

type FieldName = keyof Omit<DemoModel, 'website'>;

const MESSAGES = {
  fieldsMissing: { fr: 'Vérifiez les champs signalés.', en: 'Please check the highlighted fields.' },
};

/**
 * Confirmation affichée après envoi. Pour le devis, le message est toujours le même texte local
 * (plutôt que celui renvoyé par l'API, rédigé pour la démonstration : « ... pour fixer la démonstration »,
 * qui ne convient pas à une demande de devis seule).
 */
const SENT_TEXT = {
  demo: {
    fr: 'Merci ! Votre demande est bien reçue.',
    en: 'Thank you! Your request has been received.',
  },
  devis: {
    fr: 'Merci ! Votre demande de devis est bien reçue : nous revenons vers vous avec les informations nécessaires.',
    en: 'Thank you! Your quote request has been received: we will get back to you with the information you need.',
  },
};

const SUBMIT_LABEL = {
  demo: { fr: 'Demander ma démonstration', en: 'Request my demo' },
  devis: { fr: 'Demander mon devis', en: 'Request my quote' },
};

/**
 * Demande de démonstration ou de devis pour ROHAFYA HEALTH (POST saas/public/trial-requests,
 * product=rohafya_health). Même formulaire, même point d'entrée que ROHAFYA (portail résultats),
 * distingué par le champ `product` ; seuls le libellé du bouton et le message de confirmation
 * changent selon `mode`.
 */
@Component({
  selector: 'app-demo-form',
  imports: [FormField, FormRoot, BiPipe, ButtonDirective],
  templateUrl: './demo-form.html',
  styleUrls: ['../buttons.css', './demo-form.css'],
})
export class DemoForm {
  readonly mode = input<'demo' | 'devis'>('demo');

  private readonly http = inject(HttpClient);
  private readonly lang = inject(LangService);
  private readonly injector = inject(Injector);
  private readonly confirmation = viewChild<ElementRef<HTMLElement>>('confirmation');
  private readonly errorBox = viewChild<ElementRef<HTMLElement>>('errorBox');

  protected readonly kinds = DEMO_KINDS;
  protected readonly submitLabel = SUBMIT_LABEL;

  protected readonly model = signal<DemoModel>(emptyModel());
  protected readonly demoForm = form(this.model, (f) => {
    required(f.contact_name, { message: 'Indiquez votre nom.' });
    required(f.establishment, { message: 'Indiquez le nom de l’établissement.' });
    required(f.city, { message: 'Indiquez la ville.' });
    required(f.phone, { message: 'Indiquez un numéro WhatsApp ou de téléphone.' });
    required(f.email, { message: 'Indiquez une adresse e-mail.' });
    email(f.email, { message: 'Adresse e-mail invalide.' });
    required(f.kind, { message: 'Choisissez le type d’établissement.' });
    maxLength(f.pain_points, 2000, { message: '2 000 caractères au plus.' });
    validate(f.consent, ({ value }) => (value() ? undefined : { kind: 'consent', message: 'Cochez cette case pour que nous puissions vous recontacter.' }));
  });

  protected readonly sending = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly sent = signal<string | null>(null);

  protected errorOf(name: FieldName): string | null {
    const state = this.demoForm[name]();
    if (!state.touched() || !state.invalid()) return null;
    return state.errors()[0]?.message ?? null;
  }

  protected submit(): void {
    if (this.sending()) return;
    const lang = this.lang.current();
    const mode = this.mode();
    if (this.demoForm().invalid()) {
      (Object.keys(this.model()) as (keyof DemoModel)[]).forEach((name) => this.demoForm[name]().markAsTouched());
      this.error.set(MESSAGES.fieldsMissing[lang]);
      afterNextRender(() => this.errorBox()?.nativeElement.focus(), { injector: this.injector });
      return;
    }
    this.sending.set(true);
    this.error.set(null);
    this.http
      .post<{ message: string }>(`${environment.apiUrl}saas/public/trial-requests`, {
        ...this.model(),
        product: 'rohafya_health',
        locale: lang,
      })
      .subscribe({
        next: (res) => {
          this.sending.set(false);
          this.sent.set(mode === 'devis' ? SENT_TEXT.devis[lang] : (res?.message ?? SENT_TEXT.demo[lang]));
          this.model.set(emptyModel());
          afterNextRender(() => this.confirmation()?.nativeElement.focus(), { injector: this.injector });
        },
        error: (err: unknown) => {
          this.sending.set(false);
          this.error.set(extractErrorMessage(err, lang));
          afterNextRender(() => this.errorBox()?.nativeElement.focus(), { injector: this.injector });
        },
      });
  }
}
