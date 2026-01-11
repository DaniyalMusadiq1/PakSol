export const Section = ({ title, children }) => (
  <div className="border border-gray-800 rounded-lg p-3">
    <h2 className="text-sm font-semibold text-gray-300 mb-2">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{children}</div>
  </div>
);

export const Input = ({ label, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs text-gray-400">{label}</label>
    <input
      {...props}
      className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 outline-none"
    />
  </div>
);

export const FileInput = ({ label, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs text-gray-400">{label}</label>
    <input
      type="file"
      accept="image/*"
      {...props}
      className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm"
    />
  </div>
);

export const Select = ({ label, children, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs text-gray-400">{label}</label>
    <select
      {...props}
      className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 outline-none"
    >
      {children}
    </select>
  </div>
);

export const Checkbox = ({ label, ...props }) => (
  <label className="flex items-center gap-2 text-sm">
    <input type="checkbox" {...props} className="accent-green-500" />
    {label}
  </label>
);
