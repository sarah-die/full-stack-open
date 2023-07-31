import { useGetAllUsers } from '../hooks/useGetAllUsers';

export const UserInfo = () => {
  const { data: allUsers, isLoading: isUsersLoading } = useGetAllUsers();

  return (
    <div>
      <h2>Users</h2>
      {isUsersLoading ? (
        <div>is loading...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <td>
                <strong>user</strong>
              </td>
              <td>
                <strong>blogs created</strong>
              </td>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.blogs.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
