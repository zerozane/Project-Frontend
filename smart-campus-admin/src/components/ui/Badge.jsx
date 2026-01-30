const variants = {
    success: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-100 text-amber-700 border border-amber-200',
    danger: 'bg-red-100 text-red-700 border border-red-200',
    info: 'bg-blue-100 text-[#162B75] border border-blue-200',
    default: 'bg-slate-100 text-slate-700 border border-slate-200',
    primary: 'bg-[#162B75]/10 text-[#162B75] border border-[#162B75]/20',
    accent: 'bg-amber-100 text-amber-700 border border-amber-200',
};

export default function Badge({
    variant = 'default',
    children,
    className = ''
}) {
    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
}
