function ProductList() {
  const products = [
    { id: 1, product_name: "Laptop", price: 500 },
    { id: 2, product_name: "Desktop", price: 100 },
    { id: 3, product_name: "Modem", price: 300 },
    { id: 4, product_name: "Phone", price: 450 },
    { id: 5, product_name: "MicroPhones", price: 900 },
  ];

  const fruits = ["Apple", "Banana", "Grapes", "Pipepal"];
  return (
    <>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.product_name} ${product.price}
          </li>
        ))}
      </ul>

      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>
    </>
  );
}

export default ProductList;
