import ProductCard from "@/components/product-card"

const relatedProducts = [
  {
    id: 2,
    name: "Classic Denim Jacket",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=800&q=80",
    colors: ["#000080", "#4B0082"],
  },
  {
    id: 3,
    name: "Summer Floral Dress",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
    isNew: true,
    colors: ["#FFB6C1", "#98FB98", "#87CEEB"],
  },
  {
    id: 4,
    name: "Urban Sneakers",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80",
    colors: ["#FFFFFF", "#000000", "#FF0000"],
  },
  {
    id: 5,
    name: "Premium Hoodie",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
    colors: ["#000000", "#808080", "#4B0082"],
  },
]

export default function RelatedProducts() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {relatedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

