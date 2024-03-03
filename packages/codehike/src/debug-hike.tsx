"use client"

import React from "react"

export function DebugHike({ hike }: { hike: any }) {
  const tree = React.useMemo(() => hikeToTree(hike, "", "hike"), [hike])
  const [selected, setSelected] = React.useState<any>(tree)
  return (
    <div
      className="not-prose"
      style={{
        border: "1px solid #67e8f9",
        borderRadius: 6,
        margin: "8px auto",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#082f49",
        overflow: "hidden",
        maxWidth: 960,
        maxHeight: 800,
        minHeight: 400,
      }}
    >
      <div
        style={{
          textAlign: "center",
          color: "black",
          fontSize: 14,
          padding: "4px 0px",
          background: "#67e8f9",
        }}
      >
        <code>{`<Hike />`}</code> debug view
      </div>
      <div style={{ display: "flex", overflow: "hidden", flex: 1 }}>
        <div style={{ flex: 1, minWidth: 0, padding: 0, overflowY: "auto" }}>
          <Node
            node={hikeToTree(hike, "", "hike")}
            setSelected={setSelected}
            selected={selected}
          />
        </div>
        <div
          style={{
            flex: 1,
            minWidth: 0,
            padding: 4,
            backgroundColor: "white",
            color: "#082f49",
            overflowY: "auto",
            minHeight: "100%",
          }}
        >
          <Property name="path">{selected.path}</Property>
          <hr />
          {selected?.content}
        </div>
      </div>
    </div>
  )
}

function Property({ name, children }: any) {
  return (
    <div style={{ display: "flex", gap: 8, margin: "4px 0" }}>
      <pre
        style={{
          width: 100,
          minWidth: 100,
          textAlign: "right",
        }}
      >
        {name}
      </pre>
      <span
        style={{ background: "#e0f2fe", padding: "0px 4px", borderRadius: 4 }}
      >
        {children}
      </span>
    </div>
  )
}

const padding = 16

function Node({ node, setSelected, selected, level = 1 }: any) {
  const { name, children } = node

  const [hover, setHover] = React.useState(false)
  const isSelected = selected?.path == node.path

  return (
    <>
      <pre
        onClick={() => setSelected(node)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          paddingLeft: padding * level,
          cursor: "pointer",
          backgroundColor: isSelected
            ? "#0a6fa6"
            : hover
              ? "#0c4a6e"
              : "transparent",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
          color: "white",
        }}
      >
        {name}
      </pre>
      <div style={{ paddingLeft: 0 }}>
        {children.map((child: any, i: number) => (
          <Node
            node={child}
            setSelected={setSelected}
            selected={selected}
            level={level + 1}
            key={i}
          />
        ))}
      </div>
    </>
  )
}

function hikeToTree(section: any, path: string, name: string) {
  const { title, children, code = [], ...rest } = section

  const nodePath = path ? path + "." + name : name

  const kids: any[] = codeToChildren(code, nodePath)

  Object.keys(rest).forEach((key, i) => {
    kids.push(listToTree(rest[key], nodePath, key))
  })

  return {
    path: nodePath,
    name: name,
    children: kids,
    content: (
      <>
        <Property name="title">
          <pre>{title}</pre>
        </Property>
        <Property name="children">{children}</Property>
        {kids.map((kid, i) => (
          <Property name={kid.name} key={i}>
            <pre>{`[${kid.children.length} items]`}</pre>
          </Property>
        ))}
      </>
    ),
  }
}

function sectionToTree(section: any, path: string, name: string) {
  const { title, children, code = [], ...rest } = section

  const nodePath = path

  const kids: any[] = codeToChildren(code, nodePath)

  Object.keys(rest).forEach((key, i) => {
    kids.push(listToTree(rest[key], nodePath, key))
  })

  return {
    path: nodePath,
    name: name,
    children: kids,
    content: (
      <>
        <Property name="title">{title}</Property>
        <Property name="children">{children}</Property>
        {kids.map((kid, i) => (
          <Property name={kid.name} key={i}>
            <pre>{`[${kid.children.length} items]`}</pre>
          </Property>
        ))}
      </>
    ),
  }
}

function codeToChildren(codeblocks: any, path: string) {
  if (!codeblocks || codeblocks.length === 0) return []

  const kids = codeblocks.map((code: any, i: number) => ({
    path: `${path}.code[${i}]`,
    name: `${i}: ${code.lang} ${
      typeof code.meta === "string" ? code.meta : ""
    }`,
    children: [],
    content: (
      <>
        <Property name="lang">
          <pre>{code.lang}</pre>
        </Property>
        <Property name="meta">
          <pre>{typeof code.meta === "string" ? code.meta : ""}</pre>
        </Property>
        <Property name="value">
          <pre>{code.value}</pre>
        </Property>
      </>
    ),
  }))

  return [
    {
      path: path + ".code",
      name: "code",
      children: kids,
      content: (
        <>
          {codeblocks.map((code: any, i: number) => (
            <Property name={`[${i}]`} key={i}>
              <pre>{`${code.lang} ${
                typeof code.meta === "string" ? code.meta : ""
              }`}</pre>
            </Property>
          ))}
        </>
      ),
    },
  ]
}

function listToTree(list: any[], path: string, name: string) {
  const nodePath = path ? path + "." + name : name
  return {
    path: nodePath,
    name: name,
    children: list.map((item: any, i: number) =>
      sectionToTree(item, `${nodePath}[${i}]`, `${i}: ${item.title}`),
    ),
    content: (
      <>
        {list.map((item, i) => (
          <Property
            name={`[${i}]`}
            key={i}
          >{`!${name} ${item.title}`}</Property>
        ))}
      </>
    ),
  }
}
