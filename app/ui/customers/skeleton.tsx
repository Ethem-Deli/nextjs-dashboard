export default function CustomersTableSkeleton() {
  return (
    <div className="animate-pulse space-y-2">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-6 bg-gray-200 rounded"></div>
      ))}
    </div>
  );
}
