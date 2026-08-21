function Loader({ text = 'Loading...' }) {
    return (
        <div className="px-5 py-12 text-center font-semibold text-slate-900" role="status">
            {text}
        </div>
    );
}

export default Loader;
