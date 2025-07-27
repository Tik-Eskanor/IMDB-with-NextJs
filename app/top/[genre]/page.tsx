import Results from '@/components/Results'
const API_KEY = process.env.TMDB_API_KEY
type Param = {
    params: Promise<{ genre: string }>
}
export default async function page({ params }: Param) {
    const genre = (await params).genre

    const res = await fetch(`https://api.themoviedb.org/3/movie/${genre}?api_key=${API_KEY}&language=en-US&page=1`)
    const data = await res.json()
    if (!res.ok) throw new Error("Failed to fetch data")

    const results = data.results
    // console.log(result)

    return (
        <div>
            <Results results={results} />
        </div>
    )
}
