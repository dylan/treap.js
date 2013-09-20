var Node, Treap;

Node = (function() {
  function Node(key, value, priority) {
    this.priority = priority;
    this.key = key;
    this.value = value;
    this.right = this.left = void 0;
  }

  return Node;

})();

Treap = (function() {
  function Treap(comparator) {
    this.comparator = void 0;
    this.root = void 0;
    this.count = 0;
    if (!comparator) {
      this.comparator = function(key1, key2) {
        return key1 < key2;
      };
    }
    return this;
  }

  Treap.prototype._rand = function() {
    return Math.random();
  };

  Treap.prototype.reset = function() {
    this.root = void 0;
    return this.count = 0;
  };

  Treap.prototype.get = function(key) {
    return this._get(this.root, key);
  };

  Treap.prototype._get = function(node, key) {
    if (node == null) {
      return void 0;
    }
    if (this.comparator(key, node.key)) {
      return this._get(node.left, key);
    }
    if (this.comparator(node.key, key)) {
      return this._get(node.right, key);
    }
    return node.value;
  };

  Treap.prototype.insert = function(key, value) {
    var priority;
    priority = this._rand();
    this.root = this._insert(this.root, key, value, priority);
    return this;
  };

  Treap.prototype._insert = function(node, key, value, priority) {
    if (node == null) {
      this.count++;
      return new Node(key, value, priority);
    }
    if (this.comparator(key, node.key)) {
      node.left = this._insert(node.left, key, value, priority);
      if (node.left.priority < node.priority) {
        return this.leftRotate(node);
      }
      return node;
    }
    if (this.comparator(node.key, key)) {
      node.right = this._insert(node.right, key, value, priority);
      if (node.right.priority < node.priority) {
        return this.rightRotate(node);
      }
      return node;
    }
    node.value = value;
    return node;
  };

  Treap.prototype["delete"] = function(key) {
    if (this.exists(key) == null) {
      return;
    }
    return this.root = this._delete(this.root, key);
  };

  Treap.prototype._delete = function(node, key) {
    var result, x;
    if (node == null) {
      throw new Error("key not found");
    }
    if (this.comparator(key, node.key)) {
      result = node;
      x = node.left;
      result.left = this._delete(x, key);
      return result;
    }
    if (this.comparator(node.key, key)) {
      result = node;
      x = node.right;
      result.right = this._delete(x, key);
      return result;
    }
    this.count--;
    return this.merge(node.left, node.right);
  };

  Treap.prototype.merge = function(left, right) {
    var result, x;
    if (left == null) {
      return right;
    }
    if (right == null) {
      return left;
    }
    if (left.priority < right.priority) {
      result = left;
      x = left.right;
      result.right = this.merge(x, right);
      return result;
    }
    result = right;
    x = right.left;
    result.left = this.merge(x, left);
    return result;
  };

  Treap.prototype.split = function(key) {
    var inserted;
    inserted = this._insert(this.root, key, null, -1);
    return [inserted.left, inserted.right];
  };

  Treap.prototype.leftRotate = function(node) {
    var result, x;
    result = node.left;
    x = result.right;
    result.right = node;
    node.left = x;
    return result;
  };

  Treap.prototype.rightRotate = function(node) {
    var result, x;
    result = node.right;
    x = result.left;
    result.left = node;
    node.right = x;
    return result;
  };

  Treap.prototype.exists = function(key) {
    return this._exists(this.root, key);
  };

  Treap.prototype._exists = function(node, key) {
    if (node == null) {
      return false;
    }
    if (this.comparator(key, node.key)) {
      return this._exists(node.left, key);
    }
    if (this.comparator(node.key, key)) {
      return this._exists(node.right, key);
    }
    return true;
  };

  Treap.prototype.height = function(key) {
    return this._height(this.root, key);
  };

  Treap.prototype._height = function(node, key) {
    var depth;
    if (node == null) {
      return 0;
    }
    if (this.comparator(key, node.key)) {
      depth = this._height(node.left, key);
      return depth + 1;
    }
    if (this.comparator(node.key, key)) {
      depth = this._height(node.right, key);
      return depth + 1;
    }
    return 0;
  };

  Treap.prototype.length = function() {
    return this.count;
  };

  return Treap;

})();

/*
//@ sourceMappingURL=treap.js.map
*/