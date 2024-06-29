export default function DivePage({ params }) {
  const { id } = params;

  return (
    <main>
      <h1>Dive page for {id}</h1>
    </main>
  );
}
