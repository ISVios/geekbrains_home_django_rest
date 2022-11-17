import { Link, useParams } from "react-router-dom";

const PersoneInfo = ({ personeSet }) => {
  const { persone_pk } = useParams();
  const filtred = personeSet.filter((elem) => elem.pk === Number(persone_pk));
  return (
    <>
      {filtred.map((item) => (
        <PersoneParam key={item.pk} persone={item} />
      ))}
    </>
  );
};

const PersoneParam = ({ persone }) => {
  return (
    <>
      <h1> Persone Info </h1>
      <h2>Username: {persone.username}</h2>
      <h2>Firstname: {persone.firstName}</h2>
      <h2>Surname: {persone.surname}</h2>
      <h3>Email: {persone.email}</h3>
    </>
  );
};

const PersoneItem = ({ persone }) => {
  return (
    <Link to={"/persone/" + persone.pk}>
      {persone.firstName} {persone.surname}
    </Link>
  );
};

const PersoneList = ({ personeSet }) => {
  return (
    <ul>
      {personeSet.map((persone) => {
        return (
          <li key={persone.pk}>
            <PersoneItem persone={persone} />
          </li>
        );
      })}
    </ul>
  );
};

export { PersoneList, PersoneInfo };
