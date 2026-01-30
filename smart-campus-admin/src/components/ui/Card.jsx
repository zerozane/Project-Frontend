export default function Card({ children, className = '', ...props }) {
    return (
        <div
            className={`bg-white rounded-2xl shadow-card p-6 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}

// Variant color schemes
const variantStyles = {
    primary: {
        bg: 'bg-gradient-to-br from-emerald-100 to-teal-100',
        icon: 'text-emerald-600',
        trend: 'text-emerald-600',
    },
    warning: {
        bg: 'bg-gradient-to-br from-amber-100 to-orange-100',
        icon: 'text-amber-600',
        trend: 'text-amber-600',
    },
    info: {
        bg: 'bg-gradient-to-br from-blue-100 to-indigo-100',
        icon: 'text-blue-600',
        trend: 'text-blue-600',
    },
    danger: {
        bg: 'bg-gradient-to-br from-red-100 to-rose-100',
        icon: 'text-red-600',
        trend: 'text-red-600',
    },
};

export function StatCard({
    icon: Icon,
    title,      // Dashboard uses 'title' 
    label,      // Also support 'label' for backward compat
    value,
    trend,
    trendValue, // Dashboard uses 'trendValue'
    change,     // Also support 'change' for backward compat
    changeType = 'positive',
    variant = 'primary'
}) {
    const displayLabel = title || label;
    const displayChange = trendValue || change;
    const styles = variantStyles[variant] || variantStyles.primary;
    const isPositive = trend === 'up' || changeType === 'positive';

    return (
        <Card className="flex items-center gap-4 hover:shadow-lg transition-all duration-300">
            <div className={`p-3 ${styles.bg} rounded-xl`}>
                <Icon className={`w-6 h-6 ${styles.icon}`} />
            </div>
            <div className="flex-1">
                <p className="text-sm text-slate-500 font-medium">{displayLabel}</p>
                <p className="text-2xl font-bold text-slate-800">{value}</p>
            </div>
            {displayChange && (
                <div className={`text-sm font-semibold ${isPositive ? styles.trend : 'text-red-500'}`}>
                    {displayChange}
                </div>
            )}
        </Card>
    );
}

