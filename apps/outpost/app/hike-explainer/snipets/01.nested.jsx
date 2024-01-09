<MyLayout
  data={{
    children: <p>zero</p>,
    steps: [
      {
        query: "one 1",
        children: <p>uno</p>,
        steps: [
          {
            query: "one and a half",
            children: <p>uno y medio</p>
          }
        ]
      },
      {...}
    ]
  }}
/>