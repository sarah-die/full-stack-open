import { useGetAllUsers } from '../hooks/useGetAllUsers';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import { useMemo } from 'react';
const { Column } = Table;

export const UserInfo = () => {
  const { data: allUsers, isLoading: isUsersLoading } = useGetAllUsers();
  const tableUsers = useMemo(
    () => (allUsers ? allUsers.map((user) => ({ ...user, key: user.id })) : []),
    [allUsers],
  );

  return (
    <div>
      <h2>Users</h2>
      {isUsersLoading ? (
        <div>is loading...</div>
      ) : (
        <Table dataSource={tableUsers} size="small" pagination={false}>
          <Column
            title="User"
            key="user"
            render={(user) => (
              <Link key={user.id} to={`/users/${user.id}`}>
                {user.username}
              </Link>
            )}
          />
          <Column
            title="Blogs created"
            key="blogs-created"
            render={(user) => <div key={user.id}>{user.blogs.length}</div>}
          />
        </Table>
      )}
    </div>
  );
};
