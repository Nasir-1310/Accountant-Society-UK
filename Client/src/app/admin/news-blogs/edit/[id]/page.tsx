
//src/app/admin/news-blogs/edit/[id]/page.tsx
import NewsForm from '@/components/admin/NewsForm';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditNewsPage({ params }: Props) {
  const { id } = await params;
  return <NewsForm postId={id} />;
}



