let a = []
b = { b: 3 }
for (let i = 0; i < 2; ++i) {
  a = [...a, b]
}
console.log(a)
