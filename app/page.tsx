import Head from 'next/head';
import { Hero } from '@/components/hero';
import { Content } from '@/components/content';

export default function Home() {
  return (
    <>
      <Head>
        <title>Living Faith Church - Ilupeju Ekiti</title>
        <meta name="description" content="Welcome to Living Faith Church, Ilupeju Ekiti. Experience faith, community, and love through uplifting worship, engaging activities, and impactful outreach." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Living Faith Church - Ilupeju Ekiti" />
        <meta property="og:description" content="Discover service times, upcoming events, and community outreach opportunities at Living Faith Church, Ilupeju Ekiti." />
        <meta property="og:url" content="https://your-website-url.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://your-website-url.com/path-to-image.jpg" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Hero />
        <Content />
      </main>
    </>
  );
}
