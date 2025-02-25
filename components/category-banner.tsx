import Image from "next/image"
import Link from "next/link"

interface CategoryBannerProps {
  title: string
  description: string
  image: string
  href: string
  fullWidth?: boolean
}

export default function CategoryBanner({ title, description, image, href, fullWidth = false }: CategoryBannerProps) {
  return (
    <Link href={href} className={`relative overflow-hidden group ${fullWidth ? "col-span-full" : ""}`}>
      <div className="aspect-[16/9] relative">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-8 left-8 text-white">
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </Link>
  )
}

