import GithubUserCard from "./GithubUserCard"
import { mockUsers } from "@/data/mockUsers"

export default function TopUsers() {
  return (
    <section className="flex flex-wrap justify-center gap-6">
      {mockUsers.map((user) => (
        <GithubUserCard
          key={user.id}
          login={user.login}
          avatarUrl={user.avatar_url}
        />
      ))}
    </section>
  )
}