import React from 'react';
import { ChevronDown } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 border-t">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  About LocalFinder
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Investor Relations
                </a>
              </li>
            </ul>
          </div>

          {/* Discover */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Discover</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Project Cost Guides
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Collections
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Events
                </a>
              </li>
            </ul>
          </div>

          {/* LocalFinder for Business */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">For Business</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Business Solutions
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Business Owner Login
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Claim your Business Page
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Advertise with Us
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Services Home
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Services Near Me
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Service Estimates
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Safety Recalls
                </a>
              </li>
            </ul>
          </div>

          {/* Languages */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Languages</h3>
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 rounded px-4 py-2 pr-8 text-sm text-gray-700 w-full focus:outline-none focus:border-blue-600">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Cities */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Cities</h3>
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 rounded px-4 py-2 pr-8 text-sm text-gray-700 w-full focus:outline-none focus:border-blue-600">
                <option>Explore a City</option>
                <option>San Francisco, CA</option>
                <option>New York, NY</option>
                <option>Los Angeles, CA</option>
                <option>Chicago, IL</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">
            © 2024 LocalFinder. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;