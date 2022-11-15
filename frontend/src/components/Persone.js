import React from "react";

const PersoneItem = ({ persone }) => {
  return (
    <tr>
      <td>{persone.firstName}</td>
      <td>{persone.surname}</td>
      <td>{persone.email}</td>
    </tr>
  );
};

const PersoneList = ({ personeSet }) => {
  return (
    <table>
      <th>First name</th>
      <th>Last name</th>
      <th>Email</th>
      {personeSet.map((persone) => (
        <PersoneItem persone={persone} />
      ))}
    </table>
  );
};

export default PersoneList;
