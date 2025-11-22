import { Metadata } from 'next';
import CustomersTable from '@/app/ui/customers/table';
import CustomersTableSkeleton from '@/app/ui/customers/skeleton';
import { fetchCustomers, fetchFilteredCustomers } from '@/app/lib/data';
import { Suspense } from 'react';
import { FormattedCustomersTable, CustomerField } from '@/app/lib/definitions';

export const metadata: Metadata = {
  title: 'Customers | Acme Dashboard',
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  // Await the searchParams Promise
  const { query } = await searchParams;
  const searchQuery = query || '';

  let customers: FormattedCustomersTable[];

  try {
    // Try to use fetchFilteredCustomers which should return customers with their invoice statistics
    customers = await fetchFilteredCustomers(searchQuery);
  } catch {
    // Fallback if fetchFilteredCustomers doesn't work
    const rawCustomers: CustomerField[] = await fetchCustomers();
    
    // Create basic customer data without invoice statistics
    customers = rawCustomers.map((customer: CustomerField) => ({
      id: customer.id,
      name: customer.name,
      email: 'no-email@example.com', // Default since CustomerField doesn't have email
      image_url: '/customers/placeholder.png', // Default image
      total_invoices: 0,
      total_pending: '$0.00',
      total_paid: '$0.00',
    }));
  }

  return (
    <div className="w-full">
      <Suspense fallback={<CustomersTableSkeleton />}>
        <CustomersTable customers={customers} />
      </Suspense>
    </div>
  );
}