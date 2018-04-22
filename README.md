# ionic-marquee
[![Dependency Status](https://david-dm.org/pengkobe/ionic-marquee.svg)](https://david-dm.org/pengkobe/ionic-marquee)
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][downloads-url] [![MIT License][license-image]][license-url]
[![NPM](https://nodei.co/npm/ionic-marquee.png?downloads=true&stars=true)](https://nodei.co/npm/ionic-marquee/)  

marquee effect for ionic

## Install

`npm install ionic-marquee --save`

## Usage

import the module:

```typescript
...
import {IonMarqueeModule} from "ionic-marquee";

@NgModule({
 ...
 imports: [
   IonMarqueeModule,
   ...
 ],
 ...
})
export class AppModule {}
```

## Example

### Horizontal Animation

```html
<ion-marquee [speed]="30" >
    Text you want to apply the animation. attention: if the text not long enough it won't be work!
</ion-marquee>
```

### Vertical Animation

```typescript
export class YourPage {
  direction = 'vertical';
  constructor(public navCtrl: NavController) {}
}
```

```html
<ion-marquee [speed]="30" [direction]="direction" style="height:122px">
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>3</li>
    <li>5</li>
    <li>6</li>
  </ul>
</ion-marquee>
```

## API

### Input

| Name      | Type   | Description                                                                      |
| --------- | ------ | -------------------------------------------------------------------------------- |
| speed     | Number | the animation speed                                                              |
| direction | String | the animation direction. default is `horizontal`. you can also set to `vertical` |

## Lincese

MIT@[yipeng.info](https://yipeng.info)


[npm-url]: https://www.npmjs.com/package/ionic-marquee
[npm-image]: https://img.shields.io/npm/v/ionic-marquee.svg

[downloads-image]: https://img.shields.io/npm/dm/ionic-marquee.svg
[downloads-url]: http://badge.fury.io/js/ionic-marquee

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE
