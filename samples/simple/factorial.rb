def factorial(n)
  if n == 1
    1
  else
    n * factorial(n-1)
  end
end

x = 1

while x <= 10  puts x, factorial(x)
  x = x + 1
end