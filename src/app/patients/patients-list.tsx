'use client';

import { useState, useMemo } from 'react';
import type { Patient } from '@/lib/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  ArrowRight,
  Search,
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  Building,
  PlusCircle,
} from 'lucide-react';

import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const patientSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
  phone: z.string().min(10, 'Phone number seems too short.'),
});

type PatientFormValues = z.infer<typeof patientSchema>;

interface PatientsListProps {
  initialPatients: Patient[];
}

export function PatientsList({ initialPatients }: PatientsListProps) {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);

  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const filteredPatients = useMemo(() => {
    return patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(patient.id).includes(searchTerm)
    );
  }, [patients, searchTerm]);

  function handleAddPatient(data: PatientFormValues) {
    const newPatient: Patient = {
      id: Math.max(...patients.map((p) => p.id)) + 1,
      ...data,
      username: data.name.toLowerCase().replace(/\s/g, ''),
      address: {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
        geo: { lat: '', lng: '' },
      },
      website: '',
      company: { name: '', catchPhrase: '', bs: '' },
    };
    setPatients([newPatient, ...patients]);
    setIsAddPatientOpen(false);
    form.reset();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name, email, or ID..."
            className="w-full max-w-sm pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={() => setIsAddPatientOpen(true)}>
          <PlusCircle className="mr-2 h-5 w-5" />
          Add New Patient
        </Button>
      </div>
      {filteredPatients.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPatients.map((patient) => (
            <Card
              key={patient.id}
              className="flex flex-col hover:shadow-lg transition-shadow"
            >
              <CardHeader className="flex-row items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>
                    {patient.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{patient.name}</CardTitle>
                  <CardDescription>{patient.email}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold">Phone:</span> {patient.phone}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => setSelectedPatient(patient)}
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 col-span-full">
          <p className="text-muted-foreground">No patients found.</p>
        </div>
      )}

      <PatientDetailModal
        patient={selectedPatient}
        isOpen={!!selectedPatient}
        onClose={() => setSelectedPatient(null)}
      />

      <Dialog open={isAddPatientOpen} onOpenChange={setIsAddPatientOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Patient</DialogTitle>
            <DialogDescription>
              Enter the details of the new patient.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddPatient)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="123-456-7890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Add Patient</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function PatientDetailModal({
  patient,
  isOpen,
  onClose,
}: {
  patient: Patient | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!patient) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline">
            {patient.name}
          </DialogTitle>
          <DialogDescription>
            Detailed information for {patient.username}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Personal Information
            </h3>
            <div className="space-y-3">
              <InfoItem icon={<User />} label="Username" value={patient.username} />
              <InfoItem icon={<Mail />} label="Email" value={patient.email} />
              <InfoItem icon={<Phone />} label="Phone" value={patient.phone} />
              {patient.website && <InfoItem icon={<Globe />} label="Website" value={patient.website} />}
            </div>
          </div>
          {patient.address.street && <Separator />}
          {patient.address.street && <div>
            <h3 className="text-lg font-semibold mb-3">Address</h3>
            <InfoItem
              icon={<MapPin />}
              label="Full Address"
              value={`${patient.address.suite}, ${patient.address.street}, ${patient.address.city}, ${patient.address.zipcode}`}
            />
          </div>}
          {patient.company.name && <Separator />}
          {patient.company.name && <div>
            <h3 className="text-lg font-semibold mb-3">Company</h3>
            <div className="space-y-3">
              <InfoItem
                icon={<Building />}
                label="Company Name"
                value={patient.company.name}
              />
              <InfoItem label="Catchphrase" value={`"${patient.company.catchPhrase}"`} />
              <InfoItem label="Business" value={patient.company.bs} />
            </div>
          </div>}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      {icon && <div className="text-muted-foreground mt-1">{icon}</div>}
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-sm text-muted-foreground">{value}</p>
      </div>
    </div>
  );
}
