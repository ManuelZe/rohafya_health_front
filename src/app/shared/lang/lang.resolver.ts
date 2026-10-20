import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Lang, LangService } from './lang';

/** Langue de la page, fixée par l'adresse : / en français, /en en anglais (voir app.routes.ts). */
export function langResolver(lang: Lang): ResolveFn<Lang> {
  return () => {
    inject(LangService).set(lang);
    return lang;
  };
}
