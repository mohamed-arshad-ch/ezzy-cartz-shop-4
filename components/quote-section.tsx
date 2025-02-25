export default function QuoteSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <blockquote className="max-w-2xl mx-auto text-center">
          <p className="text-xl italic mb-4">"quote"</p>
          <footer className="text-sm text-gray-600">— author</footer>
        </blockquote>
      </div>
    </section>
  )
}

