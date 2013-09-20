class Treap
  constructor: (comparator) ->
    @comparator = undefined
    @root       = undefined
    @count      = 0

    #If one isn't defined lets assume we're using numbers as keys
    if !comparator
      @comparator = (key1, key2)-> key1 < key2

    return @

  _rand: ()->
    Math.random()

  reset: ()->
    @root = undefined
    @count = 0

  get: (key)->
    @_get(@root, key)

  _get: (node, key)->
    unless node?
      return undefined

    if @comparator key, node.key
      return @_get node.left, key

    if @comparator node.key, key
      return @_get node.right, key

    return node.value

  insert: (key, value)->
    priority = @_rand()
    @root = @_insert(@root, key, value, priority)

    return @

  _insert: (node, key, value, priority)->
    unless node?
      @count++
      return new Node(key, value, priority)

    if @comparator(key, node.key)
      node.left = @_insert(node.left, key, value, priority)
      if node.left.priority < node.priority
        return @leftRotate(node)
      return node

    if @comparator(node.key, key)
      node.right = @_insert(node.right, key, value, priority)
      if node.right.priority < node.priority
        return @rightRotate(node)
      return node

    node.value = value
    return node

  delete: (key)->
    unless @exists(key)?
      return
    @root = @_delete(@root, key)

  _delete: (node, key)->
    unless node?
      throw new Error "key not found"
    if @comparator(key, node.key)
      result = node
      x = node.left
      result.left = @_delete(x,key)
      return result
    if @comparator(node.key, key)
      result = node
      x = node.right
      result.right = @_delete(x,key)
      return result
    @count--
    return @merge(node.left, node.right)

  merge: (left, right)->
    unless left?
      return right

    unless right?
      return left

    if left.priority < right.priority
      result = left
      x = left.right
      result.right = @merge(x,right)
      return result

    result = right
    x = right.left
    result.left = @merge(x,left)
    return result

  split: (key)->
    inserted = @_insert(@root, key, null, -1)
    return [inserted.left, inserted.right]

  leftRotate: (node)->
    result = node.left
    x = result.right
    result.right = node
    node.left = x
    return result


  rightRotate: (node)->
    result = node.right
    x = result.left
    result.left = node
    node.right = x
    return result

  exists: (key)->
    return @_exists(@root, key)

  _exists: (node, key)->
    unless node?
      return false

    if @comparator(key, node.key)
      return @_exists(node.left, key)

    if @comparator(node.key, key)
      return @_exists(node.right, key)

    return true

  height: (key)->
    return @_height(@root, key)

  _height: (node, key)->
    unless node?
      return 0

    if @comparator(key,node.key)
      depth = @_height(node.left, key)
      return depth + 1

    if @comparator(node.key, key)
      depth = @_height(node.right, key)
      return depth + 1

    return 0

  length: ()->
    @count
