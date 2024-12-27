'use client';
import { TiptapDefault } from '@/components/TipTapEditor';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Link href="/tiptap">tiptap</Link>
      <TiptapDefault />
    </div>
  );
}
