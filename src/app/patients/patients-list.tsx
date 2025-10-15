'use client';

import { useState, useMemo } from 'react';
import type { Patient } from '@/lib/types';
import { Input } from '@/components/ui/input';
import {
  ArrowRight,
  Search,
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  Building,
} from 'lucide-react';
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
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

interface PatientsListProps {
  patients: Patient[];
}

export function PatientsList({ patients }: PatientsListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const filteredPatients = useMemo(() => {
    if (!searchTerm) {
      return patients;
    }
    return patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(patient.id).includes(searchTerm)
    );
  }, [patients, searchTerm]);

  return (
    <div>
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by name, email, or ID..."
          className="w-full max-w-sm pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
                    <User className="h-6 w-6" />
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
              <InfoItem icon={<Globe />} label="Website" value={patient.website} />
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="text-lg font-semibold mb-3">Address</h3>
            <InfoItem
              icon={<MapPin />}
              label="Full Address"
              value={`${patient.address.suite}, ${patient.address.street}, ${patient.address.city}, ${patient.address.zipcode}`}
            />
          </div>
          <Separator />
          <div>
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
          </div>
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
