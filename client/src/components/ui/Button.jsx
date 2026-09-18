const variantClasses = {
  primary:
    "border-violet-300 bg-violet-400 text-violet-950 shadow-[0_0_24px_rgba(199,116,255,0.22)] hover:bg-violet-300 hover:shadow-[0_0_34px_rgba(199,116,255,0.42)]",
  secondary:
    "border-violet-400/50 bg-violet-950/40 text-violet-200 hover:border-violet-300 hover:bg-violet-900/50 hover:text-white",
}

const Button = ({
  children,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
  ...props
}) => {
  return (
    <button
      className={`flex h-13 items-center justify-center gap-3 border px-5 text-sm font-extrabold transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70 ${variantClasses[variant] || variantClasses.primary} ${className}`}
      type={type}
      {...props}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
