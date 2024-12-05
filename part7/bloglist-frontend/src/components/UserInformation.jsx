import { getUsers } from "../requests";
import { useQuery } from "@tanstack/react-query";

const UserInformation = () => {
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
      <table>
        <thead>
          <tr>
            <th style={leftAlignStyle}></th>
            <th style={leftAlignStyle}>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserInformation;
