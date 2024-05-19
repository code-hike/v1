Let's start with a quiz.

We have two screenshots, which one do you think is from a website with all the navigation removed, and which one is from the page of a book, a physical book?

I'll reveal the answer in 5 seconds.
<break time="3.0s" />

They are both from websites.

But to be fair they could be also from books.

---

These are all screenshots of technical content websites, we are only showing the main content area of each website.

And this is a random sample of blogs, tutorials, documentation.

They are from different ecosystems, using different technologies. Each of these explain a different concept.

Yet, they all look the same. They all use the same static one-column layout. Same layout as most books.

There's nothing wrong either with books or with this layout. But this doesn't mean that this is always the best choice.

---

There's this principle in architecture that says: form follows function. It means, I think, that the shape of a building should be defined by its function. You start with the function, and then you design the form.

If we apply this to content websites, we can say that: presentation follows content. We start with the content, the thing we want to communicate, and then we think about how to present it. Different content may benefit from different presentations.

Another principle I have is "use the medium". For example, if you create videos, you wouldn't make a video that emulates a book, you will take advantage of the video format to comunicate the content. In the same way, if you are building a content website, you should take advantage of the special features that the web provides.

Let me show you some examples that follow these principles...

---

Here's an example of a blog post about how to use SVG paths.

Half of the screen shows the SVG output.

As a reader, you can explore each concept at your own pace, seeing how different instructions affect the output in real-time.

---

This one is another blog post, about CSS cascade.

It uses an actual cascade to represent the different levels of CSS, which is an awesome example of presentation following content.

---

Here's a tutorial from Svelte.

It teaches you Svelte syntax by combining explanations and examples with an interactive playground where you can explore what you are learning.

It's really cool.

---

Here's the API reference documentation from Shopify.

It shows different endpoints along with their requests and responses.

For each endpoint, you can view various examples directly within the documentation.

---

This one is a tutorial from Stripe, showing an example of how to build a checkout page.

And it's a walkthrough that you can scroll step by step to see how the page is built.

---

These are the SwiftUI tutorials from apple

Similar to the Stripe tutorial, using the scroll to explain different concepts.

---

Some of these examples are from companies like Stripe, Apple, and Shopify, companies that really care about their developer experience.

and here developer experience means reading experience, the developers are the ones consuming the content from these websites.

so, companies that care about their developer experience, they invest in this type of design

These companies invest in great content websites because they know it matters.

And it is an investment, because it's not easy, it's harder than just using the same layout for everything.

---

But, why is it hard? let's try to find out what's the real pain point here.

Let's recreate this tutorial from swiftui and see how far we can get.

---

We have several of these sections with steps, so let's try to build a generic Section component, for each of these.

---

I'm using react and typescript here.

Let's start with the props of the component.

We know we need a list of steps, so that's an array.

---

Each step has a title, so let's add that to the type.

---

Then we have a block of content for each step.

That can be any markdown, so we can abstract it as ReactNode.

---

Some steps have a screenshot, so we add it as an optional prop.

---

And some steps display code, so we add that as an optional prop too.

Don't worry about the types of `Image` and `Code`, we'll leave that for later.

---

Once we have the content in the right shape, rendering it is not super hard. It's not trivial either, but if you known how to use intersection observers and sticky positioning, you can do it.

So, imagine we have a component to handle the intersection observer on the left and another one to handle the sticky element on the right.

The key here is that once the content has the right structure, it's easier to manipulate and display in the way we want.

---

Now let's talk about the content.

We want to use markdown, of course. Or MDX, same thing.

---

For the first step we have the header and some text.

---

Then we have an image, the screenshot.

---

Second step. Again a header and two paragraphs.

---

After that we have a codeblock.

---

Then we have step 3, with a header, some text, and another codeblock.

---

So, we have our content in markdown and a component to render it.

But that component needs the content in this specific shape that's defined here.

In my opinion, this is the main reason why building this kind of content website is hard, markdown alone doesn't provide enough structure. Not because the UIs are hard to build, but because there is a gap between the content and the UI.

For the last 5 years, I've been working on this space. I've built a couple of tools, I maintain an open source library called Code Hike. This library gives you a couple of components to render specific layouts from markdown. But it's not really flexible, if you need something slightly different you depend on CSS.

It took me a while to realize that the real problem I wanted to solve is a generic way to give structure to markdown, so you can use that structured content to render it in any way you want.

What's the less invasive way we can give enough structure to the content?

---

So this is my approach for the next version of Code Hike:

The idea is to add special annotations to some markdown elements, so then we can compile them into the structure we need.

It may look a bit ugly at first, but you get used to it.

Let me quickly show you how it works. This isn't a full tutorial, I'll share a link to the docs later for anyone interested.

---

Code Hike is mostly an MDX plugin.

And MDX is something that runs at build time and compile markdown files into javascript.

---

For example this is the output that we get from the MDX file on the left.

We have all the markdown nodes transformed into JSX.

---

Then, from your code, when you want to render that MDXContent, you can import the mdx file and you will be importing that generated component, so you can render it where you want.

---

MDX has plugins, maybe you've heard about remark or rehype plugins. With plugins we can transform some stuff during the compilation to change the output.

And that's what Code Hike does.

---

In this example, when we add the Code Hike plugin, it will find that `!moria` annotation and transform it into a prop of `MyComponent`.

This is what I call a block. And it has a title, which is the rest of the header after the annotation. And it has children, which are all the nodes that follow the header until the next block.

---

We can also have lists of blocks. Here the breakfasts annotation, starts with two exclamation marks instead of one, and this tells Code Hike that this should be a list of blocks. So MyComponent will receive an array of breakfasts.

---

We can also nest blocks.

Here the recipe block is deeper than the breakfasts block, right? we have a level 2 header for breakfast and then the recipe is a level 3 header.

So, this tells Code Hike that the recipe block is a child of the breakfast block.

And combining lists and nesting, makes it possible to represent complex structures.

---

Besides blocks, we can annotate other nodes.

If we put the annotation at the start of a paragraph, it becomes a string prop.

We can also use it with images, so MyComponent will receive the alt and url.

And we can use it with code blocks, and here the component will have access to the language, meta, and code itself. There's also an option to syntax highlight the code, so we could have more stuff here but we'll leave that for later.

So this is the code generated by MDX and Code Hike. If we now go the implementation of MyComponent..

---

Here we can define a schema for the props of MyComponent.

This gives us two advantages:

One is autocompletion and all the editor tooling that comes with TypeScript.

The other advantage is that we are validating that the markdown follows the structure we expect.

For example, in this case we made the cover image optional, so we could have it or not. But the codeblock is required, if we miss it, we'll get an error.

---

So far we've been using the annotated markdown inside a component, but we can also parse the markdown file and extract the data directly.

Instead of parsing the props, we're parsing the actual import of the markdown file.

So why is this useful?

Well, first we can use plain markdown, I mean, no JSX.

And second, we are not limited to a component. You can use the markdown as data source. For example, in a blog, you can add a block to each post with an excerpt and then when you are listing all the posts you show the excerpt for each one.

But let's see a real demo of all this.

---

I have a markdown file here, with some speakers from this conference.

We have a block for each speaker, with the speaker's name, some details, time of the talk, picture, talk title.

---

So let's say we want to create the JSHeroes website.

---

We start with the schema of the content.

In this case is an array of speakers, each with a picture, time, and talk.

---

Now we can use this `parseRoot` function to extract the speakers array from the markdown file.

---

And now that we have the speakers in the shape we want, we can for example render the speakers section, with picture and name of each speaker.

Here it uses `speaker.title` but it would make more sense to have `speaker.name`, title is the default name for the content of the header of the block. Maybe I can show you later how to change it.

---

We also want agenda section, with time, picture, title of the talk.

---

Now we magically add a lot of tailwind classes to make it look good.

---

And I have all this in this codesandbox.

https://codesandbox.io/p/devbox/jsheroes-2024-grn3jr?file=%2Fapp%2Fcontent.md

And this is how it looks.

---

Here I also have a dialog trigger that we can use to show the speaker details.

And we can do the same in the agenda section.

---

Here we have the schema, we should see all the right types for the speaker arrays.

And also, if I go to the content and let's say I remove the picture from Eva. we should see an error, and it says that in the block of Eva Ferreira the picture is missing.

---

Another cool thing, since we are using markdown headers for the blocks, we can take advantage of a lot of existing tooling.

for example

- we can fold the blocks,
- we can use the outline to navigate the content
- we can even use this thing, the breadcrumbs,

That's the demo.

---

There's also some codeblock specific features that I don’t have time to cover in detail, but let me show you some quick examples.

We can have annotations inside codeblocks, and the we can define custom component to handle those annotations.

So the annotations are comments inside the codeblock, and here for example we use a regular expression to match part of the next line, and then we have a specific component that handles this annotation and renders this thing.

And this are custom components, they are not part of codehike. But of course, this examples are copypastable, so you can go to the implementation and copy the component.

---

Here's another one, we are using a range instead of a regex.

We have more stuff

This one I use a lot, it has a more complex regex, that matches all the classNames so we can hide them until clicked. Very useful if your examples use tailwind.

This one is interesting, because we are using a component that has blocks, and then from inside the codeblock we use those blocks and show them as tooltips.

---

This one with typescript is also interesting.

If we go to the implementation, we see that we are taking the code from the codeblock and running the typescript compiler, inside the component. And then after that we also run syntax highlighting.

This is because, if you use a framework that supports react server components, every component that we saw, by default is a server component, and server here means build server, so any code we put there is resolved at build time. And that allows some really cool use cases.

Ok, back to the slides.

---

Code Hike v1, currently in alpha, there's a beta version coming really soon. and I expect to have a stable version in the following weeks.

That's the docs if you want to check it out.

That's my twitter if you want to stay updated.

---

So, to wrap up.

Next time you're building a content website, instead of defaulting to the same static layout, find something that fits the content you are trying to communicate. Use the medium. If you are building for the web, use the power of the modern web. It may be harder than the default static layout, but we have the tools and we have the talent.

Let's make the web better JSHeroes.

Thank you.
