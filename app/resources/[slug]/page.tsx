import ResourceDetail from '@/components/Resources/ResourceDetail';
import { client } from '@/lib/sanity';
import { resourceBySlugQuery, allResourceSlugsQuery, allResourcesQuery } from '@/lib/queries';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await client.fetch(resourceBySlugQuery, { slug });
    
    if (!post) return { title: 'Post Not Found' };

    return {
        title: `${post.title} | Forte Clinical Laboratory Resources`,
        description: post.excerpt,
    };
}

export async function generateStaticParams() {
    const slugs = await client.fetch(allResourceSlugsQuery);
    return slugs.map((s: { slug: string }) => ({
        slug: s.slug,
    }));
}

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    
    // Fetch current post and recent resources for related section
    const [post, allResources] = await Promise.all([
        client.fetch(resourceBySlugQuery, { slug }),
        client.fetch(allResourcesQuery)
    ]);

    if (!post) {
        notFound();
    }

    // Filter out current post to get related articles
    const relatedPosts = allResources
        .filter((p: any) => p.slug !== slug)
        .slice(0, 2);

    return <ResourceDetail post={post} relatedPosts={relatedPosts} />;
}
