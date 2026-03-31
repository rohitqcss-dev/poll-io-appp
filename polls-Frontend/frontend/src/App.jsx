import { useEffect, useState } from 'react'
import Api from './axios/axios'

function App() {
  const [question, setQuestion] = useState("")
  const [option1, setOption1] = useState("")
  const [option2, setOption2] = useState("")
  const [option3, setOption3] = useState("")
  const [expiryMinutes, setExpiryMinutes] = useState(5)
  const [polls, setPolls] = useState([])
  const [filter, setFilter] = useState("all")
  const [votedPolls, setVotedPolls] = useState([])

  const fetchpolls = async () => {
    try {
      const res = await Api.get("/poll/getpolls")
      setPolls(res.data.polls || res.data)
      const savedVotes = JSON.parse(localStorage.getItem("votedPolls") || "[]")
      setVotedPolls(savedVotes)
    } catch (error) { console.log(error) }
  }

  useEffect(() => { fetchpolls() }, [])

  const createPoll = async (e) => {
    e.preventDefault()
    const expiresAt = new Date()
    expiresAt.setMinutes(expiresAt.getMinutes() + parseInt(expiryMinutes))
    const payload = {
      question,
      options: [option1, option2, option3].filter(o => o.trim() !== ""),
      expiresAt
    }
    try {
      await Api.post("/poll/createpoll", payload)
      alert("Poll created successfully")
      setQuestion(""); setOption1(""); setOption2(""); setOption3("")
      setExpiryMinutes(5)
      fetchpolls()
    } catch (error) { console.log(error) }
  }

  const handleVote = async (id, optionIndex) => {
    const savedVotes = JSON.parse(localStorage.getItem("votedPolls") || "[]")
    const alreadyVoted = savedVotes.some(v => v.split('-')[0] === id)

    if (alreadyVoted) {
      alert("You have already voted on this poll")
      return
    }

    try {
      await Api.post(`/poll/votepoll/${id}`, { optionIndex })
      const voteKey = `${id}-${optionIndex}`
      const newVotedList = [...savedVotes, voteKey]

      setVotedPolls(newVotedList)
      localStorage.setItem("votedPolls", JSON.stringify(newVotedList))
      fetchpolls()
    } catch (error) {
      alert("Voting failed")
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_circle_at_5%_-10%,#e0f2fe,transparent_55%),radial-gradient(900px_circle_at_95%_0%,#dbeafe,transparent_45%),linear-gradient(180deg,#f8fafc,white)] p-4 md:p-12 font-sans text-slate-900">
      <div className="max-w-3xl mx-auto flex items-center justify-between mb-10 animate-[fadeIn_700ms_ease-out]">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-[linear-gradient(135deg,#2563eb,#38bdf8)] shadow-lg shadow-blue-200/80" />
          <h1 className="text-3xl font-black tracking-tighter italic text-slate-900 transition-colors hover:text-blue-600">POLL.IO</h1>
        </div>
        <div className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
          Live • Fast • Clean
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-10">
        <div className="relative bg-white/85 backdrop-blur p-8 rounded-[2.5rem] border border-white/60 shadow-[0_25px_80px_-40px_rgba(30,41,59,0.65)] transition-all duration-300 hover:shadow-[0_35px_110px_-55px_rgba(37,99,235,0.6)]">
          <div className="pointer-events-none absolute inset-0 rounded-[2.25rem] border border-slate-200/60" />
          <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-100/60 blur-2xl" />
          <div className="pointer-events-none absolute -left-10 -bottom-12 h-32 w-32 rounded-full bg-sky-100/70 blur-2xl" />
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Create Poll</span>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-blue-600">New</span>
          </div>
          <form onSubmit={createPoll} className="space-y-5">
            <input type="text" placeholder="What's the question?" value={question} onChange={(e) => setQuestion(e.target.value)} className="w-full p-4 bg-slate-50/80 border-none rounded-2xl font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 focus:bg-white shadow-inner placeholder:text-slate-400" required />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input type="text" placeholder="Option 1" value={option1} onChange={(e) => setOption1(e.target.value)} className="p-4 bg-slate-50/80 rounded-2xl outline-none font-medium transition-all duration-200 focus:bg-white focus:ring-2 focus:ring-blue-400 shadow-inner placeholder:text-slate-400" required />
              <input type="text" placeholder="Option 2" value={option2} onChange={(e) => setOption2(e.target.value)} className="p-4 bg-slate-50/80 rounded-2xl outline-none font-medium transition-all duration-200 focus:bg-white focus:ring-2 focus:ring-blue-400 shadow-inner placeholder:text-slate-400" required />
              <input type="text" placeholder="Option 3" value={option3} onChange={(e) => setOption3(e.target.value)} className="p-4 bg-slate-50/80 rounded-2xl outline-none font-medium transition-all duration-200 focus:bg-white focus:ring-2 focus:ring-blue-400 shadow-inner placeholder:text-slate-400" />
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50/80 to-sky-50/80 rounded-2xl border border-blue-100 shadow-inner">
                <label className="text-[10px] font-black uppercase text-blue-600">Expires in (Mins):</label>
                <input type="number" min="1" value={expiryMinutes} onChange={(e) => setExpiryMinutes(e.target.value)} className="w-full bg-transparent font-bold text-blue-700 outline-none" required />
              </div>
            </div>
            <button type="submit" className="w-full bg-[linear-gradient(135deg,#2563eb,#3b82f6,#38bdf8)] text-white p-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] transition-all shadow-lg shadow-blue-200 hover:brightness-110 hover:shadow-blue-300 active:scale-[0.99] hover:translate-y-[-1px]">Create Poll</button>
          </form>
        </div>

        <div className="flex bg-white/70 backdrop-blur p-1 rounded-2xl w-fit mx-auto border border-slate-200 shadow-sm">
          {['all', 'active', 'expired'].map(t => (
            <button key={t} onClick={() => setFilter(t)} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === t ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>{t}</button>
          ))}
        </div>

        <div className="space-y-6 pb-20">
          {polls
            .filter(p => {
              const isExp = new Date(p.expiresAt) < new Date()
              return filter === "active" ? !isExp : filter === "expired" ? isExp : true
            })
            .map((item) => {
              const isExpired = new Date(item.expiresAt) < new Date()
              const hasVoted = votedPolls.some(v => v.startsWith(item._id))
              const maxVotes = Math.max(...item.options.map(o => o.votes || 0))

              return (
                <div key={item._id} className={`bg-white p-8 rounded-[2.5rem] border-2 transition-all duration-300 hover:-translate-y-0.5 ${isExpired ? 'border-slate-100 opacity-90' : 'border-white shadow-lg shadow-slate-200/60 hover:shadow-2xl hover:shadow-blue-100/60'}`}>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-black text-2xl tracking-tight leading-7">{item.question}</h3>
                    <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${isExpired ? 'bg-slate-100 text-slate-400' : 'bg-blue-50 text-blue-600 animate-pulse'}`}>
                      {isExpired ? "Expired" : "Live"}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {item.options.map((opt, i) => {
                      const isMyVote = votedPolls.includes(`${item._id}-${i}`)
                      const isWinningOption = isExpired && opt.votes === maxVotes && opt.votes > 0

                      return (
                        <button
                          key={i}
                          disabled={isExpired}
                          onClick={() => handleVote(item._id, i)}
                          className={`w-full flex justify-between items-center p-5 rounded-2xl border-2 transition-all duration-300
                            ${isWinningOption ? 'border-amber-400 bg-amber-50 ring-2 ring-amber-100' : 'border-slate-50 bg-slate-50'}
                            ${isMyVote ? 'border-blue-600 bg-blue-50' : ''}
                            ${hasVoted ? 'cursor-default' : (!isExpired && 'hover:border-blue-200 hover:bg-white hover:shadow-sm')}
                          `}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`font-bold ${isMyVote ? 'text-blue-600' : 'text-slate-700'}`}>{opt.text}</span>
                            {isMyVote && <span className="text-[8px] bg-blue-600 text-white px-2 py-0.5 rounded-full uppercase">Your Vote</span>}
                            {isWinningOption && (
                              <span className="text-[8px] bg-amber-500 text-white px-2 py-0.5 rounded-full uppercase font-black tracking-tighter italic">
                                Winner
                              </span>
                            )}
                          </div>
                          <span className={`font-black text-xs ${isWinningOption ? 'text-amber-600' : (isMyVote ? 'text-blue-600' : 'text-slate-400')}`}>
                            {opt.votes || 0}
                          </span>
                        </button>
                      )
                    })}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-50 flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>Total Votes: {item.options.reduce((a, b) => a + (b.votes || 0), 0)}</span>
                    <span>Ends at: {new Date(item.expiresAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              )
            })}
          {polls.length === 0 && <p className="text-center text-slate-400 font-bold py-10 uppercase tracking-widest text-xs border-2 border-dashed rounded-[2rem] bg-white/60 backdrop-blur">No polls found</p>}
        </div>
      </div>
    </div>
  )
}

export default App
