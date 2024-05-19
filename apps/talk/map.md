- Introduction and Problem Statement
  - Introduction
    - Quiz and Reveal
      - Identify content from websites vs. books
      - Reveal that both screenshots are from websites
    - Highlight similarity between web content and book layouts
  - Problem Statement
    - Observation of Similarity
      - Technical content websites often look the same
      - Static one-column layout is common but not always the best choice
- Principles and Examples
  - Principles
    - Form Follows Function
      - Architectural principle: shape defined by function
      - Presentation should follow content
    - Use the Medium
      - Leverage unique web features for content presentation
      - Videos should utilize video format, similarly web content should use web features
  - Examples
    - Blog Post about SVG Paths
      - Half the screen displays SVG output for real-time exploration
    - CSS Cascade Blog Post
      - Uses an actual cascade to represent CSS levels
    - Svelte Tutorial
      - Interactive playground combining explanations and examples
    - Shopify API Reference
      - Documentation showing endpoints with requests and responses
    - Stripe Checkout Tutorial
      - Step-by-step walkthrough of building a checkout page
    - SwiftUI Tutorials
      - Scroll-based tutorials explaining different concepts in SwiftUI
- Design Importance and Practical Example
  - Importance of Design
    - Investment by Companies
      - Companies like Stripe, Apple, and Shopify invest in great content websites
      - Better developer (reading) experience is the goal
    - Challenges
      - Building well-designed content websites is hard and requires investment
  - Practical Example: Recreating a Tutorial
    - Section Component Creation
      - Define props of the component
        - List of steps (array)
        - Title for each step
        - Content as ReactNode
        - Optional screenshot
        - Optional code block
      - Rendering the Component
        - Once content has the right structure, rendering is manageable
- Structuring Content with Markdown and MDX
  - Content Structuring with Markdown and MDX
    - Markdown and Component Rendering
      - Use markdown (or MDX) to define content
      - Render it using the Section component
    - Code Hike Library
      - Introduction to Code Hike for rendering specific layouts from markdown
      - Limitations and need for a generic way to structure markdown
  - New Approach: Annotated Markdown
    - Adding Structure to Markdown
      - New version of Code Hike adds special annotations to markdown elements
    - MDX Plugin Functionality
      - MDX compiles markdown files into JavaScript
      - Code Hike uses MDX plugins to transform annotations into structured content
- Parsing Markdown and Demo
  - Parsing Markdown as Data
    - Parsing and Extracting Data
      - Parse markdown files to extract structured data
      - Use markdown as a data source for rendering content dynamically
  - Demo
    - JSHeroes Website Example
      - Building the JSHeroes website using parsed markdown content
      - Show schema for content and how it's used to render sections
    - Error Handling and Tooling
      - Advantages of using headers for blocks: folding, outline navigation, breadcrumbs
- Advanced Features and Conclusion
  - Codeblock Specific Features
    - Code Annotations
      - Use annotations inside codeblocks for custom rendering components
      - Examples of regex-based and range-based annotations
    - Advanced Use Cases
      - Typescript compiler running at build time within components, leveraging React server components
  - Conclusion
    - Code Hike Status
      - Current alpha version, beta and stable versions coming soon
      - Provide links to documentation and Twitter for updates
    - Call to Action
      - Encourage using appropriate layouts that fit the content
      - Leverage modern web capabilities for better content presentation

voice:

- trevor
- Camilo

# A lot of static, a few interactive

- Quiz and Reveal
- Static screenshots
- Principles
  - Form Follows Function
  - Use the Medium
- Dynamic examples
  - Blog Post about SVG Paths
  - CSS Cascade Blog Post
  - Svelte Tutorial
  - Shopify API Reference
  - Stripe Checkout Tutorial
  - SwiftUI Tutorials
- Importance of Design
  - Investment by Companies
    - Companies like Stripe, Apple, and Shopify invest in great content websites
    - Better developer (reading) experience is the goal
  - Challenges
    - Building well-designed content websites is hard and requires investment

# Why is it hard?

- Recreating SwiftUI Tutorials
  - The UI component
  - The markdown content
  - the gap
  - the solution

# Code Hike

- Blocks syntax
- Building JSHeroes
- CodeSandbox demo
- Codeblocks
- RSC

# Conclusion

- Code Hike Status
- Conclusion
