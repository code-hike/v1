function App() {
  // How to change `a` without creating a new component?
  const S = ({ b }) => <Sum a={1} b={b} />
  return (
    <>
      <ThirdParty SumComponent={S} />
    </>
  )
}

function ThirdParty({ SumComponent }) {
  return <SumComponent b={2} />
}

function Sum({ a, b }) {
  return <code>{a + b}</code>
}

function LineStack({ components, propList }) {}

function renderLine(props1, props2, Component) {
  const props = merge(props1, props2)
  return <Component {...props} />
}
