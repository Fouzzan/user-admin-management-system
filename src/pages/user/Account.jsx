import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

function Account() {
    const { currentUser } = useSelector(state => state.auth)
  return (
    <main className="mx-auto w-full max-w-5xl bg-slate-50 px-4 py-8">
        <section className="mx-auto w-full max-w-xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h1 className="mb-5 text-4xl font-bold text-slate-950">My Account</h1>
            <div className="grid grid-cols-[120px_minmax(0,1fr)] gap-x-5 gap-y-3 text-left">
                <span className="text-sm text-slate-500">Name</span>
                <strong className="break-words text-slate-950">{currentUser.name}</strong>
                <span className="text-sm text-slate-500">Email</span>
                <strong className="break-words text-slate-950">{currentUser.email}</strong>
                <span className="text-sm text-slate-500">Phone</span>
                <strong className="break-words text-slate-950">{currentUser.phone || 'Not added'}</strong>
                <span className="text-sm text-slate-500">Role</span>
                <strong className="break-words text-slate-950">{currentUser.role}</strong>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
                <Link className="inline-flex min-h-10 items-center justify-center rounded-md bg-blue-600 px-4 py-2 font-semibold text-white" to="/account/edit">Edit Profile</Link>
                <Link className="inline-flex min-h-10 items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-900" to="/account/password">Change Password</Link>
            </div>
        </section>
    </main>
  )
}

export default Account
