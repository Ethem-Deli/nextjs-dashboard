// nextjs-dashboard\app\dashboard\customers\page.tsx
import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import CustomersTable from '@/app/ui/customers/table';
import CustomersTableSkeleton from '@/app/ui/customers/skeleton';
import { fetchCustomers, fetchFilteredCustomers } from '@/app/lib/data';
import { Suspense } from 'react';
import { FormattedCustomersTable } from '@/app/lib/definitions';

export const metadata: Metadata = {
  title: 'Customers | Acme Dashboard',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || '';

  try {
    // Use fetchFilteredCustomers which should return customers with their invoice statistics
    const customers: FormattedCustomersTable[] = await fetchFilteredCustomers(query);

    return (
      <div className="w-full">
        <Suspense fallback={<CustomersTableSkeleton />}>
          <CustomersTable customers={customers} />
        </Suspense>
      </div>
    );
  } catch (error) {
    // Fallback if fetchFilteredCustomers doesn't work
    const rawCustomers = await fetchCustomers();
    
    // Create basic customer data without invoice statistics
    const customers: FormattedCustomersTable[] = rawCustomers.map((customer) => ({
      id: customer.id,
      name: customer.name,
      email: 'no-email@example.com',
      image_url: '/customers/placeholder.png', // Use a placeholder image
      total_invoices: 0,
      total_pending: '$0.00',
      total_paid: '$0.00',
    }));

    return (
      <div className="w-full">
        <Suspense fallback={<CustomersTableSkeleton />}>
          <CustomersTable customers={customers} />
        </Suspense>
      </div>
    );
  }
}