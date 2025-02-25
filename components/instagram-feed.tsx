import Image from "next/image"
import Link from "next/link"
import { Instagram } from "lucide-react"

export default function InstagramFeed() {
  const instagramPosts = [
    {
      id: 1,
      image: "/placeholder.svg?height=300&width=300",
      link: "#",
    },
    {
      id: 2,
      image: "/placeholder.svg?height=300&width=300",
      link: "#",
    },
    {
      id: 3,
      image: "/placeholder.svg?height=300&width=300",
      link: "#",
    },
    {
      id: 4,
      image: "/placeholder.svg?height=300&width=300",
      link: "#",
    },
    {
      id: 5,
      image: "/placeholder.svg?height=300&width=300",
      link: "#",
    },
    {
      id: 6,
      image: "/placeholder.svg?height=300&width=300",
      link: "#",
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Instagram className="h-5 w-5" />
          <h2 className="text-2xl font-semibold">Follow Our Instagram</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {instagramPosts.map((post) => (
            <Link
              key={post.id}
              href={post.link}
              className="aspect-square relative overflow-hidden group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={post.image || "/placeholder.svg"}
                alt="Instagram post"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

