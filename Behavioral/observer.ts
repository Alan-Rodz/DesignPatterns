/**
 * The observer pattern allows objects to subscribe to
 * events that are broadcasted by another object
 */

import { Subject } from 'rxjs';

const news = new Subject();
const tv1 = news.subscribe(v => console.log(v + ' via TVCompany1'));
const tv2 = news.subscribe(v => console.log(v + ' via TVCompany2'));
const tv3 = news.subscribe(v => console.log(v + ' via TVCompany3'));

news.next('Breaking news: ');
news.next('Something happened!');