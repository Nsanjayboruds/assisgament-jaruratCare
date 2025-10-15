import type { Patient } from '@/lib/types';
import { PatientsList } from './patients-list';

async function getPatients(): Promise<Patient[]> {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users', {
      cache: 'no-store', // For development, ensures we get fresh data
    });
    if (!res.ok) {
      throw new Error('Failed to fetch patients');
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function PatientsPage() {
  const patients = await getPatients();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight font-headline">
        Patient Records
      </h1>
      <p className="text-muted-foreground">
        A list of all patients in the system. You can search for patients or
        click on a record to view more details.
      </p>
      <PatientsList patients={patients} />
    </div>
  );
}
