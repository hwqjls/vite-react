import { Form, useLoaderData } from 'react-router-dom';
import { getContact } from '../contacts';

interface Contact {
  first: string;
  last: string;
  avatar: string;
  twitter: string;
  notes: string;
  favorite: boolean;
}

export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  return { contact };
}

export default function Contact() {
  const { contact } = useLoaderData() as Record<string, Contact>;
  // const contact: Contact = {
  //   first: 'Your',
  //   last: 'Name',
  //   avatar: 'https://placekitten.com/g/200/200',
  //   twitter: 'your_handle',
  //   notes: 'Some notes',
  //   favorite: true
  // };

  return (
    <div id="contact">
      <div>
        <img key={contact.avatar} src={contact.avatar} alt="暂无图片" />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{' '}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a href={`https://twitter.com${contact.twitter}`} target="_blank" rel="noreferrer">
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={event => {
              if (!confirm('Please confirm you want to delete this record.')) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }: Record<string, Contact>): JSX.Element {
  const favorite = contact.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? 'false' : 'true'}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {favorite ? '⭐️' : '🪐'}
      </button>
    </Form>
  );
}
