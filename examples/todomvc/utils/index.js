import { BehaviorSubject } from 'rx';

export function initSubject(initValue) {
  const subject = new BehaviorSubject(initValue);
  return {
    $: subject,
    onNext: subject.onNext.bind(subject)
  }
}
