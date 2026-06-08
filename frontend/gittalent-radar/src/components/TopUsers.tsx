import GithubUserCard from "./GithubUserCard"
import { useEffect, useState } from "react"
import { getFeaturedUsers } from "@/services/githubApi"

export default function TopUsers() {

  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    async function loadUsers() {
      const data = await getFeaturedUsers();
      setUsers(data);
    }

    loadUsers();
  }, []);
  return (
    <section className="flex flex-wrap justify-center gap-6">
      {users.map((user: any) => (
        <GithubUserCard
          key={user.id}
          login={user.login}
          avatarUrl={user.avatar_url}
        />
      ))}
    </section>
  )
}