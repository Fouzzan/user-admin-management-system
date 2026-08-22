import { Link } from 'react-router-dom';

function UserCard({ user, onDelete }) {
    return (
        <article className="grid grid-cols-1 gap-4 border-b border-[#323232] px-3 py-4 text-left transition hover:bg-[#252525] md:grid-cols-[minmax(220px,1fr)_120px_120px_auto] md:items-center">

            {/* User */}
            <div className="flex items-center gap-3">
                {/* Checkbox */}
                {/* <input
                    type="checkbox"
                    className="h-4 w-4 cursor-pointer appearance-none rounded border border-[#6b6b6b] bg-transparent checked:bg-blue-500"
                /> */}

                {/* Avatar */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-600 text-sm font-semibold text-white">
                    {user.profilePicture ? (
                        <img
                            src={user.profilePicture}
                            alt={user.name}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        user.name?.charAt(0).toUpperCase()
                    )}
                </div>

                {/* Name */}
                <h3 className="text-base font-semibold text-[#e8e1d5]">
                    {user.name}
                </h3>
            </div>

            {/* Status */}
            <div>
                <span
                    className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                        user.isActive
                            ? 'bg-green-950 text-green-400'
                            : 'bg-red-950 text-red-400'
                    }`}
                >
                    {user.isActive ? 'Active' : 'Inactive'}
                </span>
            </div>

            {/* Role */}
            <div className="text-sm font-medium text-[#c7c1b8]">
                {user.role}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2">
                <Link
                    to={`/admin/users/${user.id}`}
                    className="inline-flex h-9 items-center justify-center rounded-lg border border-[#454545] bg-transparent px-4 text-sm font-medium text-[#e8e1d5] transition hover:bg-[#333333]"
                >
                    View
                </Link>

                <Link
                    to={`/admin/users/${user.id}/edit`}
                    className="inline-flex h-9 items-center justify-center rounded-lg border border-[#454545] bg-transparent px-4 text-sm font-medium text-[#e8e1d5] transition hover:bg-[#333333]"
                >
                    Edit
                </Link>

                <button
                    type="button"
                    onClick={() => onDelete(user.id)}
                    className="inline-flex h-9 items-center justify-center rounded-lg border border-red-700 bg-transparent px-4 text-sm font-medium text-red-400 transition hover:bg-red-950"
                >
                    Delete
                </button>
            </div>

        </article>
    );
}

export default UserCard;