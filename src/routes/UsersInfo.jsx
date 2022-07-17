import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Events from "../components/Events";
import UserContainer from "../components/UserContainer";
import Repo from "../components/Repo";
import Tabs from "../components/Tabs";
import Loading from "../components/Loading";

const UsersInfo = () => {
    const [user, setUser] = useState([])
    const [type, setType] = useState('repos')
    const [infos, setInfos] = useState([])
    const [loading, setLoading] = useState(null)
    const {pathname} = useLocation()
    const navigate = useNavigate()
    let baseURL = 'https://api.github.com/users'

    async function getUserInfo() {
        setLoading(true)
        const res = await fetch(baseURL + pathname)
        const data = await res.json()
        setUser(() => [data])
        setLoading(null)
    }

    async function getUrl () {
        setUser()
        setLoading(true)
        const res = await fetch(baseURL + pathname + `/${type}`)
        const data = await res.json()
        setInfos(data)
        setLoading(null)
    }

    useEffect(() => {
        getUserInfo()
        getUrl()
    }, [pathname, type])

    return (
        <div className="py-5">
            <button onClick={() => navigate('/')} className="px-5 py-1 font-medium mx-1 my-4 bg-cyan-600 rounded text-gray-200">Back</button>
            {user && user?.map((userInfo, index) => (
                <div key={index} className='flex justify-center md:flex-row md:px-0 px-4 flex-col gap-10'>
                    <img src={userInfo.avatar_url} alt="avatar" className="w-[300px] border-4 border-cyan-400 md:mx-0 mx-auto rounded-lg" />
                    <div className="text-lg px-3 leading-10">
                        <h1 className="text-3xl pb-4">{userInfo?.name}</h1>
                        <h1>
                            <span className="text-cyan-400">Username</span> : {userInfo?.login}
                        </h1>
                        <h1>
                            <span className="text-cyan-400">Followers</span> : {userInfo?.followers}
                        </h1>
                        <h1>
                            <span className="text-cyan-400">Following</span> : {userInfo?.following}
                        </h1>
                        <h1>
                            <span className="text-cyan-400">Repository</span> : {userInfo?.public_repos}
                        </h1>
                        <h1>
                            <span className="text-cyan-400">Join</span> :{new Date(userInfo?.created_at).toLocaleDateString()}
                        </h1>
                        <a href={userInfo?.html_url} target="_blank" className="text-gray-200 font-semibold rounded cursor-pointer px-4 py-1 bg-cyan-600 my-3 tracking-wide">Visit</a>
                    </div>
                </div>
            ))}
            <div className="flex border-b pb-4 gap-6 mt-[10%] mb-6 justify-center md:text-xl">
                <Tabs type={type} setType={setType} />
            </div>
            {loading && <Loading />}
            {type === 'repos' && (
                <div className="grid md:grid-cols-2 grid-cols-1 gap-7 w-10/12 mx-auto">
                    {infos && <Repo repos={infos} />}
                </div>
            )}
            {type === 'received_events' && (
                <div className="grid md:grid-cols-2 grid-cols-1 gap-7 w-10/12 mx-auto">
                    {infos && <Events events={infos} /> }
                </div>
            )}
            {type === 'followers' && (
                <div>
                    <UserContainer users={infos} />
                </div>
            )}
        </div>
    )
}

export default UsersInfo