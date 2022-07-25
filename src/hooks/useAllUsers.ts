import axios from "axios";
import { useState } from "react";
import { UserProfile } from "../types/userProfile";
import { User } from "../types/api/user";

// 全ユーザー一覧を取得するカスタムフック
export const UseAllUsers = () => {
  const [userProfile, setUserProfile] = useState<Array<UserProfile>>([]);
  const [loading, setloading] = useState(false);
  const [error, setEroor] = useState(false);

  const getUsers = () => {
    setloading(true);
    setEroor(false);

    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}${user.username}`,
          email: user.email,
          address: `${user.address.city}${user.address.suite}${user.address.street}`
        }));
        setUserProfile(data);
      })
      .catch(() => {
        setEroor(true);
      })
      .finally(() => {
        setloading(false);
      });
  };

  return { getUsers, userProfile, loading, error };
};
