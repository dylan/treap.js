module.exports = {
  name: 'treap vs. object insert'
  tests: [
    {
      name: 'treap x 10000'
      fn: ->
        treap = new Treap()
        max = 1000
        for i in [0...max]
          treap.insert("key#{i}",false)
    }
    {
      name: 'object x 10000'
      fn: ->
        obj = {}
        max = 1000
        for i in [0...max]
          obj["key#{i}"]=false
    }
  ]
}
