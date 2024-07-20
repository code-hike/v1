<!-- prettier-ignore -->
````md !content content.md
<!-- !block(1:3) 0 -->
## !intro hello

lorem ipsum dolor sit amet

<!-- !block(1:9) 1 -->
## !!steps one

consectetur adipiscing elit

![!img cover](/one.png)

```js !

```

<!-- !block(1:3) 2 -->
## !!steps two

sed do eiusmod tempor 
````

```jsx !page page.jsx
import Content from "./content.md"
import { parse } from "codehike"

// !tooltip[/intro/] foo
// !rainbow 4
const { intro, steps } = parse(Content)

export function Page() {
  return (
    <div>
      <Hero {...intro} />
      <MyLayout steps={steps} />
    </div>
  )
}
```
