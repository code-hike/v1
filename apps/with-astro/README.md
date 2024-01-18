This is how astro manages children: https://docs.astro.build/en/core-concepts/framework-components/#passing-children-to-framework-components

---

basically, we can't have an array of children, that means that we can't iterate over a section children, so it's impossible to replace placeholders.

- is there an alternative way? instead of iterating over children, can we replace the placeholders otherwise?

---

We may be able to do everything else though:

- provide a recma plugin that add the `slot` prop
- and use the Hike component to transform the props filled by astro into the correct shape
