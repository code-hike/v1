```jsx !page page.jsx
import Content from "./content.md"
import { parse } from "codehike"

// !rainbow(1:2)
// extract structured content:
// !tt[/content/] foo
const content = parse(Content)

export function Page() {
  // !rainbow(3:5) 1
  return (
    <div>
      {/* render it as you want: */}
      <MyHeader {...content.intro} />
      <MyMain steps={content.steps} />
    </div>
  )
}
```

```jsx !content
content = {
  // !block(1:4) 1
  intro: {
    title: "The Roman Emperors",
    children: <p>The ...</p>,
  },
  steps: [
    // !block(1:9) 2
    {
      title: "Augustus",
      children: <p>The ...</p>,
      img: { src: "/one.png" },
      code: {
        lang: "js",
        value: "console.log(1)",
      },
    },
    // !block 3
    { title: "Nero", ... },
    // !block 4
    { title: "Trajan", ... },
  ],
}
```
