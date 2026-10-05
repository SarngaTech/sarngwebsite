import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-display text-7xl font-extrabold text-brand-royal">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold text-navy-900">Page not found</h1>
      <p className="mt-3 max-w-md text-ink-soft">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn-primary">Go to Home</Link>
        <Link href="/courses" className="btn-ghost">Explore Courses</Link>
      </div>
    </section>
  );
}
