import { redirect } from 'next/navigation';

// "Resources" was renamed to "Vendors" (Nov 2026). Old links keep working.
export default function ResourcesRedirect() {
  redirect('/vendors');
}
