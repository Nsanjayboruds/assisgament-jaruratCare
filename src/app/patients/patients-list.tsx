'use client';

import { useState, useMemo } from 'react';
import type { Patient } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { ArrowRight, Search, User } from 'lucide-react';
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

interface PatientsListProps {
  patients: Patient[];
}

export function PatientsList({ patients }: PatientsListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

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
                  onClick={() => router.push(`/patients/${patient.id}`)}
                >
                  View Details <ArrowRight className="ml-2 h-4 w-4" />
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
    </div>
  );
}
