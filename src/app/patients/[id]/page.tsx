import type { Patient } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Building,
  Mail,
  MapPin,
  Phone,
  User,
  Globe,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface PatientDetailPageProps {
  params: {
    id: string;
  };
}

async function getPatient(id: string): Promise<Patient | null> {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    if (res.status === 404) {
      return null;
    }
    if (!res.ok) {
      throw new Error('Failed to fetch patient');
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function PatientDetailPage({
  params,
}: PatientDetailPageProps) {
  const patient = await getPatient(params.id);

  if (!patient) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="icon">
          <Link href="/patients">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to Patients</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          {patient.name}
        </h1>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Contact and personal details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <InfoItem icon={<User />} label="Username" value={patient.username} />
            <InfoItem icon={<Mail />} label="Email" value={patient.email} />
            <InfoItem icon={<Phone />} label="Phone" value={patient.phone} />
            <InfoItem icon={<Globe />} label="Website" value={patient.website} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Address</CardTitle>
            <CardDescription>Patient's residential address.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <InfoItem
              icon={<MapPin />}
              label="Full Address"
              value={`${patient.address.suite}, ${patient.address.street}, ${patient.address.city}, ${patient.address.zipcode}`}
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Company</CardTitle>
            <CardDescription>Associated company details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <InfoItem
              icon={<Building />}
              label="Company Name"
              value={patient.company.name}
            />
            <InfoItem label="Catchphrase" value={`"${patient.company.catchPhrase}"`} />
            <InfoItem label="Business" value={patient.company.bs} />
          </CardContent>
        </Card>
      </div>
    </div>
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
