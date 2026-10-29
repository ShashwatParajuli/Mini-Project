
export default function PageHeader({
  title,
  description,
  action,
  icon,
}) {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-4">
        {icon && (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-black text-white shadow-sm">
            {icon}
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
            {title}
          </h1>

          {description && (
            <p className="mt-1.5 max-w-2xl text-sm leading-6 text-gray-500">
              {description}
            </p>
          )}
        </div>
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}
