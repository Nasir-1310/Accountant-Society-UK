// File: app/data/contactSections.ts

import { Mail, Phone } from 'lucide-react';

const collapsibleSections = [
  {
    title: "Membership enquires",
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Member Registration team:</h4>
          <div className="space-y-2">
            <p className="flex items-center gap-2 text-gray-700">
              <Mail className="w-4 h-4 text-teal-600" />
              Email: <a href="mailto:admin@accountantssociety.org" className="text-teal-600 hover:underline">admin@accountantssociety.org</a>
            </p>
            <p className="text-gray-700">
              <a href="/members/membership-and-fees" className="text-teal-600 hover:underline">
                Visit the &apos;Membership and fees&apos; pages
              </a>
            </p>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Professional Practice",
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Professional Practice Support:</h4>
          <div className="space-y-2">
            <p className="flex items-center gap-2 text-gray-700">
              <Phone className="w-4 h-4 text-teal-600" />
              Phone: <a href="tel:07988 834395" className="text-teal-600 hover:underline">07988 834395</a>
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <Mail className="w-4 h-4 text-teal-600" />
              Email: <a href="mailto:practice@profaccountants.org.uk" className="text-teal-600 hover:underline">admin@accountantssociety.org</a>
            </p>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Financial compliance",
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Compliance Team:</h4>
          <div className="space-y-2">
            <p className="flex items-center gap-2 text-gray-700">
              <Phone className="w-4 h-4 text-teal-600" />
              Phone: <a href="tel:07988 834395" className="text-teal-600 hover:underline">07988 834395</a>
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <Mail className="w-4 h-4 text-teal-600" />
              Email: <a href="mailto:admin@accountantssociety.org" className="text-teal-600 hover:underline">mailto:admin@accountantssociety.org</a>
            </p>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Education and careers",
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Education Support Team:</h4>
          <div className="space-y-2">
            <p className="flex items-center gap-2 text-gray-700">
              <Phone className="w-4 h-4 text-teal-600" />
              Phone: <a href="tel:+441234567892" className="text-teal-600 hover:underline">+44 123 456 7892</a>
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <Mail className="w-4 h-4 text-teal-600" />
              Email: <a href="mailto:education@profaccountants.org.uk" className="text-teal-600 hover:underline">education@profaccountants.org.uk</a>
            </p>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Research and policy",
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Research Team:</h4>
          <div className="space-y-2">
            <p className="flex items-center gap-2 text-gray-700">
              <Phone className="w-4 h-4 text-teal-600" />
              Phone: <a href="tel:+441234567893" className="text-teal-600 hover:underline">+44 123 456 7893</a>
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <Mail className="w-4 h-4 text-teal-600" />
              Email: <a href="mailto:research@profaccountants.org.uk" className="text-teal-600 hover:underline">research@profaccountants.org.uk</a>
            </p>
          </div>
        </div>
      </div>
    )
  }
];

export default collapsibleSections;
