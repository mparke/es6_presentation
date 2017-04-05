function example() {
  console.log(func_level);  // Reference Error
  console.log(block_level); // Reference Error
  let func_level = 10;

  if (true) {
    let block_level = 20;
    console.log(block_level); // 20
  }

  console.log(func_level);  // 10
  console.log(block_level); // Reference Error
}
