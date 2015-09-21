import { Subject } from 'rx';

export function initSubject(initValue) {
  const subject = new Subject();
  return {
    $: subject.startWith(initValue),
    onNext: subject.onNext.bind(subject)
  }
}
