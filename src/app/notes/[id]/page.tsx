// doing the [id] allows this to be a wild card and can be
// any value like before

async function getNote(noteId: string) {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/notes/records/${noteId}`,
    {
      // because this is a dynamic route, it will not automatically cache every request
      // so we can do this...
      // this is IRS
      // incrememntal static regeneration
      next: { revalidate: 10 },
    }
  );
  const data = await res.json();
  return data;
}

export default async function NotePage({ params }: any) {
  const note = await getNote(params.id);

  return (
    <div>
      <h1>Notes/{note.id}</h1>
      <h3>{note.title}</h3>
      <h5>{note.content}</h5>
      <p>{note.created}</p>
    </div>
  );
}
