import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="flex justify-center text-3xl text-red-600 font-bold p-10">
        Not Implemented Yet
      </h1>
      <div className="flex justify-between flex-wrap gap-8 p-4">
        {/* Providers Table */}
        <div className="rounded-md border flex-1 min-w-[400px]">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                {/* Main Header spanning 3 columns */}
                <TableHead
                  colSpan={3}
                  className="font-bold text-primary text-lg py-4"
                >
                  All Providers
                </TableHead>
              </TableRow>
              <TableRow>
                {/* Sub-headers */}
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Example Row */}
              <TableRow>
                <TableCell className="font-medium">Provider Name</TableCell>
                <TableCell>Active</TableCell>
                <TableCell className="text-right">Edit</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* Customers Table */}
        <div className="rounded-md border flex-1 min-w-[400px]">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead
                  colSpan={3}
                  className="font-bold text-primary text-lg py-4"
                >
                  All Customers
                </TableHead>
              </TableRow>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Example Row */}
              <TableRow>
                <TableCell className="font-medium">Customer Name</TableCell>
                <TableCell>Active</TableCell>
                <TableCell className="text-right">Edit</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
