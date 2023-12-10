// 定义一个函数，用于查询 JSON 数据中 node_name 包含某个关键字的节点对象
// Define a function to query the node objects whose node_name contains a certain keyword in the JSON data
export function queryNode(data, keyword) {
  // 解析 JSON 字符串为 JavaScript 对象
  // Parse the JSON string into a JavaScript object
  let obj = data;
  // 定义一个空数组，用于存储结果
  // Define an empty array to store the results
  let result = {};
  // 遍历对象中的每个节点
  // Iterate over each node in the object
  for (let node of obj) {
    // 判断节点的 node_name 是否包含关键字，如果是，就把节点对象添加到结果数组中
    // Check if the node's node_name contains the keyword, if so, add the node object to the result array
    // if (node.node_name.includes(keyword)) {
    //   result.push(node);
    // }
    // 遍历节点的 sub_node 数组中的每个子节点
    // Iterate over each sub-node in the node's sub_node array
    for (let subNode of node.sub_node) {
      // 判断子节点的 node_name 是否包含关键字，如果是，就把子节点对象添加到结果数组中
      // Check if the sub-node's node_name contains the keyword, if so, add the sub-node object to the result array
      if (subNode.node_name.includes(keyword)) {
        result= subNode;
		break;
      }
    }
  }
  // 返回结果
  return result;
}