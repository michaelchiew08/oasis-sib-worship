/** @type {import('next').NextConfig} */

//const jspdf = require('next-transpile-modules')(['jspdf']);

module.exports = {
  reactStrictMode: true,

  // Disable image optimization entirely
  images: {
    unoptimized: true
  }
}