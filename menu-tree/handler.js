export function getTrees (list, parentId, idKey, pidKey, parentNameKey) {
  let items = {};
  // 获取每个节点的直属子节点，*记住是直属，不是所有子节点
  for (let i = 0; i < list.length; i++) {
    let key = list[i][pidKey];
    if (items[key]) {
      items[key].push(list[i]);
    } else {
      items[key] = [];
      items[key].push(list[i]);
    }
  }
  return formatTree(items, parentId, idKey, parentNameKey);
}

function formatTree (items, parentId, idKey, parentNameKey) {
  let result = [];
  if (!items[parentId]) {
    return result;
  }
  for (let t of items[parentId]) {
    let sub = formatTree(items, t[idKey], idKey);
    if (sub.length > 0) {
      sub.forEach((i) => {
        i.parentName = t[parentNameKey];
      });
      t.children = sub;
    }
    result.push(t);
  }
  return result;
};