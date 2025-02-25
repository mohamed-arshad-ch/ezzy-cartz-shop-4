import Image from "next/image"
import Link from "next/link"

export default function BlogSection() {
  const posts = [
    {
      id: 1,
      title: "Top 10 Street Look Ideas",
      date: "2024-02-25",
      image: "/placeholder.svg?height=300&width=400",
      category: "Style Guide",
    },
    {
      id: 2,
      title: "Latest Trends of Running",
      date: "2024-02-24",
      image: "/placeholder.svg?height=300&width=400",
      category: "Fashion Tips",
    },
    {
      id: 3,
      title: "Types of Summer Outfits",
      date: "2024-02-23",
      image: "/placeholder.svg?height=300&width=400",
      category: "Style Guide",
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Our Journal</h2>
          <Link href="/blog" className="text-sm hover:underline">
            Read All Articles →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="group">
              <div className="aspect-[4/3] relative overflow-hidden bg-gray-100 mb-4">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <h3 className="text-lg font-medium group-hover:underline">{post.title}</h3>
                <p className="text-sm text-gray-600">{post.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

