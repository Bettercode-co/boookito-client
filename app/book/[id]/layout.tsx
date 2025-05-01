import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    return {
        title: `کتاب با کد ${id}`,
        description: `اطلاعات کتاب با کد ${id}`,
    };
}

export default function BookLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
} 