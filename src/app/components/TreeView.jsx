import React from 'react';

const TreeView = ({ tableHtml }) => {
  const parseTableToTreeData = (html) => {

    return [];
  };

  const treeData = parseTableToTreeData(tableHtml);

  const renderTree = (nodes) => {
    return nodes.map(node => (
      <li key={node.id}>
        {node.label}
        {node.children && <ul>{renderTree(node.children)}</ul>}
      </li>
    ));
  };

  return (
    <div className="tree-view">
      <ul>
        {renderTree(treeData)}
      </ul>
    </div>
  );
};

export default TreeView;
