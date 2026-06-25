import GithubUserCard from "./GithubUserCard"
import { useEffect, useState } from "react"
import { getFeaturedUsers } from "@/services/githubApi"
import type { GithubUser } from "@/types/github";

export default function TopUsers() {

  const [users, setUsers] = useState<GithubUser[]>([]);
  
  useEffect(() => {
    async function loadUsers() {
      const data = await getFeaturedUsers();
      setUsers(data);
    }

    loadUsers();
  }, []);
  return (
    <section className="flex flex-wrap justify-center gap-6">
      {users.map((user: GithubUser) => (
        <GithubUserCard
          key={user.id}
          login={user.login}
          avatarUrl={user.avatar_url}
        />
      ))}
    </section>
  )
}