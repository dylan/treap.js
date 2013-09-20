class Node
  constructor: (key,value,priority) ->
    @priority = priority
    @key      = key
    @value    = value
    @right = @left = undefined
