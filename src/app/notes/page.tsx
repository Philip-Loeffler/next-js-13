// components are server components by default
// which means they get rendered on the server
// and we can do data retching inside of them
// that is why we are able to mark this component at async

import Link from "next/link";
import styles from "./Notes.module.css";

async function getNotes() {
  const res = await fetch(
    "http://127.0.0.1:8090/api/collections/notes/records?page=1&perPage=30"
  );
  const data = await res.json();
  return data?.items as any;
}

export default async function NotesPage() {
  const notes = await getNotes();
  return (
    <div>
      <h1>notes</h1>
      <div className={styles.grid}>
        {notes?.map((note) => {
          return <Note key={note.id} note={note} />;
        })}
      </div>
    </div>
  );
}

function Note({ note }: any) {
  const { id, title, content, created } = note || {};

  return (
    <Link href={`/notes/${id}`}>
      <div className={styles.note}>
        <h2>{title}</h2>
        <h5>{content}</h5>
        <p>{created}</p>
      </div>
    </Link>
  );
}
