import React from "react";
import Head from "next/head";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <>
      <Head>
        <title>Page Not Found | 404</title>
        <meta
          name="description"
          content="The page you're looking for doesn't exist"
        />
      </Head>

      <div className="min-h-[80vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="relative">
            <h1 className="text-9xl font-extrabold text-primary opacity-20">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-4xl font-semibold text-primary">
                Page Not Found
              </h2>
            </div>
          </div>

          <p className="text-lg text-gray-600">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has
            been moved.
          </p>

          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors duration-200"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
