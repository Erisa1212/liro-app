function Label({ children, color = "bg-stone-700 text-white", className = "" }) {
    return (
      <span 
        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${color} ${className}`}
      >
        {children}
      </span>
    );
  }
  
  export default Label;