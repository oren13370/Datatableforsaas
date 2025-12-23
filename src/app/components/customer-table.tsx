import { useState, useMemo } from "react";
import { Search, ArrowUpDown, Pencil, Trash2, Ellipsis } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./ui/tooltip";
import { ApprovalAvatars } from "./approval-avatars";

type SortField = "title" | "department" | "version" | "lastUpdated";
type SortDirection = "asc" | "desc";

interface ApprovalUser {
  id: string;
  name: string;
}

interface Protocol {
  id: string;
  title: string;
  description: string;
  department: string;
  status: "Active" | "Draft" | "Under Review" | "Archived";
  version: string;
  lastUpdated: string;
  approvedBy: ApprovalUser[];
}

interface CustomerTableProps {
  departmentFilter?: string | null;
}

export const mockProtocols: Protocol[] = [
  {
    id: "1",
    title: "Safety Protocol for Chemical Handling",
    description: "Guidelines for safely handling chemicals in the lab.",
    department: "Chemistry",
    status: "Active",
    version: "1.0",
    lastUpdated: "2024-01-15",
    approvedBy: [
      { id: "1", name: "John Doe" },
      { id: "2", name: "Jane Smith" },
      { id: "3", name: "Alice Johnson" },
      { id: "4", name: "Bob Brown" },
      { id: "5", name: "Charlie Davis" },
    ],
  },
  {
    id: "2",
    title: "Operations Manual for Production Line",
    description: "Detailed instructions for operating the production line.",
    department: "Manufacturing",
    status: "Active",
    version: "2.0",
    lastUpdated: "2024-02-20",
    approvedBy: [
      { id: "3", name: "Alice Johnson" },
      { id: "4", name: "Bob Brown" },
    ],
  },
  {
    id: "3",
    title: "HR Policy on Employee Benefits",
    description: "Overview of employee benefits and their eligibility.",
    department: "Human Resources",
    status: "Under Review",
    version: "1.5",
    lastUpdated: "2024-12-01",
    approvedBy: [
      { id: "5", name: "Charlie Davis" },
      { id: "6", name: "Diana White" },
      { id: "7", name: "Ethan Green" },
      { id: "8", name: "Fiona Black" },
      { id: "9", name: "George King" },
      { id: "10", name: "Hannah Lee" },
      { id: "11", name: "Ian Scott" },
      { id: "12", name: "Judy Adams" },
    ],
  },
  {
    id: "4",
    title: "IT Security Policy",
    description: "Rules and guidelines for maintaining IT security.",
    department: "Information Technology",
    status: "Active",
    version: "3.0",
    lastUpdated: "2024-03-10",
    approvedBy: [
      { id: "7", name: "Ethan Green" },
    ],
  },
  {
    id: "5",
    title: "Compliance Guide for GDPR",
    description: "Instructions for complying with GDPR regulations.",
    department: "Legal",
    status: "Active",
    version: "1.0",
    lastUpdated: "2023-11-05",
    approvedBy: [
      { id: "9", name: "George King" },
      { id: "10", name: "Hannah Lee" },
      { id: "11", name: "Ian Scott" },
    ],
  },
  {
    id: "6",
    title: "Quality Control Procedures",
    description: "Steps to ensure the quality of products.",
    department: "Quality Assurance",
    status: "Draft",
    version: "0.5",
    lastUpdated: "2024-06-15",
    approvedBy: [
      { id: "11", name: "Ian Scott" },
      { id: "12", name: "Judy Adams" },
      { id: "13", name: "Kevin Price" },
      { id: "14", name: "Laura Hall" },
      { id: "15", name: "Michael Clark" },
      { id: "16", name: "Nancy Young" },
    ],
  },
  {
    id: "7",
    title: "Safety Protocol for Electrical Equipment",
    description: "Guidelines for safely using electrical equipment.",
    department: "Electrical Engineering",
    status: "Archived",
    version: "2.0",
    lastUpdated: "2024-01-30",
    approvedBy: [
      { id: "13", name: "Kevin Price" },
      { id: "14", name: "Laura Hall" },
      { id: "15", name: "Michael Clark" },
      { id: "16", name: "Nancy Young" },
    ],
  },
  {
    id: "8",
    title: "Operations Manual for Warehouse",
    description: "Instructions for managing the warehouse.",
    department: "Logistics",
    status: "Active",
    version: "1.0",
    lastUpdated: "2024-05-22",
    approvedBy: [
      { id: "15", name: "Michael Clark" },
      { id: "16", name: "Nancy Young" },
      { id: "17", name: "Oliver Moore" },
    ],
  },
  {
    id: "9",
    title: "HR Policy on Employee Training",
    description: "Requirements and procedures for employee training.",
    department: "Human Resources",
    status: "Inactive",
    version: "1.0",
    lastUpdated: "2024-04-18",
    approvedBy: [],
  },
  {
    id: "10",
    title: "Compliance Guide for ISO 9001",
    description: "Instructions for complying with ISO 9001 standards.",
    department: "Quality Assurance",
    status: "Active",
    version: "1.0",
    lastUpdated: "2023-12-10",
    approvedBy: [
      { id: "19", name: "Quinn Wright" },
      { id: "20", name: "Rachel King" },
      { id: "21", name: "Sam Turner" },
      { id: "22", name: "Tina Cooper" },
      { id: "23", name: "Uma Patel" },
      { id: "24", name: "Victor Stone" },
      { id: "25", name: "Wendy Park" },
      { id: "26", name: "Xavier Bell" },
      { id: "27", name: "Yara Nelson" },
      { id: "28", name: "Zack Reed" },
    ],
  },
];

export function CustomerTable({ departmentFilter }: CustomerTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("lastUpdated");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredAndSortedCustomers = useMemo(() => {
    let filtered = mockProtocols.filter((customer) => {
      const matchesSearch =
        customer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.department.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDepartment =
        departmentFilter === null || customer.department === departmentFilter;

      return matchesSearch && matchesDepartment;
    });

    filtered.sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (sortField === "lastUpdated") {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      } else if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [searchQuery, sortField, sortDirection, departmentFilter]);

  const totalPages = Math.ceil(filteredAndSortedCustomers.length / itemsPerPage);
  const paginatedCustomers = filteredAndSortedCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadgeVariant = (status: Protocol["status"]) => {
    switch (status) {
      case "Active":
        return "default";
      case "Under Review":
        return "secondary";
      case "Inactive":
      case "Archived":
        return "outline";
      default:
        return "outline";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200">
      <div className="p-4 md:p-6 border-b border-slate-200">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative flex-1 w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4" />
            <Input
              type="text"
              placeholder="Search protocols..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px]">
                <button
                  onClick={() => handleSort("title")}
                  className="flex items-center gap-1 hover:text-slate-900"
                >
                  Protocol
                  <ArrowUpDown className="size-3" />
                </button>
              </TableHead>
              <TableHead className="min-w-[150px]">
                <button
                  onClick={() => handleSort("department")}
                  className="flex items-center gap-1 hover:text-slate-900"
                >
                  Department
                  <ArrowUpDown className="size-3" />
                </button>
              </TableHead>
              <TableHead className="min-w-[100px]">
                <button
                  onClick={() => handleSort("version")}
                  className="flex items-center gap-1 hover:text-slate-900"
                >
                  Version
                  <ArrowUpDown className="size-3" />
                </button>
              </TableHead>
              <TableHead className="min-w-[130px]">
                <button
                  onClick={() => handleSort("lastUpdated")}
                  className="flex items-center gap-1 hover:text-slate-900"
                >
                  Last Updated
                  <ArrowUpDown className="size-3" />
                </button>
              </TableHead>
              <TableHead className="min-w-[120px]">Approved</TableHead>
              <TableHead className="text-right min-w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCustomers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12">
                  <div className="text-slate-500">
                    <p>No protocols found</p>
                    <p className="text-sm mt-1">Try adjusting your filters or search query</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div>
                      <div className="text-slate-900">{customer.title}</div>
                      <div className="text-slate-500 text-sm">{customer.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-slate-700">{customer.department}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-slate-900">
                      v{customer.version}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-slate-700">
                      {formatDate(customer.lastUpdated)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <ApprovalAvatars users={customer.approvedBy} />
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Ellipsis className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Pencil className="size-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="size-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {filteredAndSortedCustomers.length > 0 && (
        <div className="p-3 md:p-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="text-sm text-slate-600 text-center sm:text-left">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredAndSortedCustomers.length)} of{" "}
            {filteredAndSortedCustomers.length} protocols
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">Prev</span>
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="min-w-9"
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}