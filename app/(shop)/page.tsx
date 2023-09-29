import BookCategory from "./components/BookCategory";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <BookCategory categoryId={13} categoryTitle="توسعه فردی" />
    </main>
  );
}
