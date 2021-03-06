# Gravity Simulator

This repository is for my Gravity Simulator/Game thing.
Rendered upon a HTML5 Canvas Element, a miniature solar system can be created with planets and Suns.

## A demo, please

A demo can be seen [here](https://robbailey3.github.io/gravity-simulator/).

## What technologies are used.

- TypeScript
- Webpack
- SCSS
- Jasmine
- Karma

## How is Gravity Calculated

The following equation is used to calculate the force of Gravity on each of the objects within the simulator.

<!-- $$\vec{F}=G\frac{m_{1}m_{2}}{|r|^3}\vec{r}$$ -->

![Equation](http://www.sciweavers.org/upload/Tex2Img_1564498409/render.png)

## Why?

I have always enjoyed messing around with gravity and physics simulators. So I thought I would make one.

## What Next?

I would like to refine how the physics works, it currently feels like the tolerances are too low and most objects either fly into the sun or fly off into space. It is too difficult to maintain a stable orbit.

I would also like to add in more functionality to customise the environment and planets (e.g. colours, backgrounds, sun sizes etc.)
