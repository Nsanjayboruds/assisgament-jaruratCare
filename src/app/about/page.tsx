import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Search, FileText, Stethoscope } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">
          About Jarurat Care
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          A modern, intuitive platform designed to streamline patient record
          management for healthcare professionals.
        </p>
      </section>

      <section>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              At Jarurat Care, our mission is to empower healthcare providers
              with the tools they need to deliver exceptional patient care. We
              believe that by simplifying access to patient information, we can
              help reduce administrative overhead and allow medical staff to
              focus on what matters most: their patients. Our dashboard is
              built on the principles of clarity, speed, and security.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <FeatureCard
          icon={<Users className="h-8 w-8 text-primary" />}
          title="Centralized Data"
          description="Access all patient records from a single, unified dashboard."
        />
        <FeatureCard
          icon={<Search className="h-8 w-8 text-primary" />}
          title="Powerful Search"
          description="Instantly find patients by name, ID, or other criteria with our real-time search."
        />
        <FeatureCard
          icon={<FileText className="h-8 w-8 text-primary" />}
          title="Detailed Views"
          description="Get a comprehensive overview of each patient's information in a clean, readable format."
        />
        <FeatureCard
          icon={<Stethoscope className="h-8 w-8 text-primary" />}
          title="Clinician Focused"
          description="Designed with the needs of doctors and nurses in mind for a seamless workflow."
        />
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="text-center p-6 flex flex-col items-center shadow-md hover:shadow-xl transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Card>
  );
}
