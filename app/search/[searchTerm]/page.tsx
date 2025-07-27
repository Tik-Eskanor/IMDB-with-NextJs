import Results from '@/components/Results'


type Param = {
    params: Promise<{ searchTerm: string }>
}
export default async function page({ params }: Param) {
    const searchTerm = (await params).searchTerm
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${searchTerm}&include_adult=false&language=en-US&page=1`)

    const data = await res.json()
    // if (!res.ok) throw new Error("Failed to fetch data")
    const results = data.results

    console.log(res)

    return (
        <div className='w-full'>
            {!results || (results.length === 0 && (<div className='text-center pt-6'>No result found </div>))}
            {results && results.length !== 0 && <Results results={results} />}
        </div>
    )
}
