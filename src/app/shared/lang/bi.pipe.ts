import { Pipe, PipeTransform, inject } from '@angular/core';
import { Bilingual, LangService } from './lang';

/** `{{ item.title | bi }}` : affiche le texte de la langue courante, recalculé si elle change. */
@Pipe({ name: 'bi', pure: false })
export class BiPipe implements PipeTransform {
  private readonly lang = inject(LangService);

  transform(value: Bilingual): string {
    return value[this.lang.current()];
  }
}
