import { Link } from 'react-router-dom';

function UserCard({ user, onDelete }) {
    return (
        <article className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-5 text-left shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h3 className="m-0 text-lg font-semibold text-slate-950">{user.name}</h3>
                <p className="text-slate-600">{user.email}</p>
                <span className={`mt-3 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                    user.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                }`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
                <Link className="inline-flex min-h-10 items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-900" to={`/admin/users/${user.id}`}>View</Link>
                <Link className="inline-flex min-h-10 items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-900" to={`/admin/users/${user.id}/edit`}>Edit</Link>
                <button className="inline-flex min-h-10 items-center justify-center rounded-md border border-red-600 bg-red-600 px-4 py-2 font-semibold text-white" type="button" onClick={() => onDelete(user.id)}>
                    Delete
                </button>
            </div>
        </article>
    );
}

export default UserCard;
