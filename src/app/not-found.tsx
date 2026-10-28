import PageHero from '@/components/PageHero';
import { Button, Container } from '@/components/ui';

export default function NotFound() {
  return (
    <>
      <PageHero title="Page not found" />
      <Container className="py-24">
        <p className="mb-8">Sorry, we couldn’t find the page you were looking for.</p>
        <Button href="/">Back to Home</Button>
      </Container>
    </>
  );
}
