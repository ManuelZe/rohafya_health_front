import { TestBed } from '@angular/core/testing';
import { BiPipe } from './bi.pipe';
import { LangService } from './lang';

describe('BiPipe', () => {
  let lang: LangService;
  let pipe: BiPipe;

  const texte = { fr: 'Demander une démonstration', en: 'Request a demo' };

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [BiPipe] });
    lang = TestBed.inject(LangService);
    pipe = TestBed.inject(BiPipe);
  });

  it('affiche le texte français par défaut', () => {
    expect(pipe.transform(texte)).toBe('Demander une démonstration');
  });

  it('suit le changement de langue', () => {
    lang.set('en');
    expect(pipe.transform(texte)).toBe('Request a demo');
  });
});
