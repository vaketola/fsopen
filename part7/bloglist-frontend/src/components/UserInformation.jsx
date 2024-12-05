import { getUsers } from "../requests";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

export const IndividualUser = ({ users }) => {
  const id = useParams().id;
  const user = users.find((u) => u.id === id);

  if (!user) return null;

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export const UserInformation = () => {
  const result = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (!result.isSuccess) {
    return <h2>Users</h2>;
  }

  const users = result.data;

  const leftAlignStyle = { textAlign: "left" };

  return (
    <>
      <h2>Users</h2>
      <table className="table table-sm">
        <thead>
          <tr>
            <th>user name</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
