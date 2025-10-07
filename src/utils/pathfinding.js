export function bfsRoute(start, target, W, H, shelvesSet) {
  const key = (x, y) => `${x},${y}`
  const inBounds = (x, y) => x >= 0 && y >= 0 && x < W && y < H
  const passable = (x, y) => !shelvesSet.has(key(x, y))
  const visited = new Set()
  const prev = new Map()
  const q = []
  q.push(start)
  visited.add(key(start.x, start.y))
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]
  while (q.length) {
    const cur = q.shift()
    if (cur.x === target.x && cur.y === target.y) {
      const path = []
      let ck = key(cur.x, cur.y)
      let node = cur
      while (prev.has(ck)) {
        path.unshift(node)
        node = prev.get(ck)
        ck = key(node.x, node.y)
      }
      return path
    }
    for (const [dx, dy] of dirs) {
      const nx = cur.x + dx
      const ny = cur.y + dy
      const nk = key(nx, ny)
      if (!inBounds(nx, ny)) continue
      if (!passable(nx, ny)) continue
      if (visited.has(nk)) continue
      visited.add(nk)
      prev.set(nk, cur)
      q.push({ x: nx, y: ny })
    }
  }
  return []
}
