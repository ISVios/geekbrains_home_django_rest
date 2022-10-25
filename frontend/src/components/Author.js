import React from "react";

const AuthorItem = ({author}) => {

  return (
   <tr>
     <td>{author.first_name}</td>
     <td>{author.last_name}</td>
     <td>{author.birthday}</td>
   </tr> 
  )

}

const AuthorList = ({authors}) => {

  return (
    <table>
      <th>First name</th>
      <th>Last name</th>
      <th>Birthday</th>
      {authors.map((author) => <AuthorItem author={author} />)}
    </table>
  )

}

export default AuthorList
