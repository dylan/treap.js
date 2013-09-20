  # TODO Write split/merge/rotation tests

describe "A new Treap", ->
  testTreap = new Treap()

  it "should return itself", ->
    expect(testTreap).toEqual(jasmine.any(Treap))

  it "should have a length of zero", ->
    length = testTreap.length()
    expect(length).toEqual(0)

  it "should return null if the key doesnt exist", ->
    result = testTreap.get('nonexistent key')
    expect(result).toEqual(undefined)

  it "should return itself so we can chain", ->
    result = testTreap.insert('xyz','abcd')
                      .insert('abc','def')

    expect(result).toEqual(jasmine.any(Treap))

  it "should return the correct value when provided a key", ->
    testTreap.insert('xyz','abcd')
    result = testTreap.get('xyz')
    expect(result).toMatch(/abcd/)

  it "should have a length of one now that there's a single key/value inside it", ->
    length = testTreap.length()
    expect(length).toEqual(2)

describe "A new Treap", ->
  testTreap = new Treap()

  it "should handle several values", ->
    for i in [0...300]
      testTreap.insert(i,"#{i}")

  it "should return values when we ask for them by key", ->
    value = testTreap.get(90)
    expect(value).toEqual("90")

  it "should allow us to overwrite values when we define a key that exists", ->
    testTreap.insert(90,"100")
    value = testTreap.get(90)
    expect(value).toEqual("100")

    testTreap.insert(90,"101")
    value = testTreap.get(90)
    expect(value).toEqual("101")

    testTreap.insert(90,"102")
    value = testTreap.get(90)
    expect(value).toEqual("102")

  it "should allow us to delete keys", ->
    testTreap.delete(90)
    expect(testTreap.exists(90)).toBe(false)

  it "should reflect a proper count", ->
    length = testTreap.length()
    expect(length).toEqual(299)


describe "A new treap",->
  treap = new Treap()
  nodes = 1000
  for i in [0...nodes]
    treap.insert(i,false)

  it "should have a correct height", ->
    console.debug "Height Test:"
    for i in [0...nodes] by 50
      console.debug "height:#{treap.height(i)} key: #{i}"
      # expect(height).not.toEqual(i)
  it "should split things correctly", ->
    console.debug treap.split(nodes/2)[0]

