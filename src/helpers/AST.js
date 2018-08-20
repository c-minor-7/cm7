export function findChildrenOfType (node, type) {
  return node.children.filter(child => child.type === type);
}

export function findFirstChildOfType (node, type) {
  return node.children.find(child => child.type === type);
}
