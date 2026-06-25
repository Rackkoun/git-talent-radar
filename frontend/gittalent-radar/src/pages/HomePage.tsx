import SearchBar from "@/components/SearchBar"
import TopUsers from "@/components/TopUsers"

export default function HomePage() {
  return (
    <main className="min-h-screen">

      <div className="container mx-auto px-6 py-12">

        <div className="text-center">

          <h1 className="text-5xl font-bold">
            GitTalentRadar
          </h1>

          <p className="mt-4 text-muted-foreground">
            Discover, analyze and predict GitHub developer influence.
          </p>

        </div>

        <div className="mt-16">
          <h2
            className="mb-8 text-2xl font-bold text-center"
          >
            Featured Developers
          </h2>
          <TopUsers />
        </div>

        <div className="mt-20 flex justify-center">
          <SearchBar />
        </div>

      </div>
    </main>
  )
}