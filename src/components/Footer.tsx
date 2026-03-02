export function Footer() {
    return (
        <footer className="py-16 text-center">
            <p className="text-sm text-slate-400 mb-8">
                Игры для самых внимательных{" "}
                <span className="text-slate-500 font-medium"></span>
            </p>

            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center gap-6 items-center">
                <a
                    href="https://learningapps.org/watch?v=p5xmn78pc26"
                    target="_blank"
                    className="group relative px-10 py-4 rounded-2xl
        bg-gradient-to-r from-blue-500 to-blue-600
        text-white font-semibold tracking-wide
        shadow-lg shadow-blue-500/30
        hover:shadow-2xl hover:shadow-blue-500/40
        hover:-translate-y-1
        active:scale-95
        transition-all duration-300 ease-out"
                >
                    <span className="relative z-10">Денежное мемо</span>
                    <span className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition duration-300"></span>
                </a>

                <a
                    href="https://learningapps.org/display?v=p49mdzdit26"
                    target="_blank"
                    className="group relative px-10 py-4 rounded-2xl
        bg-gradient-to-r from-emerald-500 to-green-600
        text-white font-semibold tracking-wide
        shadow-lg shadow-emerald-500/30
        hover:shadow-2xl hover:shadow-emerald-500/40
        hover:-translate-y-1
        active:scale-95
        transition-all duration-300 ease-out"
                >
                    <span className="relative z-10">Чем оплатим покупку?</span>
                    <span className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition duration-300"></span>
                </a>

                <a
                    href="https://learningapps.org/display?v=p9amshxhk26"
                    target="_blank"
                    className="group relative px-10 py-4 rounded-2xl
        bg-gradient-to-r from-violet-500 to-purple-600
        text-white font-semibold tracking-wide
        shadow-lg shadow-violet-500/30
        hover:shadow-2xl hover:shadow-violet-500/40
        hover:-translate-y-1
        active:scale-95
        transition-all duration-300 ease-out"
                >
                    <span className="relative z-10">Найди пару</span>
                    <span className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition duration-300"></span>
                </a>

                <a
                    href="https://learningapps.org/display?v=pr3mkx0d326"
                    target="_blank"
                    className="group relative px-10 py-4 rounded-2xl
        bg-gradient-to-r from-pink-500 to-rose-600
        text-white font-semibold tracking-wide
        shadow-lg shadow-pink-500/30
        hover:shadow-2xl hover:shadow-pink-500/40
        hover:-translate-y-1
        active:scale-95
        transition-all duration-300 ease-out"
                >
                    <span className="relative z-10">Что сначала — что потом</span>
                    <span className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition duration-300"></span>
                </a>
            </div>
        </footer>
    );
}
