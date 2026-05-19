import Link from 'next/link';
import { Button } from '@/components';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-light">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-agent-blue mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-text-primary mb-4">
          Page not found
        </h2>
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist yet. We're still building out all the pages!
        </p>
        <Link href="/">
          <Button variant="primary" size="lg">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
