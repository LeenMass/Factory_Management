import { useEffect, useState } from "react";
import Table from "../../Components/Table";
import { getUsers } from "./usersUtils";

export default function Users() {
  const [users, setUsers] = useState([]);

  const columns = [
    { title: "Name", dataIndex: "full_name" },
    { title: "num_of_action", dataIndex: "num_of_action" },
  ];

  const getUsersData = async () => {
    const { data } = await getUsers();
    setUsers(data);
  };
  useEffect(() => {
    getUsersData();
  }, []);
  return (
    <div>
      Users
      <Table source={users} columns={columns} />
    </div>
  );
}
