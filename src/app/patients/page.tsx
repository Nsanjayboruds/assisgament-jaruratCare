import type { Patient } from '@/lib/types';
import { PatientsList } from './patients-list';

async function getPatients(): Promise<Patient[]> {
  // Intentionally throw an error for demonstration purposes
  // const shouldError = Math.random() > 0.5;
  // if (shouldError) {
  //   throw new Error('Failed to fetch patients data from the server.');
  // }
  
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch patients');
  }
  return res.json();
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
      <PatientsList initialPatients={patients} />
    </div>
  );
}
