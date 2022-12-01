# Next Presentation

Next presentation is a simple but highly customizable and flexible presentation
framework based on react, nextjs, javscript and mdx. It allows you to quickly
create presentations using markdown format, create your own theme and add custom
components via jsx.

## Features

-   Customizable presenter view
-   Slides in markdown with jsx components support
-   Customizable theme

For a live demo, check out
[next-presentation](https://next-presentation.vercel.app/)!

## Getting Started

Clone or fork this repository and run the following commands:

```bash
npm install
#or with yarn
yarn install
```

You can than run the dev server to start working on your presentation:

```bash
npm run dev:watch
#or with yarn
yarn dev:watch
```

This automatically watches for changes in the `./slides` folder and reloads the
browser if any changes are detected.

## Creating Slides

Slides can be added to the `./slides` folder. Each slide is a markdown file with
a `.mdx` extension. The slides should be numbered in ascending order e.g.
`001.mdx`, `002.mdx`, `003.mdx` etc. The slides are rendered in the order they
are numbered.

Slides can hold metadata in the frontmatter section (this is completely optional
). This is parsed and used to generate the navigation and the presenter view.
You can copy the following to get started or look at the example slides in the
`./slides` folder.

```mdx
---
layout: default
section: Introduction
---

# My first slide using next-presentation

-   Customizable [presenter](/presenter) view
-   Slides in markdown with jsx components support
-   Customizable theme

<Navbar />
```

You can also add notes to your slide using the `notes` tag in the markdown file.
All occurences of the `notes` tag will be rendered in the presenter view. (WIP)

```mdx
<Notes>This is a note</Notes>
```

## Presenter View

The presenter view is available in the `localhost:3000/presenter` route and can
be used if presenting your presentation.

Just open another tab in your browser and navigate to the presenter view. The
presenter view will automatically synchronies with the main presentation window!

In the default layout this shows notes, the current time, the current slide
number and allows you to time your presentation slide number. It should also
scale the preview to the size of your main window.

## Adding your own components

Sometimes own custom components are such as animations or other interactive
elements are wanted. Any jsx component can be added to the slides. You can add
your own components to the `./components` folder. You can then import them in
your slides and use them like any other jsx component.

```mdx
import { MyComponent } from '../components/MyComponent';

<MyComponent />
```

You can also add your component to the default layout and use it in all slides
without having to import it in each slide.

```jsx
// ./components/slides/Layouts.tsx
import NavBar from './NavBar';
import { MyComponent } from '../MyComponent';
export const Layouts = {
    default: {
        Navbar: (props) => <NavBar {...props} />,
        // You can add your component here
        MyComponent: (props) => <MyComponent {...props} />
    }
};
```

```jsx
// ./slides/001.mdx
<MyComponent />
```

## Creating your own theme or customizing the default theme

The default theme is located in the `./themes/default` folder. You can customize
the default theme by editing the files in this folder. You can also create your
own theme by create a new folder in the `./themes` folder.

You can change the theme by changing the `@theme` variable in the
`./tsconfig.json` file. E.g. we can change to the foo theme:

```json
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@theme": ["themes/foo"]
        }
    }
}
```

This project uses sass for styling. If you are not familiar with sass you can
get a overview [here](https://sass-lang.com/guide). As it is a css superset you
can use all css features you know and love.
