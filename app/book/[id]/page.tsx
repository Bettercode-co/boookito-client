import BookPageClient from './client';

export default async function BookPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <BookPageClient params={{ id }} />;
}