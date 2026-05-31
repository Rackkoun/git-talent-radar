import { mockUserDetails } from "@/data/mockUserDetails";
import { Link } from "react-router-dom";

export default function UserPage() {
  const user = mockUserDetails;

  return (
    <main className="container mx-auto px-6 py-12">

      <Link
        to="/"
        className="text-sm text-muted-foreground hover:underline"
      >
        ← Back
      </Link>

      <div className="mt-8 flex flex-col items-center">

        <img
          src="https://avatars.githubusercontent.com/u/46247273?v=4"
          alt={user.login}
          className="h-36 w-36 rounded-full"
        />

        <h1 className="mt-4 text-4xl font-bold">
          {user.login}
        </h1>

        <p className="mt-2 text-muted-foreground">
          {user.bio}
        </p>

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

        <div className="space-y-4">

          {user.languages.map((lang) => (
            <div
              key={lang.name}
              className="rounded-lg border p-4"
            >
              <div className="flex justify-between">

                <span>{lang.name}</span>

                <span>
                  {lang.percentage}%
                </span>

              </div>
            </div>
          ))}

        </div>

      </section>

    </main>
  );
}