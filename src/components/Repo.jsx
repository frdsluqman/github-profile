import React from "react";

const Repo = ({repos}) => {
    return (
        <>
        {repos.map((repo, index) => (
            <div key={index} className='bg-gray-900 p-3 leading-8'>
                <a href={repo.html_url} target='_blank' className="text-cyan-500 break-words font-semibold hover:underline">
                    {repo.full_name}
                </a>
                <div className="flex gap-5">
                    <h1 className="text-sm font-semibold">
                        Language : {repo.language}
                    </h1>
                    <h1 className="text-sm font-semibold">Forks : {repo.forks}</h1>
                    <h1 className="text-sm font-semibold">Stars : {repo.stargazers_count}</h1>
                </div>
            </div>
        ))}
        </>
    )
}

export default Repo