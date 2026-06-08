import { Progress } from "@/components/ui/progress";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getGithubUser, getGithubLanguages } from "@/services/githubApi";
import type { GithubUser, LanguageStat } from "@/types/github";

export default function UserPage() {
  const { username } = useParams();
  const [user, setUser] = useState<GithubUser | null>(null);
  const [languages, setLanguages] = useState<LanguageStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!username) return;

      try{
        const userData = await getGithubUser(username);
        const languageData = await getGithubLanguages(username);

        setUser(userData);
        setLanguages(languageData);
      } catch(error) {
        console.error(error);
      } finally{
        setLoading(false);
      }
    }

    loadData();
  }, [username]);

  if (loading) {
    return( <div className="p-12">Loading...</div> );
  }

  if (!user) {
    return( <div className="p-12">User not found</div> );
  }
  return (
    <main className="container mx-auto px-6 py-12">

      <Link
        to="/"
        className="
          inline-flex items-center
          gap-2 rounded-md border
          px-4 py-2 text-slate-200
          hover:bg-slate-800 transition
        "
      >
        ← Back
      </Link>

      <div className="mt-8 flex flex-col items-center">

        <img
          src={user.avatar_url}
          alt={user.login}
          className="h-36 w-36 rounded-full"
        />

        <h1 className="mt-4 text-4xl font-bold">
          {user.login}
        </h1>

        <p className="mt-2 text-muted-foreground">
          {user.bio}
        </p>

        <div className="mt-6 space-y-2 text-sm">

            <p>
              Github:
              {" "}
              <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                {user.html_url}
              </a>
            </p>

            <p>
              Location: {user.location ?? "Unknown"}
            </p>

            <p>
              Created: {new Date(user.created_at).toLocaleDateString()}
            </p>

          </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="rounded-lg border p-6">
          <h2 className="text-lg font-semibold">
            Followers
          </h2>

          <p className="mt-2 text-3xl">
            {user.followers}
          </p>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="text-lg font-semibold">
            Following
          </h2>

          <p className="mt-2 text-3xl">
            {user.following}
          </p>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="text-lg font-semibold">
            Public Repositories
          </h2>

          <p className="mt-2 text-3xl">
            {user.public_repos}
          </p>
        </div>

      </div>

     <section className="mt-12">

        <h2 className="mb-6 text-2xl font-bold">
          Languages
        </h2>

        <div className="space-y-5">

          {languages.map((lang: any) => (

            <div key={lang.name}>

              <div className="mb-2 flex justify-between">

                <span>{lang.name}</span>

                <span>{lang.percentage}%</span>

              </div>

              <Progress value={lang.percentage} />

            </div>

          ))}

        </div>

      </section>

    </main>
  );
}