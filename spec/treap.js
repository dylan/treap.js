describe("A new Treap", function() {
  var testTreap;
  testTreap = new Treap();
  it("should return itself", function() {
    return expect(testTreap).toEqual(jasmine.any(Treap));
  });
  it("should have a length of zero", function() {
    var length;
    length = testTreap.length();
    return expect(length).toEqual(0);
  });
  it("should return null if the key doesnt exist", function() {
    var result;
    result = testTreap.get('nonexistent key');
    return expect(result).toEqual(void 0);
  });
  it("should return itself so we can chain", function() {
    var result;
    result = testTreap.insert('xyz', 'abcd').insert('abc', 'def');
    return expect(result).toEqual(jasmine.any(Treap));
  });
  it("should return the correct value when provided a key", function() {
    var result;
    testTreap.insert('xyz', 'abcd');
    result = testTreap.get('xyz');
    return expect(result).toMatch(/abcd/);
  });
  return it("should have a length of one now that there's a single key/value inside it", function() {
    var length;
    length = testTreap.length();
    return expect(length).toEqual(2);
  });
});

describe("A new Treap", function() {
  var testTreap;
  testTreap = new Treap();
  it("should handle several values", function() {
    var i, _i, _results;
    _results = [];
    for (i = _i = 0; _i < 300; i = ++_i) {
      _results.push(testTreap.insert(i, "" + i));
    }
    return _results;
  });
  it("should return values when we ask for them by key", function() {
    var value;
    value = testTreap.get(90);
    return expect(value).toEqual("90");
  });
  it("should allow us to overwrite values when we define a key that exists", function() {
    var value;
    testTreap.insert(90, "100");
    value = testTreap.get(90);
    expect(value).toEqual("100");
    testTreap.insert(90, "101");
    value = testTreap.get(90);
    expect(value).toEqual("101");
    testTreap.insert(90, "102");
    value = testTreap.get(90);
    return expect(value).toEqual("102");
  });
  it("should allow us to delete keys", function() {
    testTreap["delete"](90);
    return expect(testTreap.exists(90)).toBe(false);
  });
  return it("should reflect a proper count", function() {
    var length;
    length = testTreap.length();
    return expect(length).toEqual(299);
  });
});

describe("A new treap", function() {
  var i, nodes, treap, _i;
  treap = new Treap();
  nodes = 1000;
  for (i = _i = 0; 0 <= nodes ? _i < nodes : _i > nodes; i = 0 <= nodes ? ++_i : --_i) {
    treap.insert(i, false);
  }
  it("should have a correct height", function() {
    var _j, _results;
    console.debug("Height Test:");
    _results = [];
    for (i = _j = 0; _j < nodes; i = _j += 50) {
      _results.push(console.debug("height:" + (treap.height(i)) + " key: " + i));
    }
    return _results;
  });
  return it("should split things correctly", function() {
    return console.debug(treap.split(nodes / 2)[0]);
  });
});

/*
//@ sourceMappingURL=treap.js.map
*/