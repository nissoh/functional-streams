# functional-streams
Experiment in a 100% modular function::bind stream library

### Basic example
```js
// convenience
import {domEvent, delay, filter, map, subscribe} from 'fn-streams'
/* 100% modular
import {domEvent} from 'fn-streams/lib/create/domEvent'
import {delay} from 'fn-streams/lib/operator/delay'
import {filter} from 'fn-streams/lib/operator/filter'
import {map} from 'fn-streams/lib/operator/map'
import {subscribe} from 'fn-streams/lib/operator/subscribe'
*/

const click = domEvent('click') // pre-curried
const click$ = click(document.querySelector('#clickTarget'))

const blur = domEvent('blur')
const blur$ = blur(document.querySelector('#blurTarget'), true)

/* with funtion::bind syntax */
click$::merge(blur$)
  ::delay(10)
  ::filter(ev => ev.type !== 'blur')
  ::map(ev => ev.target.id)
  ::subscribe(id => console.log(id)) // clickTarget

/* they're just functions */
subscribe(id => console.log(id),
  map(ev => event.target.id,
    filter(ev => ev.type !== 'blur'
      delay(10, merge(click$, blur$))
    )
  )
) // clickTarget
```
