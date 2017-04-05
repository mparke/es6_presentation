function example() {
  console.log(func_level);  // undefined
  console.log(block_level); // undefined
  var func_level = 10;

  if (true) {
    var block_level = 20;
  }

  console.log(func_level); // 10
  console.log(block_level); // 20
}
